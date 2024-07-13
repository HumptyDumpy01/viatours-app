// 'use client';

import ctaImage from '@/assets/images/homepage/cta/cta_image.svg';
import ctaShape from '@/assets/images/homepage/cta/shape.svg';
import './Cta.scss';

/*interface CTAFirstPartInterface {
  // children: ReactNode;
}*/
export default function CTAFirstPart(/*{  }: CTAFirstPartInterface*/) {
  return (
    <>
      <div className="cta__right-side">
        <div className="cta__right-side-wrapper">
          <img src={ctaShape.src} alt="the shape of the cta image"
               className="cta__right-side-shape" />
          <div className="cta__right-side-img">
            <img src={ctaImage.src} alt="call to action image"
                 className="cta__right-side-img" />
          </div>
        </div>
      </div>
    </>
  );
}
