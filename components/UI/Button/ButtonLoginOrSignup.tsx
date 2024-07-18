// 'use client';
import '@/app/checkout/page.scss';
/*type ButtonLoginOrSignupType = {
  // children: ReactNode;
}*/
import Link from 'next/link';

export default function ButtonLoginOrSignup(/*{  }: ButtonLoginOrSignupType*/) {
  return (
    <div className="book-now__details-1__if-user-not-logged-in">
      <Link href={`/login`}
            className="book-now__details-1__if-user-not-logged-in__text text-decoration-none"><span
        className="inline-block book-now__details-1__if-user-not-logged-in__text--log">Log in</span> or <span
        className="inline-block book-now__details-1__if-user-not-logged-in__text--log">Sign-up</span> for
        faster checkout and to save
        some Viatours Points!</Link>
    </div>
  );
}
