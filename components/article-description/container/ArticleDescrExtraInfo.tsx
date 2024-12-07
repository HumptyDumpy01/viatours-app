'use client';

import Link from 'next/link';
import { ArticleAuthorType } from '@/app/articles/[id]/page';
import watermarkImage from '@/assets/images/viatours-watermark-logo.svg';
import { CldImage } from 'next-cloudinary';
import React, { useEffect, useRef, useState } from 'react';
import { SessionType } from '@/components/UI/Comment/Comment';
import { SnackbarCloseReason } from '@mui/material/Snackbar/useSnackbar.types';
import CustomizedSnackbar from '@/components/UI/Toast/Snackbar';
import { Skeleton } from '@mui/material';
import { motion } from 'framer-motion';

type ArticleDescrExtraInfoType = {
  author: ArticleAuthorType;
  session: SessionType;
  readTime: string;
  articleId: string;
  // children: ReactNode;
}

export default function ArticleDescrExtraInfo({ author, readTime, session, articleId }: ArticleDescrExtraInfoType) {

  const [open, setOpen] = useState<boolean>(false);
  const [toastLabel, setToastLabel] = useState<string>(`Hello there!`);
  const [toastSeverity, setToastSeverity] = useState<string>(`info`);

  const [isArticleInUserList, setIsArticleInUserList] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [disableBtn, setDisableBtn] = useState<boolean>(false);

  const timer = useRef<NodeJS.Timeout | null>(null);

  async function isUserAddedArticle() {
    const response = await fetch(`/api/is-user-have-article-in-list`, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`
      },
      body: JSON.stringify({ session, articleId })
    }).then((response) => {
      setIsLoading(false);
      return response.json();
    }).catch((error) => {
      console.error(`Error while fetching the data: `, error);
    });

    if (response.error) {
      console.error(`Failed to fetch article`);
      return;
    }
    setIsArticleInUserList(response.status);

  }

  async function handleArticleSaveOrRemoveAction(type: `add` | `remove`) {

    const response = await fetch(`/api/handle-add-or-remove-article-from-list`, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`
      },
      body: JSON.stringify({ type, session, articleId })

    }).then((response) => response.json()).catch((error) => {
      console.error(`Error while fetching the data: `, error);
    });

    if (response.error) {
      setToastLabel(`Failed to ${type} the article from the list: ${response.message}`);
      setToastSeverity(`error`);
      setOpen(true);

      return;
    }
  }

  useEffect(() => {
    /* Create an api endpoint that would return true or false based on
    *  whether the user has articleId in his savedArticles Array or not */
    isUserAddedArticle();

  }, []);

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

  async function handleSaveArticleToList() {
    if (isLoading) {
      return;
    }

    // means the user is not logged in
    if (session.user.email === ``) {
      setToastLabel(`Please sign in to add the article to savedArticles list!`);
      setToastSeverity(`warning`);
      setOpen(true);
      return;
    }

    /* ADD OR REMOVE THIS ARTICLE FROM USER'S SAVED_ARTICLES LIST BY USING API ENDPOINT */

    if (isArticleInUserList) {
      setDisableBtn(true);
      /* INFO: Optimistically update the UI */
      setIsArticleInUserList(false);

      await handleArticleSaveOrRemoveAction(`remove`).catch((error) => {
        console.error(`Error while fetching the data: `, error);
      });

      timer.current = setTimeout(function() {
        setDisableBtn(false);
      }, 2000);

    }

    if (!isArticleInUserList) {
      setDisableBtn(true);
      /* INFO: Optimistically update the UI */
      setIsArticleInUserList(true);

      await handleArticleSaveOrRemoveAction(`add`).catch((error) => {
        console.error(`Error while fetching the data: `, error);
      });

      timer.current = setTimeout(function() {
        setDisableBtn(false);
      }, 2000);
    }

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
          <motion.button
            whileTap={{ scale: 0.9 }}
            transition={{ type: `spring`, stiffness: 260, damping: 20 }}
            type="button" className="btn tour-article-descr__extra-info__actions-share background-white">Share
          </motion.button>
          {isLoading && (
            <>
              <Skeleton variant="rounded" width={60} height={10} />
            </>
          )}
          {!isLoading && (
            <>
              <motion.button
                whileTap={{ scale: 0.9 }}
                transition={{ type: `spring`, stiffness: 260, damping: 20 }}
                disabled={disableBtn}
                onClick={handleSaveArticleToList}
                type="button"
                className={`btn text-no-wrap tour-article-descr__extra-info__actions-save background-white ${isArticleInUserList ? `highlighted` : ``}`}>
                {isArticleInUserList ? `Remove from Saved` : `Save`}
              </motion.button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
