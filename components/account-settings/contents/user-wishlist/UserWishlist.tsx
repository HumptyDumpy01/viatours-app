// 'use client';

import React, { useEffect, useState } from 'react';
import Popup from '@/components/UI/Popup/Popup';
import { AnimatePresence } from 'framer-motion';
import SortBy from '@/components/UI/SortBy/SortBy';
import UserWishlistItems from '@/components/account-settings/contents/user-wishlist/UserWishlistItems';
import { UserWishlistItemType } from '@/components/account-settings/contents/user-wishlist/UserWishlistItem';
import Pagination from '@/components/UI/Pagnation/Pagination';

type UserWishlistType = {
  userEmail: string;
  wishlistItems: UserWishlistItemType[];

  // children: ReactNode;
}

export default function UserWishlist({ userEmail, wishlistItems }: UserWishlistType) {

  console.log(`WishlistItems data: `, wishlistItems);
  const [filteredWishlistItems, setFilteredWishlistItems] = useState<UserWishlistItemType[]>(wishlistItems);
  const [originalWishlistItems] = useState<UserWishlistItemType[]>([...wishlistItems]);

  const [userWishlistItems, setUserWishlistItems] = useState<UserWishlistItemType[]>(wishlistItems);

  const wishlistItemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const [disableClearWishlist, setDisableClearWishlist] = useState<boolean>(false);

  const indexOfLastWishlistItem = currentPage * wishlistItemsPerPage;
  const indexOfFirstNotification = indexOfLastWishlistItem - wishlistItemsPerPage;


  async function handleDeleteWishlistItems() {

    const copiedWishlistItems = [...wishlistItems];
    const copiedFilteredWishlistItems = [...filteredWishlistItems];

    // OPTIMISTIC UI UPDATE
    setFilteredWishlistItems([]);
    setUserWishlistItems([]);

    // Create an api endpoint which extracts user email from the session
    // and deletes his wishlist arr.

    const response = await fetch(`/api/delete-user-data`, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`
      },
      body: JSON.stringify({
        as: `wishlist`,
        userEmail
      })
    });
    const responseData = await response.json();

    if (responseData.error) {
      setFilteredWishlistItems(copiedFilteredWishlistItems);
      setUserWishlistItems(copiedWishlistItems);
      console.error(`Failed to delete all notifications.`);
      return;
    }

  }

  useEffect(() => {

    if (wishlistItems.length === 0) {
      setDisableClearWishlist(true);
    }

    setUserWishlistItems(filteredWishlistItems.slice(indexOfFirstNotification, indexOfLastWishlistItem));

  }, [currentPage, filteredWishlistItems, wishlistItems]);

  function handleWishlistSorting(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value as 'rating' | 'descending' | 'ascending';

    if (wishlistItems.length === 0 || userWishlistItems.length === 0) {
      return;
    }

    let sortedWishlistItems = [...originalWishlistItems];

    if (value === `rating`) {
      sortedWishlistItems = sortedWishlistItems.sort((a, b) => {
        return b.rating - a.rating;
      });
    }
    if (value === `descending`) {
      sortedWishlistItems = sortedWishlistItems.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
    }
    if (value === `ascending`) {
      sortedWishlistItems = sortedWishlistItems.sort((a, b) => {
        return b.title.localeCompare(a.title);
      });
    }

    setFilteredWishlistItems(sortedWishlistItems);
    setCurrentPage(1);
  }

  function handleDeleteWishlistItem(id: string) {
    // TODO: OPTIMISTIC UI UPDATE
    const copiedWishlistItems = [...wishlistItems];
    const copiedFilteredWishlistItems = [...filteredWishlistItems];

    setFilteredWishlistItems(filteredWishlistItems.filter(item => item._id !== id));
    setUserWishlistItems(userWishlistItems.filter(item => item._id !== id));

    // check how many items left in the current page,
    // and if there are no items left, go to the previous page.
    if (userWishlistItems.length === 1) {
      setCurrentPage(currentPage - 1);
    }

    // TODO: Create an api endpoint which extracts user email from the session  and
    //  also passes the id of the item to be deleted from user's wishlist array.
  }

  return (
    <>
      <div className={`account-settings__content__title-wrapper-container`}>
        <div className="account-settings__content__title-wrapper flex">
          <div className="flex flex-align-center gap-15px">
            <h2 className="account-settings__content__title">Wishlist</h2>

            <AnimatePresence>
              <Popup
                labelText={`You can delete all your wishlist items by one click!`}
                showSignUpToNewsletterButton={false} clearBtnLabel={`Clear Wishlist`} userEmail={userEmail}
                signedInToNewsletter={true}
                deleteAllItems={handleDeleteWishlistItems}
                disableClearItems={disableClearWishlist} />
            </AnimatePresence>
          </div>
          <SortBy options={[
            { value: `rating`, label: `Rating` },
            { value: `descending`, label: `Descending(A-Z)` },
            { value: `ascending`, label: `Ascending(Z-A)` }
          ]}
                  handleOnChange={handleWishlistSorting}
                  disabled={wishlistItems.length === 0 || userWishlistItems.length === 0} />
        </div>
        {userWishlistItems.length > 0 && (
          <UserWishlistItems handleDeleteWishlistItem={handleDeleteWishlistItem} wishlistItems={userWishlistItems} />
        )}
        {userWishlistItems.length === 0 && (
          <div className="account-settings__content__empty-wishlist">
            <p>Your wishlist is empty</p>
          </div>
        )}
      </div>

      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalItems={filteredWishlistItems.length}
                  itemsPerPage={wishlistItemsPerPage} />

    </>
  );
}
