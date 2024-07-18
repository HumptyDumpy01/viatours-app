// 'use client';
import './page.scss';
import LoginFirstCol from '@/components/login/LoginFirstCol';
import LoginSecondCol from '@/components/login/LoginSecondCol';
/*interface LogInPageInterface {
  // children: ReactNode;
}*/
export default function LoginPage(/*{  }: LogInPageInterface*/) {
  return (
    <section className="sign-in container">
      <div className="sign-in__wrapper grid">
        <LoginFirstCol />
        <LoginSecondCol />
      </div>
    </section>
  );
}
