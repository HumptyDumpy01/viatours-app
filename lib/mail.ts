import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const DOMAIN = process.env.NEXT_PUBLIC_API_URL;

export async function sendVerificationCode(email: string, token: string, type:
  `emailVerification` | `twoFactorAuth` |
  `resetPassword` | `registerEmailVerification` | `deleteAccount` | `verifyOrderRefund` | `verifyOrderCancellation`) {

  if (type === `emailVerification`) {
    const response = await resend.emails.send({
      from: 'Viatours@viatours.net',
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
      from: 'Viatours@viatours.net',
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
      from: 'Viatours@viatours.net',
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
      from: 'Viatours@viatours.net',
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
      from: 'Viatours@viatours.net',
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

  if (type === `verifyOrderCancellation`) {
    const response = await resend.emails.send({
      from: 'Viatours@viatours.net',
      to: email,
      subject: 'Viatours Request Cancellation for the Order',
      html: `
      <div style="font-family: 'Montserrat', sans-serif;">
      <h1>Cancellation of your Order</h1>
      <p>Your code to verify cancellation request: <strong>${token}</strong></p>
      <p>This code will expire in 10 minutes.</p>
      <br>
      <p>If you didn't request this code, we highly recommend to change your password immediately.</p>
      </div>
    `
    });
  }
  if (type === `verifyOrderRefund`) {
    const response = await resend.emails.send({
      from: 'Viatours@viatours.net',
      to: email,
      subject: 'Viatours Request Refund for the Order',
      html: `
      <div style="font-family: 'Montserrat', sans-serif;">
      <h1>Refund of your Order</h1>
      <p>Your code to verify refund request: <strong>${token}</strong></p>
      <p>This code will expire in 10 minutes.</p>
      <br>
      <p>If you didn't request this code, we highly recommend to change your password immediately.</p>
      </div>
    `
    });
  }
}


type UserOrderTypeResponse = {
  _id: string;
  tourTitle: string;
  booking: {
    totalPrice: number;
    date: string;
    time: string;
    tickets: {
      overall: number;
      adultTickets: number;
      youthTickets: number;
      childrenTickets: number;
    }
  }
  meetingPoint: {
    title: string;
    state: string;
    country: string;
  }
  extraDetails: {
    state: {
      status: string;
    }
  }
}

export async function sendOrderDetails(email: string, order: UserOrderTypeResponse) {
  const response = await resend.emails.send({
    from: 'Viatours@viatours.net',
    to: email,
    subject: 'Viatours Order Details',
    html: `
      <div style="font-family: Montserrat, sans-serif; color: #1E2050; padding: 1rem;">
      <svg class="thanks-for-purchase-col-2__viatours-logo" xmlns="http://www.w3.org/2000/svg" width="47"
           height="36"
           viewBox="0 0 47 36" fill="none">
        <path
          d="M46.4228 7.2876C44.9562 7.37599 43.5073 7.65346 42.1118 8.1131C40.6931 8.51129 39.312 9.03305 37.9844 9.67238C36.644 10.2468 35.3808 10.9863 34.2237 11.8737C33.0424 12.6897 31.9373 13.6106 30.9217 14.6254C29.8985 15.6912 28.9484 16.825 28.0783 18.0191C27.2572 19.2195 26.5217 20.4761 25.8769 21.7797C25.2774 23.1241 24.7568 24.5024 24.3177 25.9073C23.9543 27.3259 23.6786 28.7656 23.4921 30.2182C23.395 28.7527 23.1178 27.3049 22.6667 25.9073C22.2685 24.4885 21.7467 23.1074 21.1074 21.7797C20.533 20.4395 19.7935 19.1761 18.9061 18.0191C18.0676 16.8262 17.1482 15.6923 16.1543 14.6254C15.0875 13.6315 13.9535 12.7121 12.7606 11.8737C11.6036 10.9863 10.3403 10.2468 9.00001 9.67238C7.68531 9.00332 6.30119 8.48043 4.8725 8.1131C3.47705 7.65346 2.02807 7.37599 0.561542 7.2876C0.561542 8.1131 0.469819 8.9386 0.469819 9.7641C0.434395 11.4575 0.588219 13.1496 0.928432 14.8088C1.09932 15.645 1.31363 16.4716 1.57049 17.2853C1.7631 18.1065 2.03972 18.9056 2.39599 19.6702C2.6937 20.4509 3.03043 21.2163 3.40494 21.9632L4.68905 24.1645L6.24834 26.1824L7.89935 28.0168L9.73379 29.7596L11.7517 31.2272C12.4855 31.7775 13.2192 32.1444 13.9531 32.603L16.2461 33.7037L18.5391 34.5292L21.0156 35.1713L23.4921 35.5381L25.9687 35.1713L28.4452 34.5292L30.8299 33.7037L33.1231 32.603L35.2326 31.2272L37.2505 29.7596C37.9058 29.2265 38.519 28.6438 39.085 28.0168C39.712 27.4508 40.2945 26.8376 40.8277 26.1824L42.2953 24.1645C42.7539 23.4308 43.2125 22.6969 43.5794 21.9632L44.6801 19.6702L45.5055 17.2853C45.7327 16.4702 45.9164 15.6435 46.0559 14.8088C46.223 13.9906 46.3455 13.1638 46.4228 12.3323C46.5465 11.4822 46.5772 10.621 46.5145 9.7641C46.5297 8.93754 46.4991 8.11077 46.4228 7.2876Z"
          fill="url(#paint0_linear_849_18988)" />
        <path
          d="M29.2733 5.72816C29.2918 6.12787 29.2611 6.52837 29.1816 6.92054C29.1013 7.32974 28.9783 7.7294 28.8147 8.11294L28.2643 9.12188L27.5305 10.0391L26.6133 10.7729L25.5126 11.3232L24.412 11.6901H22.0271L20.8348 11.3232L19.8259 10.7729L18.9086 10.0391L18.0832 9.12188L17.5328 8.11294L17.1658 6.92054C17.1658 6.55366 17.0742 6.18676 17.0742 5.72816C17.0742 5.26954 17.1658 4.99438 17.1658 4.62748C17.1658 4.2606 17.4411 3.80198 17.5328 3.43508L18.0832 2.42614L18.9086 1.50892C19.1718 1.21545 19.4818 0.967514 19.8259 0.775139L20.8348 0.2248L22.0271 -0.14209H24.412L25.5126 0.2248L26.6133 0.775139L27.5305 1.50892L28.2643 2.42614L28.8147 3.43508C28.9907 3.81399 29.1141 4.21516 29.1816 4.62748C29.2573 4.98921 29.288 5.35889 29.2733 5.72816Z"
          fill="#EB662B" />
        <defs>
          <linearGradient id="paint0_linear_849_18988" x1="7.95305" y1="11.525" x2="27.2946" y2="40.4017"
                          gradientUnits="userSpaceOnUse">
            <stop stop-color="#EB662B" />
            <stop offset="1" stop-color="#F28555" />
          </linearGradient>
        </defs>
      </svg>
      <h1 style="color: #EB662B;">Thanks for participation in my Demo Viatours Project!</h1>
      <p style="color:#fa1e2d; font-weight: 500">Be aware that this is not a website where you can buy real tour tickets but my portfolio project.</p>
      <p>You can track your dummy order <a href='${DOMAIN}/track-order'>here.</a></p>
      <p>If you registered an account, you can track your order directly by visiting the Account Settings page: <a href='${DOMAIN}/account-settings?page=tour-purchases'>
      here.</a></p>
      <div>
      <h2 style="color: #EB662B;">Order Details</h2>
      <p><strong>Order ID:</strong> ${order._id}</p>
      <p><strong>Order Status: </strong> ${order.extraDetails.state.status}</p>
      <p><strong>Total Price:</strong> ${order.booking.totalPrice}$</p>
      <p><strong>Tour Title:</strong>${order.tourTitle}</p>
      <p><strong>Booking Date:</strong> ${new Date(order.booking.date).toDateString()}</p>
      <p><strong>Meeting Time:</strong> ${order.booking.time}</p>
      <p><strong>Meeting Point:</strong> ${order.meetingPoint.title}, ${order.meetingPoint.state}, 
      ${order.meetingPoint.country}</p>
      <p>You can see Meeting Point on map while <a href="${DOMAIN}/track-order"> tracking the order.<a/></p>
      <h2 style="color: #EB662B;">Tickets</h2>
      <p><strong>Overall:</strong> ${order.booking.tickets.overall}</p>
      <p><strong>Adult Tickets:</strong> ${order.booking.tickets.adultTickets}</p>
      <p><strong>Youth Tickets:</strong> ${order.booking.tickets.youthTickets}</p>
      <p><strong>Children Tickets:</strong> ${order.booking.tickets.childrenTickets}</p>
      <button style="background-color: #EB662B; color: white;
       font-family: Montserrat, serif;
        padding: 1.5rem 2.2rem;
        font-size: 16px; 
        font-weight: 600;
        border: none;
        border-radius: 5px; 
        cursor: pointer;
        margin-top: 1rem;
           ">
      <a href="${DOMAIN}/track-order" style="text-decoration: none; color: white;">Track Order</a></button>
      </div>
      <p>Best Regards, Nikolas Tuz, a Ukraininan Software Developer.</p>
      </div>
    `
  });

  if (response) {
    return {
      error: false,
      response: response,
      message: `Order Details sent successfully!`
    };
  } else {
    return {
      error: true,
      message: `Failed to send Order Details.`
    };
  }

}
