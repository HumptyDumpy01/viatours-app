'use client';

import './GallerySlider.scss';
import IconIon from '@/components/UI/IonIcon/IconIon';
import React, { useRef } from 'react';
import { StaticImageData } from 'next/image';
import ArrowButton from '@/components/UI/Button/ArrowButton';
import { CldImage } from 'next-cloudinary';
import watermarkImage from '@/assets/images/viatours-watermark-logo.svg';

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
            {/*<img src={`${mainImage}`}*/}
            {/*     alt={info.title}*/}
            {/*     className="description__gallery-images-slider-img" />*/}
            <CldImage
              width={500}
              height={400}
              // className={`comments__content-images-wrapper`}
              crop="fill"
              className="description__gallery-images-slider-img"
              alt="Tour Comment Image"
              src={`${mainImage}`}
              // improve quality
              quality="auto:best"
              format={`auto`}
              blurDataURL={watermarkImage.src}
            />
            <span className="description__gallery-images-slider-span">*Scroll to the right to see more</span>
          </div>
          {/*// @ts-ignore*/}
          {restOfImages.map((image, index) => {
            return (
              <div key={`${image}`} className="description__gallery-images-slider-img-container">
                <CldImage
                  width={500}
                  height={400}
                  // className={`comments__content-images-wrapper`}
                  crop="fill"
                  className="description__gallery-images-slider-img"
                  alt="Tour Comment Image"
                  src={`${image}`}
                  // improve quality
                  quality="auto:best"
                  format={`auto`}
                  placeholder="blur"
                  blurDataURL={watermarkImage.src}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
