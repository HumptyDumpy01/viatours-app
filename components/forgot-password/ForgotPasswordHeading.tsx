// 'use client';

type ForgotPasswordHeadingType = {
  subheading: string;
  heading: string;
  text: string;
  // children: ReactNode;
}

export default function ForgotPasswordHeading({ subheading, heading, text }: ForgotPasswordHeadingType) {
  return (
    <>
      <span className="forgot-password__subheading subheading">{subheading}</span>
      <h1 className="secondary-heading forgot-password__heading">{heading}</h1>
      <p className="forgot-password__text">{text}</p>
    </>
  );
}
