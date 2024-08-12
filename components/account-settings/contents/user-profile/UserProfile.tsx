'use client';

import UserProfileHeading from '@/components/account-settings/contents/user-profile/UserProfileHeading';
import User from '@/components/account-settings/contents/user-profile/User';
import UserData from '@/components/account-settings/contents/user-profile/UserData';
import UserProfileAdditional from '@/components/account-settings/contents/user-profile/UserProfileAdditional';
import React, { FormEvent, useRef, useState } from 'react';
import { uploadUserLogoImage } from '@/lib/cloudinary';
import { validateFormData } from '@/helpers/validateUserProfileFormData';
import { useRouter } from 'next/navigation';

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
                userEmailFromSession
              }: UserProfileType) {

  const [readOnly, setReadOnly] = useState<boolean>(true);
  const [formError, setFormError] = useState<string[]>([]);
  const router = useRouter();
  const [messageSuccess, setMessageSuccess] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const [userInitialsState, setUserInitialsState] = useState(userInitials);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files).slice(0, 1); // Limit to 1 file
      setSelectedFiles(filesArray);
    }
  };

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

    if (results.newPassword) {
      // @ts-ignore
      transformedResults.newPassword = results.newPassword.toString();
    }
    if (results.password) {
      // @ts-ignore
      transformedResults.password = results.password.toString();
    }

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

    // console.log(transformedResults);

    if (!results.password) {
      setReadOnly(true);
      setUserInitialsState(`${results.firstName} ${results.lastName}`);

      const response = await fetch(`/api/update-user-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          formData: transformedResults,
          method: `UPDATE_WITHOUT_PASSWORD`
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

      } else {
        setFormError([`Failed to save the changes. Please try again.`]);
        window.scrollBy(0, 100);
        setIsSubmitting(false);
        setReadOnly(false);
      }


    }

    if (results.password && !results.confirmOldPassword) {
      // TODO Write the corresponding logic for the user who did not set the pass
      //  and tried to submit the form without the confirmOldPassword field
      console.log(`For users who did log in via provider and do not have the pass set`);
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
    <div className={`account-settings-content-container`}>
      <form onSubmit={handleSubmit}>
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
        <div className={`margin-top-big`}>
          {formError.map(function(item) {
            return (
              <p key={item} className="paragraph paragraph-error">{item}</p>
            );
          })}

          {messageSuccess && (
            <p className="paragraph paragraph-success">{messageSuccess}</p>
          )}

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
    </div>
  );
}
