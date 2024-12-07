// 'use client';
import '@/app/login/page.scss';
import Link from 'next/link';


type LoginRememberMeType = {
  label: string;
  name: string;
  linkVisibility?: boolean;
  href: string;
  // children: ReactNode;
}

export default function LoginRememberMe(props: LoginRememberMeType) {
  return (
    <>
      <div className="sign-in__second-col-form-remember-me-wrapper flex flex-space-between">
        <label className="sign-in__second-col-form-remember-me flex">
          <label htmlFor={props.name}></label>
          <input name={props.name} id={props.name} type="checkbox"
                 className="sign-in__second-col-form-remember-me-checkbox" />
          <span className="sign-in__second-col-form-remember-me-text cursor-pointer">{props.label}</span>
        </label>
        {props.linkVisibility &&
          <Link href={props.href} className="link link--forgot-password">Forgot password?</Link>
        }
      </div>
    </>
  );
}
