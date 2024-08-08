'use client';

import './page.scss';
import LoginFirstCol from '@/components/login/LoginFirstCol';
import LoginSecondCol from '@/components/login/LoginSecondCol';

interface LogInPageInterface {
  searchParams: {
    registered: `success`;
  };

  // children: ReactNode;
}

export default function LoginPage({ searchParams }: LogInPageInterface) {
  // extract the params from url
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
