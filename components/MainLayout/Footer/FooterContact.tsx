// 'use client';
import './Footer.scss';

/*interface FooterContactInterface {
  // children: ReactNode;
}*/

export default function FooterContact(/*{  }: FooterContactInterface*/) {
  return (
    <div className="footer__bottom-column footer__bottom-column-1">
      <h3 className="footer__bottom-heading">Contact</h3>
      <p className="footer__bottom-paragraph">328 Queensberry Street, North Melbourne VIC3051, <br />
        Australia.</p>
      <a href="mailto:hi@viatours.com" className="link">hi@viatours.com</a>
    </div>
  );
}
