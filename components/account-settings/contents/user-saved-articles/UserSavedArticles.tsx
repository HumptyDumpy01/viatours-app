'use client';

import CustomizedSnackbar from '@/components/UI/Toast/Snackbar';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { SnackbarCloseReason } from '@mui/material/Snackbar/useSnackbar.types';
import Popup from '@/components/UI/Popup/Popup';
import SortBy from '@/components/UI/SortBy/SortBy';
import './UserSavedArticles.scss';
import UserSavedArticlesCards from '@/components/account-settings/contents/user-saved-articles/UserSavedArticlesCards';
import UserSavedArticlesCard from '@/components/account-settings/contents/user-saved-articles/UserSavedArticlesCard';
import Pagination from '@/components/UI/Pagnation/Pagination';

export type savedArticlesType = {
  _id: string;
  title: string;
  type: string[],
  image: string;
  rating: number;
  createdAt: string;
  author: string;
};

export type UserSavedArticlesType = {
  userSavedArticles: savedArticlesType[] | [];
  // children: ReactNode;
}

export default function UserSavedArticles({ userSavedArticles }: UserSavedArticlesType) {

  const [filteredSavedArticlesItems, setFilteredWishlistItems] = useState<savedArticlesType[]>(userSavedArticles);
  const [originalWishlistItems, setOriginalWishlistItems] = useState<savedArticlesType[]>([...userSavedArticles]);

  const savedArticlesItemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastArticleItem = currentPage * savedArticlesItemsPerPage;
  const indexOfFirstArticle = indexOfLastArticleItem - savedArticlesItemsPerPage;

  const [open, setOpen] = useState(false);
  const [toastLabel, setToastLabel] = useState<string>(`Hello there!`);
  const [toastSeverity, setToastSeverity] = useState<string>(`info`);
  const [disableClearSavedArticles, setDisableClearSavedArticles] = useState<boolean>(false);
  const [savedArticlesItems, setSavedArticlesItems] = useState<[] | savedArticlesType[]>(userSavedArticles);


  useEffect(() => {
    if (userSavedArticles.length === 0) {
      setDisableClearSavedArticles(true);
    }

    setSavedArticlesItems(filteredSavedArticlesItems.slice(indexOfFirstArticle, indexOfLastArticleItem));
  }, [currentPage, filteredSavedArticlesItems]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  async function handleDeleteSavedArticles() {
    /* TODO: Create an api end point  to delete all saved articles from user savedArticles list.
    *   Get access to session email and apply all the necessary validation.*/
  }


  async function handleSavedArticlesSorting(event: React.ChangeEvent<HTMLSelectElement>) {

    const value = event.target.value as 'rating' | 'descending' | 'ascending';
    let sortedSavedArticlesItems = [...originalWishlistItems];

    if (savedArticlesItems.length === 0 || userSavedArticles.length === 0) {
      return;
    }

    if (value === `rating`) {
      // @ts-ignore
      sortedSavedArticlesItems = sortedSavedArticlesItems.sort((a, b) => b.rating - a.rating);
    }
    if (value === `descending`) {
      sortedSavedArticlesItems = sortedSavedArticlesItems.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (value === `ascending`) {
      sortedSavedArticlesItems = sortedSavedArticlesItems.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredWishlistItems(sortedSavedArticlesItems);
    setCurrentPage(1);
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: `spring`, stiffness: 100 }}
        viewport={{ once: false }}
      >
        <CustomizedSnackbar open={open} handleClose={handleClose} label={toastLabel} severity={toastSeverity} />
        <div className={`account-settings__content__title-wrapper-container`}>
          <div className="account-settings__content__title-wrapper flex">
            <div className="flex flex-align-center gap-15px">
              <motion.h2
                whileHover={{ scale: 1.1, backfaceVisibility: `hidden` }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: `spring`, stiffness: 260, damping: 20 }}
                className="account-settings__content__title">Saved Articles
              </motion.h2>

              <AnimatePresence>
                <Popup
                  labelText={`You can delete all your saved articles by one click!`}
                  showSignUpToNewsletterButton={false} clearBtnLabel={`Clear Articles`} userEmail={``}
                  signedInToNewsletter={true}
                  deleteAllItems={handleDeleteSavedArticles}
                  disableClearItems={disableClearSavedArticles} />
              </AnimatePresence>
            </div>

            <SortBy options={[
              { value: `rating`, label: `Rating` },
              { value: `descending`, label: `Descending(A-Z)` },
              { value: `ascending`, label: `Ascending(Z-A)` }
            ]}
                    handleOnChange={handleSavedArticlesSorting}
                    disabled={savedArticlesItems.length === 0 || savedArticlesItems.length === 0} />

          </div>
          {savedArticlesItems.length > 0 && (
            <UserSavedArticlesCards>
              {savedArticlesItems.map((savedArticle: savedArticlesType) => (
                <UserSavedArticlesCard key={savedArticle._id} savedArticle={savedArticle} />
              ))}
            </UserSavedArticlesCards>
          )}

          {savedArticlesItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 200 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 200 }}
              className="account-settings__content__empty-wishlist">
              <p>Your wishlist is empty</p>
            </motion.div>
          )}
        </div>

        <Pagination scrollToElem={{
          className: `.account-settings__content__title`,
          offset: 100
        }} currentPage={currentPage} setCurrentPage={setCurrentPage}
                    totalItems={filteredSavedArticlesItems.length}
                    itemsPerPage={savedArticlesItemsPerPage} />
      </motion.div>
    </>
  );
}
