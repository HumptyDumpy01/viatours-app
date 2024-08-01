'use client';

/*interface FooterNewsletterInterface {
  // children: ReactNode;
}*/

import IconIon from '@/components/UI/IonIcon/IconIon';
import { useRef } from 'react';
import Toast from '@/components/UI/Toast/Toast';
import { useCartDispatch, useCartSelector } from '@/store/hooks';
import { ToastSliceActions } from '@/store/ToastSlice';

export default function FooterNewsletter(/*{  }: FooterNewsletterInterface*/) {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const showNotification = useCartSelector((state) => state.notification.showNotification);
  const dispatch = useCartDispatch();


  function handleOpeningToast() {

    if (timer.current) {
      clearTimeout(timer.current);
      // console.log(`Newsletter sign up toast cleared!`);
    }

    dispatch(ToastSliceActions.showNotification());

    // Hide the toast after 3 seconds
    timer.current = setTimeout(() => {
      dispatch(ToastSliceActions.hideNotification());
      // console.log(`Newsletter sign up toast hidden!`);
    }, 6000);
  }

  return (
    <>
      {showNotification && <Toast visible={showNotification} badge={`success`} type={`NEWSLETTER_SIGNUP`} />}
      <div className="footer__bottom-column footer__bottom-column-4">
        <h3 className="footer__bottom-heading">Newsletter</h3>
        <p className="footer__bottom-paragraph">Subscribe to the free newsletter and stay
          up to date</p>
        <div className="footer__bottom__input-wrapper grid">
          <form action="#">
            <label>
              <input className="footer__bottom__input" type="text" placeholder="Your email address" required />
            </label>
            <button type={'button'} className="btn footer__bottom__button" onClick={handleOpeningToast}>Send</button>
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
