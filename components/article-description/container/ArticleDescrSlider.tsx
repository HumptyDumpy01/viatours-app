'use client';

import React, { useRef, useState } from 'react';
import ArticleDescrBtn from '@/components/article-description/article-descr-btn/ArtilcleDescrBtn';
import { CldImage } from 'next-cloudinary';
import watermarkImage from '@/assets/images/viatours-watermark-logo.svg';
import { motion } from 'framer-motion';

type ArticleDescrSliderType = {
  images: string[];
  // children: ReactNode;
}

export default function ArticleDescrSlider({ images }: ArticleDescrSliderType) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);
  const [imgLoading, setImgLoading] = useState(true);

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
      <motion.div
        initial={{ opacity: 0, x: -120 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ type: 'spring', duration: 1 }}
        className="tour-article-descr__slider-container">
        <div
          className="tour-article-descr__slider"
          ref={sliderRef}
          style={{ transform: `translateX(${translateX}px)`, display: 'flex', transition: 'transform 0.3s ease-out' }}
        >
          <>
            {images.map((image, index) => (
              <CldImage
                key={image}
                width={1183}
                height={700}
                src={image}
                alt={`Article slider image ${index}`}
                style={{ flexShrink: 0, width: '100%' }}
                quality="auto:best"
                format={`auto`}
                placeholder="blur"
                className="tour-article-descr__slider-img"
                blurDataURL={watermarkImage.src}
              />
            ))}
          </>
        </div>
      </motion.div>
    </>
  );
}