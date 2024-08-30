'use client';

import Link from 'next/link';
import { ArticleAuthorType } from '@/app/articles/[id]/page';
import watermarkImage from '@/assets/images/viatours-watermark-logo.svg';
import { CldImage } from 'next-cloudinary';
import React, { useState } from 'react';
import { SessionType } from '@/components/UI/Comment/Comment';
import { SnackbarCloseReason } from '@mui/material/Snackbar/useSnackbar.types';
import CustomizedSnackbar from '@/components/UI/Toast/Snackbar';

type ArticleDescrExtraInfoType = {
  author: ArticleAuthorType;
  session: SessionType;
  readTime: string;
  // children: ReactNode;
}

export default function ArticleDescrExtraInfo({ author, readTime, session }: ArticleDescrExtraInfoType) {

  const [open, setOpen] = useState<boolean>(false);
  const [toastLabel, setToastLabel] = useState<string>(`Hello there!`);
  const [toastSeverity, setToastSeverity] = useState<string>(`info`);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  // capitalize the first letter of the author's role
  const capitalizedRole = author.employment.charAt(0).toUpperCase() + author.employment.slice(1);

  function handleSaveArticleToList() {
    // means the user is not logged in
    if (session.user.email === ``) {
      setToastLabel(`Please sign in to add the article to savedArticles list!`);
      setToastSeverity(`warning`);
      setOpen(true);
      return;
    }
    /* TODO: ADD OR REMOVE THIS ARTICLE FROM USER'S SAVED_ARTICLES LIST BY USING API ENDPOINT */
    console.log(`Article saved to the list!`);

  }

  return (
    <>
      <CustomizedSnackbar open={open} label={toastLabel} severity={toastSeverity} handleClose={handleClose} />
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
          <button onClick={handleSaveArticleToList} type="button"
                  className="btn tour-article-descr__extra-info__actions-save background-white">Save
          </button>
        </div>
      </div>
    </>
  );
}
