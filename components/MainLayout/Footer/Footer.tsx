import './Footer.scss';
import FooterTop from '@/components/MainLayout/Footer/FooterTop';
import FooterBottom from '@/components/MainLayout/Footer/FooterBottom';
/*interface FooterInterface {
  // children: ReactNode;
}*/
export default function Footer(/*{  }: FooterInterface*/) {
  return (
    <footer className="footer container-cta">
      <FooterTop />
      <FooterBottom />
    </footer>
  );
}
