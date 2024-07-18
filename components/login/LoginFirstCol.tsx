// 'use client';
import ViatoursLogo from '@/assets/images/login/viatours-logo.svg';
import Image from 'next/image';
import SliderImg1 from '@/assets/images/login/slider-img-1.png';
import SliderImg2 from '@/assets/images/login/slider-img-2.png';
import SliderImg3 from '@/assets/images/login/slider-img-3.png';
/*type LoginFirstColType = {
  // children: ReactNode;
}*/

export default function LoginFirstCol(/*{  }: LoginFirstColType*/) {
  return (
    <>
      <div className="sign-in__first-col">
        <div className="img-container">
          <Image width={600} height={570} src={SliderImg1} alt="people walking on the street"
                 className="sign-in__first-col-img" />
          <Image width={600} height={570} src={SliderImg2} alt="people walking on the street"
                 className="sign-in__first-col-img" />
          <Image width={600} height={570} src={SliderImg3} alt="people walking on the street"
                 className="sign-in__first-col-img" />
        </div>
        <div className="shape-1"></div>
        <Image src={ViatoursLogo} alt="viatours logo" className="sign-in-viatours-logo" />
        <div className="img-slider-dots">
          <button className="img-slider-dot img-slider-dot--active" data-slide="0"></button>
          <button className="img-slider-dot" data-slide="1"></button>
          <button className="img-slider-dot" data-slide="2"></button>
        </div>
      </div>
    </>
  );
}
