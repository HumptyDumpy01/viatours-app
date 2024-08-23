'use client';

import LoginHeading from '@/components/login/LoginHeading';
import Link from 'next/link';
import LoginInput from '@/components/login/LoginInput';
import LoginRememberMe from '@/components/login/LoginRememberMe';
import GoogleBtn from '@/components/UI/Button/GoogleBtn';
import { motion } from 'framer-motion';

import { FormEvent, useState, useTransition } from 'react';
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
  const [loginStages, setLoginStages] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [userTwoAuthCode, setUserTwoAuthCode] = useState<string>(``);

  const [userEmail, setUserEmail] = useState<string>(``);
  const [userPassword, setUserPassword] = useState<string>(``);
  const [rememberMeState, setRememberMeState] = useState<boolean>();

  // extract the email and password from the cookies
  const emailCookie = document?.cookie?.split(`; `).find(row => row.startsWith(`email=`))?.split(`=`)[1] || undefined;
  const passwordCookie = document?.cookie?.split(`; `).find(row => row.startsWith(`password=`))?.split(`=`)[1] || undefined;

  async function handleSignIn(results: { email: string, password: string, rememberMe: boolean }) {
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
    setUserEmail(results.email);
    setUserPassword(results.password);
    setRememberMeState(results.rememberMe);

    // fetch the user by its email and check if his pass matches
    // and if two-factor auth is enabled, send the code to the user

    // INFO: if user enabled two-factor auth, the "twoFactorAuthEnabled" prop would be true,
    //  if not, the "twoFactorAuthEnabled" prop would be false
    const response = await fetch(`/api/is-two-factor-auth-enabled`, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`
      },
      body: JSON.stringify({ userEmail: results.email, userPassword: results.password })
    });
    const responseData = await response.json();

    if (responseData.error) {
      setError(responseData.message);
      setLoading(false);
      return;
    }

    if (!responseData.twoFactorAuthEnabled) {
      await handleSignIn(results);
    }

    if (responseData.twoFactorAuthEnabled) {
      startTransition(async () => {
        // here we should send the code to the user
        setLoginStages(2);

        startTransition(async () => {
          // send the code to the user's inbox
          const response = await fetch(`/api/send-two-factor-auth-code`, {
            method: `POST`,
            headers: {
              'Content-Type': `application/json`
            },
            body: JSON.stringify({ userEmail: results.email })
          });

          const responseData = await response.json();
          if (responseData.error) {
            setError(responseData.message);
            setLoading(false);
            return;
          } else {
            setError(``);
          }

        });
      });
    }

    // setLoading(false);
  }

  async function verifyUserTwoAuthToken() {

    if (userTwoAuthCode.length !== 6 || isNaN(Number(userTwoAuthCode))) {
      setError(`Please enter a valid 6-digit code!`);
      return;
    }

    // use api endpoint to verify the user's two-factor auth token
    // if the token is valid, sign in the user,
    // if not, show error message
    startTransition(async () => {
      const response = await fetch(`api/validate-two-factor-auth-code`, {
        method: `POST`,
        headers: {
          'Content-Type': `application/json`
        },
        body: JSON.stringify({ userEmail: userEmail, userToken: userTwoAuthCode })
      });
      const responseData = await response.json();

      if (responseData.error) {
        setError(responseData.message);
        return;
      }

      const results = {
        email: userEmail,
        password: userPassword,
        rememberMe: !!rememberMeState
      };

      await handleSignIn(results);

      console.log(`Verifying user's two-factor auth token...`);
      console.log(userTwoAuthCode);
    });
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
          {loginStages === 1 && (
            <>
              <LoginInput defValue={emailCookie ? emailCookie : ``} name={`email`} placeholder={`Email`}
                          type={`email`} />
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
                disabled={loading}
                whileTap={{ scale: 0.9 }}
                transition={{ type: `spring`, stiffness: 260, damping: 20 }}
                className={`btn btn--book-now ${loading ? `sign-in__submit-button-pending` : ``}`}>
                {loading ? `Processing...` : `Sign in`}
              </motion.button>
            </>
          )}
        </form>
        <form className={`sign-in__second-col-form flex flex-direction-column`}>
          {loginStages === 2 && (
            <>
              <div>
                {error && <p className={`paragraph paragraph-error`}>{error}</p>}
              </div>
              <h3 className={`tertiary-heading margin-bottom-24px`}>Two-Factor Authentication</h3>
              <p className={`paragraph margin-bottom-15px`}>We have sent a 6-digit code to your email. Please enter it
                below.</p>
              <LoginInput onChange={(e) => setUserTwoAuthCode(e.target.value)} defValue={``} name={`password`}
                          placeholder={`6-digit code`}
                          type={`password`} />
              <button
                onClick={verifyUserTwoAuthToken}
                disabled={isPending}
                className={`btn btn--book-now ${isPending ? `sign-in__submit-button-pending` : ``}`}>
                {isPending ? `Processing...` : `Verify`}
              </button>
            </>
          )}
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
