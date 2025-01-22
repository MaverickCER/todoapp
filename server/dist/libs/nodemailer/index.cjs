"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var nodemailer_exports = {};
__export(nodemailer_exports, {
  mailer: () => mailer
});
module.exports = __toCommonJS(nodemailer_exports);
var import_config = require("@/contracts/config.constants");
var import_dompurify = require("@/dompurify");
var import_utils = require("@/utils");
var import_nodemailer = __toESM(require("nodemailer"), 1);
var import_zod = require("zod");
const emailPayloadSchema = import_zod.z.object({
  to: import_zod.z.string().email(),
  // Email address of the recipient
  subject: import_zod.z.string().min(1),
  // Subject of the email (must be non-empty)
  text: import_zod.z.string().min(1),
  // Plain text content of the email
  html: import_zod.z.string().optional(),
  // Optional HTML content for the email
  cc: import_zod.z.array(import_zod.z.string().email()).optional(),
  // Optional CC field
  bcc: import_zod.z.array(import_zod.z.string().email()).optional()
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
    return await import_utils.logger.errorHandler(
      "nodemailer.send",
      async () => {
        const validatedData = emailPayloadSchema.safeParse(emailData);
        if (!validatedData.success) {
          throw new Error(validatedData.error.message);
        }
        const user = import_config.config.EMAIL_USER;
        const pass = import_config.config.EMAIL_PASS;
        if (!user || !pass) {
          import_utils.logger.warn(
            `Unable to send email due to invalid config - ${(0, import_utils.stringify)(validatedData.data)}`
          );
          return false;
        }
        const transporter = import_nodemailer.default.createTransport({
          service: "gmail",
          auth: {
            user: import_config.config.EMAIL_USER,
            pass: import_config.config.EMAIL_PASS
          }
        });
        const { to, subject, text, html, cc, bcc } = validatedData.data;
        let sanitizedText = text;
        try {
          sanitizedText = await import_dompurify.sanitizeHtml.sanitize(text, {
            ALLOWED_TAGS: []
          });
        } catch (error) {
          import_utils.logger.warn("Error sanitizing text content:", error);
          sanitizedText = text;
        }
        let sanitizedHtml = html;
        try {
          sanitizedHtml = await import_dompurify.sanitizeHtml.disinfect(html || text || "");
        } catch (error) {
          import_utils.logger.warn("Error sanitizing HTML content:", error);
          sanitizedHtml = html || "";
        }
        const mailOptions = {
          from: import_config.config.EMAIL_USER,
          to,
          subject,
          text: sanitizedText,
          html: sanitizedHtml,
          cc,
          bcc
        };
        await transporter.sendMail(mailOptions);
        import_utils.logger.debug(`email sent: ${(0, import_utils.stringify)(mailOptions)}`);
        return true;
      },
      emailData,
      false,
      false
    );
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mailer
});
