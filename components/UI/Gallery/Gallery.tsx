'use client';

import './Gallery.scss';
import { StaticImageData } from 'next/image';
import watermarkImage from '@/assets/images/viatours-watermark-logo.svg';
import { useState } from 'react';
import GallerySlider from '@/components/UI/Gallery/GallerySlider';

export type GalleryType = {
  info: {
    images: StaticImageData[] | string[] | string;
    title: string;
  };
  // children: ReactNode;
}

export default function Gallery({ info }: GalleryType) {
  const [sliderVisibility, setSliderVisibility] = useState<boolean>(false);

  if (!info.images || info.images.length === 0) {
    throw new Error(`The images array should contain at least 1 image!`);
  }

  // Create a new array from the images prop to avoid direct mutation
  const imagesToShow = Array.isArray(info.images) ? [...info.images] : [info.images];
  while (imagesToShow.length < 4) {
    imagesToShow.push(watermarkImage); // Fill with watermarkImage if less than 5 images
  }

  // Use the first image as the main image and the rest as secondary images
  const mainImage = imagesToShow[0];
  const restOfImages = imagesToShow.slice(1, 4);

  function openSlider() {
    setSliderVisibility(true);
  }

  function closeSlider() {
    setSliderVisibility(false);
  }

  return (
    <>
      <div className="description__gallery">
        <div className="description__gallery-images grid">
          <div className="description__gallery-img-1">
            <img onClick={openSlider}
              // @ts-ignore
                 src={mainImage.src} alt={info.title} />
          </div>
          <div className="description__gallery-images-container-1 grid grid-two-cols">
            {restOfImages.map((image, index) => (
              <div key={index} className={`description__gallery-img-${index + 2}`}>
                <img onClick={openSlider}
                  // @ts-ignore
                     src={image.src || image} alt={info.title} className="description__gallery-img-2" />
              </div>
            ))}
          </div>
        </div>
        <span onClick={openSlider}
              className="description__gallery--see-all">See all photos</span>
      </div>
      <GallerySlider handleCloseSlider={closeSlider} sliderVisibility={sliderVisibility} info={{
        // @ts-ignore
        images: imagesToShow,
        title: info.title
      }} />
    </>
  );
}