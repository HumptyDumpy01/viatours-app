'use client';

import loadingSpinner from '@/animations/loading-spinner.json';
import '@/components/UI/Layout/LeaveReply.scss';
import IconIon from '@/components/UI/IonIcon/IconIon';
import Rate from '@/components/UI/Checkbox/Rate';
import React, { FormEvent, useRef, useState } from 'react';
import { SessionType } from '@/components/UI/Comment/Comment';
import Lottie from 'lottie-react';
import { useCartDispatch } from '@/store/hooks';
import { sliceArticleDescrActions } from '@/store/sliceArticleDescr';
import { motion } from 'framer-motion';

type ArticleDescrLeaveReplyType = {
  articleId: string;
  author: string;
  session: SessionType;
}

export type FormResultsType = {
  articleId: string;
  user: string;
  rating: number;
  title: string;
  text: string;
  email: string;
}

function scrollToLeaveReplyForm() {
  const leaveAReplyForm = document.querySelector('.leave-a-reply');
  if (leaveAReplyForm) {
    setTimeout(function() {
      leaveAReplyForm.scrollIntoView({ behavior: 'smooth' });
    }, 10);
  }
}

export default function ArticleDescrLeaveReply({ session, articleId, author }: ArticleDescrLeaveReplyType) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string[]>([]);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const dispatch = useCartDispatch();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const currObject = e.currentTarget;
    const formData = new FormData(currObject);
    const results = Object.fromEntries(formData.entries()) as {
      user: string;
      rating: string;
      title: string;
      text: string;
      email: string;
    };

    const userEmailData = session.user.email || results.email;
    results.email = userEmailData;
    setFormError([]);

    const errors = validateFormData(results);

    const user = await fetch(`/api/fetch-user`, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`
      },
      body: JSON.stringify({ userEmail: results.email, options: { email: 1, password: 1, _id: 1 } })
    });

    const userExists = await user.json();

    if (!session.user.email && userExists.resp) {
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

    const formResults: FormResultsType = {
      articleId: articleId,
      user: results.user.trim(),
      rating: Number(results.rating),
      title: results.title.trim(),
      text: results.text.trim(),
      email: results.email.trim()
    };

    async function submitComment() {
      const commentsHeading = document.querySelector(`.comments__heading`)! as HTMLHeadingElement;

      timer.current = setTimeout(function() {
        commentsHeading.scrollIntoView({ behavior: `smooth` });
        clearTimeout(timer.current!);
      }, 100);

      dispatch(sliceArticleDescrActions.setArticleCommentAdded(true));
      setIsSubmitting(true);

      try {
        const responseObj = await fetch(`/api/add-article-comment`, {
          method: `POST`,
          headers: {
            'Content-Type': `application/json`
          },
          body: JSON.stringify({ session, formResults, author })
        });
        console.log(`Executing responseObj: `, responseObj);

        const response = await responseObj.json();
        console.log(`Executing response: `, response);

        if (response?.error) {
          setFormError([`Failed to submit the comment: ${response?.message}`]);
          dispatch(sliceArticleDescrActions.setArticleCommentAdded(false));
          setIsSubmitting(false);
          scrollToLeaveReplyForm();
          return;
        }

        dispatch(sliceArticleDescrActions.setArticleCommentAdded(false));
        setIsSubmitting(false);
        currObject.reset();
      } catch (err) {
        console.error(`Failed to submit the comment: ${err}`);
        setFormError([`Failed to submit the comment: ${err}`]);
        setIsSubmitting(false);
        scrollToLeaveReplyForm();
      }
    }

    submitComment();
  }

  function validateFormData(results: Record<string, FormDataEntryValue>): string[] {
    const errors: string[] = [];

    if (!results.rating) {
      errors.push('A rating should be provided.');
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
    if (results.user.toString().length > 100 || results.user.toString().length < 2) {
      errors.push('User should be between 2 and 100 characters long.');
    }
    if (results.title.toString().length > 100 || results.title.toString().length < 5) {
      errors.push('Title should be between 5 and 100 characters long.');
    }
    if (results.text.toString().length > 600 || results.text.toString().length < 10) {
      errors.push('Comment should be between 10 and 600 characters long.');
    }
    if (!results.text) {
      errors.push('Comment is required.');
    }

    return errors;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 300 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className="leave-a-reply container">
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
                  <label htmlFor="user-initials"></label>
                  <input minLength={2} maxLength={100} defaultValue={session.user.name || ``} type="text" name="user"
                         id="user-initials" placeholder="Initials" required />
                </div>
                {session.user.email.trim() === `` && (
                  <div className="leave-a-reply__form-inputs-wrapper">
                    <label htmlFor="user-email"></label>
                    <input type="email" name="email" id="user-email" placeholder="Email" required />
                  </div>
                )}
              </div>
              <label htmlFor="title"></label>
              <input minLength={5} maxLength={100} type="text" name="title" id="title"
                     className="leave-a-reply__form-inputs-title" placeholder="Title" required />
              <label htmlFor="comment"></label>
              <textarea minLength={10} maxLength={600} name="text" id="comment" cols={30} rows={6}
                        className="leave-a-reply__form-inputs-comment" placeholder="Comment" required></textarea>
            </div>
            <div className={`margin-bottom-41px leave-a-reply-article-btn-container grid`}>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                disabled={isSubmitting}
                className={`btn btn--submit flex flex-align-center ${isSubmitting ? `btn--submit-disabled` : ``}`}>
                {!isSubmitting ? (
                  <>
                    Post comment
                    <IconIon type={`arrowForwardOutline`} className="icon icon--right-arrow" />
                  </>
                ) : `Submitting...`}
              </motion.button>
              {isSubmitting && (
                <div className={`loading-spinner-add-article`}>
                  <Lottie animationData={loadingSpinner} />
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </motion.section>
  );
}