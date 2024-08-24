import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const DOMAIN = process.env.NEXT_PUBLIC_API_URL;

export async function sendVerificationCode(email: string, token: string, type:
  `emailVerification` | `twoFactorAuth` |
  `resetPassword` | `registerEmailVerification` | `deleteAccount`) {

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
  if (type === `registerEmailVerification`) {
    const response = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Viatours Email Verification',
      html: `
      <div style="font-family: 'Montserrat', sans-serif;">
      <h1>Email Verification</h1>
      <p>Your verification code to sign up with Viatours is: <strong>${token}</strong></p>
      <p>This code will expire in 10 minutes.</p>
      <br>
      <p>If you didn't request this code, you can safely ignore this email.</p>
      </div>
    `
    });
  }
  if (type === `twoFactorAuth`) {
    const response = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Viatours Two-factor Authentication',
      html: `
      <div style="font-family: 'Montserrat', sans-serif;">
      <h1>Two-Factor Authentication</h1>
      <p>Your 2FA code to sign in to Viatours is: <strong>${token}</strong></p>
      <p>This code will expire in 10 minutes.</p>
      <br>
      <p>If you didn't request this code, you can safely ignore this email.</p>
      </div>
    `
    });
  }
  if (type === `resetPassword`) {
    const response = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Viatours Reset Password',
      html: `
      <div style="font-family: 'Montserrat', sans-serif;">
      <h1>Reset Password Request</h1>
      <p>Your code to reset Viatours password is: <strong>${token}</strong></p>
      <p>This code will expire in 10 minutes.</p>
      <br>
      <p>If you didn't request this code, you can safely ignore this email.</p>
      </div>
    `
    });


  }

  if (type === `deleteAccount`) {
    const response = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Viatours Delete Account',
      html: `
      <div style="font-family: 'Montserrat', sans-serif;">
      <h1>Delete Viatours Account</h1>
      <p>Your code to delete your Viatours Account is: <strong>${token}</strong></p>
      <p>This code will expire in 10 minutes.</p>
      <br>
      <p>If you didn't request this code, we highly recommend to change your password immediately.</p>
      </div>
    `
    });
  }

}
