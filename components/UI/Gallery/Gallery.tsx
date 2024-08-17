'use client';

import './Gallery.scss';
import { StaticImageData } from 'next/image';
import watermarkImage from '@/assets/images/viatours-watermark-logo.svg';
import React, { useState } from 'react';
import GallerySlider from '@/components/UI/Gallery/GallerySlider';
import { CldImage } from 'next-cloudinary';
import { motion } from 'framer-motion';
import { container, item } from '@/components/account-settings/contents/user-tour-purchases/UserTourPurchases';

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
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
          className="description__gallery-images grid"
        >

          <motion.div
            variants={item}
            className="description__gallery-img-1">

            <CldImage
              width={500}
              height={400}
              className="description__gallery-images-slider-img"
              alt={info.title}
              src={`${mainImage}`}
              onClick={openSlider}
              priority
              // improve quality
              quality="auto:best"
              format={`auto`}
            />
            {/*<img onClick={openSlider}*/}
            {/*  // @ts-ignore*/}
            {/*     src={`${DOMAIN}${mainImage}`} alt={info.title} />*/}
          </motion.div>
          <motion.div
            variants={item}
            className="description__gallery-images-container-1 grid grid-two-cols">
            {restOfImages.map((image, index) => (
              <motion.div
                variants={item}
                key={index} className={`description__gallery-img-${index + 2}`}>

                <CldImage
                  width={500}
                  height={400}
                  className="description__gallery-img-2"
                  alt={info.title}
                  src={`${image}`}
                  onClick={openSlider}
                  priority
                  // improve quality
                  quality="auto:best"
                  format={`auto`}
                  placeholder="blur"
                  blurDataURL={watermarkImage.src}
                />
                {/*<img onClick={openSlider}*/}
                {/*  // @ts-ignore*/}
                {/*     src={`${DOMAIN}${image}`} alt={info.title} className="description__gallery-img-2" />*/}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
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