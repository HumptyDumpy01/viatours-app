// 'use client';
import '@/app/checkout/page.scss';

type LabelTelType = {
  mode: `tel`;
  type: `text` | `password` | `email` | `number` | `tel`
  label: string;
  name: string;
  placeholder: string;
  // children: ReactNode;

}

type LabelInputType = {
  mode: `default` | `questionMark`;
  type: `text` | `password` | `email` | `number` | `tel`
  name: string;
  placeholder: string;
  label: string;
  // children: ReactNode;
} | LabelTelType;

export default function LabelInput(props: LabelInputType) {

  return (
    <>
      {props.mode !== `questionMark` && props.mode !== `tel` &&
        <>
          <label htmlFor={props.name}
                 className="book-now__details-label">{props.label}</label>
          <input id={props.name} type={props.type} placeholder={props.placeholder}
                 className="book-now__details__input" required />
        </>
      }
      {props.mode === `questionMark` &&
        <>
          <div className="fix-email-tooltip flex flex-align-center gap-sm">
            <label htmlFor={props.name}
                   className="book-now__details-label">{props.label}</label>
            <svg className="email-tooltip cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="12"
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
            {/*<div className="tooltip-alpha-container tool-tip--registration-email-feature">
                      <div className="tooltip tool-tip--email-feature">
                        <div className="tooltip__title-wrapper flex flex-align-center gap-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="15" viewBox="0 0 18 15"
                               fill="none">
                            <path
                              d="M3.62668e-05 12.4637V2.53722C3.62668e-05 1.62178 0.695129 0.882812 1.55621 0.882812H16.0909C16.952 0.882812 17.6471 1.62178 17.6471 2.53722V12.4637C17.6471 13.3791 16.952 14.1181 16.0909 14.1181H1.55621C0.695129 14.1181 3.62668e-05 13.3791 3.62668e-05 12.4637ZM1.3591 2.4159C1.01674 2.77987 1.20348 3.15487 1.39022 3.34237L5.60228 7.44531L1.55621 11.9233C1.43172 12.0777 1.34872 12.3203 1.49397 12.4858C1.62884 12.6622 1.94007 12.6512 2.07494 12.5409L6.60861 8.42693L8.82875 10.5777L11.0385 8.42693L15.5722 12.5409C15.7071 12.6512 16.0183 12.6622 16.1532 12.4858C16.2984 12.3203 16.2154 12.0777 16.0909 11.9233L12.0449 7.44531L16.2569 3.34237C16.4437 3.15487 16.6304 2.77987 16.288 2.4159C15.9457 2.05193 15.5929 2.2284 15.3025 2.49311L8.82875 8.05193L2.34468 2.49311C2.05419 2.2284 1.70146 2.05193 1.3591 2.4159Z"
                              fill="#EB662B" />
                          </svg>
                          <h3 className="tooltip__title">We need a valid email!</h3>
                        </div>
                        <p className="tooltip__text">We'll send purchase details with all important information to this
                          email.
                          Please, provide a valid one.</p>
                        <img src="img/tooltip/logo.svg" alt="logo" className="tooltip__logo" />
                      </div>
                    </div>*/}
          </div>
          <input id={props.name} type={props.type} placeholder={props.placeholder}
                 className="book-now__details__input" required />
        </>
      }
      {props.mode === 'tel' &&
        <>
          <div className="fix-phone-tooltip flex flex-align-center gap-sm">
            <label htmlFor={props.name}
                   className="book-now__details-label">{props.label}</label>
            <svg className="phone-tooltip cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="12"
                 height="12"
                 viewBox="0 0 12 12" fill="none">
              <path
                d="M12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6Z"
                fill="#EB662B" />
              <path
                d="M7.3848 5.07688C7.38514 4.72099 7.26795 4.37496 7.05142 4.09252C6.8349 3.81009 6.53116 3.60706 6.1874 3.51497C5.84363 3.42289 5.47908 3.4469 5.15037 3.58329C4.82165 3.71967 4.54718 3.96079 4.36957 4.26918C4.30837 4.37525 4.29181 4.50129 4.32353 4.61956C4.35525 4.73784 4.43266 4.83867 4.53873 4.89988C4.64479 4.96108 4.77083 4.97764 4.88911 4.94592C5.00738 4.9142 5.10822 4.83679 5.16942 4.73072C5.23033 4.62551 5.31782 4.53815 5.42312 4.4774C5.52843 4.41664 5.64785 4.38463 5.76942 4.38457C5.95303 4.38457 6.12912 4.45751 6.25896 4.58734C6.38879 4.71717 6.46173 4.89327 6.46173 5.07688C6.46173 5.26049 6.38879 5.43658 6.25896 5.56641C6.12912 5.69625 5.95303 5.76918 5.76942 5.76918H5.76804C5.73827 5.77218 5.70888 5.77821 5.68034 5.78718C5.64935 5.79034 5.61874 5.79652 5.58896 5.80565C5.56363 5.81949 5.53967 5.83571 5.51742 5.85411C5.49091 5.86856 5.46587 5.88557 5.44265 5.90488C5.4219 5.92969 5.4038 5.95661 5.38865 5.98519C5.37179 6.00597 5.3568 6.02821 5.34388 6.05165C5.33383 6.08347 5.32717 6.11627 5.32404 6.14949C5.31609 6.176 5.31069 6.2032 5.30788 6.23072V6.69226L5.3088 6.69734V6.92395C5.30905 7.0462 5.35778 7.16336 5.44431 7.24971C5.53084 7.33607 5.6481 7.38457 5.77034 7.38457H5.77173C5.83234 7.38445 5.89233 7.37239 5.94828 7.34908C6.00423 7.32578 6.05504 7.29168 6.09781 7.24874C6.14059 7.20579 6.17448 7.15484 6.19756 7.0988C6.22065 7.04276 6.23246 6.98272 6.23234 6.92211L6.23142 6.61657C6.56357 6.5179 6.85511 6.31487 7.06285 6.03755C7.27059 5.76023 7.38348 5.42337 7.3848 5.07688ZM5.44496 8.21072C5.38015 8.275 5.33585 8.35706 5.31768 8.44651C5.2995 8.53596 5.30825 8.62879 5.34283 8.71327C5.37742 8.79775 5.43627 8.87007 5.51195 8.9211C5.58764 8.97213 5.67676 8.99957 5.76804 8.99995C5.89037 8.9989 6.00764 8.951 6.09573 8.86611C6.18142 8.77856 6.22941 8.66093 6.22941 8.53842C6.22941 8.41591 6.18142 8.29827 6.09573 8.21072C6.00738 8.12838 5.89111 8.0826 5.77034 8.0826C5.64958 8.0826 5.5333 8.12838 5.44496 8.21072Z"
                fill="white" />
            </svg>


            {/*<!-- A TOOLTIP FOR REGISTRATION PAGE ON EMAIL FIELD --> */}
            {/*<div
                      className="tooltip-alpha-container phone-tooltip-container tool-tip--registration-email-feature">
                      <div className="tooltip tool-tip--email-feature">
                        <div className="tooltip__title-wrapper flex flex-align-center gap-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19"
                               fill="none">
                            <g clipPath="url(#clip0_730_5733)">
                              <path opacity="0.2"
                                    d="M17.9944 14.3196C17.8487 15.4081 17.3127 16.4066 16.486 17.1295C15.6593 17.8524 14.5982 18.2505 13.5 18.2496C10.1185 18.2496 6.87548 16.9063 4.48439 14.5152C2.0933 12.1241 0.750001 8.88112 0.750001 5.49961C0.749161 4.40143 1.1472 3.34032 1.87009 2.51361C2.59298 1.68691 3.59152 1.15089 4.68 1.00524C4.84091 0.986123 5.00368 1.01963 5.14395 1.10075C5.28422 1.18187 5.39444 1.30624 5.45813 1.45524L7.43906 5.88024C7.48773 5.99389 7.50755 6.11781 7.49676 6.24098C7.48596 6.36414 7.44489 6.48272 7.37719 6.58618L5.37375 8.96836C5.30269 9.0756 5.26066 9.19944 5.25179 9.32778C5.24291 9.45611 5.26749 9.58456 5.32313 9.70055C6.09844 11.2877 7.73906 12.9087 9.33094 13.6765C9.44755 13.7319 9.57658 13.7559 9.70531 13.7462C9.83404 13.7365 9.95801 13.6934 10.065 13.6212L12.4088 11.6243C12.5126 11.5552 12.6321 11.5131 12.7563 11.5018C12.8806 11.4905 13.0057 11.5104 13.1203 11.5596L17.5416 13.5406C17.6913 13.6038 17.8163 13.714 17.898 13.8545C17.9797 13.995 18.0135 14.1582 17.9944 14.3196Z"
                                    fill="#EB662B" />
                              <path
                                d="M17.8472 12.8554L13.4306 10.8764L13.4184 10.8707C13.1892 10.7727 12.939 10.7333 12.6907 10.7562C12.4424 10.7792 12.2037 10.8636 11.9963 11.002C11.9718 11.0181 11.9484 11.0357 11.9259 11.0545L9.64407 12.9998C8.19845 12.2976 6.70595 10.8164 6.00376 9.3895L7.95188 7.07294C7.97063 7.0495 7.98845 7.02606 8.00532 7.00075C8.14072 6.79384 8.22287 6.55667 8.24446 6.31035C8.26605 6.06402 8.22641 5.81618 8.12907 5.58887V5.57762L6.14438 1.15356C6.0157 0.856621 5.79444 0.609262 5.51362 0.448409C5.2328 0.287556 4.9075 0.221836 4.58626 0.26106C3.31592 0.428223 2.14986 1.05209 1.30588 2.01615C0.461903 2.98021 -0.00228837 4.21852 8.4831e-06 5.49981C8.4831e-06 12.9436 6.05626 18.9998 13.5 18.9998C14.7813 19.0021 16.0196 18.5379 16.9837 17.6939C17.9477 16.85 18.5716 15.6839 18.7388 14.4136C18.7781 14.0924 18.7125 13.7672 18.5518 13.4864C18.3911 13.2056 18.144 12.9843 17.8472 12.8554ZM13.5 17.4998C10.3185 17.4963 7.26825 16.2309 5.01856 13.9813C2.76888 11.7316 1.50348 8.68134 1.50001 5.49981C1.49648 4.58433 1.82631 3.69887 2.42789 3.00879C3.02947 2.3187 3.86167 1.87118 4.76907 1.74981C4.7687 1.75355 4.7687 1.75732 4.76907 1.76106L6.73782 6.16731L4.80001 8.48669C4.78034 8.50932 4.76247 8.53345 4.74657 8.55887C4.60549 8.77536 4.52273 9.02462 4.5063 9.28249C4.48988 9.54037 4.54035 9.79811 4.65282 10.0307C5.5022 11.7679 7.25251 13.5051 9.00845 14.3536C9.24279 14.465 9.50203 14.5137 9.76083 14.495C10.0196 14.4762 10.2692 14.3907 10.485 14.2467C10.5091 14.2305 10.5322 14.2129 10.5544 14.1942L12.8334 12.2498L17.2397 14.2232H17.25C17.1301 15.1319 16.6833 15.9658 15.9931 16.5689C15.3028 17.172 14.4166 17.5029 13.5 17.4998Z"
                                fill="#EB662B" />
                            </g>
                            <defs>
                              <clipPath id="clip0_730_5733">
                                <rect width="19" height="19" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          <h3 className="tooltip__title">We need a valid number!</h3>
                        </div>
                        <p className="tooltip__text">If needed, our manager would call to you in order to confirm your
                          purchase!</p>
                        <img src="img/tooltip/logo.svg" alt="logo" className="tooltip__logo" />
                      </div>
                    </div>*/}
          </div>
          <div className="book-now__details-1__phone-number-start grid">
            <div className="book-now__details-1__phone-number-start-container">
              <label htmlFor={`phone-number-start`}></label>
              <select name={`phone-number-start`} id={`phone-number-start`} required>
                <option value="1">(+1) USA</option>
                <option value="38">(+38) Ukraine</option>
                <option value="44">(+44) UK</option>
                <option value="33">(+33) France</option>
                <option value="49">(+49) Germany</option>
                <option value="34">(+34) Spain</option>
                <option value="39">(+39) Italy</option>
                <option value="7">(+7) Russia</option>
                <option value="81">(+81) Japan</option>
                <option value="86">(+86) China</option>
                <option value="82">(+82) South Korea</option>
                <option value="91">(+91) India</option>
                <option value="54">(+54) Argentina</option>
                <option value="55">(+55) Brazil</option>
                <option value="1">(+1) Canada</option>
                <option value="61">(+61) Australia</option>
                <option value="64">(+64) New Zealand</option>
                <option value="27">(+27) South Africa</option>
                <option value="41">(+41) Switzerland</option>
                <option value="46">(+46) Sweden</option>
                <option value="31">(+31) Netherlands</option>
                <option value="32">(+32) Belgium</option>
                <option value="48">(+48) Poland</option>
                <option value="420">(+420) Czech Republic</option>
                <option value="36">(+36) Hungary</option>
                <option value="43">(+43) Austria</option>
                <option value="30">(+30) Greece</option>
                <option value="90">(+90) Turkey</option>
                <option value="351">(+351) Portugal</option>
                <option value="40">(+40) Romania</option>
                <option value="45">(+45) Denmark</option>
                <option value="47">(+47) Norway</option>
                <option value="358">(+358) Finland</option>
                <option value="353">(+353) Ireland</option>
                <option value="352">(+352) Luxembourg</option>
                <option value="370">(+370) Lithuania</option>
                <option value="371">(+371) Latvia</option>
                <option value="372">(+372) Estonia</option>
                <option value="385">(+385) Croatia</option>
                <option value="386">(+386) Slovenia</option>
                <option value="387">(+387) Bosnia and Herzegovina</option>
                <option value="389">(+389) North Macedonia</option>
                <option value="381">(+381) Serbia</option>
                <option value="84">(+84) Vietnam</option>
                <option value="60">(+60) Malaysia</option>
                <option value="62">(+62) Indonesia</option>
                <option value="63">(+63) Philippines</option>
                <option value="66">(+66) Thailand</option>
                <option value="65">(+65) Singapore</option>
                <option value="92">(+92) Pakistan</option>
                <option value="880">(+880) Bangladesh</option>
                <option value="94">(+94) Sri Lanka</option>
                <option value="960">(+960) Maldives</option>
                <option value="971">(+971) United Arab Emirates</option>
                <option value="966">(+966) Saudi Arabia</option>
                <option value="968">(+968) Oman</option>
                <option value="974">(+974) Qatar</option>
                <option value="973">(+973) Bahrain</option>
                <option value="965">(+965) Kuwait</option>
                <option value="962">(+962) Jordan</option>
                <option value="961">(+961) Lebanon</option>
                <option value="20">(+20) Egypt</option>
                <option value="212">(+212) Morocco</option>
                <option value="216">(+216) Tunisia</option>
                <option value="213">(+213) Algeria</option>
                <option value="218">(+218) Libya</option>
                <option value="249">(+249) Sudan</option>
                <option value="254">(+254) Kenya</option>
                <option value="233">(+233) Ghana</option>
                <option value="234">(+234) Nigeria</option>
                <option value="263">(+263) Zimbabwe</option>
                <option value="27">(+27) South Africa</option>
                <option value="52">(+52) Mexico</option>
                <option value="57">(+57) Colombia</option>
                <option value="56">(+56) Chile</option>
                <option value="51">(+51) Peru</option>
                <option value="58">(+58) Venezuela</option>
                <option value="593">(+593) Ecuador</option>
                <option value="595">(+595) Paraguay</option>
                <option value="598">(+598) Uruguay</option>
                <option value="591">(+591) Bolivia</option>
                <option value="506">(+506) Costa Rica</option>
                <option value="507">(+507) Panama</option>
                <option value="502">(+502) Guatemala</option>
                <option value="503">(+503) El Salvador</option>
                <option value="504">(+504) Honduras</option>
                <option value="505">(+505) Nicaragua</option>
              </select>
            </div>
            <input id={props.name} type="tel" placeholder={props.placeholder}
                   className="book-now__details__input" required />
          </div>
        </>
      }
    </>
  );
}
