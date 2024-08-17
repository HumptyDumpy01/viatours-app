'use client';

import { useEffect, useState } from 'react';
import ViatoursLogo from '@/assets/images/login/viatours-logo.svg';
import Image from 'next/image';
import SliderImg1 from '@/assets/images/login/slider-img-1.png';
import SliderImg2 from '@/assets/images/login/slider-img-2.png';
import SliderImg3 from '@/assets/images/login/slider-img-3.png';
import { motion } from 'framer-motion';

export default function LoginFirstCol() {
  // to define the active slide, the default value is 0
  const [activeSlide, setActiveSlide] = useState(0);
  // to define the images for the slider, the images are imported from the assets
  const images = [SliderImg1, SliderImg2, SliderImg3];

  // set the interval for the slider;
  // the slider will change the image every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prevActiveSlide) => (prevActiveSlide + 1) % images.length);
    }, 4000); // Change image every 3 seconds

    // Clear interval on component unmount
    return () => clearInterval(interval); // Clear interval on component unmount
  }, [images.length]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: `spring`, stiffness: 260, damping: 20 }}
        className="sign-in__first-col">
        {/*Define a container for the images. Check the styles below.
          Then Apply a dynamic translateX on this slider container by using this approach.*/}
        <div
          className="img-container" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
          {/*Loop over array of images and inject each image.*/}
          {images.map((img, index) => (
            <Image key={index} src={img} alt="people walking on the street"
                   className="sign-in__first-col-img" />
          ))}
        </div>
        <div className="shape-1"></div>
        <Image src={ViatoursLogo} alt="viatours logo" className="sign-in-viatours-logo" />
        {/* Create a container for the dots*/}
        <div className="img-slider-dots">
          {/*Loop over the images and create a button for each image.*/}
          {/*Apply the active class to the button if the index is equal to the active slide.*/}
          {images.map((_, index) => (
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              key={index} className={`img-slider-dot ${index === activeSlide ? 'img-slider-dot--active' : ''}`}
              data-slide={index} onClick={() => setActiveSlide(index)}></motion.button>
          ))}
        </div>
      </motion.div>
    </>
  );
}