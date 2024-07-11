// 'use client';

import './Hero.scss';
import shapeImg from '@/assets/images/hero/shape.svg';

/*interface HeroHeadingInterface {
  // children: ReactNode;
}*/
export default function HeroHeading(/*{  }: HeadingInterface*/) {
  return (
    <>
      <img src={shapeImg.src} alt="bottom of a hero" className="hero__img-bottom" />
      <div className="hero__heading">
        <h1 className="main-heading margin-bottom-small heading-scale-effect">Your world of joy</h1>
        <p className="paragraph paragraph-hero">From local escapes to far-flung adventures, find what makes you happy
          anytime,
          anywhere</p>
      </div>
    </>
  );
}
