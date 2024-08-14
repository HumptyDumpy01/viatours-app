// 'use client';

import React, { useState } from 'react';
import Popup from '@/components/UI/Popup/Popup';
import { AnimatePresence } from 'framer-motion';
import SortBy from '@/components/UI/SortBy/SortBy';
import UserWishlistItems from '@/components/account-settings/contents/user-wishlist/UserWishlistItems';
import { UserWishlistItemType } from '@/components/account-settings/contents/user-wishlist/UserWishlistItem';

type UserWishlistType = {
  userEmail: string;
  deleteAllItems: () => void;
  wishlistItems: UserWishlistItemType[];

  // children: ReactNode;
}

export default function UserWishlist({ userEmail, deleteAllItems, wishlistItems }: UserWishlistType) {

  const [disableClearWishlist, setDisableClearWishlist] = useState<boolean>(false);
  const [userSignedUpToNewsletter, setUserSignedUpToNewsletter] = useState<boolean | undefined>(undefined);


  function handleWishlistSorting(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value as 'newest' | 'oldest' | 'red' | 'green' | 'specials' | 'other' | `default`;
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
                deleteAllItems={deleteAllItems}
                disableClearItems={disableClearWishlist} />
            </AnimatePresence>
          </div>
          <SortBy options={[
            { value: `newest`, label: `Newest` },
            { value: `oldest`, label: `Oldest` },
            { value: `descending`, label: `Descending(Z-A)` },
            { value: `ascending`, label: `Ascending(Z-A)` }
          ]}
                  handleOnChange={handleWishlistSorting}
                  disabled={wishlistItems.length === 0} />
        </div>
        <UserWishlistItems wishlistItems={wishlistItems} />
      </div>

    </>
  );
}
