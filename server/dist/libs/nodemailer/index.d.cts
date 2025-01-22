import { z } from 'zod';

declare const emailPayloadSchema: z.ZodObject<{
    to: z.ZodString;
    subject: z.ZodString;
    text: z.ZodString;
    html: z.ZodOptional<z.ZodString>;
    cc: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    bcc: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    text: string;
    to: string;
    subject: string;
    html?: string | undefined;
    cc?: string[] | undefined;
    bcc?: string[] | undefined;
}, {
    text: string;
    to: string;
    subject: string;
    html?: string | undefined;
    cc?: string[] | undefined;
    bcc?: string[] | undefined;
}>;
type TEmailPayloadSchema = z.infer<typeof emailPayloadSchema>;
declare const mailer: {
    /**
     * @name send
     * @description Sends an email with the provided data. Cleans the text and HTML content before sending.
     * @param {TEmailPayloadSchema} emailData - Data for the email to be sent.
     * @returns {Promise<boolean>} True if the email was sent successfully, false otherwise.
     * @throws {Error} If the email validation fails or email sending fails.
     */
    send(emailData: TEmailPayloadSchema): Promise<boolean>;
};

export { mailer };
