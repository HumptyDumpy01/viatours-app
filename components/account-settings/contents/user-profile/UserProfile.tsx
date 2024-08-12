'use client';

import UserProfileHeading from '@/components/account-settings/contents/user-profile/UserProfileHeading';
import User from '@/components/account-settings/contents/user-profile/User';
import UserData from '@/components/account-settings/contents/user-profile/UserData';
import UserProfileAdditional from '@/components/account-settings/contents/user-profile/UserProfileAdditional';
import UserProfileHeadingSkeleton from '@/components/account-settings/skeletons/UserProflleHeadingSkeleton';
import UserSkeleton from '@/components/account-settings/skeletons/UserSkeleton';
import UserDataSkeleton from '@/components/account-settings/skeletons/UserDataSkeleton';
import UserProfileAdditionalSkeleton from '@/components/account-settings/skeletons/UserProfileAdditionalSkeleton';
import { FormEvent, useState } from 'react';

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

  function handleEnableEditing() {
    setReadOnly(false);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const currObject = e.currentTarget;
    const formData = new FormData(currObject);
    const results = Object.fromEntries(formData.entries());
    // resetting the form
    currObject.reset();
    // output
    console.log(results);
  }

  function handleCancelChanges() {
    // TODO: Roll back to the previous state
    //  Input data should be rolled back.
    setReadOnly(true);
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
