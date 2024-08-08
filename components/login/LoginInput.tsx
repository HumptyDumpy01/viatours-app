'use client';

import { useState } from 'react';

type LoginInputType = {
  type: `email` | `password`;
  placeholder: string;
  name: string;
  // children: ReactNode;
}

export default function LoginInput({ type, name, placeholder }: LoginInputType) {
  const [passwordIsVisible, setPasswordIsVisible] = useState<boolean>(false);

  function togglePasswordVisibility() {
    setPasswordIsVisible(prevState => !prevState);
  }

  if (type === `email`) {
    return (
      <label htmlFor={name}>
        <input type="email" id={name} name={name} className="sign-in__second-col-form-input-email"
               placeholder={placeholder}
               required />
      </label>
    );
  }
  if (type === `password`) {
    return (
      <label className="password-label">
        <input name={name} type={passwordIsVisible ? `text` : `password`}
               className="sign-in__second-col-form-input-password"
               placeholder={`Password`}
               required />
        {!passwordIsVisible &&
          <svg onClick={togglePasswordVisibility} className="sign-in__second-col-show-password-icon"
               xmlns="http://www.w3.org/2000/svg" width="20"
               height="18"
               viewBox="0 0 20 18" fill="none">
            <path
              d="M8.2 4.4C8.76501 4.14103 9.37848 4.0047 10 4C11.1935 4 12.3381 4.47411 13.182 5.31802C14.0259 6.16193 14.5 7.30653 14.5 8.5C14.4997 9.03013 14.4014 9.55563 14.21 10.05L17 12.64C18.2456 11.4558 19.2626 10.0524 20 8.5C20 8.5 17 1.5 10 1.5C8.62109 1.49277 7.25681 1.78268 6 2.35L8.2 4.4ZM2 0.5L1 1.5L3.55 3.9C2.05582 5.16612 0.846054 6.7337 0 8.5C0 8.5 3 15.5 10 15.5C11.6192 15.5067 13.2144 15.1079 14.64 14.34L18 17.5L19 16.5L2 0.5ZM10 13C8.80653 13 7.66193 12.5259 6.81802 11.682C5.97411 10.8381 5.5 9.69347 5.5 8.5C5.50552 7.727 5.71231 6.96877 6.1 6.3L7.63 7.74C7.54763 7.98509 7.50377 8.24147 7.5 8.5C7.49899 8.907 7.59776 9.30805 7.78767 9.66804C7.97758 10.028 8.25284 10.336 8.58934 10.5649C8.92585 10.7939 9.31335 10.9368 9.71792 10.9813C10.1225 11.0258 10.5318 10.9704 10.91 10.82L12.45 12.27C11.7218 12.7467 10.8703 13.0004 10 13Z"
              fill="#EB662B" />
          </svg>
        }
        {passwordIsVisible &&
          <svg onClick={togglePasswordVisibility} className="sign-in__second-col-show-password-icon"
               xmlns="http://www.w3.org/2000/svg" width="20"
               height="18" viewBox="0 0 20 18" fill="none">
            <path
              d="M10 5.7C9.27668 5.7 8.58299 5.995 8.07153 6.5201C7.56006 7.0452 7.27273 7.75739 7.27273 8.5C7.27273 9.24261 7.56006 9.9548 8.07153 10.4799C8.58299 11.005 9.27668 11.3 10 11.3C10.7233 11.3 11.417 11.005 11.9285 10.4799C12.4399 9.9548 12.7273 9.24261 12.7273 8.5C12.7273 7.75739 12.4399 7.0452 11.9285 6.5201C11.417 5.995 10.7233 5.7 10 5.7ZM10 13.1667C8.79447 13.1667 7.63832 12.675 6.78588 11.7998C5.93344 10.9247 5.45455 9.73768 5.45455 8.5C5.45455 7.26232 5.93344 6.07534 6.78588 5.20017C7.63832 4.325 8.79447 3.83333 10 3.83333C11.2055 3.83333 12.3617 4.325 13.2141 5.20017C14.0666 6.07534 14.5455 7.26232 14.5455 8.5C14.5455 9.73768 14.0666 10.9247 13.2141 11.7998C12.3617 12.675 11.2055 13.1667 10 13.1667ZM10 1.5C5.45455 1.5 1.57273 4.40267 0 8.5C1.57273 12.5973 5.45455 15.5 10 15.5C14.5455 15.5 18.4273 12.5973 20 8.5C18.4273 4.40267 14.5455 1.5 10 1.5Z"
              fill="#EB662B" />
          </svg>
        }
      </label>
    );
  }
}
