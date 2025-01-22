import DOMPurify from 'isomorphic-dompurify';

/**
 * @name sanitizeHtml
 * @description Sanitize HTML input to prevent XSS attacks.
 */
declare const sanitizeHtml: {
    isValidMedia(url: string, type: "audio" | "image" | "video"): Promise<unknown>;
    /**
     * @method enforceAttributes
     * @description Enforce target="_blank" and rel="noopener" for all anchor tags in the sanitized HTML.
     * Fetch metadata for each URL and add appropriate data attributes.
     * If metadata cannot be fetched, replace the anchor with strikethrough text.
     * @param {string} html - The sanitized HTML string.
     * @returns {Promise<string>} - The HTML string with updated anchor tags.
     */
    enforceAttributes(html: string): Promise<string>;
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
    sanitize(htmlData: string, config?: DOMPurify.Config): Promise<string>;
    /**
     * @method disinfect
     * @description Sanitize the given HTML string with a predefined configuration.
     * @param {string} htmlData - The HTML string to sanitize.
     * @returns {Promise<string>} - The sanitized HTML string with anchor tags updated.
     * @example
     * const sanitizedHtml = await Sanitizer.disinfect('<div onclick="alert(\'XSS\')">Hello <a href="http://example.com">Example</a></div>');
     * console.log(sanitizedHtml); // Outputs: <div>Hello <a href="http://example.com" target="_blank" rel="noopener">Example</a></div>
     */
    disinfect(htmlData: string): Promise<string>;
};

export { sanitizeHtml };
