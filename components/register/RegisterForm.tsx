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

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const currObject = e.currentTarget;
    const formData = new FormData(currObject);
    const results = Object.fromEntries(formData.entries()) as RegisterFormType;

    // Clear previous errors
    setFormError([]);

    // Validate form data
    const errors = validateFormData(results);

    if (errors.length > 0) {
      setFormError(errors);
      return;
    }

    // resetting the form
    // currObject.reset();
    // output
    console.log(`Executing results: `, results);
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
    if (!results.password || !results.confirmPassword) {
      errors.push('Password is required.');
    }
    if (results.password !== results.confirmPassword) {
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
        <Input iconVisible type={`default`} name={`initials`} placeholder={`Enter your Initials: e.g. John Doe`} />
        <Input type={`email`} iconVisible placeholder={`Enter your Email:`} name={`email`} questionMarkVisible />
        <Input type={`password`} iconVisible placeholder={`Enter your Password`} name={`password`} />
        <Input type={`confirmPassword`} iconVisible placeholder={`Confirm your password`} name={`confirm-password`} />

        <button className="btn register__submit-button">Register</button>
      </form>
    </>
  );
}
