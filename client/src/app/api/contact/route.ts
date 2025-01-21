import { config } from '@/contracts/config.constants';
import { mailer } from '@/libs/nodemailer';
import { logger } from '@/utils';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Handles POST requests to send an email using nodemailer.
 *
 * @name POST
 * @description This function receives form data (name, email, message) via a POST request and sends an email using nodemailer.
 * @params req - The HTTP request containing form data (name, email, message).
 * @params res - The HTTP response that returns the result of the email operation.
 * @returns JSON response with success or error status.
 *
 * @example
 * POST({method: 'POST', body: {name: 'John Doe', email: 'john@example.com', message: 'Hello!'}})
 * // Returns JSON: { message: 'Your message has been sent!', data: {...} }
 */
export async function POST(req: NextRequest) {
  return await logger.errorHandler(
    'contact.post',
    async (req) => {
      // Fetch the session details
      const session = await getServerSession();
      const sessionEmail = (session && session.user && session.user.email) || '';
      const { name, email, message, subject } = await req.json();

      // Check if any of the required fields are missing
      if (!message) {
        return NextResponse.json({ error: 'Missing required fields (message)' }, { status: 400 });
      }

      // Define email options
      const mailOptions = {
        from: config.EMAIL_USER, // Sender address
        to: config.EMAIL_TO, // Receiver's email address
        ...(sessionEmail && { replyTo: sessionEmail }),
        ...(email && { replyTo: email }),
        subject: subject || `New Message from ${name} - ${email}`, // Email subject
        text: `${message}`, // Email body
      };

      await mailer.send(mailOptions);

      // Respond with a success message
      return NextResponse.json(
        {
          message: 'Your message has been sent!',
          data: { name, email, message, subject },
        },
        { status: 200 },
      );
    },
    req,
    NextResponse.json({ error: 'Internal Server Error' }, { status: 500 }),
    false,
  );
}
