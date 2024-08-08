'use client';

import '@/app/register/page.scss';
import Input from '@/components/UI/Input/Input';
import React, { FormEvent, useState } from 'react';
/*type RegisterFormType = {
  // children: ReactNode;
}*/

// import { useFormState } from 'react-dom';

type RegisterFormType = {
  initials: string;
  email: string;
  password: string;
  confirmPassword: string;
  // children: ReactNode;
}

export default function RegisterForm(/*{  }: RegisterFormType*/) {

  const [formError, setFormError] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    const currObject = e.currentTarget;
    const formData = new FormData(currObject);
    const results = Object.fromEntries(formData.entries()) as RegisterFormType;

    console.log(`Executing results: `, results);

    const trimmedResults = {
      initials: results.initials.trim(),
      email: results.email.trim(),
      password: results.password.trim(),
      confirmPassword: results.confirmPassword
    };

    // Clear previous errors
    setFormError([]);

    // Validate form data
    const errors = validateFormData(trimmedResults);

    if (errors.length > 0) {
      setFormError(errors);
      setIsSubmitting(false);
      return;
    }

    const userExists = await fetch(`api/fetch-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // in a body tag wer simply define the data that should be submitted
      body: JSON.stringify({
        userEmail: results.email
      })
    });
    const userExistsData = await userExists.json();
    console.log(userExistsData);

    if (userExistsData.resp) {
      setFormError([`The user with the email ${results.email} already exists. Please sign in to proceed.`]);
      setIsSubmitting(false);
      return;
    }

    // resetting the form
    // currObject.reset();
    // output

    // I do need to split the user initials into first and last name
    // even if the user initials consists of 3 words, I will still split them into first and last name
    // the first word will be the first name, and the last two words will be the last name

    const initialsArray = trimmedResults.initials.split(` `);
    const firstName = initialsArray[0];
    const lastName = initialsArray.slice(1).join(` `);

    // get rid of initials from the results object
    const finalResults = {
      firstName: firstName,
      lastName: lastName,
      email: trimmedResults.email,
      password: trimmedResults.password,
      confirmPassword: trimmedResults.confirmPassword
    };

    const registerUser = await fetch(`api/create-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // in a body tag wer simply define the data that should be submitted
      body: JSON.stringify({
        formData: finalResults
      })
    });

    const registerUserData = await registerUser.json();

    if (registerUserData.error) {
      setFormError([registerUserData.error]);
      setIsSubmitting(false);
    }


    console.log(`Executing results: `, results);

    setIsSubmitting(false);
  }

  function validateFormData(results: RegisterFormType): string[] {
    const errors: string[] = [];

    if (!results.initials && !results.email && !results.password && !results.confirmPassword) {
      errors.push('All fields are required.');
    }
    if (!results.initials || results.initials.length < 2 || results.initials.length > 100) {
      errors.push('Initials must be between 2 and 100 characters.');
    }
    if (!results.email) {
      errors.push('Email is required.');
    }
    if ((!results.password || results.password.length < 6 || results.password.length > 100)) {
      errors.push('Password must be between 6 and 100 characters.');
    }

    if (results.password !== results.confirmPassword && (results.password.length !== 0 && results.confirmPassword.length !== 0)) {
      errors.push('Passwords do not match.');
    }

    return errors;
  }

  return (
    <>
      {formError.map(function(item) {
        return (
          <p key={item} className="paragraph paragraph-error">{item}</p>
        );
      })}
      <form onSubmit={handleSubmit} className="register__form flex flex-direction-column">
        <Input disabled={!!isSubmitting} iconVisible type={`default`} name={`initials`}
               placeholder={`Enter your Initials: e.g. John Doe`} />
        <Input disabled={!!isSubmitting} type={`email`} iconVisible placeholder={`Enter your Email:`} name={`email`}
               questionMarkVisible />
        <Input disabled={!!isSubmitting} type={`password`} iconVisible placeholder={`Enter your Password`}
               name={`password`} />
        <Input disabled={!!isSubmitting} type={`confirmPassword`} iconVisible placeholder={`Confirm your password`}
               name={`confirmPassword`} />

        <button className={`btn register__submit-button ${isSubmitting ? `register__submit-button-pending` : ``}`}
                disabled={!!isSubmitting}>{isSubmitting ? `Processing` : `Register`}</button>
      </form>
    </>
  );
}
