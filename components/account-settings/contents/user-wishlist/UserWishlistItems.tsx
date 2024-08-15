// 'use client';
import './UserWishlistItems.scss';
import UserWishlistItem, {
  UserWishlistItemType
} from '@/components/account-settings/contents/user-wishlist/UserWishlistItem';

type UserWishlistItems = {
  wishlistItems: UserWishlistItemType[];
  handleDeleteWishlistItem: (id: string) => void;
}

export default function UserWishlistItems({ wishlistItems, handleDeleteWishlistItem }: UserWishlistItems) {
  return (
    <div className="wishlist-items grid">
      {wishlistItems.map(function(tour) {
        return (
          <>
            {/*@ts-ignore*/}
            <UserWishlistItem handleDeleteWishlistItem={handleDeleteWishlistItem}
                              key={tour._id} {...tour} />
          </>
        );
      })}

    </div>
  );
}
