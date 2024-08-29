'use client';

import Link from 'next/link';
import { ArticleAuthorType } from '@/app/articles/[id]/page';
import watermarkImage from '@/assets/images/viatours-watermark-logo.svg';
import { CldImage } from 'next-cloudinary';
import React from 'react';

type ArticleDescrExtraInfoType = {
  author: ArticleAuthorType;
  readTime: string;
  // children: ReactNode;
}

export default function ArticleDescrExtraInfo({ author, readTime }: ArticleDescrExtraInfoType) {
  // capitalize the first letter of the author's role
  const capitalizedRole = author.role.charAt(0).toUpperCase() + author.role.slice(1);
  return (
    <>
      <div className="tour-article-descr__extra-info">
        <Link href="#" className="tour-article-descr__extra-info__author flex flex-align-center text-decor-none">
          <CldImage
            width={70}
            height={70}
            src={author.image}
            alt={`Author image`}
            quality="auto:best"
            format={`auto`}
            placeholder="blur"
            className="tour-article-descr__extra-info__author-img"
            blurDataURL={watermarkImage.src}
          />
          <div className="grid tour-article-descr__extra-info__author-credentials">
            <p className="tour-article-descr__extra-info__author-name">{author.name}</p>
            <p className="tour-article-descr__extra-info__author-employment">{capitalizedRole}</p>
          </div>
        </Link>
        <div className="tour-article-descr__extra-info__actions flex flex-align-center">
          <p className="tour-article-descr__extra-info__actions-min-read">{readTime} read</p>
          <button type="button" className="btn tour-article-descr__extra-info__actions-share background-white">Share
          </button>
          <button type="button" className="btn tour-article-descr__extra-info__actions-save background-white">Save
          </button>
        </div>
      </div>
    </>
  );
}
