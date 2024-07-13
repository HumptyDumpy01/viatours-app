// 'use client';
import './Footer.scss';
import FooterContact from '@/components/MainLayout/Footer/FooterContact';
import FooterCompany from '@/components/MainLayout/Footer/FooterCompany';
import FooterSupport from '@/components/MainLayout/Footer/FooterSupport';
import FooterNewsletter from '@/components/MainLayout/Footer/FooterNewsletter';

/*interface FooterBottomInterface {
  // children: ReactNode;
}*/

export default function FooterBottom(/*{  }: FooterBottomInterface*/) {
  return (
    <div className="footer__bottom container">
      <div className="footer__bottom-wrapper grid">
        <FooterContact />
        <FooterCompany />
        <FooterSupport />
        <FooterNewsletter />
      </div>
    </div>
  );
}
