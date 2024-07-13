// 'use client';
import './Footer.scss';
/*interface FooterSupportInterface {
  // children: ReactNode;
}*/

export default function FooterSupport(/*{  }: FooterSupportInterface*/) {
  return (
    <div className="footer__bottom-column footer__bottom-column-3">
      <h3 className="footer__bottom-heading">Support</h3>
      <ul className="footer__bottom-column-list">
        <li><a href="#" className="footer__bottom-link">Get in Touch</a></li>
        <li><a href="#" className="footer__bottom-link">Help center</a></li>
        <li><a href="#" className="footer__bottom-link">Live chat</a></li>
        <li><a href="#" className="footer__bottom-link">How it works</a></li>
      </ul>
    </div>
  );
}
