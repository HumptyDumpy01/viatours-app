// 'use client';
import './page.scss';
import RegisterFirstCol from '@/components/register/RegisterFirstCol';
/*interface SignUpPageInterface {
  // children: ReactNode;
}*/

export const metadata = {
  title: `Sign Up with Viatours! We we will be glad to have you on board!`,
  description: `This is the sign up page of Viatours Travel Agency. Here you can sign up to our website and get access to all of our tours.`
};

export default function SignUpPage(/*{  }: SignUpPageInterface*/) {
  return (
    <section className="register-wrapper">
      <div className="register grid container">
        <RegisterFirstCol />
      </div>
    </section>
  );
}
