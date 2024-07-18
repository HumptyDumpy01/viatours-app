// 'use client';
import '@/app/register/page.scss';
import Input from '@/components/UI/Input/Input';
/*type RegisterFormType = {
  // children: ReactNode;
}*/

// import { useFormState } from 'react-dom';

export default function RegisterForm(/*{  }: RegisterFormType*/) {
  /* IMPORTANT: Outsource your entire form(!) with the useFormState as a standalone component.
      add a prop, e.g. action, and pass this prop to your useFormState as the first arg.
      Then add this form to your PostForm file, where you handle server action. Pass your server action
      to this newly created component.   */

  // Thus you would be able to use the error messages to inject them onto your form.
  // const [state, formAction] = useFormState(YOUR_SERVER_ACTION, { errors: null });

  return (
    <>
      <form className="register__form flex flex-direction-column">
        <Input iconVisible type={`text`} name={`initials`} placeholder={`Enter your Initials: e.g. John Doe`} />
        <Input type={`email`} iconVisible placeholder={`Enter your Email:`} name={`email`} questionMarkVisible />
        <Input type={`password`} iconVisible placeholder={`Enter your Password`} name={`password`} />
        <Input type={`confirm-password`} iconVisible placeholder={`Confirm your password`} name={`confirm-password`} />

        <button className="btn register__submit-button">Register</button>
      </form>
    </>
  );
}
