'use client';

import '@/components/UI/Layout/LeaveReply.scss';
import IconIon from '@/components/UI/IonIcon/IconIon';
import Rate from '@/components/UI/Checkbox/Rate';
import React, { FormEvent, useState } from 'react';
import { getUser } from '@/lib/mongodb';
import { SessionType } from '@/components/UI/Comment/Comment';

type ArticleDescrLeaveReplyType = {
  session: SessionType;
  // children: ReactNode;
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


export default function ArticleDescrLeaveReply({ session }: ArticleDescrLeaveReplyType) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string[]>([]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const currObject = e.currentTarget;
    const formData = new FormData(currObject);
    const results = Object.fromEntries(formData.entries());

    // the userEmail comes directly from the session,
    // if the user is authenticated, otherwise it comes from the form
    const userEmailData = session.user.email || results.email;
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
      return;
    }

    // output
    console.log(results);
  }

  function validateFormData(results: Record<string, FormDataEntryValue>): string[] {
    const errors: string[] = [];

    if (!results.rating) {
      errors.push('A rating for should be provided.');
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
      errors.push('Comment is required.');
    }

    return errors;
  }

  return (
    <>
      <section className="leave-a-reply container">
        <div className="leave-a-reply__wrapper">
          <h2 className="secondary-heading margin-bottom-small">Leave a reply</h2>
          <p className="paragraph leave-a-reply-paragraph">Your email address will not be published. All fields are
            required, though.</p>
          <div className="leave-a-reply-form">
            {formError.map(function(item) {
              return (
                <p key={item} className="paragraph paragraph-error">{item}</p>
              );
            })}
            <form onSubmit={handleSubmit} className="leave-a-reply__form">
              <div className="leave-a-reply__form-rate grid">
                <Rate label={`Rate`} name={`rating`} />
              </div>
              <div className="leave-a-reply__form-inputs-container grid">
                <div className="leave-a-reply__form-inputs flex flex-align-center flex-space-between">
                  <div className="leave-a-reply__form-inputs-wrapper">
                    <label htmlFor="user-initials"></label><input type="text" name="user" id="user-initials"
                                                                  placeholder="Initials"
                                                                  required />
                  </div>
                  {session.user.email.trim() === `` && (
                    <>
                      <div className="leave-a-reply__form-inputs-wrapper">
                        <label htmlFor="user-email"></label><input type="email" name="email" id="user-email"
                                                                   placeholder="Email" required />
                      </div>
                    </>
                  )}
                </div>
                <label htmlFor="title"></label><input type="text" name="title" id="title"
                                                      className="leave-a-reply__form-inputs-title" placeholder="Title"
                                                      required />
                <label htmlFor="comment"></label><textarea name="text" id="comment" cols={30} rows={6}
                                                           className="leave-a-reply__form-inputs-comment"
                                                           placeholder="Comment" required></textarea>
              </div>
              <div className={`margin-bottom-41px`}>
                <button disabled={isSubmitting} className="btn btn--submit flex flex-align-center">Post comment
                  {/*<ion-icon name="arrow-forward-outline" className="icon icon--right-arrow"></ion-icon>*/}
                  <IconIon type={`arrowForwardOutline`} className="icon icon--right-arrow" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
