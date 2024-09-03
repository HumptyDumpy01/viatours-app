// 'use client';
import classes from './NeedHelp.module.scss';
/*type NeedHelpType = {
  // children: ReactNode;
}*/

export default function NeedHelp(/*{  }: NeedHelpType*/) {
  return (
    <div>
      <h2 className={classes[`need-help-heading`]}>Need Help?</h2>
      <p className={classes[`need-help-par`]}>
        We are here to help you! If you have any questions or need assistance, please contact our support team. You can
        also <span className={`inline-block highlighted`}>try to use our
        AI Agent Layla</span> to get help with your order!
      </p>
      <div className={`${classes[`need-help-support-container`]}`}>
        <div className={`${classes[`need-help-support-item`]}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <g clipPath="url(#clip0_1071_5408)">
              <path
                d="M22.0554 18.0842C21.2366 17.2592 19.2535 16.0552 18.2913 15.57C17.0383 14.9388 16.9352 14.8873 15.9504 15.619C15.2935 16.1073 14.8567 16.5435 14.0879 16.3795C13.3191 16.2155 11.6485 15.291 10.1857 13.8328C8.72286 12.3746 7.74472 10.6556 7.58023 9.88933C7.41575 9.12312 7.85919 8.69154 8.34284 8.03308C9.0245 7.10496 8.97294 6.95027 8.39028 5.6973C7.93601 4.72277 6.69697 2.75824 5.86887 1.94355C4.98303 1.06854 4.98303 1.22322 4.41223 1.46041C3.94754 1.65593 3.50172 1.8936 3.08037 2.17043C2.25537 2.71854 1.7975 3.17383 1.4773 3.85807C1.15709 4.5423 1.01323 6.14641 2.66684 9.15044C4.32045 12.1545 5.48061 13.6905 7.88187 16.0851C10.2831 18.4796 12.1296 19.7672 14.8289 21.281C18.1681 23.1512 19.4489 22.7867 20.1352 22.467C20.8215 22.1473 21.2788 21.6935 21.828 20.8685C22.1055 20.4479 22.3437 20.0026 22.5395 19.5382C22.7773 18.9695 22.9319 18.9695 22.0554 18.0842Z"
                stroke="#EB662B" strokeWidth="1.65" strokeMiterlimit="10" />
            </g>
            <defs>
              <clipPath id="clip0_1071_5408">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <p>1-800-453-6744</p>
        </div>

        <div className={`${classes[`need-help-support-item`]}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
            <g clipPath="url(#clip0_1071_5413)">
              <path
                d="M8.00069 9.99964C8.00069 9.73442 8.10605 9.48007 8.29358 9.29253C8.48112 9.105 8.73547 8.99964 9.00069 8.99964H15.0007C15.2659 8.99964 15.5203 9.105 15.7078 9.29253C15.8953 9.48007 16.0007 9.73442 16.0007 9.99964C16.0007 10.2649 15.8953 10.5192 15.7078 10.7067C15.5203 10.8943 15.2659 10.9996 15.0007 10.9996H9.00069C8.73547 10.9996 8.48112 10.8943 8.29358 10.7067C8.10605 10.5192 8.00069 10.2649 8.00069 9.99964ZM9.00069 12.9996C8.73547 12.9996 8.48112 13.105 8.29358 13.2925C8.10605 13.4801 8.00069 13.7344 8.00069 13.9996C8.00069 14.2649 8.10605 14.5192 8.29358 14.7067C8.48112 14.8943 8.73547 14.9996 9.00069 14.9996H13.0007C13.2659 14.9996 13.5203 14.8943 13.7078 14.7067C13.8953 14.5192 14.0007 14.2649 14.0007 13.9996C14.0007 13.7344 13.8953 13.4801 13.7078 13.2925C13.5203 13.105 13.2659 12.9996 13.0007 12.9996H9.00069ZM0.000690532 11.9996C0.00120085 9.35773 0.873541 6.78983 2.48239 4.69429C4.09124 2.59876 6.34666 1.09272 8.89877 0.4098C11.4509 -0.273115 14.157 -0.0947289 16.5974 0.917284C19.0378 1.9293 21.076 3.71837 22.3959 6.00696C23.7157 8.29556 24.2434 10.9557 23.8972 13.5749C23.5509 16.194 22.3499 18.6256 20.4807 20.4925C18.6114 22.3595 16.1782 23.5574 13.5587 23.9004C10.9392 24.2434 8.27963 23.7124 5.99269 22.3896L1.31669 23.9496C1.14394 24.0073 0.958708 24.0167 0.780999 23.9768C0.603291 23.9369 0.439849 23.8493 0.308315 23.7233C0.176781 23.5973 0.0821495 23.4378 0.0346328 23.262C-0.012884 23.0862 -0.0114809 22.9007 0.0386906 22.7256L1.46269 17.7436C0.502731 15.9813 6.48398e-05 14.0064 0.000690532 11.9996ZM12.0007 1.99964C10.2351 1.99953 8.50086 2.4669 6.9744 3.35425C5.44794 4.2416 4.18363 5.51729 3.30999 7.05164C2.43636 8.58599 1.98454 10.3243 2.00047 12.0899C2.0164 13.8554 2.49951 15.5853 3.40069 17.1036C3.47003 17.2209 3.51466 17.3512 3.53186 17.4863C3.54905 17.6215 3.53845 17.7587 3.50069 17.8896L2.48269 21.4496L5.79869 20.3456C5.93952 20.2986 6.08905 20.2836 6.23642 20.3016C6.38379 20.3196 6.5253 20.3701 6.65069 20.4496C7.96123 21.279 9.44672 21.7922 10.9897 21.9486C12.5328 22.1051 14.091 21.9005 15.5414 21.351C16.9917 20.8015 18.2943 19.9221 19.3463 18.7825C20.3983 17.6429 21.1708 16.2742 21.6027 14.7846C22.0347 13.2951 22.1142 11.7254 21.8351 10.1998C21.5559 8.67423 20.9258 7.23446 19.9944 5.99433C19.063 4.7542 17.8559 3.74771 16.4686 3.05441C15.0812 2.3611 13.5516 2 12.0007 1.99964Z"
                fill="#EB662B" />
            </g>
            <defs>
              <clipPath id="clip0_1071_5413">
                <rect width="24.0007" height="25" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <p><u>Chat to our Manager!</u></p>
        </div>
        <div className={`${classes[`need-help-support-item-2`]} ${classes[`margin-top-med`]}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="26" viewBox="0 0 25 26" fill="none">
            <g clipPath="url(#clip0_1076_5257)">
              <path
                d="M8.32183 10.397C8.32183 10.1212 8.43142 9.85661 8.62648 9.66155C8.82155 9.46648 9.08611 9.3569 9.36197 9.3569H15.6028C15.8787 9.3569 16.1432 9.46648 16.3383 9.66155C16.5334 9.85661 16.643 10.1212 16.643 10.397C16.643 10.6729 16.5334 10.9375 16.3383 11.1325C16.1432 11.3276 15.8787 11.4372 15.6028 11.4372H9.36197C9.08611 11.4372 8.82155 11.3276 8.62648 11.1325C8.43142 10.9375 8.32183 10.6729 8.32183 10.397ZM9.36197 13.5175C9.08611 13.5175 8.82155 13.627 8.62648 13.8221C8.43142 14.0172 8.32183 14.2817 8.32183 14.5576C8.32183 14.8335 8.43142 15.098 8.62648 15.2931C8.82155 15.4881 9.08611 15.5977 9.36197 15.5977H13.5225C13.7984 15.5977 14.063 15.4881 14.258 15.2931C14.4531 15.098 14.5627 14.8335 14.5627 14.5576C14.5627 14.2817 14.4531 14.0172 14.258 13.8221C14.063 13.627 13.7984 13.5175 13.5225 13.5175H9.36197ZM0.00071825 12.4773C0.00124905 9.72936 0.908605 7.05839 2.58203 4.87874C4.25546 2.69908 6.60141 1.13259 9.25597 0.422265C11.9105 -0.288062 14.7253 -0.102516 17.2636 0.950119C19.802 2.00275 21.922 3.86364 23.2948 6.24409C24.6677 8.62455 25.2166 11.3915 24.8564 14.1158C24.4962 16.84 23.2471 19.3692 21.3027 21.3111C19.3584 23.253 16.8276 24.499 14.1029 24.8558C11.3783 25.2125 8.61197 24.6602 6.23323 23.2844L1.36954 24.907C1.18985 24.967 0.99719 24.9768 0.812348 24.9353C0.627507 24.8938 0.457505 24.8026 0.320691 24.6716C0.183877 24.5405 0.0854469 24.3746 0.0360229 24.1917C-0.0134011 24.0089 -0.0119417 23.816 0.0402437 23.6338L1.5214 18.4519C0.52291 16.6188 6.74424e-05 14.5647 0.00071825 12.4773ZM12.4824 2.07592C10.6459 2.0758 8.84208 2.56194 7.25435 3.4849C5.66662 4.40787 4.35156 5.73476 3.44285 7.3307C2.53415 8.92664 2.0642 10.7347 2.08077 12.5712C2.09734 14.4076 2.59984 16.2069 3.53719 17.7862C3.60931 17.9082 3.65574 18.0436 3.67363 18.1842C3.69151 18.3248 3.68048 18.4676 3.64121 18.6037L2.58234 22.3066L6.03145 21.1583C6.17793 21.1094 6.33346 21.0938 6.48674 21.1125C6.64003 21.1312 6.78722 21.1838 6.91765 21.2665C8.28079 22.1292 9.82591 22.663 11.4309 22.8257C13.0358 22.9884 14.6566 22.7755 16.1652 22.204C17.6737 21.6324 19.0287 20.7178 20.1229 19.5325C21.2171 18.3471 22.0206 16.9235 22.4698 15.3741C22.9191 13.8247 23.0018 12.1921 22.7115 10.6053C22.4212 9.01842 21.7657 7.52086 20.7969 6.23095C19.8282 4.94105 18.5726 3.89415 17.1296 3.17302C15.6866 2.45189 14.0956 2.0763 12.4824 2.07592Z"
                fill="white" />
            </g>
            <defs>
              <clipPath id="clip0_1076_5257">
                <rect width="24.9641" height="26.0035" fill="white" transform="translate(0 -0.00195312)" />
              </clipPath>
            </defs>
          </svg>
          <p>Chat with Layla AI Agent!</p>
        </div>

      </div>
    </div>
  );
}
