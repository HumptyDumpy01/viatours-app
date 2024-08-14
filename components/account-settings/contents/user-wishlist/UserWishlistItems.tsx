// 'use client';
import './UserWishlistItems.scss';
import UserWishlistItem, {
  UserWishlistItemType
} from '@/components/account-settings/contents/user-wishlist/UserWishlistItem';

type UserWishlistItems = {
  wishlistItems: UserWishlistItemType[];
}

export default function UserWishlistItems({ wishlistItems }: UserWishlistItems) {
  return (
    <div className="wishlist-items grid">
      {wishlistItems.map(function(tour) {
        return (
          <UserWishlistItem key={tour._id} {...tour} />
        );
      })}

    </div>
  );
}
