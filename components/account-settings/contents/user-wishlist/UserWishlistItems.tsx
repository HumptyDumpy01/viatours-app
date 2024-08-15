// 'use client';
import './UserWishlistItems.scss';
import UserWishlistItem, {
  UserWishlistItemType
} from '@/components/account-settings/contents/user-wishlist/UserWishlistItem';
import { motion } from 'framer-motion';
import { container } from '@/components/account-settings/contents/user-tour-purchases/UserTourPurchases';

type UserWishlistItems = {
  wishlistItems: UserWishlistItemType[];
  handleDeleteWishlistItem: (id: string) => void;
}

export default function UserWishlistItems({ wishlistItems, handleDeleteWishlistItem }: UserWishlistItems) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="wishlist-items grid">
      {wishlistItems.map(function(tour) {
        return (
          <>
            {/*@ts-ignore*/}
            <UserWishlistItem handleDeleteWishlistItem={handleDeleteWishlistItem}
                              key={tour._id} {...tour} />
          </>
        );
      })}

    </motion.div>
  );
}
