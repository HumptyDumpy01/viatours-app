'use client';

import React, { useRef, useState } from 'react';
import ArticleDescrBtn from '@/components/article-description/article-descr-btn/ArtilcleDescrBtn';

type ArticleDescrSliderType = {
  images: string[];
  // children: ReactNode;
}

export default function ArticleDescrSlider({ images }: ArticleDescrSliderType) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);

  function handleScroll(mode: string) {
    const slider = sliderRef.current;
    if (slider) {
      const slideWidth = slider.scrollWidth / images.length;
      if (mode === 'left') {
        setTranslateX((prev) => Math.min(prev + slideWidth, 0));
      } else {
        setTranslateX((prev) => Math.max(prev - slideWidth, -slideWidth * (images.length - 1)));
      }
    }
  }

  return (
    <>
      <ArticleDescrBtn mode="left" onClick={() => handleScroll('left')} />
      <ArticleDescrBtn mode="right" onClick={() => handleScroll('right')} />
      <div className="tour-article-descr__slider-container">
        <div
          className="tour-article-descr__slider"
          ref={sliderRef}
          style={{ transform: `translateX(${translateX}px)`, display: 'flex', transition: 'transform 0.3s ease-out' }}
        >
          {images.map((image, index) => (
            <img key={index} src={image} alt="article-slider" style={{ flexShrink: 0, width: '100%' }} />
          ))}
        </div>
      </div>
    </>
  );
}