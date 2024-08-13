'use client';

import UserInput from '@/components/account-settings/contents/user-profile/UserInput';
import React, { useEffect, useState } from 'react';
import { useCartSelector } from '@/store/hooks';

type UserDataType = {
  userName: string;
  userLastName: string | null;
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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmOldPasswordVal, setConfirmOldPasswordVal] = useState<string>(``);
  const [passwordLabel, setPasswordLabel] = useState<string>(`Change Password`);
  const [passwordHtmlFor, setPasswordHtmlFor] = useState<`` | `password`>(``);
  const isFormSubmitted = useCartSelector((state) => state.userProfile.formSubmitted);

  useEffect(() => {
    if (isFormSubmitted) {
      setPasswordLabel(`Change Password`);
    }
  }, [isFormSubmitted]);


  async function handleConfirmPassword(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    if (confirmOldPasswordVal.trim() === '') {
      return;
    }
    setIsSubmitting(true);

    // TODO: check if the password user entered right now corresponds to the old password in db.
    const response = await fetch(`/api/compare-user-pass`, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`
      },
      body: JSON.stringify({
        email: userEmail,
        oldPassword: confirmOldPasswordVal
      })
    });
    const responseData = await response.json();


    if (responseData.error) {
      console.log(`Error: `, responseData.error);
      setIsSubmitting(false);
      return;
    }
    if (responseData.passwordMatch) {
      setPasswordLabel(`Set new password`);
      setPasswordHtmlFor(`password`);
    } else {
      setPasswordLabel(`Wrong password!`);
    }

    setIsSubmitting(false);


  }


  console.log(`Executing confirmOldPasswordVal: `, confirmOldPasswordVal);

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
          defaultVal={userLastName ? userLastName : ``}
        />
        <UserInput
          readonly={true}
          label={`Email`}
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
        {(userPassword !== null && passwordHtmlFor === ``) && (
          <div className={`account-settings-change-password`}>
            <UserInput
              readonly={readonly}
              label={passwordLabel}
              placeholder={`Confirm old password`}
              required={false}
              onChange={(e) => setConfirmOldPasswordVal(e.target.value)}
              disabled={isSubmitting}
              htmlFor={passwordHtmlFor}
              type={`text`}
              defaultVal={``}
            />
            <button onClick={handleConfirmPassword} disabled={isSubmitting} type={`button`}
                    className={`btn btn--submit account-settings-change-password-btn${(readonly || isSubmitting) ? `-disabled` : ``}`}>&rarr;</button>
          </div>
        )}

        {(userPassword !== null && passwordHtmlFor === `password`) && (
          <div className={`account-settings-change-password`}>
            <UserInput
              readonly={readonly}
              label={passwordLabel}
              placeholder={`New password`}
              required={false}
              onChange={(e) => setConfirmOldPasswordVal(e.target.value)}
              disabled={isSubmitting}
              htmlFor={passwordHtmlFor}
              type={`text`}
              defaultVal={``}
            />
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
