'use client';

import LoginHeading from '@/components/login/LoginHeading';
import Link from 'next/link';
import LoginInput from '@/components/login/LoginInput';
import LoginRememberMe from '@/components/login/LoginRememberMe';
import GoogleBtn from '@/components/UI/Button/GoogleBtn';

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


  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const currObject = e.currentTarget;
    const formData = new FormData(currObject);

    console.log('formData', formData);

    const signInResponse = await signIn('credentials', {
      redirect: false,
      email: formData.get('email') as string,
      password: formData.get('password') as string
    });

    if (signInResponse && !signInResponse.error) {

      // setLoading(false);
      // router.push(`/`);
      window.location.href = `/`;
    } else {
      console.error(`Sign in error: ${signInResponse?.error}`);
      setError(signInResponse?.error === `CredentialsSignin` ? `Invalid email or password!` : `Sign in failed`);
      setLoading(false);
    }

    setLoading(false);
  }

  return (
    <>
      <div className="sign-in__second-col">
        <LoginHeading message={message} />
        <form onSubmit={handleSubmit} className="sign-in__second-col-form flex flex-direction-column">
          <LoginInput name={`email`} placeholder={`Email`} type={`email`} />
          <LoginInput name={`password`} placeholder={`Password`} type={`password`} />
          {/*inserting radio-button Remember me*/}
          <LoginRememberMe label={`Remember me`} name={`rememberMe`} linkVisibility
                           href={`/login/forgot-password`} />
          <div>
            {error && <p className={`paragraph paragraph-error`}>{error}</p>}
          </div>
          {/*register__submit-button-pending*/}
          <button className={`btn btn--book-now ${loading ? `register__submit-button-pending` : ``}`}>
            {loading ? `Processing...` : `Sign in`}
          </button>
        </form>
        <p className="sign-in__second-col-text-login-with text-align-center">Or login with</p>
        <GoogleBtn />
        <GithubBtn />
        <p className="sign-in__second-col-text-do-not-have-account text-align-center">Want to sign up through viatours?
          <Link href={`/register`} className="inline-block highlighted text-decoration-none">&nbsp;Sign up now!</Link>
        </p>
      </div>
    </>
  );
}
