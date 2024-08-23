'use client';

import '@/app/register/page.scss';
import Input from '@/components/UI/Input/Input';
import React, { FormEvent, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { container } from '@/components/account-settings/contents/user-tour-purchases/UserTourPurchases';
import { item } from '@/components/tourDescription/TourOverview/TourHighlights';
import { useCartDispatch, useCartSelector } from '@/store/hooks';
import { registerSliceActions } from '@/store/registerSlice';
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
  const [registerStages, setRegisterStages] = useState<1 | 2>(1);
  const [isPending, startTransition] = useTransition();
  const [userToken, setUserToken] = useState<string>(``);
  const router = useRouter();

  const dispatch = useCartDispatch();
  const finalResultsObject = useCartSelector((state) => state.register.finalResults) as RegisterFormType;


  async function registerUser(finalResults: any) {
    setIsSubmitting(true);

    /* IMPORTANT: BEFORE THAT, VALIDATE A TOKEN VIA EMAIL */
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

    if (!registerUserData.acknowledged) {
      setFormError([registerUserData.error]);
      setIsSubmitting(false);
    } else {
      // resetting the form
      // currObject.reset();
      router.push(`login?registered=success`);
    }

    // console.log(`Executing results: `, results);

    setIsSubmitting(false);
  }

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
        userEmail: results.email,
        options: { email: 1 }
      })
    });
    const userExistsData = await userExists.json();
    // console.log(userExistsData);

    if (userExistsData.resp) {
      setFormError([`The user with the email ${results.email} already exists. Please sign in to proceed.`]);
      setIsSubmitting(false);
      return;
    }

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

    setIsSubmitting(false);

    // store final results in the global store
    dispatch(registerSliceActions.pushObjectToResults({ ...finalResults }));

    /* TODO: SEND A VERIFICATION CODE TO EMAIL PROVIDED BY USER */
    startTransition(async () => {
      const response = await fetch(`/api/send-register-email-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: finalResults.email
        })
      });
      const responseData = await response.json();

      if (responseData.error) {
        setRegisterStages(1);
        setFormError([responseData.message]);
        setIsSubmitting(false);
        return;
      } else {
        setRegisterStages(2);
      }
    });

  }


  async function handleVerifyRegistrationEmail() {
    if (userToken.trim() === `` || !isFinite(Number(userToken)) || userToken.length !== 6) {
      setFormError([`Please provide a 6-digit code sent to your email.`]);
      return;
    }
    console.log(`User token: `, userToken);
    console.log(`Final results: `, finalResultsObject);

    startTransition(async () => {
      const response = await fetch(`/api/validate-register-email-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userToken: userToken,
          email: finalResultsObject.email
        })
      });
      const responseData = await response.json();

      if (responseData.error) {
        setFormError([responseData.message]);
        return;
      } else {
        // register the user
        await registerUser(finalResultsObject);
        setFormError([``]);

        dispatch(registerSliceActions.resetResults());
      }

    });
  }


  function validateFormData(results: RegisterFormType): string[] {
    const errors: string[] = [];

    if (!results.initials && !results.email && !results.password && !results.confirmPassword) {
      errors.push('All fields are required.');
    }
    if (!results.initials || results.initials.length < 2 || results.initials.length > 100 || results.initials.split(' ').length < 2) {
      errors.push('Initials must be between 2 and 100 characters and contain at least 2 words.');
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
      <motion.form
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={container}
        onSubmit={handleSubmit} className="register__form flex flex-direction-column">

        {registerStages === 1 && (
          <>
            <motion.div
              variants={item}
            >
              <Input disabled={!!isSubmitting} iconVisible type={`default`} name={`initials`}
                     placeholder={`Enter your Initials: e.g. John Doe`} />

            </motion.div>
            <motion.div
              variants={item}
            >
              <Input disabled={!!isSubmitting} type={`email`} iconVisible placeholder={`Enter your Email:`}
                     name={`email`}
                     questionMarkVisible />
            </motion.div>
            <motion.div
              variants={item}
            >
              <Input disabled={!!isSubmitting} type={`password`} iconVisible placeholder={`Enter your Password`}
                     name={`password`} />
            </motion.div>
            <motion.div
              variants={item}
            >
              <Input disabled={!!isSubmitting} type={`confirmPassword`} iconVisible
                     placeholder={`Confirm your password`}
                     name={`confirmPassword`} />
            </motion.div>
            <motion.button
              variants={item}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className={`btn register__submit-button ${isSubmitting ? `register__submit-button-pending` : ``}`}
              disabled={!!isSubmitting}>{isSubmitting ? `Processing` : `Register`}
            </motion.button>
          </>
        )}

        {registerStages === 2 && (
          <>
            <div>
              <Input
                disabled={isPending}
                type={`password`}
                // @ts-ignore
                onChange={(e) => setUserToken(e.target.value)}
                iconVisible
                placeholder={`6-digit code`}
                name={`confirmVerificationCode`} />
            </div>
            <button
              onClick={() => handleVerifyRegistrationEmail()}
              type={`button`}
              className={`btn register__submit-button ${isPending ? `register__submit-button-pending` : ``}`}
              disabled={isPending}>{isPending ? `Processing` : `Verify`}
            </button>
          </>
        )}
      </motion.form>
    </>
  );
}
