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

type LeaveReplyType = {
  tourId: string;
}

function scrollToLeaveReplyForm() {
  // scroll to the .leave-a-reply form
  const leaveAReplyForm = document.querySelector('.leave-a-reply');
  if (leaveAReplyForm) {
    setTimeout(function() {
      leaveAReplyForm.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  }
}

export default function LeaveReply({ tourId }: LeaveReplyType) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [formError, setFormError] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean | null>(null);

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

    // Clear previous errors
    setFormError([]);

    // Validate form data
    const errors = validateFormData(results);

    const userExists = await getUser({ email: results.email }, { email: 1, _id: 0 });

    if (userExists.length > 0) {
      setFormError([`The user with the email ${results.email} already exists. Please sign in to proceed.`]);
      setIsSubmitting(false);
      scrollToLeaveReplyForm();
      return;
    }

    if (errors.length > 0) {
      setFormError(errors);
      scrollToLeaveReplyForm();
      setIsSubmitting(false);
      return;
    }

    // Upload images to Cloudinary
    const imageUrls = await Promise.all(selectedFiles.map(uploadImage));

    if (imageUrls.length > 0 && imageUrls.length > 3) {
      setFormError(['Failed to upload the images. You can only upload up to 3 or can omit image upload.']);
      scrollToLeaveReplyForm();
      setIsSubmitting(false);
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
      text: results.text as string
    };

    // Uncheck all checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      (checkbox as HTMLInputElement).checked = false;
    });

    const submitForm = await submitTourComment(formResults);

    if (submitForm.success) {
      setIsSubmitting(false);
      setSelectedFiles([]);
      currObject.reset();

      const customerReviewsHeading = document.querySelector('.customer-reviews-heading');
      if (customerReviewsHeading) {
        setTimeout(function() {
          customerReviewsHeading.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      }
    }

    if (submitForm?.error) {
      setFormError([submitForm.error]);
      setIsSubmitting(false);
    }
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
    <section className="leave-a-reply">
      <h2 className="secondary-heading margin-bottom-small">Leave a reply</h2>
      {formError.map(function(item) {
        return (
          <p key={item} className="paragraph leave-a-reply-error">{item}</p>
        );
      })}

      <p className="paragraph leave-a-reply-paragraph">Your email address will not be published. All fields, <b>except
        the image picking,</b> are
        required, though.</p>
      <div>
      </div>
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
          <LeaveReplyInputs />
          <div className="leave-a-reply__form-inputs-file-upload">
            <input ref={fileInputRef} type="file" name="images" id="file"
                   className="leave-a-reply__form-inputs-file-upload-input" max={3}
                   multiple onChange={handleFileChange} accept="image/jpg, image/jpeg, image/png" />
          </div>
          <div className={`choose-files-btn-wrapper`}>
            <button type="button" onClick={openFilePicker} className={`choose-files-btn`}>Select Images</button>
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className={`user-img ${selectedFiles[index] ? '' : 'none'}`}
                   style={selectedFiles[index] ? { backgroundImage: `url(${URL.createObjectURL(selectedFiles[index])})` } : {}}>
              </div>
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
    </section>
  );
}