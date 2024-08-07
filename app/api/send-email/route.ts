import { NextRequest } from 'next/server';
import { sendEmail } from '@/lib/helpers/mailer';

export async function POST(request: NextRequest) {
  try {
    const sender = {
      name: 'Viatours Tourism Company',
      address: 'viatours.business@gmail.com'
    };

    const recipients = [
      { name: `Nick Baker`, address: 'tuznikolas@gmail.com' }
    ];

    const result = await sendEmail({
      sender,
      recipients,
      subject: 'Order Confirmation',
      message: 'Thank you for your order!',
      
    });

    return Response.json({
      accepted: result.accepted
    });

  } catch (e) {
    throw new Error(`Failed to send email. Error: ${e}`);
  }
}
