import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const DOMAIN = process.env.NEXT_PUBLIC_API_URL;

export async function sendVerificationCode(email: string, token: string, type: `emailVerification` | `twoFactorAuth` | `resetPassword`) {

  if (type === `emailVerification`) {
    const response = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Changing Viatours Email Verification',
      html: `
      <div style="font-family: 'Montserrat', sans-serif;">
      <h1>Email Verification</h1>
      <p>Your verification code to change your email is: <strong>${token}</strong></p>
      <p>This code will expire in 10 minutes.</p>
      <br>
      <p>If you didn't request this code, you can safely ignore this email.</p>
      </div>
    `
    });
  }

}