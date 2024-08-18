'use client';

import LoginHeading from '@/components/login/LoginHeading';
import Link from 'next/link';
import LoginInput from '@/components/login/LoginInput';
import LoginRememberMe from '@/components/login/LoginRememberMe';
import GoogleBtn from '@/components/UI/Button/GoogleBtn';
import { motion } from 'framer-motion';

import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import GithubBtn from '@/components/UI/Button/GithubBtn';

type LoginSecondColType = {
  message: string;
  // children: ReactNode;
}

export default function LoginSecondCol({ message }: LoginSecondColType) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // extract the email and password from the cookies
  const emailCookie = document.cookie.split(`; `).find(row => row.startsWith(`email=`))?.split(`=`)[1];
  const passwordCookie = document.cookie.split(`; `).find(row => row.startsWith(`password=`))?.split(`=`)[1];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const currObject = e.currentTarget;
    const formData = new FormData(currObject);

    const results = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      rememberMe: !!formData.get('rememberMe')
    };

    console.log('results', results);

    const signInResponse = await signIn('credentials', {
      redirect: false,
      email: results.email as string,
      password: results.password as string
    });

    // expire date should be current date + one month (in this case 30 days)
    const expireDate = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000);

    if (signInResponse && !signInResponse.error) {
      // setLoading(false);
      // router.push(`/`);
      window.location.href = `/`;

      if (results.rememberMe) {
        // clear cookies
        document.cookie = `email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

        // store email and password entered onto cookies and apply expire date
        document.cookie = `email=${results.email}; expires=${expireDate.toUTCString()}; path=/;`;
        document.cookie = `password=${results.password}; expires=${expireDate.toUTCString()}; path=/;`;
      }


    } else {
      console.error(`Sign in error: ${signInResponse?.error}`);
      setError(signInResponse?.error === `CredentialsSignin` ? `Invalid email or password!` : `Sign in failed`);
      setLoading(false);
    }

    setLoading(false);
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: `spring`, stiffness: 260, damping: 20 }}
        className="sign-in__second-col">
        <LoginHeading message={message} />
        <form onSubmit={handleSubmit} className="sign-in__second-col-form flex flex-direction-column">
          <LoginInput defValue={emailCookie ? emailCookie : ``} name={`email`} placeholder={`Email`} type={`email`} />
          <LoginInput defValue={passwordCookie ? passwordCookie : ``} name={`password`} placeholder={`Password`}
                      type={`password`} />
          {/*inserting radio-button Remember me*/}
          <LoginRememberMe label={`Remember me`} name={`rememberMe`} linkVisibility
                           href={`/login/forgot-password`} />
          <div>
            {error && <p className={`paragraph paragraph-error`}>{error}</p>}
          </div>
          {/*register__submit-button-pending*/}
          <motion.button
            whileTap={{ scale: 0.9 }}
            transition={{ type: `spring`, stiffness: 260, damping: 20 }}
            className={`btn btn--book-now ${loading ? `register__submit-button-pending` : ``}`}>
            {loading ? `Processing...` : `Sign in`}
          </motion.button>
        </form>
        <p className="sign-in__second-col-text-login-with text-align-center">Or login with</p>
        <GoogleBtn />
        <GithubBtn />
        <p className="sign-in__second-col-text-do-not-have-account text-align-center">Want to sign up through viatours?
          <Link href={`/register`} className="inline-block highlighted text-decoration-none">&nbsp;Sign up now!</Link>
        </p>
      </motion.div>
    </>
  );
}
