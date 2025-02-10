'use server';

import { NewUserEmail } from '@/components/email-templates';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendNewUserEmail() {
  const { error } = await resend.emails.send({
    from: 'My-GPT <support@jongreen.dev>',
    to: ['jongreen1996@gmail.com'],
    subject: 'New User!',
    react: NewUserEmail(),
  });

  if (error) {
    console.error('Error sending email:', error);
  }
}
