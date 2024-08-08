// 'use client';

import './page.scss';
import LoginFirstCol from '@/components/login/LoginFirstCol';
import LoginSecondCol from '@/components/login/LoginSecondCol';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/lib/auth';
import { redirect } from 'next/navigation';

interface LogInPageInterface {
  searchParams: {
    registered: `success`;
  };

  // children: ReactNode;
}

export default async function LoginPage({ searchParams }: LogInPageInterface) {

  const session = await getServerSession(authConfig) as {
    user: {
      email: string;
      image: string;
    }
  };

  if (session) {
    redirect('..');
  }


  // extract the params from the url
  const registered = searchParams.registered ? searchParams.registered : null;

  let message = ``;
  if (registered && registered === `success`) {
    message = `You have successfully registered! Let's try to log in now.`;
  }

  return (
    <section className="sign-in container">
      <div className="sign-in__wrapper grid">
        <LoginFirstCol />
        <LoginSecondCol message={message} />
      </div>
    </section>
  );
}
