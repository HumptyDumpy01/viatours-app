'use client';

import { useState } from 'react';
import ViatoursLogo from '@/assets/images/login/viatours-logo.svg';
import Image from 'next/image';
import SliderImg1 from '@/assets/images/login/slider-img-1.png';
import SliderImg2 from '@/assets/images/login/slider-img-2.png';
import SliderImg3 from '@/assets/images/login/slider-img-3.png';

export default function LoginFirstCol() {
  const [activeSlide, setActiveSlide] = useState(0);
  const images = [SliderImg1, SliderImg2, SliderImg3];

  return (
    <>
      <div className="sign-in__first-col">
        <div className="img-container" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
          {images.map((img, index) => (
            <Image key={index} src={img} alt="people walking on the street"
                   className="sign-in__first-col-img" />
          ))}
        </div>
        <div className="shape-1"></div>
        <Image src={ViatoursLogo} alt="viatours logo" className="sign-in-viatours-logo" />
        <div className="img-slider-dots">
          {images.map((_, index) => (
            <button key={index} className={`img-slider-dot ${index === activeSlide ? 'img-slider-dot--active' : ''}`}
                    data-slide={index} onClick={() => setActiveSlide(index)}></button>
          ))}
        </div>
      </div>
    </>
  );
}