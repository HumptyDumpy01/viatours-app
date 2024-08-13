'use client';

import { StaticImageData } from 'next/image';
import Link from 'next/link';
import './TrendingDestinations.scss';
import { CldImage } from 'next-cloudinary';
import React from 'react';
import watermarkImage from '@/assets/images/Watermark-anim.gif';
import { motion } from 'framer-motion';

interface TrendingDestinationInterface {
  href: string;
  imgSrc: StaticImageData | string;
  alt: string;
  country: string;
  text: string;
  // children: ReactNode;
}

export default function TrendingDestination({ href, imgSrc, alt, country, text }: TrendingDestinationInterface) {

  return (
    <motion.div
      whileInView={{ y: 0, opacity: 1 }}
      // initial={{ y: 0, opacity: 0 }}
      // viewport={{ once: false }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300 }}>
      <Link className="trending-destinations-figure-link" href={href}>
        <figure
          className="trending-destinations-figure">
          <div className="trending-destinations-figure-wrapper-img">
            {/*<img className={`trending-destinations__img`} src={`http://localhost:3000${imgSrc}`} alt={alt} />*/}
            {/*<Image fill className="trending-destinations__img" src={`http://localhost:3000${imgSrc}`}*/}
            {/*       alt={alt} />*/}
            <CldImage
              width={140}
              height={140}
              // className={`comments__content-images-wrapper`}
              crop="fill"
              className={`trending-destinations__img`}
              alt={alt}
              src={`${imgSrc}`}
              placeholder="blur"
              blurDataURL={watermarkImage.src}
            />
          </div>
          <h3 className="tertiary-heading">{country}</h3>
          <p>{text}</p>
        </figure>
      </Link>
    </motion.div>
  );
}
