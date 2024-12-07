'use client';

import React, { FormEvent, useRef, useState } from 'react';
import './LeaveReply.scss';
import Rate from '@/components/UI/Checkbox/Rate';
import LeaveReplyInputs from '@/components/UI/Input/LeaveReplyInputs';
import IconIon from '@/components/UI/IonIcon/IconIon';
import { getUser, submitTourComment } from '@/lib/mongodb';
import { uploadImage } from '@/lib/cloudinary';
import Lottie from 'lottie-react';
import loadingSpinner from '@/animations/loading-spinner.json';
import { useCartDispatch } from '@/store/hooks';
import { commentFormSliceActions } from '@/store/commentFormSlice';
import { motion } from 'framer-motion';

type LeaveReplyType = {
  tourId: string;
  userName: string | null;
  userEmail: string | null;
  tourTitle: string;
  session: {
    user: {
      email: string | ``;
      name: string | ``;
      image: string | null | ``;
    }
  };
}

function scrollToLeaveReplyForm() {
  // scroll to the .leave-a-reply form
  const leaveAReplyForm = document.querySelector('.leave-a-reply');
  if (leaveAReplyForm) {
    setTimeout(function() {
      leaveAReplyForm.scrollIntoView({ behavior: 'smooth' });
    }, 10);
  }
}

export default function LeaveReply({ tourId, tourTitle, userEmail, userName, session }: LeaveReplyType) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [formError, setFormError] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean | null>(null);

  const dispatch = useCartDispatch();

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files).slice(0, 3); // Limit to 3 files
      setSelectedFiles(filesArray);
    }
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    const currObject = e.currentTarget;
    const formData = new FormData(currObject);
    const results = Object.fromEntries(formData.entries());

    // the userEmail comes directly from the session,
    // if the user is authenticated, otherwise it comes from the form
    const userEmailData = userEmail || results.email;
    results.email = userEmailData;
    // Clear previous errors
    setFormError([]);

    // Validate form data
    const errors = validateFormData(results);


    const userExists = await getUser({ email: results.email }, { email: 1 });

    // INFO: The first, default condition: if user is not authenticated and the email he enters
    //  is not in my db.
    if (!session.user.email) {
      if (userExists.length > 0) {
        setFormError([`The user with the email ${results.email} already exists. Please sign in to proceed.`]);
        setIsSubmitting(false);
        scrollToLeaveReplyForm();
        return;
      }
    }

    if (errors.length > 0) {
      setFormError(errors);
      scrollToLeaveReplyForm();
      setIsSubmitting(false);
      dispatch(commentFormSliceActions.toggleOptimisticallyAddedComment(false));
      return;
    }

    dispatch(commentFormSliceActions.toggleOptimisticallyAddedComment(true));

    const customerReviewsHeading = document.querySelector('.customer-reviews-heading')! as HTMLHeadingElement;

    setTimeout(function() {
      customerReviewsHeading.scrollIntoView({ behavior: 'smooth' });
    }, 80);

    // Upload images to Cloudinary
    const imageUrls = await Promise.all(selectedFiles.map(uploadImage));

    if (imageUrls.length > 0 && imageUrls.length > 3) {
      setFormError(['Failed to upload the images. You can only upload up to 3 or can omit image upload.']);
      scrollToLeaveReplyForm();
      setIsSubmitting(false);
      dispatch(commentFormSliceActions.toggleOptimisticallyAddedComment(false));
      return;
    }

    // Convert FormDataEntryValue to string
    const formResults = {
      tourId: tourId,
      user: results.user as string,
      rating: {
        location: Number(results.location),
        amenities: Number(results.amenities),
        food: Number(results.food),
        room: Number(results.room),
        price: Number(results.price),
        tourOperator: Number(results.tourOperator)
      },
      title: results.title as string,
      images: imageUrls, // Use Cloudinary URLs
      email: results.email as string,
      text: results.text as string,
      session
    };

    // Uncheck all checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      (checkbox as HTMLInputElement).checked = false;
    });

    async function addComment() {
      // @ts-ignore
      const submitForm = await submitTourComment(formResults);

      if (submitForm.success) {
        e.preventDefault();
        setIsSubmitting(false);
        setSelectedFiles([]);
        currObject.reset();

        // removing the optimistically added comment skeleton
        dispatch(commentFormSliceActions.toggleOptimisticallyAddedComment(false));

        const customerReviewsHeading = document.querySelector('.customer-reviews-heading');
        if (customerReviewsHeading) {
          e.preventDefault();
          setTimeout(function() {
            customerReviewsHeading.scrollIntoView({ behavior: 'smooth' });
          }, 80);
        }
      }

      if (submitForm?.error) {
        setFormError([submitForm.error]);
        dispatch(commentFormSliceActions.toggleOptimisticallyAddedComment(false));
        setIsSubmitting(false);
      }
    }

    if (!session.user.email) {
      await addComment().catch(err => {
        dispatch(commentFormSliceActions.toggleOptimisticallyAddedComment(false));

        // throw new Error(`Failed to add a comment(Cond:default). Error: ${err}`);
        console.error(`Failed to add a comment(Cond:default). Error: ${err}`);
        setIsSubmitting(false);
        setFormError([`Failed to add a comment. Please try again.`]);
      });
    }

    if (session.user.email && !userEmail) {
      setIsSubmitting(false);
      dispatch(commentFormSliceActions.toggleOptimisticallyAddedComment(false));
      // throw new Error(`The user is authenticated, but the email is not found in the session object.`);
      setFormError([`The user is authenticated, but the email is not found in the session object.`]);
      // scrollToLeaveReplyForm();
    }

    /* IMPORTANT: REGARDING NOTIFICATIONS PUSH FOR AUTH USERS */

    // INFO: The second condition: if user is authenticated and the email he enters is IN MY DB ALREADY.

    if (session.user.email && userEmail && userExists.length > 0 && userExists[0].email === results.email) {

      // find this user by his email, and add a notification object to array.
      const pushNotification = await fetch(`/api/push-notification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userExists[0]._id,
          type: `ADDED_COMMENT`,
          data: {
            tourId,
            tourTitle
          }
        })
      });
      const pushNotificationData = await pushNotification.json();

      if (pushNotificationData.error) {
        // throw new Error(`Failed to push notification to user document. Error: ${pushNotificationData.error}`);
        console.error(`Failed to push notification to user document. Error: ${pushNotificationData.error}`);
      }

      // add a new comment to the database
      await addComment().catch(err => {
        dispatch(commentFormSliceActions.toggleOptimisticallyAddedComment(false));
        // throw new Error(`Failed to add a comment(Cond:2). Error: ${err}`);
        console.error(`Failed to add a comment(Cond:2). Error: ${err}`);
      });

      setIsSubmitting(false);
    }

    setIsSubmitting(false);

  }

  function validateFormData(results: Record<string, FormDataEntryValue>): string[] {
    const errors: string[] = [];

    if (!results.location || !results.amenities || !results.food || !results.room || !results.price || !results.tourOperator) {
      errors.push('A rating for each category should be provided.');
    }
    if (!results.user) {
      errors.push('User is required.');
    }
    if (!results.email) {
      errors.push('Email is required.');
    }
    if (!results.title) {
      errors.push('Title is required.');
    }
    if (!results.text) {
      errors.push('Comment text is required.');
    }

    return errors;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 300 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className="leave-a-reply">
      <motion.h2
        whileHover={{ scale: 1.1, x: 20 }}
        whileTap={{ scale: 0.9, x: -20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="secondary-heading margin-bottom-small">Leave a reply
      </motion.h2>
      {formError.map(function(item) {
        return (
          <p key={item} className="paragraph paragraph-error">{item}</p>
        );
      })}

      <p className="paragraph leave-a-reply-paragraph">Your email address will not be published. All fields, <b>except
        the image picking,</b> are
        required, though.</p>
      <div className="leave-a-reply-form">
        <form onSubmit={handleSubmit} className="leave-a-reply__form">
          <div className="leave-a-reply__form-rate grid">
            <Rate label={`Location`} name={`location`} />
            <Rate label={`Amenities`} name={`amenities`} />
            <Rate label={`Food`} name={`food`} />
            <Rate label={`Room`} name={`room`} />
            <Rate label={`Price`} name={`price`} />
            <Rate label={`Tour Operator`} name={`tourOperator`} />
          </div>
          <LeaveReplyInputs userEmail={userEmail} userName={userName} />
          <div className="leave-a-reply__form-inputs-file-upload">
            <input ref={fileInputRef} type="file" name="images" id="file"
                   className="leave-a-reply__form-inputs-file-upload-input" max={3}
                   multiple onChange={handleFileChange} accept="image/jpg, image/jpeg, image/png" />
          </div>
          <div className={`choose-files-btn-wrapper`}>
            <button type="button" onClick={openFilePicker} className={`choose-files-btn`}>Select Images</button>
            {Array.from({ length: 3 }).map((_, index) => (
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                key={index} className={`user-img ${selectedFiles[index] ? '' : 'none'}`}
                style={selectedFiles[index] ? { backgroundImage: `url(${URL.createObjectURL(selectedFiles[index])})` } : {}}>
              </motion.div>
            ))}
          </div>
          <div className={`btn--submit-container`}>
            <button
              className={`btn btn--submit ${isSubmitting ? `btn--submit-disabled` : ``} flex flex-align-center`}>Post
              comment
              <IconIon type={`arrowForwardOutline`} className="icon icon--right-arrow"></IconIon>
            </button>
            {isSubmitting && (
              <div className={`loading-spinner`}>
                <Lottie animationData={loadingSpinner} />
              </div>
            )}
          </div>
        </form>
      </div>
    </motion.section>
  );
}