
import './Footer.scss';
import FooterTop from '@/components/MainLayout/Footer/FooterTop';
import FooterBottom from '@/components/MainLayout/Footer/FooterBottom';
import StoreProvider from '@/components/UI/Provider/StoreProvider';
/*interface FooterInterface {
  // children: ReactNode;
}*/
export default function Footer(/*{  }: FooterInterface*/) {
  return (
    <footer className="footer container-cta">
      <FooterTop />
      <StoreProvider>
        <FooterBottom />
      </StoreProvider>
    </footer>
  );
}
