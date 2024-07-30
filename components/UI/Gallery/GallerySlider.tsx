'use client';

import './GallerySlider.scss';
import IconIon from '@/components/UI/IonIcon/IconIon';
import React, { useRef } from 'react';
import { StaticImageData } from 'next/image';
import ArrowButton from '@/components/UI/Button/ArrowButton';
import { DOMAIN } from '@/lib/helpers/generics';

type GallerySliderType = {
  handleCloseSlider: () => void;
  sliderVisibility: boolean;
  info: {
    images: string[] | StaticImageData[];
    title: string;
  }

  // children: ReactNode;
};

export default function GallerySlider({ info, sliderVisibility, handleCloseSlider }: GallerySliderType) {
  const slider = useRef<HTMLDivElement>(null);

  if (!info.images) {
    throw new Error(`Invalid gallery images: ${info.images}`);
  }

  function closeSlider() {
    handleCloseSlider();
  }

  const mainImage = info.images[0];
  const restOfImages = info.images.slice(1);

  function handleScrollToRight() {
    if (slider.current) {
      slider.current.scrollLeft += 800;
    }
  }

  function handleScrollToLeft() {
    if (slider.current) {
      slider.current.scrollLeft -= 800;
    }
  }

  return (
    <>
      <div onClick={closeSlider}>
        <IconIon type={`closeOutline`} className={`icon icon--close-gallery ${sliderVisibility ? `open` : ``}`} />
      </div>
      <ArrowButton type={`left`} sliderVisibility={sliderVisibility} handleScrollToLeft={handleScrollToLeft} />
      <ArrowButton type={`right`} sliderVisibility={sliderVisibility} handleScrollToRight={handleScrollToRight} />
      <div ref={slider} className={`description__gallery-images-slider ${sliderVisibility ? `open` : ``}`}>
        <div className={`description__gallery-images-slider-wrapper  ${sliderVisibility ? `open` : ``}`}>
          <div className="description__gallery-images-slider-img-container">
            {/*// @ts-ignore*/}
            <img src={`${DOMAIN}${mainImage}`}
                 alt={info.title}
                 className="description__gallery-images-slider-img" />
            <span className="description__gallery-images-slider-span">*Scroll to the right to see more</span>
          </div>
          {/*// @ts-ignore*/}
          {restOfImages.map((image, index) => {
            return (
              <div key={index} className="description__gallery-images-slider-img-container">
                {/*// @ts-ignore*/}
                <img src={`${DOMAIN}${image}`}
                     alt={info.title}
                     className="description__gallery-images-slider-img" />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
