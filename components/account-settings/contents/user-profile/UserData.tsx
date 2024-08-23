'use client';

import UserInput from '@/components/account-settings/contents/user-profile/UserInput';
import React, { useEffect, useRef, useState, useTransition } from 'react';
import { useCartSelector } from '@/store/hooks';
import { motion } from 'framer-motion';
import { container, item } from '@/components/account-settings/contents/user-tour-purchases/UserTourPurchases';
import CustomizedSnackbar from '@/components/UI/Toast/Snackbar';
import { SnackbarCloseReason } from '@mui/material/Snackbar/useSnackbar.types';
import { signOut } from 'next-auth/react';

type UserDataType = {
  userName: string;
  userLastName: string | null;
  userPassword: string | null;
  userPhone: string | null;
  userEmail: string;
  registeredManually: boolean;
  readonly: boolean;
  updateSession: () => void;
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
             registeredManually, updateSession
           }: UserDataType) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmOldPasswordVal, setConfirmOldPasswordVal] = useState<string>(``);
  const [passwordLabel, setPasswordLabel] = useState<string>(`Change Password`);
  const [passwordHtmlFor, setPasswordHtmlFor] = useState<`` | `password`>(``);
  const isFormSubmitted = useCartSelector((state) => state.userProfile.formSubmitted);
  const [validEmailLabel, setValidEmailLabel] = useState<string>(`Set a new Email`);
  const [validCodeLabel, setValidCodeLabel] = useState<string>(`Verify email`);

  const [newEmail, setNewEmail] = useState<string>(``);
  const [verificationCode, setVerificationCode] = useState<number | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const [open, setOpen] = useState(false);
  const [toastLabel, setToastLabel] = useState<string>(``);
  const [toastSeverity, setToastSeverity] = useState<string>(`info`);

  const timer = useRef<NodeJS.Timeout | null>(null);

  const [changeEmailStages, setChangeEmailStages] = useState<1 | 2 | 3>(1);

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

    // check if the password user entered right now corresponds to the old password in db.
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

  // open second stage
  function handleConfirmEmailEnabled() {
    setChangeEmailStages(2);
  }

  /* IMPORTANT: SECOND STAGE */
  async function handleValidateEmailEntered() {
    if (newEmail.trim() === ``) {
      return;
    }
    if (!newEmail.trim().includes(`@`) || !newEmail.trim().includes(`.`)) {
      setValidEmailLabel(`Invalid email!`);
      return;
    }

    // do all the operations which needed for email verification
    ///////////////////////////////////////
    startTransition(async () => {

      const response = await fetch(`/api/push-change-email-verification-token`, {
        method: `POST`,
        headers: {
          'Content-Type': `application/json`
        },
        body: JSON.stringify({
          userEmail: newEmail,
          sessionEmail: userEmail
        })
      });

      const responseData = await response.json();

      if (responseData.error) {
        console.error(responseData.message || `Failed to send verification code.`);

        setValidEmailLabel(responseData.message || `Failed to send verification code.`);
        return;
      }

      setChangeEmailStages(3);
    });

  }

  /* IMPORTANT: THIRD STAGE */
  async function handleValidateVerificationCode() {
    if (verificationCode === undefined) {
      return;
    }
    if (verificationCode.toString().length !== 6 || isNaN(verificationCode)) {
      setValidCodeLabel(`Invalid code!`);
      return;
    }

    // DO ALL THE STUFF NEED FOR TOKEN VERIFICATION AND
    // THEREFORE EMAIL CHANGE
    startTransition(async () => {

      const response = await fetch(`/api/validate-change-email-operation`, {
        method: `POST`,
        headers: {
          'Content-Type': `application/json`
        },
        body: JSON.stringify({
          userToken: verificationCode,
          sessionEmail: userEmail,
          userEmail: newEmail
        })
      });
      const responseData = await response.json();

      if (responseData.error) {
        console.error(responseData.message || `Failed to change email!`);
        setValidCodeLabel(responseData.message || `Failed to change email!`);
        return;
      }

      ///////////////////////////////////////

      setChangeEmailStages(1);
      // show snackbar
      setOpen(true);
      setToastLabel(`Email changed successfully!`);
      setToastSeverity(`success`);


      /* IMPORTANT: DO NOT FORGET TO ENSURE THAT CURRENT SESSION IS ALSO UP TO DATE.
      *   THIS IS CRUCIAL FOR OVERALL FORM TO WORK. */

      // This updateSession is not working. It is not updating the session.
      updateSession();

      // I need to sign out the user manually for the application to work.
      timer.current = setTimeout(() => {
        // sign out the user
        setOpen(false);
        signOut();
        return () => clearTimeout(timer.current as NodeJS.Timeout);
      }, 2000);

    });

  }

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  console.log(`Executing confirmOldPasswordVal: `, confirmOldPasswordVal);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="account-settings__content__inputs grid grid-two-cols">
      <CustomizedSnackbar open={open} handleClose={handleClose} label={toastLabel} severity={toastSeverity} />
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
      {/* ////////////////////////////////// */}

      {/* IMPORTANT:  WHEN EMAIL UPDATED SUCCESSFULLY, ROLL BACK TO 1 STAGE AND
           SHOW SNACKBAR*/}

      {(registeredManually && changeEmailStages === 1) && (
        <motion.div
          variants={container}
          className={`account-settings-change-email`}>
          <p className={`account-settings__content__input-label ${readonly ? `disabled-input-label` : ``}`}>
            Want to change email?
          </p>
          <motion.button
            disabled={readonly}
            variants={item}
            onClick={handleConfirmEmailEnabled} type={`button`}
            className={`btn btn--submit account-settings-change-email-btn${(readonly || isSubmitting) ? `-disabled` : ``}`}>Change
            Email
          </motion.button>
        </motion.div>
      )}

      {(registeredManually && changeEmailStages === 2) && (
        <motion.div
          variants={container}
          className={`account-settings-change-password`}>
          <UserInput
            readonly={readonly}
            label={validEmailLabel}
            placeholder={`john.doe@gmail.com`}
            required
            onChange={(e) => setNewEmail(e.target.value)}
            disabled={isPending}
            htmlFor={``}
            type={`text`}
            defaultVal={``}
          />
          <motion.button
            variants={item}
            onClick={handleValidateEmailEntered} disabled={isPending} type={`button`}
            className={`btn btn--submit account-settings-change-password-btn${(readonly || isPending) ? `-disabled` : ``}`}>&rarr;</motion.button>
        </motion.div>
      )}

      {(registeredManually && changeEmailStages === 3) && (
        <motion.div
          variants={container}
          className={`account-settings-change-password`}>
          <UserInput
            readonly={readonly}
            label={validCodeLabel}
            placeholder={`6-digit code`}
            required
            onChange={(e) => setVerificationCode(e.target.value! as unknown as number)}
            disabled={isPending}
            htmlFor={``}
            type={`password`}
            defaultVal={``}
          />
          <motion.button
            variants={item}
            onClick={handleValidateVerificationCode} disabled={isPending} type={`button`}
            className={`btn btn--submit account-settings-change-password-btn${(readonly || isPending) ? `-disabled` : ``}`}>&rarr;</motion.button>
        </motion.div>
      )}

      {/* ////////////////////////////////// */}
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
