// 'use client';

import React from 'react';
import './Footer.scss';
import footerShape from '@/assets/images/homepage/footer/shape.svg';
import IconIon from '@/components/UI/IonIcon/IconIon';

export default function FooterTop() {
  return (
    <>
      <img src={footerShape.src} alt="top shape of a footer" className="footer__shape" />
      <div className="footer__top container flex flex-align-center flex-space-between">
        <div className="footer__top-call-us flex flex-align-center">
          <div className="footer__top-call__container flex">
            <IconIon
              className={`icon icon--call`}
              type={`callOutline`}
            />
            <h3 className="footer__top-heading heading-scale-effect">Speak to our expert at <a
              href="tel:1-800-453-6744"
              className="link-active">1-800-453-6744</a>
            </h3>
          </div>
        </div>
        <div className="footer__top-follow-us flex flex-align-center">
          <span>Follow Us</span>
          <div className="footer__top-follow-us-icons">
            <a href="#">
              <IconIon type={`logoInstagram`} className={`footer__top-follow-us-icons-icon`} />
            </a>
            <a href="#">
              <IconIon type={`logoFacebook`} className={`footer__top-follow-us-icons-icon`} />
            </a>
            <a href="#">
              <IconIon type={`logoTwitter`} className={`footer__top-follow-us-icons-icon`} />
            </a>
            <a href="#">
              <IconIon type={`logoWhatsapp`} className={`footer__top-follow-us-icons-icon`} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}