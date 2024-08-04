'use client';

import '@/app/checkout/page.scss';
import '@/components/UI/Tooltip/Tooltip.scss';
import { useState } from 'react';
import SelectPhoneIndex from '@/components/UI/Select/SelectPhoneIndex';
import TooltipPhone from '@/components/UI/Tooltip/TooltipPhone';
import TooltipEmail from '@/components/UI/Tooltip/TooltipEmail';

type LabelTelType = {
  contactDetailsSubmitted: boolean;
  mode: `tel`;
  type: `text` | `password` | `email` | `number` | `tel`
  label: string;
  name: string;
  placeholder: string;
  // children: ReactNode;

}

type LabelInputType = {
  contactDetailsSubmitted: boolean;
  mode: `default` | `questionMark`;
  type: `text` | `password` | `email` | `number` | `tel`
  name: string;
  placeholder: string;
  label: string;
  // children: ReactNode;
} | LabelTelType;

export default function LabelInput(props: LabelInputType) {
  const [emailQuestionMarkHovered, setEmailQuestionMarkHovered] = useState<boolean>(false);
  const [phoneQuestionMarkHovered, setPhoneQuestionMarkHovered] = useState<boolean>(false);

  function toggleTooltip(type: `email` | `phone`, val: boolean) {
    if (type === `email`) {
      setEmailQuestionMarkHovered(val);
    }
    if (type === `phone`) {
      setPhoneQuestionMarkHovered(val);
    }
  }

  // book-now__details__input-success
  return (
    <>
      {props.mode !== `questionMark` && props.mode !== `tel` &&
        <>
          <label htmlFor={props.name}
                 className="book-now__details-label">{props.label}</label>
          <input id={props.name} type={props.type} name={props.name} placeholder={props.placeholder}
                 className={`book-now__details__input ${props.contactDetailsSubmitted ? `book-now__details__input-success` : ``}`}
                 required />
        </>
      }
      {props.mode === `questionMark` &&
        <>
          <div className="fix-email-tooltip flex flex-align-center gap-sm">
            <label htmlFor={props.name}
                   className="book-now__details-label">{props.label}</label>
            <svg onMouseLeave={() => toggleTooltip(`email`, false)} onMouseEnter={() => toggleTooltip(`email`, true)}
                 className="email-tooltip cursor-pointer"
                 xmlns="http://www.w3.org/2000/svg"
                 width="12"
                 height="12"
                 viewBox="0 0 12 12" fill="none">
              <path
                d="M12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6Z"
                fill="#EB662B" />
              <path
                d="M7.3848 5.07688C7.38514 4.72099 7.26795 4.37496 7.05142 4.09252C6.8349 3.81009 6.53116 3.60706 6.1874 3.51497C5.84363 3.42289 5.47908 3.4469 5.15037 3.58329C4.82165 3.71967 4.54718 3.96079 4.36957 4.26918C4.30837 4.37525 4.29181 4.50129 4.32353 4.61956C4.35525 4.73784 4.43266 4.83867 4.53873 4.89988C4.64479 4.96108 4.77083 4.97764 4.88911 4.94592C5.00738 4.9142 5.10822 4.83679 5.16942 4.73072C5.23033 4.62551 5.31782 4.53815 5.42312 4.4774C5.52843 4.41664 5.64785 4.38463 5.76942 4.38457C5.95303 4.38457 6.12912 4.45751 6.25896 4.58734C6.38879 4.71717 6.46173 4.89327 6.46173 5.07688C6.46173 5.26049 6.38879 5.43658 6.25896 5.56641C6.12912 5.69625 5.95303 5.76918 5.76942 5.76918H5.76804C5.73827 5.77218 5.70888 5.77821 5.68034 5.78718C5.64935 5.79034 5.61874 5.79652 5.58896 5.80565C5.56363 5.81949 5.53967 5.83571 5.51742 5.85411C5.49091 5.86856 5.46587 5.88557 5.44265 5.90488C5.4219 5.92969 5.4038 5.95661 5.38865 5.98519C5.37179 6.00597 5.3568 6.02821 5.34388 6.05165C5.33383 6.08347 5.32717 6.11627 5.32404 6.14949C5.31609 6.176 5.31069 6.2032 5.30788 6.23072V6.69226L5.3088 6.69734V6.92395C5.30905 7.0462 5.35778 7.16336 5.44431 7.24971C5.53084 7.33607 5.6481 7.38457 5.77034 7.38457H5.77173C5.83234 7.38445 5.89233 7.37239 5.94828 7.34908C6.00423 7.32578 6.05504 7.29168 6.09781 7.24874C6.14059 7.20579 6.17448 7.15484 6.19756 7.0988C6.22065 7.04276 6.23246 6.98272 6.23234 6.92211L6.23142 6.61657C6.56357 6.5179 6.85511 6.31487 7.06285 6.03755C7.27059 5.76023 7.38348 5.42337 7.3848 5.07688ZM5.44496 8.21072C5.38015 8.275 5.33585 8.35706 5.31768 8.44651C5.2995 8.53596 5.30825 8.62879 5.34283 8.71327C5.37742 8.79775 5.43627 8.87007 5.51195 8.9211C5.58764 8.97213 5.67676 8.99957 5.76804 8.99995C5.89037 8.9989 6.00764 8.951 6.09573 8.86611C6.18142 8.77856 6.22941 8.66093 6.22941 8.53842C6.22941 8.41591 6.18142 8.29827 6.09573 8.21072C6.00738 8.12838 5.89111 8.0826 5.77034 8.0826C5.64958 8.0826 5.5333 8.12838 5.44496 8.21072Z"
                fill="white" />
            </svg>
            {/*<!-- /////////////////////////////////////////// --> */}
            {/*<!-- A TOOLTIP FOR REGISTRATION PAGE ON EMAIL FIELD --> */}
            <TooltipEmail isHovered={emailQuestionMarkHovered} />
          </div>
          <input id={props.name} name={props.name} type={props.type} placeholder={props.placeholder}
                 className={`book-now__details__input ${props.contactDetailsSubmitted ? `book-now__details__input-success` : ``}`}
                 required />
        </>
      }
      {props.mode === 'tel' &&
        <div className={`flex flex-direction-column gap-13px`}>
          <div className="fix-phone-tooltip flex flex-align-center gap-sm">
            <label htmlFor={props.name}
                   className="book-now__details-label">{props.label}</label>
            <svg onMouseLeave={() => toggleTooltip(`phone`, false)} onMouseEnter={() => toggleTooltip(`phone`, true)}
                 className="phone-tooltip cursor-pointer"
                 xmlns="http://www.w3.org/2000/svg" width="12"
                 height="12"
                 viewBox="0 0 12 12" fill="none">
              <path
                d="M12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6Z"
                fill="#EB662B" />
              <path
                d="M7.3848 5.07688C7.38514 4.72099 7.26795 4.37496 7.05142 4.09252C6.8349 3.81009 6.53116 3.60706 6.1874 3.51497C5.84363 3.42289 5.47908 3.4469 5.15037 3.58329C4.82165 3.71967 4.54718 3.96079 4.36957 4.26918C4.30837 4.37525 4.29181 4.50129 4.32353 4.61956C4.35525 4.73784 4.43266 4.83867 4.53873 4.89988C4.64479 4.96108 4.77083 4.97764 4.88911 4.94592C5.00738 4.9142 5.10822 4.83679 5.16942 4.73072C5.23033 4.62551 5.31782 4.53815 5.42312 4.4774C5.52843 4.41664 5.64785 4.38463 5.76942 4.38457C5.95303 4.38457 6.12912 4.45751 6.25896 4.58734C6.38879 4.71717 6.46173 4.89327 6.46173 5.07688C6.46173 5.26049 6.38879 5.43658 6.25896 5.56641C6.12912 5.69625 5.95303 5.76918 5.76942 5.76918H5.76804C5.73827 5.77218 5.70888 5.77821 5.68034 5.78718C5.64935 5.79034 5.61874 5.79652 5.58896 5.80565C5.56363 5.81949 5.53967 5.83571 5.51742 5.85411C5.49091 5.86856 5.46587 5.88557 5.44265 5.90488C5.4219 5.92969 5.4038 5.95661 5.38865 5.98519C5.37179 6.00597 5.3568 6.02821 5.34388 6.05165C5.33383 6.08347 5.32717 6.11627 5.32404 6.14949C5.31609 6.176 5.31069 6.2032 5.30788 6.23072V6.69226L5.3088 6.69734V6.92395C5.30905 7.0462 5.35778 7.16336 5.44431 7.24971C5.53084 7.33607 5.6481 7.38457 5.77034 7.38457H5.77173C5.83234 7.38445 5.89233 7.37239 5.94828 7.34908C6.00423 7.32578 6.05504 7.29168 6.09781 7.24874C6.14059 7.20579 6.17448 7.15484 6.19756 7.0988C6.22065 7.04276 6.23246 6.98272 6.23234 6.92211L6.23142 6.61657C6.56357 6.5179 6.85511 6.31487 7.06285 6.03755C7.27059 5.76023 7.38348 5.42337 7.3848 5.07688ZM5.44496 8.21072C5.38015 8.275 5.33585 8.35706 5.31768 8.44651C5.2995 8.53596 5.30825 8.62879 5.34283 8.71327C5.37742 8.79775 5.43627 8.87007 5.51195 8.9211C5.58764 8.97213 5.67676 8.99957 5.76804 8.99995C5.89037 8.9989 6.00764 8.951 6.09573 8.86611C6.18142 8.77856 6.22941 8.66093 6.22941 8.53842C6.22941 8.41591 6.18142 8.29827 6.09573 8.21072C6.00738 8.12838 5.89111 8.0826 5.77034 8.0826C5.64958 8.0826 5.5333 8.12838 5.44496 8.21072Z"
                fill="white" />
            </svg>

            <TooltipPhone isHovered={phoneQuestionMarkHovered} />
          </div>
          <div className="book-now__details-1__phone-number-start grid">
            <div
              className={`book-now__details-1__phone-number-start-container 
              ${props.contactDetailsSubmitted ? `book-now__details__input-success` : ``}`}>
              <SelectPhoneIndex contactDetailsSubmitted={props.contactDetailsSubmitted} />
            </div>
            <input id={props.name} name={props.name} type="tel" placeholder={props.placeholder}
                   className={`book-now__details__input ${props.contactDetailsSubmitted ? `book-now__details__input-success` : ``}`}
                   required />
          </div>
        </div>
      }
    </>
  );
}
