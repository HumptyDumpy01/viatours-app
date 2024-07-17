// 'use client';
import viatoursLogo from '@/assets/images/register/logo.png';
import './Tooltip.scss';
/*type ToolTipType = {
  // children: ReactNode;
}*/

export default function ToolTip(/*{  }: ToolTipType*/) {
  return (
    <>
      {/*<!-- A TOOLTIP FOR REGISTRATION PAGE ON EMAIL FIELD --> */}
      <div className="tooltip-alpha-container tool-tip--registration-email-feature">
        <div className="tooltip tool-tip--email-feature">
          <div className="tooltip__title-wrapper flex flex-align-center gap-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="15" viewBox="0 0 18 15" fill="none">
              <path
                d="M3.62668e-05 12.4637V2.53722C3.62668e-05 1.62178 0.695129 0.882812 1.55621 0.882812H16.0909C16.952 0.882812 17.6471 1.62178 17.6471 2.53722V12.4637C17.6471 13.3791 16.952 14.1181 16.0909 14.1181H1.55621C0.695129 14.1181 3.62668e-05 13.3791 3.62668e-05 12.4637ZM1.3591 2.4159C1.01674 2.77987 1.20348 3.15487 1.39022 3.34237L5.60228 7.44531L1.55621 11.9233C1.43172 12.0777 1.34872 12.3203 1.49397 12.4858C1.62884 12.6622 1.94007 12.6512 2.07494 12.5409L6.60861 8.42693L8.82875 10.5777L11.0385 8.42693L15.5722 12.5409C15.7071 12.6512 16.0183 12.6622 16.1532 12.4858C16.2984 12.3203 16.2154 12.0777 16.0909 11.9233L12.0449 7.44531L16.2569 3.34237C16.4437 3.15487 16.6304 2.77987 16.288 2.4159C15.9457 2.05193 15.5929 2.2284 15.3025 2.49311L8.82875 8.05193L2.34468 2.49311C2.05419 2.2284 1.70146 2.05193 1.3591 2.4159Z"
                fill="#EB662B" />
            </svg>
            <h3 className="tooltip__title">We need a valid email!</h3>
          </div>
          <p className="tooltip__text">We’ll send the verification code to this email you provided here. It should
            be
            valid!</p>
          <img src={viatoursLogo.src} alt="logo" className="tooltip__logo" />
        </div>
      </div>
    </>
  );
}
