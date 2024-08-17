'use client';

/*interface FooterNewsletterInterface {
  // children: ReactNode;
}*/

import IconIon from '@/components/UI/IonIcon/IconIon';
import { FormEvent, useRef, useState } from 'react';
// import { useRef } from 'react';
// import Toast from '@/components/UI/Toast/Toast';
// import {/* useCartDispatch,*/ useCartSelector } from '@/store/hooks';
// import { ToastSliceActions } from '@/store/ToastSlice';

export default function FooterNewsletter(/*{  }: FooterNewsletterInterface*/) {
  // const timer = useRef<NodeJS.Timeout | null>(null);
  // const showNotification = useCartSelector((state) => state.notification.showNotification);
  // const dispatch = useCartDispatch();
  //
  //
  // function handleOpeningToast() {
  //
  //   if (timer.current) {
  //     clearTimeout(timer.current);
  //     // console.log(`Newsletter sign up toast cleared!`);
  //   }
  //
  //   dispatch(ToastSliceActions.showNotification());
  //
  //   // Hide the toast after 3 seconds
  //   timer.current = setTimeout(() => {
  //     dispatch(ToastSliceActions.hideNotification());
  //     // console.log(`Newsletter sign up toast hidden!`);
  //   }, 6000);
  // }

  // creating a ref to timer
  const timer = useRef<NodeJS.Timeout | null>(null);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [data, setData] = useState<{
    message: string;
    status: `error` | `success` | ``;
  }>({
    message: ``,
    status: ``
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    const currObject = e.currentTarget;
    const formData = new FormData(currObject);
    const results = Object.fromEntries(formData.entries()) as {
      email: string;
    };
    // console.log(`Executing results: `, results);

    if (results.email.trim() === '' || !results.email.trim().includes(`@`)) {
      setData(prevState => ({
        ...prevState,
        message: `Please enter your email address`,
        status: `error`
      }));
      setIsSubmitting(false);

      timer.current = setTimeout(() => {
        setData(prevState => ({
          ...prevState,
          message: ``,
          status: ``
        }));

        // clearing the timer
        return () => {
          if (timer.current) {
            clearTimeout(timer.current);
          }
        };
      }, 4000);

      return;
    }

    const result = await fetch(`/api/newsletter`, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`
      },
      body: JSON.stringify({
        email: results.email,
        method: `ADD`
      })
    });

    const data = await result.json();

    if (data.error) {
      setData(prevState => ({
        ...prevState,
        message: data.message,
        status: `error`
      }));
    } else {
      setData(prevState => ({
        ...prevState,
        message: data.message,
        status: `success`
      }));
      currObject.reset();

      timer.current = setTimeout(() => {
        setData(prevState => ({
          ...prevState,
          message: ``,
          status: ``
        }));

        // clearing the timer
        return () => {
          if (timer.current) {
            clearTimeout(timer.current);
          }
        };
      }, 5000);

    }
    // resetting the form
    // output
    // console.log(results);
    setIsSubmitting(false);
  }


  return (
    <>
      {/*{showNotification && <Toast visible={showNotification} badge={`success`} type={`NEWSLETTER_SIGNUP`} />}*/}
      <div className="footer__bottom-column footer__bottom-column-4">
        <h3 className="footer__bottom-heading">Newsletter</h3>
        <p className="footer__bottom-paragraph">Subscribe to the free newsletter and stay
          up to date</p>
        <div>
          {data.status &&
            <p className={`${data.status === `error` ? `paragraph-error` : `paragraph-success`}`}>{data.message}</p>}
        </div>
        <div className="footer__bottom__input-wrapper grid">
          <form onSubmit={handleSubmit}>
            <label>
              <input
                className={`footer__bottom__input ${data.status === `error` && `input-error`} ${data.status === `success` && `input-success`}`}
                name={`email`} type="email"
                placeholder="Your email address"
                required />
            </label>
            {/* onClick={handleOpeningToast}*/}
            <button disabled={isSubmitting}
                    className={`btn footer__bottom__button ${data.status
                    === `error` ? `input-error` : `input-success`}`}>
              {isSubmitting ? `Loading..` : `Send`}
            </button>
          </form>
        </div>
        <h3 className="footer__bottom-heading">Mobile Apps</h3>
        <ul className="footer__bottom-column-list footer__bottom-column-list-2">
          <li>
            <IconIon type={'logoApple'} className={'footer__bottom-column-list-2-icon'} />
            <a href="#" className="footer__bottom-link footer__bottom-link-2">iOS App</a></li>
          <li>
            <IconIon type={'logoAndroid'} className={'footer__bottom-column-list-2-icon'} />
            <a href="#" className="footer__bottom-link footer__bottom-link-2">Android App</a></li>
        </ul>
      </div>
    </>
  );
}
