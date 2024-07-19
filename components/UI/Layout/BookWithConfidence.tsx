// 'use client';
import '@/components/checkout/checkout-overall/CheckoutOverall.scss';
import './BookWithConfidence.scss';
import hotAirBalloon from '@/assets/images/activity-details/hot-air-balloon.svg';
import diamond from '@/assets/images/activity-details/diamond.svg';
import medal from '@/assets/images/activity-details/medal.svg';

/*type BookWithConfidenceType = {
  // children: ReactNode;
}*/

export default function BookWithConfidence(/*{  }: BookWithConfidenceType*/) {
  return (
    <>
      <div className="book-with-confidence-container">
        <div className="book-with-confidence">
          <h3 className="book-with-confidence__heading">Book with confidence!</h3>
        </div>
        <div className="book-with-confidence__content flex flex-align-center margin-bottom-36px">
          <img src={hotAirBalloon.src} alt="balloon icon"
               className="book-with-confidence__content-img" />
          <div className="book-with-confidence__content__text grid gap-1rem">
            <h3 className="book-with-confidence__content__text__heading">Memorable experiences</h3>
            <p className="book-with-confidence__content__text__p">Browse and book tours and activities so incredible,
              you&apos;ll want to tell your friends.</p>
          </div>
        </div>

        <div className="book-with-confidence__content flex flex-align-center margin-bottom-36px">
          <img src={diamond.src} alt="diamond icon"
               className="book-with-confidence__content-img" />
          <div className="book-with-confidence__content__text grid gap-1rem">
            <h3 className="book-with-confidence__content__text__heading">Quality at our core</h3>
            <p className="book-with-confidence__content__text__p">High-quality standards. Millions of
              reviews. A tourz company.</p>
          </div>
        </div>

        <div className="book-with-confidence__content flex flex-align-center margin-bottom-36px">
          <img src={medal.src} alt="medal icon" className="book-with-confidence__content-img" />
          <div className="book-with-confidence__content__text grid gap-1rem">
            <h3 className="book-with-confidence__content__text__heading">Award-winning support</h3>
            <p className="book-with-confidence__content__text__p">New price? New plan? No problem.
              We&apos;re here to help, 24/7.</p>
          </div>
        </div>
        <div className="grid gap-16px margin-left-73px">

          <div className="book-with-confidence__phone flex flex-align-center gap-13px">
            <svg className="book-with-confidence__phone-img" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                 viewBox="0 0 24 24" fill="none">
              <path
                d="M22.0554 18.0842C21.2366 17.2592 19.2535 16.0552 18.2913 15.57C17.0383 14.9388 16.9352 14.8873 15.9504 15.619C15.2935 16.1073 14.8567 16.5435 14.0879 16.3795C13.3191 16.2155 11.6485 15.291 10.1857 13.8328C8.72286 12.3746 7.74472 10.6556 7.58023 9.88933C7.41575 9.12312 7.85919 8.69154 8.34284 8.03308C9.0245 7.10496 8.97294 6.95027 8.39028 5.6973C7.93601 4.72277 6.69697 2.75824 5.86887 1.94355C4.98303 1.06854 4.98303 1.22322 4.41223 1.46041C3.94754 1.65593 3.50172 1.8936 3.08037 2.17043C2.25537 2.71854 1.7975 3.17383 1.4773 3.85807C1.15709 4.5423 1.01323 6.14641 2.66684 9.15044C4.32045 12.1545 5.48061 13.6905 7.88187 16.0851C10.2831 18.4796 12.1296 19.7672 14.8289 21.281C18.1681 23.1512 19.4489 22.7867 20.1352 22.467C20.8215 22.1473 21.2788 21.6935 21.828 20.8685C22.1055 20.4479 22.3437 20.0026 22.5395 19.5382C22.7773 18.9695 22.9319 18.9695 22.0554 18.0842Z"
                stroke="#EB662B" strokeWidth="1.65" strokeMiterlimit="10" />
            </svg>
            <a href="tel:1-234-567-8910"
               className="book-with-confidence__phone-number highlighted text-decoration-none">1-234-567-8910</a>
          </div>
          <div className="book-with-confidence__phone flex flex-align-center gap-13px">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
              <g clipPath="url(#clip0_948_2650)">
                <path
                  d="M8.00069 9.99964C8.00069 9.73442 8.10605 9.48007 8.29358 9.29253C8.48112 9.105 8.73547 8.99964 9.00069 8.99964H15.0007C15.2659 8.99964 15.5203 9.105 15.7078 9.29253C15.8953 9.48007 16.0007 9.73442 16.0007 9.99964C16.0007 10.2649 15.8953 10.5192 15.7078 10.7067C15.5203 10.8943 15.2659 10.9996 15.0007 10.9996H9.00069C8.73547 10.9996 8.48112 10.8943 8.29358 10.7067C8.10605 10.5192 8.00069 10.2649 8.00069 9.99964ZM9.00069 12.9996C8.73547 12.9996 8.48112 13.105 8.29358 13.2925C8.10605 13.4801 8.00069 13.7344 8.00069 13.9996C8.00069 14.2649 8.10605 14.5192 8.29358 14.7067C8.48112 14.8943 8.73547 14.9996 9.00069 14.9996H13.0007C13.2659 14.9996 13.5203 14.8943 13.7078 14.7067C13.8953 14.5192 14.0007 14.2649 14.0007 13.9996C14.0007 13.7344 13.8953 13.4801 13.7078 13.2925C13.5203 13.105 13.2659 12.9996 13.0007 12.9996H9.00069ZM0.000690532 11.9996C0.00120085 9.35773 0.873541 6.78983 2.48239 4.69429C4.09124 2.59876 6.34666 1.09272 8.89877 0.4098C11.4509 -0.273115 14.157 -0.0947289 16.5974 0.917284C19.0378 1.9293 21.076 3.71837 22.3959 6.00696C23.7157 8.29556 24.2434 10.9557 23.8972 13.5749C23.5509 16.194 22.3499 18.6256 20.4807 20.4925C18.6114 22.3595 16.1782 23.5574 13.5587 23.9004C10.9392 24.2434 8.27963 23.7124 5.99269 22.3896L1.31669 23.9496C1.14394 24.0073 0.958708 24.0167 0.780999 23.9768C0.603291 23.9369 0.439849 23.8493 0.308315 23.7233C0.176781 23.5973 0.0821495 23.4378 0.0346328 23.262C-0.012884 23.0862 -0.0114809 22.9007 0.0386906 22.7256L1.46269 17.7436C0.502731 15.9813 6.48398e-05 14.0064 0.000690532 11.9996ZM12.0007 1.99964C10.2351 1.99953 8.50086 2.4669 6.9744 3.35425C5.44794 4.2416 4.18363 5.51729 3.30999 7.05164C2.43636 8.58599 1.98454 10.3243 2.00047 12.0899C2.0164 13.8554 2.49951 15.5853 3.40069 17.1036C3.47003 17.2209 3.51466 17.3512 3.53186 17.4863C3.54905 17.6215 3.53845 17.7587 3.50069 17.8896L2.48269 21.4496L5.79869 20.3456C5.93952 20.2986 6.08905 20.2836 6.23642 20.3016C6.38379 20.3196 6.5253 20.3701 6.65069 20.4496C7.96123 21.279 9.44672 21.7922 10.9897 21.9486C12.5328 22.1051 14.091 21.9005 15.5414 21.351C16.9917 20.8015 18.2943 19.9221 19.3463 18.7825C20.3983 17.6429 21.1708 16.2742 21.6027 14.7846C22.0347 13.2951 22.1142 11.7254 21.8351 10.1998C21.5559 8.67423 20.9258 7.23446 19.9944 5.99433C19.063 4.7542 17.8559 3.74771 16.4686 3.05441C15.0812 2.3611 13.5516 2 12.0007 1.99964Z"
                  fill="#EB662B" />
              </g>
              <defs>
                <clipPath id="clip0_948_2650">
                  <rect width="24.0007" height="25" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <button type="button" className="btn book-with-confidence__phone-number highlighted">Chat
              Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
