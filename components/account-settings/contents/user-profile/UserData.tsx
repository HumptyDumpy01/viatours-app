'use client';

import UserInput from '@/components/account-settings/contents/user-profile/UserInput';
import React, { useEffect, useState } from 'react';
import { useCartSelector } from '@/store/hooks';
import { motion } from 'framer-motion';
import { container, item } from '@/components/account-settings/contents/user-tour-purchases/UserTourPurchases';

type UserDataType = {
  userName: string;
  userLastName: string | null;
  userPassword: string | null;
  userPhone: string | null;
  userEmail: string;
  registeredManually: boolean;
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
             readonly,
             registeredManually
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
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="account-settings__content__inputs grid grid-two-cols">
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
      {registeredManually && (
        <UserInput
          readonly={true}
          label={`Email`}
          placeholder={`example@gmail.com`}
          required={true}
          htmlFor={`email`}
          type={`email`}
          defaultVal={userEmail}
        />
      )}
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
        <motion.div
          variants={container}
          className={`account-settings-change-password`}>
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
          <motion.button
            variants={item}
            onClick={handleConfirmPassword} disabled={isSubmitting} type={`button`}
            className={`btn btn--submit account-settings-change-password-btn${(readonly || isSubmitting) ? `-disabled` : ``}`}>&rarr;</motion.button>
        </motion.div>
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

    </motion.div>
  );
}
