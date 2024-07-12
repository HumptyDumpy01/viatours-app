// 'use client';
import './CTASecondary.scss';
import mobileAppImg from '@/assets/images/homepage/cta2/cta2-image.png';
import Image from 'next/image';

/*interface CTA2FirstColInterface {
  // children: ReactNode;
}*/

export default function CTA2SecondCol(/*{  }: Interface*/) {
  return (
    <div className="cta-secondary-wrapper-second-col">
      <Image src={mobileAppImg} alt="a mobile application image"
             className="cta-secondary-wrapper-second-col__img" />
    </div>
  );
}
