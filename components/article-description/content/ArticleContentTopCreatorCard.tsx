'use client';

import watermarkImage from '@/assets/images/viatours-watermark-logo.svg';
import { CldImage } from 'next-cloudinary';
import React from 'react';

type ArticleContentTopCreatorCardType = {
  image: string;
  name: string;
  role: string;
  // children: ReactNode;
}

export default function ArticleContentTopCreatorCard({ image, name, role }: ArticleContentTopCreatorCardType) {

  const capitalizedRole = role.charAt(0).toUpperCase() + role.slice(1);
  return (
    <>
      <div
        className="tour-article-descr__extra-info__author flex flex-align-center top-creators-container text-decoration-none">
        <CldImage
          width={70}
          height={70}
          src={image}
          alt={`Author image`}
          quality="auto:best"
          format={`auto`}
          placeholder="blur"
          className="tour-article-descr__extra-info__author-img"
          blurDataURL={watermarkImage.src}
        />
        <div className="grid tour-article-descr__extra-info__author-credentials">
          <p className="tour-article-descr__extra-info__author-name top-creators-author">{name}</p>
          <p className="tour-article-descr__extra-info__author-employment top-creators-employment">{capitalizedRole}</p>
        </div>
      </div>
    </>
  );
}
