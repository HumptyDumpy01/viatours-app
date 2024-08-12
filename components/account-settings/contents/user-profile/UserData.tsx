// 'use client';

import UserInput from '@/components/account-settings/contents/user-profile/UserInput';

type UserDataType = {
  userName: string;
  userLastName: string;
  userPassword: string | null;
  userPhone: string | null;
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
          label={`First Name *`}
          placeholder={`e.g. John`}
          htmlFor={`firstName`}
          required={true}
          type={`text`}
          defaultVal={userName}
        />
        <UserInput
          readonly={readonly}
          label={`Last Name *`}
          placeholder={`e.g. Doe`}
          htmlFor={`lastName`}
          type={`text`}
          required={true}
          defaultVal={userLastName}
        />
        <UserInput
          readonly={readonly}
          label={`Email *`}
          placeholder={`example@gmail.com`}
          required={true}
          htmlFor={`email`}
          type={`email`}
          defaultVal={userEmail}
        />
        {userPassword === null && (
          <UserInput
            readonly={readonly}
            label={`Set Password *`}
            required={true}
            redBox
            placeholder={`Password is not set!`}
            htmlFor={`password`}
            type={`text`}
            defaultVal={``}
          />
        )}
        {/* IF PASSWORD IS SET, ADD A UI TO ENTER OLD PASS AND THEN CHANGE IT*/}
        {userPassword !== null && (
          <div className={`account-settings-change-password`}>
            <UserInput
              readonly={readonly}
              label={`Change Password`}
              placeholder={`Confirm old password`}
              required={false}
              htmlFor={``}
              type={`text`}
              defaultVal={``}
            />
            <button type={`button`}
                    className={`btn btn--submit account-settings-change-password-btn${readonly ? `-disabled` : ``}`}>&rarr;</button>
          </div>
        )}

        {userPhone === null && (
          <UserInput
            readonly={readonly}
            redBox
            label={`Set Phone`}
            placeholder={`Phone is not set!`}
            required={false}
            htmlFor={`phone`}
            type={`tel`}
            defaultVal={userPhone ? userPhone : undefined}
          />
        )}

        {userPhone !== null && (
          <UserInput
            readonly={readonly}
            label={`Phone`}
            required={false}
            placeholder={`Set a phone number`}
            htmlFor={`phone`}
            type={`tel`}
            defaultVal={userPhone ? userPhone : undefined}
          />
        )}

      </div>
    </>
  );
}
