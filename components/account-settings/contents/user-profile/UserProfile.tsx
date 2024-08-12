'use client';

import UserProfileHeading from '@/components/account-settings/contents/user-profile/UserProfileHeading';
import User from '@/components/account-settings/contents/user-profile/User';
import UserData from '@/components/account-settings/contents/user-profile/UserData';
import UserProfileAdditional from '@/components/account-settings/contents/user-profile/UserProfileAdditional';
import UserProfileHeadingSkeleton from '@/components/account-settings/skeletons/UserProflleHeadingSkeleton';
import UserSkeleton from '@/components/account-settings/skeletons/UserSkeleton';
import UserDataSkeleton from '@/components/account-settings/skeletons/UserDataSkeleton';
import UserProfileAdditionalSkeleton from '@/components/account-settings/skeletons/UserProfileAdditionalSkeleton';
import React, { FormEvent, useState } from 'react';

type UserProfileType = {
  userInitials: string;
  userEmail: string;
  userName: string;
  userLastName: string;
  userPassword: string | null;
  userPhone: string;
  loading: boolean;
  image: string | null;
  // children: ReactNode;
}

export type UserInputsType = {
  userName: string;
  userLastName: string;
  userPassword: string | null;
  userPhone: string;
  userEmail: string;
}

export default function
  UserProfile({
                userInitials,
                userEmail,
                userPassword,
                userPhone,
                userName,
                userLastName,
                loading,
                image
              }: UserProfileType) {

  // INFO: readonly prop should be handled here,
  //  when the btn edit in UserProfileHeading is clicked.

  const [readOnly, setReadOnly] = useState<boolean>(true);
  const [formError, setFormError] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  function handleEnableEditing() {
    setReadOnly(false);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    const currObject = e.currentTarget;
    const formData = new FormData(currObject);
    const results = Object.fromEntries(formData.entries());

    console.log(`Executing results: `, results);


    // if the user already set a password, this particular input would be empty
    // and can be empty if user does not want to change the password
    const transformedResults = {
      email: results.email.toString(),
      firstName: results.firstName.toString(),
      lastName: results.lastName.toString(),
      password: results.password?.toString() ? results.password.toString() : undefined,
      confirmOldPassword: results.confirmOldPassword?.toString() ? results.confirmOldPassword.toString() : undefined
    };
    // Clear previous errors
    setFormError([]);

    // Validate form data
    const errors = validateFormDataWithPassword(transformedResults, `passwordRequired`);


    if (errors.length > 0) {
      setFormError(errors);
      window.scrollBy(0, 100);
      setIsSubmitting(false);
      return;
    }

    if (results.confirmOldPassword || results.confirmOldPassword === ``) {
      // TODO: Write the corresponding logic for the user has his pass set already
      //  and tried to submit the form with the confirmOldPassword field
      console.log(`For users who logged in manually or have the pass set`);
    }

    if (results.password && !results.confirmOldPassword) {
      // TODO Write the corresponding logic for the user who did not set the pass
      //  and tried to submit the form without the confirmOldPassword field
      console.log(`For users who did log in via provider and do not have the pass set`);
    }
  }

  function validateFormDataWithPassword(results: {
    email: string;
    firstName: string;
    lastName: string;
    password?: string;
    confirmOldPassword?: string;
  }, validateAs: `passwordRequired` | `confirmPassIsNotRequired`): string[] {
    const errors: string[] = [];

    if (validateAs === `passwordRequired` && results.password) {
      if (!results.email.includes('@') || results.firstName.trim() === `` ||
        results.lastName.trim() === `` || results.password.trim() === ``) {
        errors.push('Please fill in all the required fields *');
      }

      if (!results.email.includes('@')) {
        errors.push('Please enter a valid email address.');
      }

      if (results.firstName.trim() === ``) {
        errors.push('Please enter your first name.');
      }
      if (results.lastName.trim() === ``) {
        errors.push('Please enter your last name.');
      }

      if (results.password.length < 8 || results.password.length > 100) {
        errors.push('Password should be at least 8 to 100 chars long.');
      }

    } else {

      if (!results.email.includes('@') || results.firstName.trim() === `` ||
        results.lastName.trim() === ``) {
        errors.push('Please fill in all the required fields *');
      }

      if (!results.email.includes('@')) {
        errors.push('Please enter a valid email address.');
      }
      if (results.firstName.trim() === ``) {
        errors.push('Please enter your first name.');
      }
      if (results.lastName.trim() === ``) {
        errors.push('Please enter your last name.');
      }

    }

    return errors;
  }

  function handleCancelChanges() {
    // TODO: Roll back to the previous state
    //  Input data should be rolled back.
    setReadOnly(true);
    setFormError([]);
  }

  return (
    <div className={`account-settings-content-container`}>
      {loading && (
        <>
          <UserProfileHeadingSkeleton />
          <UserSkeleton />
          <UserDataSkeleton />
          <UserProfileAdditionalSkeleton />
        </>
      )}
      {!loading && (
        <form onSubmit={handleSubmit}>
          <UserProfileHeading handleCancelChanges={handleCancelChanges}
                              mode={readOnly ? `view` : `edit`}
                              handleEnableEditing={handleEnableEditing} />
          <User readOnly={readOnly} image={image} userInitials={userInitials} userEmail={userEmail} />
          <div className={`margin-top-big`}>
            {formError.map(function(item) {
              return (
                <p key={item} className="paragraph paragraph-error">{item}</p>
              );
            })}
          </div>
          <UserData
            userEmail={userEmail}
            userName={userName}
            userLastName={userLastName}
            readonly={readOnly}
            userPassword={userPassword}
            userPhone={userPhone}
          />
          <UserProfileAdditional />
        </form>
      )}
    </div>
  );
}
