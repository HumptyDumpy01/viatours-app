'use client';

import '@/app/checkout/page.scss';
import LabelInput from '@/components/UI/Input/LabelInput';
import CheckBoxSignOnNewsletter from '@/components/UI/Checkbox/CheckBoxSignOnNewsletter';
import CheckoutBtn from '@/components/checkout/CheckoutBtn';
import React, { FormEvent, useState } from 'react';
import { useCartDispatch, useCartSelector } from '@/store/hooks';
import { checkoutSliceActions } from '@/store/checkoutSlice';
import { useSession } from 'next-auth/react';
import { Skeleton } from '@mui/material';

export type FormContactDetailsType = {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: number;
  phone: number
  getEmailsWithOffers?: boolean;
}

export default function CheckoutFormContactDetails() {
  const [formError, setFormError] = useState<string[]>([]);
  const isContactDetailsEmpty = useCartSelector((state) => state.checkout.contactDetails !== null);
  const [contactDetailsSubmitted, setContactDetailsSubmitted] = useState<boolean>(false);


  const { data: session, status } = useSession();

  const isStatusLoading = status === 'loading';

  let userFirstName = '';
  let userLastName = '';
  let userEmail = '';
  if (session) {
    const name = session.user?.name?.split(' ');
    userFirstName = name?.[0] as string;
    userLastName = name?.[1] as string;
    userEmail = session.user?.email as string;
  }

  const dispatch = useCartDispatch();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const currObject = e.currentTarget;
    const formData = new FormData(currObject);
    const results = Object.fromEntries(formData.entries());

    if (session && !session.user?.email) {
      throw new Error('No email in session');
    }

    // const userEmail = session ? session.user!.email : results.email;
    // @ts-ignore
    // results.email = userEmail;

    const userExists = await fetch('/api/fetch-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userEmail: results.email })
    });
    const userExistsData = await userExists.json() as { message: string, status: number, resp: boolean };
    // console.log(`userExistsData`, userExistsData);


    const typedResults: FormContactDetailsType = {
      firstName: results.firstName as string,
      lastName: results.lastName as string,
      email: results.email as string,
      // combine country code and phone number to one
      countryCode: Number(results.countryCode as string),
      phone: Number(results.countryCode as string + results.phone as string),
      getEmailsWithOffers: results.getEmailsWithOffers === 'on'
    };

    // Clear previous errors
    setFormError([]);

    // Validate form data
    const errors = validateFormData(typedResults);

    if (userExistsData.resp && session?.user?.email !== results.email) {
      errors.push(userExistsData.message);
      setFormError(errors);
    }

    if (errors.length > 0) {
      setFormError(errors);
      return;
    }

    // resetting the form
    // currObject.reset();
    // output
    console.log(typedResults);
    dispatch(checkoutSliceActions.pushData({ type: 'contact', data: typedResults }));
    dispatch(checkoutSliceActions.setOpenActivityDetails(true));
    // clear order prop from local storage
    localStorage.removeItem('order');

    setContactDetailsSubmitted(true);

    // scroll6200px down
    window.scrollBy(0, 600);

    console.log('dispatched contact details to store.');
  }

  function validateFormData(results: FormContactDetailsType) {
    const errors: string[] = [];
    // email regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!results.firstName.trim() ||
      !results.lastName.trim() ||
      !results.email.trim() ||
      !emailRegex.test(results.email.trim().toString()) || !results.countryCode || !results.phone) {
      errors.push('All fields should be filled out correctly.');
      setFormError(errors);
    }
    if (results.phone.toString().length < 10 || results.phone.toString().length > 15) {
      errors.push('Phone number should be between 10 and 15 digits.');
    }

    // scroll to 300px to the top
    window.scrollBy(0, -300);

    return errors;
  }

  function setContactDetailsSubmittedToFalse() {
    if (contactDetailsSubmitted) {
      setContactDetailsSubmitted(false);
    }
  }

  return (
    <div className="book-now__details-1__form">
      <form onSubmit={handleSubmit}>
        {formError.map(function(item) {
          return (
            <p key={item} className="paragraph paragraph-error">{item}</p>
          );
        })}
        <div className="book-now__details-1__form-first-row">
          <div className="grid gap-13px" onClick={setContactDetailsSubmittedToFalse}>
            {(!isStatusLoading || session) && (
              <LabelInput defaultValue={userFirstName ? userFirstName : ``}
                          contactDetailsSubmitted={contactDetailsSubmitted}
                          mode={`default`}
                          type={`text`}
                          label={`First Name`}
                          placeholder={`Name`}
                          name={`firstName`}
              />
            )}
            {(isStatusLoading && !session) && (
              <>
                <Skeleton variant={`rounded`} width={`100%`} height={55} className={`book-now__details__input`} />
              </>
            )}
          </div>

          <div className="grid gap-13px" onClick={setContactDetailsSubmittedToFalse}>
            {!isStatusLoading && (
              <LabelInput
                defaultValue={userLastName ? userLastName : ``}
                contactDetailsSubmitted={contactDetailsSubmitted}
                label={`Last Name`}
                placeholder={`Last Name`}
                name={`lastName`}
                type={`text`}
                mode={`default`}
              />
            )}
            {isStatusLoading && (
              <>
                <Skeleton variant={`rounded`} width={`100%`} height={55} className={`book-now__details__input`} />
              </>
            )}
          </div>
        </div>
        <div className="grid margin-bottom-30px" onClick={setContactDetailsSubmittedToFalse}>
          <div className="flex flex-direction-column gap-13px margin-bottom-small">

            {!isStatusLoading && (
              <LabelInput
                defaultValue={userEmail ? userEmail : ``}
                contactDetailsSubmitted={contactDetailsSubmitted}
                label={`Email`}
                placeholder={`Email Address`}
                name={`email`}
                type={`email`}
                mode={`questionMark`}
              />
            )}
            {isStatusLoading && (
              <>
                <Skeleton variant={`rounded`} width={`100%`} height={55} className={`book-now__details__input`} />
              </>
            )}
          </div>
        </div>

        <div className="grid">
          <div className="flex flex-direction-column gap-13px">

            <div onClick={setContactDetailsSubmittedToFalse}>
              <LabelInput
                defaultValue={``}
                contactDetailsSubmitted={contactDetailsSubmitted}
                label={`Phone`}
                placeholder={`Phone Number`}
                name={`phone`}
                type={`tel`}
                mode={`tel`}
              />
            </div>
            <CheckBoxSignOnNewsletter />
            {(isContactDetailsEmpty && contactDetailsSubmitted) && (
              <>
                <CheckoutBtn label={`Saved`} />
                <div className={`paragraph-container`}>
                  <p className={`paragraph`}>*</p>
                  <p className={`paragraph`}>Contact Details are saved! If you want to update them, make
                    changes and click on the button
                    again.</p>
                </div>
              </>
            )}
            {(!contactDetailsSubmitted) && (
              <>
                <CheckoutBtn label={`Next`} />
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}