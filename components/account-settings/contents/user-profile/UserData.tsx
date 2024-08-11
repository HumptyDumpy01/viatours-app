// 'use client';

import UserInput from '@/components/account-settings/contents/user-profile/UserInput';

type UserDataType = {
  userName: string;
  userLastName: string;
  userPassword: string;
  userPhone: string;
  userEmail: string;
  readonly: boolean;
  // children: ReactNode;
}

export default function
  UserData({
             userName,
             userLastName,
             userPassword,
             userPhone,
             userEmail,
             readonly
           }: UserDataType) {
  return (
    <>
      <div className="account-settings__content__inputs grid grid-two-cols">
        <UserInput
          readonly={readonly}
          label={`First Name`}
          placeholder={`e.g. John`}
          htmlFor={`firstName`}
          type={`text`}
          defaultVal={userName}
        />
        <UserInput
          readonly={readonly}
          label={`Last Name`}
          placeholder={`e.g. Doe`}
          htmlFor={`lastName`}
          type={`text`}
          defaultVal={userLastName}
        />
        <UserInput
          readonly={readonly}
          label={`Email`}
          placeholder={`example@gmail.com`}
          htmlFor={`email`}
          type={`email`}
          defaultVal={userEmail}
        />
        <UserInput
          readonly={readonly}
          label={`Password`}
          placeholder={`Choose your password wisely!`}
          htmlFor={`password`}
          type={`password`}
          defaultVal={userPassword}
        />
        <UserInput
          readonly={readonly}
          label={`Phone`}
          placeholder={`e.g. +380501234567`}
          htmlFor={`phone`}
          type={`tel`}
          defaultVal={userPhone}
        />
      </div>
    </>
  );
}
