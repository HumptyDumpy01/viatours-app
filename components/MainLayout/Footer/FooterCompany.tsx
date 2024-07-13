// 'use client';
import './Footer.scss';
/*interface FooterCompanyInterface {
  // children: ReactNode;
}*/

export default function FooterCompany(/*{  }: FooterCompanyInterface*/) {
  return (
    <div className="footer__bottom-column footer__bottom-column-2">
      <h3 className="footer__bottom-heading">Company</h3>
      <ul className="footer__bottom-column-list">
        <li><a href="#" className="footer__bottom-link">About us</a></li>
        <li><a href="#" className="footer__bottom-link">Tourz Reviews</a></li>
        <li><a href="#" className="footer__bottom-link">Contact Us</a></li>
        <li><a href="#" className="footer__bottom-link">Travel Guides</a></li>
        <li><a href="#" className="footer__bottom-link">Data Policy</a></li>
        <li><a href="#" className="footer__bottom-link">Cookie Policy</a></li>
        <li><a href="#" className="footer__bottom-link">Legal</a></li>
        <li><a href="#" className="footer__bottom-link">Sitemap</a></li>
      </ul>
    </div>
  );
}
