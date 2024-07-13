// 'use client';
import './Footer.scss';
import FooterTop from '@/components/MainLayout/Footer/FooterTop';
/*interface FooterInterface {
  // children: ReactNode;
}*/
export default function Footer(/*{  }: FooterInterface*/) {
  return (
    <footer className="footer container-cta">
      <FooterTop />
    </footer>
  );
}
