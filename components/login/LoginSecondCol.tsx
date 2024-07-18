// 'use client';
import LoginHeading from '@/components/login/LoginHeading';
import Link from 'next/link';
import LoginInput from '@/components/login/LoginInput';
/*type LoginSecondColType = {
  // children: ReactNode;
}*/

export default function LoginSecondCol(/*{  }: LoginSecondColType*/) {
  /* IMPORTANT: Outsource your entire form(!) with the useFormState as a standalone component.
      add a prop, e.g. action, and pass this prop to your useFormState as the first arg.
      Then add this form to your PostForm file, where you handle server action. Pass your server action
      to this newly created component.   */

  // Thus you would be able to use the error messages to inject them onto your form.
  // const [state, formAction] = useFormState(YOUR_SERVER_ACTION, { errors: null });

  return (
    <>
      <div className="sign-in__second-col">
        <LoginHeading />
        <form className="sign-in__second-col-form flex flex-direction-column">
          <LoginInput name={`email`} placeholder={`Email`} type={`email`} />
          <LoginInput name={`password`} placeholder={`Password`} type={`password`} />
          {/*inserting radio-button Remember me*/}
          <div className="sign-in__second-col-form-remember-me-wrapper flex flex-space-between">
            <label className="sign-in__second-col-form-remember-me flex">
              <input type="checkbox" className="sign-in__second-col-form-remember-me-checkbox" />
              <span className="sign-in__second-col-form-remember-me-text">Remember me</span>
            </label>
            <Link href={`/login/forgot-password`} className="link link--forgot-password">Forgot password?</Link>
          </div>
          <button className="btn btn--book-now">Sign in</button>
        </form>
        <p className="sign-in__second-col-text-login-with text-align-center">Or login with</p>
        <button type={`button`} className="btn btn--sign-in-with-google">
          <svg xmlns="http://www.w3.org/2000/svg" width="27" height="26" viewBox="0 0 27 26" fill="none">
            <path
              d="M23.9183 10.6691H23.0625V10.625H13.5V14.875H19.5047C18.6287 17.349 16.2747 19.125 13.5 19.125C9.97941 19.125 7.125 16.2706 7.125 12.75C7.125 9.22941 9.97941 6.375 13.5 6.375C15.1251 6.375 16.6036 6.98806 17.7293 7.98947L20.7346 4.98419C18.8369 3.21566 16.2986 2.125 13.5 2.125C7.63234 2.125 2.875 6.88234 2.875 12.75C2.875 18.6177 7.63234 23.375 13.5 23.375C19.3677 23.375 24.125 18.6177 24.125 12.75C24.125 12.0376 24.0517 11.3422 23.9183 10.6691Z"
              fill="#FFC107" />
            <path
              d="M4.10007 7.80459L7.59091 10.3647C8.53547 8.02612 10.823 6.375 13.5 6.375C15.1251 6.375 16.6036 6.98806 17.7293 7.98947L20.7346 4.98419C18.8369 3.21566 16.2986 2.125 13.5 2.125C9.41894 2.125 5.87975 4.42903 4.10007 7.80459Z"
              fill="#FF3D00" />
            <path
              d="M13.5 23.3751C16.2445 23.3751 18.7381 22.3248 20.6235 20.6169L17.3351 17.8342C16.2325 18.6727 14.8852 19.1262 13.5 19.1251C10.7365 19.1251 8.38992 17.363 7.50592 14.9038L4.04111 17.5733C5.79954 21.0142 9.37061 23.3751 13.5 23.3751Z"
              fill="#4CAF50" />
            <path
              d="M23.9183 10.6691H23.0625V10.625H13.5V14.875H19.5047C19.0857 16.0525 18.3308 17.0814 17.3335 17.8346L17.3351 17.8335L20.6235 20.6162C20.3908 20.8277 24.125 18.0625 24.125 12.75C24.125 12.0376 24.0517 11.3422 23.9183 10.6691Z"
              fill="#1976D2" />
          </svg>
          Google
        </button>
        <p className="sign-in__second-col-text-do-not-have-account text-align-center">Don’t have an account?
          <Link href={`/register`} className="inline-block highlighted text-decoration-none">&nbsp;Sign up now</Link>
        </p>
      </div>
    </>
  );
}
