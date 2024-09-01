// 'use client';

import { savedArticlesType } from '@/components/account-settings/contents/user-saved-articles/UserSavedArticles';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';
import React from 'react';
import watermarkImage from '@/assets/images/viatours-watermark-logo.svg';

type UserSavedArticlesCardType = {
  savedArticle: savedArticlesType;
  // children: ReactNode;
}

export default function UserSavedArticlesCard({ savedArticle }: UserSavedArticlesCardType) {
  // the savedArticles.createdAt is in ISO 8601 format. I do want to see e.g. December 15, 2023 instead
  const date = new Date(savedArticle.createdAt);
  const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const capitalizedType = savedArticle.type.map((type) => type.charAt(0).toUpperCase() + type.slice(1)).join(`, `);

  return (
    <>
      <figure className="account-settings__content__card grid">
        <div className="account-settings__content__card__img-container">
          <CldImage
            width={290}
            height={252}
            crop="fill"
            className={`account-settings__content__card__img`}
            alt={savedArticle.title}
            src={`${savedArticle.image}`}
            placeholder="blur"
            blurDataURL={watermarkImage.src}
          />
        </div>
        <div className="card-badge">{capitalizedType}</div>
        <svg className="delete-article-icon" xmlns="http://www.w3.org/2000/svg" width="27" height="27"
             viewBox="0 0 27 27"
             fill="none">
          <path
            d="M22.5166 13.0359C22.5166 18.2719 18.2719 22.5166 13.0359 22.5166C7.79988 22.5166 3.55525 18.2719 3.55525 13.0359C3.55525 7.79988 7.79988 3.55525 13.0359 3.55525C18.2719 3.55525 22.5166 7.79988 22.5166 13.0359Z"
            fill="white" />
          <path
            d="M13.0539 0C5.78101 0 0 5.76332 0 13.0139C0 20.2646 5.78101 26.0279 13.0539 26.0279C20.3268 26.0279 26.1078 20.2646 26.1078 13.0139C26.1078 5.76332 20.3268 0 13.0539 0ZM18.089 19.5209L13.0539 14.5012L8.01882 19.5209L6.52695 18.0336L11.562 13.0139L6.52695 7.99428L8.01882 6.50697L13.0539 11.5266L18.089 6.50697L19.5808 7.99428L14.5458 13.0139L19.5808 18.0336L18.089 19.5209Z"
            fill="#EB662B" />
        </svg>
        <div className="account-settings__content__card-date-container flex flex-align-center">
          <span
            className="account-settings__content__card-date inline-block highlighted">{savedArticle.rating.toFixed(1)}</span>
          <span className="account-settings__content__card-date inline-block">{formattedDate}</span>
          <span className="account-settings__content__card-date__author inline-block">By {savedArticle.author}</span>
        </div>
        <Link target={`_blank`} href={`/articles/${savedArticle._id}`}
              className="text-decoration-none border-radius-12px">
          <figcaption
            className="account-settings__content__card__text text-decoration-underline">{savedArticle.title.length > 60 ? savedArticle.title.slice(0, 60) + `..` : savedArticle.title}</figcaption>
        </Link>
      </figure>
    </>
  );
}
