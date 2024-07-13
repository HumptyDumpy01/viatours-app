import React, { ComponentPropsWithoutRef, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import logoImg from '@/assets/images/homepage/logo.png';
import './Toast.scss';
import Image from 'next/image';

type ToastInterface = {
  badge: `success` | `error` | `info`;
  type:
    `ADD_TO_WISHLIST`
    | `REMOVE_FROM_WISHLIST`
    | `WISHLIST_EMPTIED`
    | `ADD_TO_SAVED_ARTICLES`
    | `REMOVE_FROM_SAVED_ARTICLES`
    | `SAVED_ARTICLES_EMPTIED`
    | `SIGNUP`
    | `PASSWORD_RESET`
    | `ACCOUNT_DELETE`
    | `TOUR_PURCHASE_CANCELLED_BY_USER`
    | `REFUND_REQUESTED`
    | `RATE_TOUR`
    | `RATE_ARTICLE`
    | `TOUR_PURCHASED`
    | `PROMO_APPLIED`
    | `PROMO_NOT_APPLIED`
    | `NEWSLETTER_SIGNUP`
    | `PROMO_SEND_TO_INBOX`
    | `ERROR_WHILE_LOGGING_IN`
    | `DEFAULT_ERROR`
    | `ORDER_COMPLETED`
    | `ERROR_WHILE_BOOKING_TOUR`
    | `CODE_FOR_RESETTING_PASSWORD_EXPIRED`
    | `SIGNUP_TO_NOTIFICATION_NEWSLETTER`
    | `ERROR_EMAIL_ALREADY_EXISTS_SIGNUP`
    | `ERROR_EMAIL_ALREADY_EXISTS_NEWSLETTER_SIGNUP`;
  visible: boolean;
// children: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

export default function Toast({ badge, type, visible, ...props }: ToastInterface) {

  if (!type || !badge) {
    throw new Error(`Toast component requires a type and a badge prop.`);
  }

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  let message = ``;
  let svg: ReactNode;

  if (type === `ERROR_WHILE_LOGGING_IN`) {
    message = `We couldn't find a matching email and password. Don't worry! Try again, or click "Forgot Password" to reset. We'll help you get back on track.`;
    svg = (
      <svg className="action-notificator__icon--error" xmlns="http://www.w3.org/2000/svg" width="29" height="28"
           viewBox="0 0 23 22"
           fill="none">
        <g clipPath="url(#clip0_733_5014)">
          <path
            d="M11.5384 16.4165C11.8454 16.4165 12.1028 16.3125 12.3108 16.1045C12.5188 15.8965 12.6225 15.6394 12.6217 15.3332C12.621 15.0269 12.517 14.7698 12.3097 14.5618C12.1025 14.3538 11.8454 14.2498 11.5384 14.2498C11.2315 14.2498 10.9744 14.3538 10.7671 14.5618C10.5598 14.7698 10.4558 15.0269 10.4551 15.3332C10.4544 15.6394 10.5584 15.8969 10.7671 16.1056C10.9758 16.3143 11.2329 16.4179 11.5384 16.4165ZM10.4551 12.0832H12.6217V5.58317H10.4551V12.0832ZM11.5384 21.8332C10.0398 21.8332 8.63147 21.5486 7.31341 20.9795C5.99536 20.4104 4.84883 19.6387 3.87383 18.6644C2.89883 17.6901 2.12714 16.5436 1.55875 15.2248C0.990357 13.9061 0.705802 12.4977 0.705079 10.9998C0.704357 9.50195 0.988913 8.09362 1.55875 6.77484C2.12858 5.45606 2.90027 4.30953 3.87383 3.33525C4.84739 2.36098 5.99391 1.58928 7.31341 1.02017C8.63291 0.45106 10.0412 0.166504 11.5384 0.166504C13.0356 0.166504 14.4439 0.45106 15.7634 1.02017C17.0829 1.58928 18.2294 2.36098 19.203 3.33525C20.1766 4.30953 20.9486 5.45606 21.5192 6.77484C22.0897 8.09362 22.3739 9.50195 22.3717 10.9998C22.3696 12.4977 22.085 13.9061 21.5181 15.2248C20.9511 16.5436 20.1794 17.6901 19.203 18.6644C18.2266 19.6387 17.08 20.4108 15.7634 20.9806C14.4468 21.5504 13.0385 21.8346 11.5384 21.8332Z"
            fill="#EB2B2B" />
        </g>
        <defs>
          <clipPath id="clip0_733_5014">
            <rect width="22" height="22" fill="white" transform="translate(0.539062)" />
          </clipPath>
        </defs>
      </svg>
    );
  }
  if (type === `SIGNUP`) {
    message = `Welcome to Viatours! Explore countless adventures and book unforgettable tours. Now get started creating your dream travel itinerary.`;
    svg = (
      <svg className="action-notificator__icon--smile" xmlns="http://www.w3.org/2000/svg" width="28" height="27"
           viewBox="0 0 28 27" fill="none">
        <g clipPath="url(#clip0_733_5020)">
          <path fillRule="evenodd" clipRule="evenodd"
                d="M14.0391 2.25C20.2524 2.25 25.2891 7.28663 25.2891 13.5C25.2891 19.7134 20.2524 24.75 14.0391 24.75C7.82569 24.75 2.78906 19.7134 2.78906 13.5C2.78906 7.28663 7.82569 2.25 14.0391 2.25ZM16.2711 16.0312C15.6748 16.5577 14.8952 16.875 14.0391 16.875C13.2169 16.8765 12.4227 16.5763 11.8071 16.0312C11.5833 15.8337 11.2902 15.7332 10.9923 15.7518C10.6944 15.7703 10.4161 15.9065 10.2186 16.1302C10.021 16.354 9.92051 16.6471 9.93907 16.945C9.95764 17.2429 10.0938 17.5212 10.3176 17.7188C11.3446 18.6263 12.6684 19.1266 14.0391 19.125C15.4097 19.1269 16.7336 18.6266 17.7606 17.7188C17.9843 17.5212 18.1205 17.2429 18.1391 16.945C18.1576 16.6471 18.0571 16.354 17.8596 16.1302C17.662 15.9065 17.3837 15.7703 17.0858 15.7518C16.7879 15.7332 16.4948 15.8337 16.2711 16.0312ZM10.1016 9C8.87869 9 7.89881 9.765 7.40831 10.746C7.27937 11.0027 7.25347 11.2989 7.33594 11.574C7.4184 11.8492 7.60298 12.0824 7.85184 12.2258C8.1007 12.3692 8.39499 12.412 8.67439 12.3454C8.95379 12.2788 9.19714 12.1079 9.35456 11.8676L9.41981 11.754C9.60206 11.3895 9.88106 11.25 10.1016 11.25C10.2928 11.25 10.5313 11.3569 10.7102 11.628L10.7833 11.754C10.9184 12.0184 11.1524 12.2186 11.4345 12.3112C11.7166 12.4037 12.0238 12.381 12.2892 12.248C12.5546 12.115 12.7566 11.8825 12.8514 11.6011C12.9461 11.3198 12.9257 11.0124 12.7948 10.746C12.3032 9.765 11.3244 9 10.1016 9ZM17.9766 9C16.7537 9 15.7749 9.765 15.2833 10.746C15.1544 11.0027 15.1285 11.2989 15.2109 11.574C15.2934 11.8492 15.478 12.0824 15.7268 12.2258C15.9757 12.3692 16.27 12.412 16.5494 12.3454C16.8288 12.2788 17.0721 12.1079 17.2296 11.8676L17.2948 11.754C17.4771 11.3895 17.7561 11.25 17.9766 11.25C18.1678 11.25 18.4063 11.3569 18.5852 11.628L18.6583 11.754C18.7238 11.8872 18.815 12.0062 18.9267 12.104C19.0384 12.2019 19.1683 12.2766 19.309 12.324C19.4497 12.3714 19.5984 12.3904 19.7465 12.38C19.8947 12.3697 20.0392 12.3301 20.172 12.2636C20.3047 12.1971 20.423 12.1049 20.5199 11.9925C20.6169 11.88 20.6906 11.7495 20.7369 11.6085C20.7832 11.4674 20.8011 11.3185 20.7896 11.1705C20.7781 11.0225 20.7374 10.8782 20.6698 10.746C20.1793 9.765 19.1994 9 17.9766 9Z"
                fill="#EB662B" />
        </g>
        <defs>
          <clipPath id="clip0_733_5020">
            <rect width="27" height="27" fill="white" transform="translate(0.539062)" />
          </clipPath>
        </defs>
      </svg>
    );
  }
  if (type === `NEWSLETTER_SIGNUP`) {
    message = `Welcome aboard! Get ready to explore the world with exclusive travel
      tips, special offers, and inspiring destination guides delivered straight to your inbox.`;
    svg = (
      <svg className="action-notificator__state action-notificator__icon&#45;&#45;email"
           xmlns="http://www.w3.org/2000/svg" width="24" height="24"
           viewBox="0 0 24 24" fill="none">
        <path
          d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM19.6 8.25L12.53 12.67C12.21 12.87 11.79 12.87 11.47 12.67L4.4 8.25C4.29973 8.19371 4.21192 8.11766 4.14189 8.02645C4.07186 7.93525 4.02106 7.83078 3.99258 7.71937C3.96409 7.60796 3.9585 7.49194 3.97616 7.37831C3.99381 7.26468 4.03434 7.15581 4.09528 7.0583C4.15623 6.96079 4.23632 6.87666 4.33073 6.811C4.42513 6.74533 4.53187 6.69951 4.6445 6.6763C4.75712 6.65309 4.87328 6.65297 4.98595 6.67595C5.09863 6.69893 5.20546 6.74453 5.3 6.81L12 11L18.7 6.81C18.7945 6.74453 18.9014 6.69893 19.014 6.67595C19.1267 6.65297 19.2429 6.65309 19.3555 6.6763C19.4681 6.69951 19.5749 6.74533 19.6693 6.811C19.7637 6.87666 19.8438 6.96079 19.9047 7.0583C19.9657 7.15581 20.0062 7.26468 20.0238 7.37831C20.0415 7.49194 20.0359 7.60796 20.0074 7.71937C19.9789 7.83078 19.9281 7.93525 19.8581 8.02645C19.7881 8.11766 19.7003 8.19371 19.6 8.25Z"
          fill="#EB662B" />
      </svg>
    );
  }
  if (type === `ERROR_EMAIL_ALREADY_EXISTS_NEWSLETTER_SIGNUP`) {
    message = `This email address is already subscribed to our newsletter. Stay tuned for the latest travel news and exclusive offers!`;

    svg = (
      <svg className="action-notificator__icon--error" xmlns="http://www.w3.org/2000/svg" width="29" height="28"
           viewBox="0 0 23 22"
           fill="none">
        <g clipPath="url(#clip0_733_5014)">
          <path
            d="M11.5384 16.4165C11.8454 16.4165 12.1028 16.3125 12.3108 16.1045C12.5188 15.8965 12.6225 15.6394 12.6217 15.3332C12.621 15.0269 12.517 14.7698 12.3097 14.5618C12.1025 14.3538 11.8454 14.2498 11.5384 14.2498C11.2315 14.2498 10.9744 14.3538 10.7671 14.5618C10.5598 14.7698 10.4558 15.0269 10.4551 15.3332C10.4544 15.6394 10.5584 15.8969 10.7671 16.1056C10.9758 16.3143 11.2329 16.4179 11.5384 16.4165ZM10.4551 12.0832H12.6217V5.58317H10.4551V12.0832ZM11.5384 21.8332C10.0398 21.8332 8.63147 21.5486 7.31341 20.9795C5.99536 20.4104 4.84883 19.6387 3.87383 18.6644C2.89883 17.6901 2.12714 16.5436 1.55875 15.2248C0.990357 13.9061 0.705802 12.4977 0.705079 10.9998C0.704357 9.50195 0.988913 8.09362 1.55875 6.77484C2.12858 5.45606 2.90027 4.30953 3.87383 3.33525C4.84739 2.36098 5.99391 1.58928 7.31341 1.02017C8.63291 0.45106 10.0412 0.166504 11.5384 0.166504C13.0356 0.166504 14.4439 0.45106 15.7634 1.02017C17.0829 1.58928 18.2294 2.36098 19.203 3.33525C20.1766 4.30953 20.9486 5.45606 21.5192 6.77484C22.0897 8.09362 22.3739 9.50195 22.3717 10.9998C22.3696 12.4977 22.085 13.9061 21.5181 15.2248C20.9511 16.5436 20.1794 17.6901 19.203 18.6644C18.2266 19.6387 17.08 20.4108 15.7634 20.9806C14.4468 21.5504 13.0385 21.8346 11.5384 21.8332Z"
            fill="#EB2B2B" />
        </g>
        <defs>
          <clipPath id="clip0_733_5014">
            <rect width="22" height="22" fill="white" transform="translate(0.539062)" />
          </clipPath>
        </defs>
      </svg>
    );
  }


  return createPortal(
    <>
      <div {...props}
           className={`action-notificator__status flex flex-align-center`}>
        <Image priority width={100} height={100} src={logoImg} alt="logo" className="action-notificator__logo" />
        <span
          className={`action-notificator__state 
          ${badge === `error` ? `action-notificator__state--error` :
            badge === `info` ? `action-notificator__state--info`
              : badge === `success` ? `action-notificator__state--success` : ``} `}>
          {badge}
        </span>
      </div>
      <div className="action-notificator__message flex flex-align-center">
        {svg}
        <p className="action-notificator__p inline-block">{message}</p>
      </div>
    </>,
    document.querySelector('.action-notificator')!
  );
}