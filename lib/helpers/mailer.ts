import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import Mail from 'nodemailer/lib/mailer';

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_POST,
  secure: process.env.NODE_ENV === 'production',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
} as SMTPTransport.Options);


type SendEmailProps = {
  sender: Mail.Address;
  recipients: Mail.Address[];
  subject: string;
  message: string;
  html?: string;
}

export const sendEmail = async (props: SendEmailProps) => {
  const { sender, recipients, subject, html, message } = props;

  return await transporter.sendMail({
    from: sender,
    to: recipients,
    subject,
    html: html ? html : message,
    text: message
  });
};
