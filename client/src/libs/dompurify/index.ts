import { logger } from '@/utils';
import DOMPurify from 'isomorphic-dompurify';
import { JSDOM } from 'jsdom';
import { z } from 'zod';

// Define a Zod schema for the HTML content (ensures the input is a valid string)
const htmlPayloadSchema = z.object({
  content: z.string().min(1), // Ensure non-empty HTML content
});

/**
 * @name sanitizeHtml
 * @description Sanitize HTML input to prevent XSS attacks.
 */
export const sanitizeHtml = {
  async isValidMedia(url: string, type: 'audio' | 'image' | 'video') {
    try {
      // Create a new DOM environment with jsdom
      const dom = new JSDOM();
      const document = dom.window.document;
      let mediaElement: HTMLAudioElement | HTMLImageElement | HTMLVideoElement;

      switch (type) {
        case 'audio':
          mediaElement = document.createElement('audio') as HTMLAudioElement;
          break;
        case 'image':
          mediaElement = document.createElement('img') as HTMLImageElement;
          break;
        case 'video':
          mediaElement = document.createElement('video') as HTMLVideoElement;
          break;
        default:
          throw new Error('Invalid media type');
      }

      // Append the media element to the document to trigger load
      document.body.appendChild(mediaElement);

      // Check if the media has successfully loaded
      return await new Promise((resolve) => {
        mediaElement.onload = () => resolve(true);
        mediaElement.onerror = () => resolve(false);
        mediaElement.src = url;
      });
    } catch (error) {
      logger.warn(`dompurify.isValidMedia.catch: (${type})`, error);
      return false;
    }
  },

  /**
   * @method enforceAttributes
   * @description Enforce target="_blank" and rel="noopener" for all anchor tags in the sanitized HTML.
   * Fetch metadata for each URL and add appropriate data attributes.
   * If metadata cannot be fetched, replace the anchor with strikethrough text.
   * @param {string} html - The sanitized HTML string.
   * @returns {Promise<string>} - The HTML string with updated anchor tags.
   */
  async enforceAttributes(html: string): Promise<string> {
    try {
      // Replace DOMParser with jsdom
      const dom = new JSDOM(html);
      const document = dom.window.document;

      const anchors = document.querySelectorAll('a');

      const requests = Array.from(anchors).map(async (anchor: HTMLAnchorElement) => {
        const href = anchor.getAttribute('href');

        if (!href) {
          // Replace anchor with strikethrough text if href is missing
          anchor.innerHTML = `<del>Link Removed</del>`;
          anchor.setAttribute('href', 'https://www.maverickcer.com/policy');
        } else if (href.startsWith('#')) {
          anchor.innerText = anchor.innerText + ` (verified)`;
        } else {
          try {
            const response = await fetch(href);
            if (!response.ok) {
              throw new Error(`Could not fetch ${href} - ${response.status}`);
            }
            const contentType = response.headers.get('Content-Type') || '';

            // Check for og:image, twitter:image, and video content types in the fetched HTML
            const htmlContent = await response.text();
            const metaDoc = new JSDOM(htmlContent).window.document;

            // Handle audio, image, and video types separately
            if (contentType.includes('audio') && !(await sanitizeHtml.isValidMedia(href, 'audio'))) {
              // Remove the link if the audio media is invalid
              anchor.innerHTML = `<del>Link Removed</del>`;
              anchor.setAttribute('href', 'https://www.maverickcer.com/policy');
            } else if (contentType.includes('image') && !(await sanitizeHtml.isValidMedia(href, 'image'))) {
              // Remove the link if the image media is invalid
              anchor.innerHTML = `<del>Link Removed</del>`;
              anchor.setAttribute('href', 'https://www.maverickcer.com/policy');
            } else if (contentType.includes('video') && !(await sanitizeHtml.isValidMedia(href, 'video'))) {
              // Remove the link if the video media is invalid
              anchor.innerHTML = `<del>Link Removed</del>`;
              anchor.setAttribute('href', 'https://www.maverickcer.com/policy');
            } else if (contentType.includes('text')) {
              const ogImage = metaDoc.querySelector('meta[property="og:image"]')?.getAttribute('content');
              const twitterImage = metaDoc.querySelector('meta[name="twitter:image"]')?.getAttribute('content');
              if (ogImage) {
                if (await sanitizeHtml.isValidMedia(ogImage, 'image')) {
                  anchor.setAttribute('data-img', ogImage);
                } else {
                  // If og:image is invalid, remove the link
                  anchor.innerHTML = `<del>Link Removed</del>`;
                  anchor.setAttribute('href', 'https://www.maverickcer.com/policy');
                }
              } else if (twitterImage) {
                if (await sanitizeHtml.isValidMedia(twitterImage, 'image')) {
                  anchor.setAttribute('data-img', twitterImage);
                } else {
                  // If twitter:image is invalid, remove the link
                  anchor.innerHTML = `<del>Link Removed</del>`;
                  anchor.setAttribute('href', 'https://www.maverickcer.com/policy');
                }
              }
            } else {
              throw new Error(`Unapproved meta data ${href}`);
            }

            const url = new URL(anchor.getAttribute('href') || '');
            // Update true-link to include host
            anchor.innerText = anchor.innerText + ` (true-link: ${url.hostname})`;
          } catch (_error) {
            // Replace anchor with strikethrough text in case of errors
            anchor.innerHTML = `<del>Link Removed</del>`;
            anchor.setAttribute('href', 'https://www.maverickcer.com/policy');
            const url = new URL(anchor.getAttribute('href') || '');
            // Update true-link to include host
            anchor.innerHTML = `<del>Link Removed</del> (true-link: ${url.hostname})`;
          }
        }
        anchor.setAttribute('target', '_blank');
        anchor.setAttribute('rel', 'noopener');
      });

      await Promise.all(requests);

      const images = document.querySelectorAll('img');
      images.forEach((img) => {
        if (!img.hasAttribute('alt')) {
          img.setAttribute('alt', 'User provided image');
        }
      });

      return document.body.innerHTML.toString();
    } catch (error) {
      logger.warn('dompurify.enforceAttributes.catch: ', error);
      return '';
    }
  },

  /**
   * @name sanitize
   * @description Sanitizes the provided HTML content to remove unsafe elements and attributes.
   * @param {object} htmlData - The data containing HTML content to be sanitized.
   * @param {object} [config={}] - Optional configuration for DOMPurify.
   * @returns {Promise<string>} The sanitized HTML content.
   * @throws {Error} If validation fails or HTML sanitization fails.
   * @example
   * const sanitizedHtml = await sanitize('<div onclick="alert(\'XSS\')">Hello <a href="http://example.com">Example</a></div>');
   * console.log(sanitizedHtml); // Outputs: <div>Hello <a href="http://example.com" target="_blank" rel="noopener">Example</a></div>
   */
  async sanitize(htmlData: string, config: DOMPurify.Config = {}): Promise<string> {
    // Validate the input data using Zod
    const validatedData = htmlPayloadSchema.safeParse(typeof htmlData === 'string' ? { content: htmlData } : htmlData);
    if (!validatedData.success) {
      logger.warn('dompurify.sanitize', validatedData.error.message);
      return '';
    }

    const { content } = validatedData.data;

    try {
      // Sanitize the HTML content using DOMPurify
      const sanitizedHtml = DOMPurify.sanitize(content, config);
      return (await sanitizeHtml.enforceAttributes(sanitizedHtml)).toString();
    } catch (error) {
      // Handle errors that might occur during sanitization
      logger.warn('dompurify.sanitize.catch: ', error);
      throw new Error('Error sanitizing HTML content');
    }
  },

  /**
   * @method disinfect
   * @description Sanitize the given HTML string with a predefined configuration.
   * @param {string} htmlData - The HTML string to sanitize.
   * @returns {Promise<string>} - The sanitized HTML string with anchor tags updated.
   * @example
   * const sanitizedHtml = await Sanitizer.disinfect('<div onclick="alert(\'XSS\')">Hello <a href="http://example.com">Example</a></div>');
   * console.log(sanitizedHtml); // Outputs: <div>Hello <a href="http://example.com" target="_blank" rel="noopener">Example</a></div>
   */
  async disinfect(htmlData: string): Promise<string> {
    // Validate the input data using Zod
    const validatedData = htmlPayloadSchema.safeParse(typeof htmlData === 'string' ? { content: htmlData } : htmlData);
    if (!validatedData.success) {
      logger.warn('dompurify.disinfect', validatedData.error.message);
      return '';
    }

    const { content } = validatedData.data;

    try {
      const config: DOMPurify.Config = {
        ALLOWED_TAGS: [
          'a',
          'b',
          'blockquote',
          'br',
          'caption',
          'cite',
          'code',
          'col',
          'colgroup',
          'dd',
          'div',
          'dl',
          'dt',
          'em',
          'fieldset',
          'figcaption',
          'figure',
          'footer',
          'form',
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'header',
          'hgroup',
          'hr',
          'html',
          'i',
          'img',
          'input',
          'label',
          'legend',
          'li',
          'link',
          'main',
          'map',
          'mark',
          'menu',
          'meta',
          'nav',
          'ol',
          'optgroup',
          'option',
          'p',
          'pre',
          'section',
          'select',
          'small',
          'span',
          'strong',
          'style',
          'sub',
          'summary',
          'sup',
          'table',
          'tbody',
          'td',
          'template',
          'textarea',
          'tfoot',
          'th',
          'thead',
          'time',
          'title',
          'tr',
          'u',
          'ul',
          'var',
          'video',
        ],
        ALLOWED_ATTR: [
          'href',
          'title',
          'alt',
          'src',
          'class',
          'rows',
          'cols',
          'maxlength',
          'minlength',
          'required',
          'disabled',
          'checked',
          'selected',
          'autofocus',
          'action',
          'method',
          'target',
          'rel',
          'aria-*',
          'data-*',
        ],
        FORBID_TAGS: [
          'script',
          'style',
          'iframe',
          'object',
          'embed',
          'link',
          'meta',
          'form',
          'input',
          'button',
          'select',
          'textarea',
        ],
        FORBID_ATTR: [
          'onerror',
          'onclick',
          'onload',
          'onmouseover',
          'onfocus',
          'onchange',
          'onsubmit',
          'onkeypress',
          'onkeydown',
          'onkeyup',
          'onabort',
          'onbeforeunload',
          'onblur',
          'oncontextmenu',
          'oncuechange',
          'ondblclick',
          'ondrag',
          'ondrop',
          'onerror',
          'onfocusin',
          'onfocusout',
          'ongesturechange',
          'onhashchange',
          'oninput',
          'oninvalid',
          'onmessage',
          'onoffline',
          'ononline',
          'onpagehide',
          'onpageshow',
          'onpopstate',
          'onprogress',
          'onreset',
          'onresize',
          'onsearch',
          'onscroll',
          'onshow',
          'onstorage',
          'ontimeupdate',
          'ontouchcancel',
          'ontouchend',
          'ontouchmove',
          'ontouchstart',
          'ontransitionend',
        ],
      };
      const sanitizedHtml = DOMPurify.sanitize(content, config).toString();
      return (await sanitizeHtml.enforceAttributes(sanitizedHtml)).toString();
    } catch (error) {
      // Handle errors that might occur during sanitization
      logger.warn('dompurify.disinfect.catch: ', error);
      throw new Error('Error sanitizing HTML content');
    }
  },
};
