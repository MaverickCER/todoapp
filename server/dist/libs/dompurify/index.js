import { logger } from "@/utils";
import DOMPurify from "isomorphic-dompurify";
import { JSDOM } from "jsdom";
import { z } from "zod";
const htmlPayloadSchema = z.object({
  content: z.string().min(1)
  // Ensure non-empty HTML content
});
const sanitizeHtml = {
  async isValidMedia(url, type) {
    try {
      const dom = new JSDOM();
      const document = dom.window.document;
      let mediaElement;
      switch (type) {
        case "audio":
          mediaElement = document.createElement("audio");
          break;
        case "image":
          mediaElement = document.createElement("img");
          break;
        case "video":
          mediaElement = document.createElement("video");
          break;
        default:
          throw new Error("Invalid media type");
      }
      document.body.appendChild(mediaElement);
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
  async enforceAttributes(html) {
    try {
      const dom = new JSDOM(html);
      const document = dom.window.document;
      const anchors = document.querySelectorAll("a");
      const requests = Array.from(anchors).map(
        async (anchor) => {
          const href = anchor.getAttribute("href");
          if (!href) {
            anchor.innerHTML = `<del>Link Removed</del>`;
            anchor.setAttribute("href", "https://www.maverickcer.com/policy");
          } else if (href.startsWith("#")) {
            anchor.innerText = anchor.innerText + ` (verified)`;
          } else {
            try {
              const response = await fetch(href);
              if (!response.ok) {
                throw new Error(`Could not fetch ${href} - ${response.status}`);
              }
              const contentType = response.headers.get("Content-Type") || "";
              const htmlContent = await response.text();
              const metaDoc = new JSDOM(htmlContent).window.document;
              if (contentType.includes("audio") && !await sanitizeHtml.isValidMedia(href, "audio")) {
                anchor.innerHTML = `<del>Link Removed</del>`;
                anchor.setAttribute(
                  "href",
                  "https://www.maverickcer.com/policy"
                );
              } else if (contentType.includes("image") && !await sanitizeHtml.isValidMedia(href, "image")) {
                anchor.innerHTML = `<del>Link Removed</del>`;
                anchor.setAttribute(
                  "href",
                  "https://www.maverickcer.com/policy"
                );
              } else if (contentType.includes("video") && !await sanitizeHtml.isValidMedia(href, "video")) {
                anchor.innerHTML = `<del>Link Removed</del>`;
                anchor.setAttribute(
                  "href",
                  "https://www.maverickcer.com/policy"
                );
              } else if (contentType.includes("text")) {
                const ogImage = metaDoc.querySelector('meta[property="og:image"]')?.getAttribute("content");
                const twitterImage = metaDoc.querySelector('meta[name="twitter:image"]')?.getAttribute("content");
                if (ogImage) {
                  if (await sanitizeHtml.isValidMedia(ogImage, "image")) {
                    anchor.setAttribute("data-img", ogImage);
                  } else {
                    anchor.innerHTML = `<del>Link Removed</del>`;
                    anchor.setAttribute(
                      "href",
                      "https://www.maverickcer.com/policy"
                    );
                  }
                } else if (twitterImage) {
                  if (await sanitizeHtml.isValidMedia(twitterImage, "image")) {
                    anchor.setAttribute("data-img", twitterImage);
                  } else {
                    anchor.innerHTML = `<del>Link Removed</del>`;
                    anchor.setAttribute(
                      "href",
                      "https://www.maverickcer.com/policy"
                    );
                  }
                }
              } else {
                throw new Error(`Unapproved meta data ${href}`);
              }
              const url = new URL(anchor.getAttribute("href") || "");
              anchor.innerText = anchor.innerText + ` (true-link: ${url.hostname})`;
            } catch (_error) {
              anchor.innerHTML = `<del>Link Removed</del>`;
              anchor.setAttribute("href", "https://www.maverickcer.com/policy");
              const url = new URL(anchor.getAttribute("href") || "");
              anchor.innerHTML = `<del>Link Removed</del> (true-link: ${url.hostname})`;
            }
          }
          anchor.setAttribute("target", "_blank");
          anchor.setAttribute("rel", "noopener");
        }
      );
      await Promise.all(requests);
      const images = document.querySelectorAll("img");
      images.forEach((img) => {
        if (!img.hasAttribute("alt")) {
          img.setAttribute("alt", "User provided image");
        }
      });
      return document.body.innerHTML.toString();
    } catch (error) {
      logger.warn("dompurify.enforceAttributes.catch: ", error);
      return "";
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
  async sanitize(htmlData, config = {}) {
    const validatedData = htmlPayloadSchema.safeParse(
      typeof htmlData === "string" ? { content: htmlData } : htmlData
    );
    if (!validatedData.success) {
      logger.warn("dompurify.sanitize", validatedData.error.message);
      return "";
    }
    const { content } = validatedData.data;
    try {
      const sanitizedHtml = DOMPurify.sanitize(content, config);
      return (await sanitizeHtml.enforceAttributes(sanitizedHtml)).toString();
    } catch (error) {
      logger.warn("dompurify.sanitize.catch: ", error);
      throw new Error("Error sanitizing HTML content");
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
  async disinfect(htmlData) {
    const validatedData = htmlPayloadSchema.safeParse(
      typeof htmlData === "string" ? { content: htmlData } : htmlData
    );
    if (!validatedData.success) {
      logger.warn("dompurify.disinfect", validatedData.error.message);
      return "";
    }
    const { content } = validatedData.data;
    try {
      const config = {
        ALLOWED_TAGS: [
          "a",
          "b",
          "blockquote",
          "br",
          "caption",
          "cite",
          "code",
          "col",
          "colgroup",
          "dd",
          "div",
          "dl",
          "dt",
          "em",
          "fieldset",
          "figcaption",
          "figure",
          "footer",
          "form",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "header",
          "hgroup",
          "hr",
          "html",
          "i",
          "img",
          "input",
          "label",
          "legend",
          "li",
          "link",
          "main",
          "map",
          "mark",
          "menu",
          "meta",
          "nav",
          "ol",
          "optgroup",
          "option",
          "p",
          "pre",
          "section",
          "select",
          "small",
          "span",
          "strong",
          "style",
          "sub",
          "summary",
          "sup",
          "table",
          "tbody",
          "td",
          "template",
          "textarea",
          "tfoot",
          "th",
          "thead",
          "time",
          "title",
          "tr",
          "u",
          "ul",
          "var",
          "video"
        ],
        ALLOWED_ATTR: [
          "href",
          "title",
          "alt",
          "src",
          "class",
          "rows",
          "cols",
          "maxlength",
          "minlength",
          "required",
          "disabled",
          "checked",
          "selected",
          "autofocus",
          "action",
          "method",
          "target",
          "rel",
          "aria-*",
          "data-*"
        ],
        FORBID_TAGS: [
          "script",
          "style",
          "iframe",
          "object",
          "embed",
          "link",
          "meta",
          "form",
          "input",
          "button",
          "select",
          "textarea"
        ],
        FORBID_ATTR: [
          "onerror",
          "onclick",
          "onload",
          "onmouseover",
          "onfocus",
          "onchange",
          "onsubmit",
          "onkeypress",
          "onkeydown",
          "onkeyup",
          "onabort",
          "onbeforeunload",
          "onblur",
          "oncontextmenu",
          "oncuechange",
          "ondblclick",
          "ondrag",
          "ondrop",
          "onerror",
          "onfocusin",
          "onfocusout",
          "ongesturechange",
          "onhashchange",
          "oninput",
          "oninvalid",
          "onmessage",
          "onoffline",
          "ononline",
          "onpagehide",
          "onpageshow",
          "onpopstate",
          "onprogress",
          "onreset",
          "onresize",
          "onsearch",
          "onscroll",
          "onshow",
          "onstorage",
          "ontimeupdate",
          "ontouchcancel",
          "ontouchend",
          "ontouchmove",
          "ontouchstart",
          "ontransitionend"
        ]
      };
      const sanitizedHtml = DOMPurify.sanitize(content, config).toString();
      return (await sanitizeHtml.enforceAttributes(sanitizedHtml)).toString();
    } catch (error) {
      logger.warn("dompurify.disinfect.catch: ", error);
      throw new Error("Error sanitizing HTML content");
    }
  }
};
export {
  sanitizeHtml
};
