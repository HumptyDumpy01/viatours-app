'use client';

import UserProfileHeading from '@/components/account-settings/contents/user-profile/UserProfileHeading';
import User from '@/components/account-settings/contents/user-profile/User';
import UserData from '@/components/account-settings/contents/user-profile/UserData';
import UserProfileAdditional from '@/components/account-settings/contents/user-profile/UserProfileAdditional';
import React, { FormEvent, useRef, useState } from 'react';
import { uploadUserLogoImage } from '@/lib/cloudinary';
import { validateFormData } from '@/helpers/validateUserProfileFormData';
import { useCartDispatch } from '@/store/hooks';
import { userProfileSliceActions } from '@/store/userProfileSlice';
import { AnimatePresence, motion } from 'framer-motion';
import { container } from '@/components/account-settings/contents/user-tour-purchases/UserTourPurchases';

export type FormDataType = {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  newPassword?: string;
  phone?: string;
  image: File | null;
}

type UserProfileType = {
  userEmailFromSession: string;
  userInitials: string;
  userEmail: string;
  userName: string;
  registeredManually: boolean;
  userLastName: string | null;
  userPassword: string | null;
  userPhone: string | null;
  image: string | null;
  // children: ReactNode;
}

export default function
  UserProfile({
                userInitials,
                userEmail,
                userPassword,
                userPhone,
                userName,
                userLastName,
                image,
                userEmailFromSession,
                registeredManually
              }: UserProfileType) {

  const [readOnly, setReadOnly] = useState<boolean>(true);
  const [formError, setFormError] = useState<string[]>([]);
  const [messageSuccess, setMessageSuccess] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const dispatch = useCartDispatch();

  const [userInitialsState, setUserInitialsState] = useState(userInitials);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files).slice(0, 1); // Limit to 1 file
      setSelectedFiles(filesArray);
    }
  };

  // @ts-ignore
  async function checkForErrors(transformedResults) {

    // Clear previous errors
    setFormError([]);

    // Validate form data
    // @ts-ignore
    const errors = validateFormData(transformedResults, `passwordRequired`);

    if (errors.length > 0) {
      setFormError(errors);
      window.scrollBy(0, 100);
      setIsSubmitting(false);
      return;
    }

    setReadOnly(true);

    // Upload images to Cloudinary
    const imageUrls = await Promise.all(selectedFiles.map(uploadUserLogoImage));

    // console.log(`Image urls: `, imageUrls);

    if (imageUrls.length > 0 && imageUrls.length > 1) {
      setFormError(['Failed to upload the images. You can only upload up to 3 or can omit image upload.']);
      window.scrollBy(0, 100);
      setIsSubmitting(false);

      setReadOnly(false);
      return;
    }

    if (imageUrls.length > 0) {
      transformedResults.image = imageUrls[0];
    }
  }

  // @ts-ignore
  async function updateUserData(results, transformedResults, method: `UPDATE_WITHOUT_PASSWORD` | `UPDATE_WITH_PASSWORD`) {

    dispatch(userProfileSliceActions.toggleFormSubmitted(true));
    setReadOnly(true);
    setUserInitialsState(`${results.firstName} ${results.lastName}`);

    const response = await fetch(`/api/update-user-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        formData: transformedResults,
        method: method
      })
    });

    const data = await response.json();

    if (data.acknowledged) {
      setReadOnly(true);
      setIsSubmitting(false);
      setMessageSuccess(`Changes saved successfully!`);

      window.scrollBy(0, 100);
      timer.current = setTimeout(() => {
        setMessageSuccess(undefined);
        return () => clearTimeout(timer.current as NodeJS.Timeout);
      }, 7000);

    }

    if (data.error) {
      setFormError([`Failed to save the changes. Please try again.`, data.error ?? ``]);
      window.scrollBy(0, 100);
      setIsSubmitting(false);
      setReadOnly(false);

      dispatch(userProfileSliceActions.toggleFormSubmitted(false));
    }
    setReadOnly(true);
  }

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };


  function handleEnableEditing() {
    setReadOnly(false);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    const currObject = e.currentTarget;
    const formData = new FormData(currObject);
    const results = Object.fromEntries(formData.entries());

    console.log(`Executing results: `, results);


    const transformedResults = {
      email: userEmailFromSession,
      firstName: results.firstName.toString(),
      lastName: results.lastName.toString(),
      phone: results.phone?.toString() ? results.phone.toString() : null,
      // @ts-ignore
      image: results.image.size === 0 ? null : results.image
    };

    /*
        if (results.newPassword) {
          // @ts-ignore
          transformedResults.newPassword = results.newPassword.toString();
        }
        if (results.password) {
          // @ts-ignore
          transformedResults.password = results.password.toString();
        }
    */

    await checkForErrors(transformedResults);
    // console.log(transformedResults);

    if (!results.password) {
      await updateUserData(results, transformedResults, `UPDATE_WITHOUT_PASSWORD`);
    }

    if (results.password && !results.confirmOldPassword) {

      const transformedResults = {
        email: userEmailFromSession,
        firstName: results.firstName.toString(),
        lastName: results.lastName.toString(),
        phone: results.phone?.toString() ? results.phone.toString() : null,
        password: results.password.toString(),
        // @ts-ignore
        image: results.image.size === 0 ? null : results.image
      };

      // Implement the logic for the user who wants to set a new password.
      // Use fetch API you used before, but now with the different condition  applied.
      // We need to check if image exist or not, and if password user entered in a correct format.
      await checkForErrors(transformedResults);

      if (results.password) {
        await updateUserData(results, transformedResults, `UPDATE_WITH_PASSWORD`);
      }

    }
  }

  function handleCancelChanges() {
    // TODO: Roll back to the previous state
    //  Input data should be rolled back.
    setReadOnly(true);
    setFormError([]);
  }

  console.log(selectedFiles);

  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: `spring`, stiffness: 100 }}
      viewport={{ once: false }}
      className={`account-settings-content-container`}>
      <motion.form
        variants={container}
        initial="hidden"
        animate="show"
        onSubmit={handleSubmit}>
        <UserProfileHeading isSubmitting={isSubmitting} handleCancelChanges={handleCancelChanges}
                            mode={readOnly ? `view` : `edit`}
                            handleEnableEditing={handleEnableEditing} />
        <User
          selectedFiles={selectedFiles}
          handleFileChange={handleFileChange}
          handleOnClick={!readOnly ? openFilePicker : undefined}
          ref={fileInputRef}
          readOnly={readOnly}
          image={image}
          userInitials={userInitialsState}
          userEmail={userEmail} />
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: `spring`, stiffness: 100 }}
          viewport={{ once: false }}
          className={`margin-top-big`}>
          {formError.map(function(item) {
            return (
              <p key={item} className="paragraph paragraph-error">{item}</p>
            );
          })}

          <AnimatePresence>
            {messageSuccess && (
              <motion.p
                whileHover={{ scale: 1.05, backfaceVisibility: `hidden` }}
                whileTap={{ scale: 0.9 }}
                exit={{ opacity: 0, y: 300 }}
                // transition={{ type: `spring`, stiffness: 200 }}
                className="paragraph paragraph-success">{messageSuccess}</motion.p>
            )}
          </AnimatePresence>

        </motion.div>
        <UserData
          registeredManually={registeredManually}
          userEmail={userEmail}
          userName={userName}
          userLastName={userLastName}
          readonly={readOnly}
          userPassword={userPassword}
          userPhone={userPhone}
        />
        <UserProfileAdditional />
      </motion.form>
    </motion.div>
  );
}
