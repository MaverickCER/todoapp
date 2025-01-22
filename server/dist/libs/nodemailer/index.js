import { config } from "@/contracts/config.constants";
import { sanitizeHtml } from "@/dompurify";
import { logger, stringify } from "@/utils";
import nodemailer from "nodemailer";
import { z } from "zod";
const emailPayloadSchema = z.object({
  to: z.string().email(),
  // Email address of the recipient
  subject: z.string().min(1),
  // Subject of the email (must be non-empty)
  text: z.string().min(1),
  // Plain text content of the email
  html: z.string().optional(),
  // Optional HTML content for the email
  cc: z.array(z.string().email()).optional(),
  // Optional CC field
  bcc: z.array(z.string().email()).optional()
  // Optional BCC field
});
const mailer = {
  /**
   * @name send
   * @description Sends an email with the provided data. Cleans the text and HTML content before sending.
   * @param {TEmailPayloadSchema} emailData - Data for the email to be sent.
   * @returns {Promise<boolean>} True if the email was sent successfully, false otherwise.
   * @throws {Error} If the email validation fails or email sending fails.
   */
  async send(emailData) {
    return await logger.errorHandler(
      "nodemailer.send",
      async () => {
        const validatedData = emailPayloadSchema.safeParse(emailData);
        if (!validatedData.success) {
          throw new Error(validatedData.error.message);
        }
        const user = config.EMAIL_USER;
        const pass = config.EMAIL_PASS;
        if (!user || !pass) {
          logger.warn(
            `Unable to send email due to invalid config - ${stringify(validatedData.data)}`
          );
          return false;
        }
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: config.EMAIL_USER,
            pass: config.EMAIL_PASS
          }
        });
        const { to, subject, text, html, cc, bcc } = validatedData.data;
        let sanitizedText = text;
        try {
          sanitizedText = await sanitizeHtml.sanitize(text, {
            ALLOWED_TAGS: []
          });
        } catch (error) {
          logger.warn("Error sanitizing text content:", error);
          sanitizedText = text;
        }
        let sanitizedHtml = html;
        try {
          sanitizedHtml = await sanitizeHtml.disinfect(html || text || "");
        } catch (error) {
          logger.warn("Error sanitizing HTML content:", error);
          sanitizedHtml = html || "";
        }
        const mailOptions = {
          from: config.EMAIL_USER,
          to,
          subject,
          text: sanitizedText,
          html: sanitizedHtml,
          cc,
          bcc
        };
        await transporter.sendMail(mailOptions);
        logger.debug(`email sent: ${stringify(mailOptions)}`);
        return true;
      },
      emailData,
      false,
      false
    );
  }
};
export {
  mailer
};
