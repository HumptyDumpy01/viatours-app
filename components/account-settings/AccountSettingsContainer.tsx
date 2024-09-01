'use client';

import UserProfile from '@/components/account-settings/contents/user-profile/UserProfile';
import { useSession } from 'next-auth/react';
import AccountSettingsSidebar from '@/components/account-settings/AccountSettingsSidebar';
import React, { useEffect, useState } from 'react';
import AccountSettingsSidebarSkeleton from '@/components/skeletons/other/Sidebar/AccountSettingsSkeleton';
import { UserNotificationsType } from '@/lib/mongodb';
import UserProfileHeadingSkeleton from '@/components/account-settings/skeletons/profile/UserProflleHeadingSkeleton';
import UserSkeleton from '@/components/account-settings/skeletons/profile/UserSkeleton';
import UserDataSkeleton from '@/components/account-settings/skeletons/profile/UserDataSkeleton';
import UserProfileAdditionalSkeleton
  from '@/components/account-settings/skeletons/profile/UserProfileAdditionalSkeleton';
import UserNotifications from '@/components/account-settings/contents/user-notifications/UserNotifications';
import UserNotificationSkeleton from '@/components/account-settings/skeletons/notifications/UserNotificationSkeleton';
import UserWishlist from '@/components/account-settings/contents/user-wishlist/UserWishlist';
import { UserWishlistItemType } from '@/components/account-settings/contents/user-wishlist/UserWishlistItem';
import { Timestamp } from 'mongodb';
import UserWishlistItemsSkeletons from '@/components/account-settings/skeletons/wishlist/UserWishlistSkeletons';
import UserTourPurchases from '@/components/account-settings/contents/user-tour-purchases/UserTourPurchases';
import UserTourPurchasesSkeleton
  from '@/components/account-settings/skeletons/tour-purchases/UserTourPurchasesSkeleton';
import UserDeleteAccount from '@/components/account-settings/contents/user-delete-account/UserDeleteAccount';
import UserSavedArticles, {
  savedArticlesType
} from '@/components/account-settings/contents/user-saved-articles/UserSavedArticles';

type AccountSettingsContainerType = {
  page: 'profile' | `notifications` | `wishlist` | `tour-purchases` | `delete-account` | `saved-articles`;
  // children: ReactNode;
}

export type UserOrdersType = {
  _id: string;
  date: string;
  registeredManually: boolean;
  contactDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: number
    getEmailsWithOffers?: boolean;
  };

  tickets: {
    overall: number;
    adultTickets: number;
    youthTickets: number;
    childrenTickets: number;
  },
  totalPrice: number;
  extraDetails: {
    refund: {
      available: boolean;
      requested: boolean;
    },
    cancellation: {
      available: boolean;
      requested: boolean;
    },
    createdAt: string;
    timestamp: Timestamp;
    promoApplied: boolean;
    tourDiscount: number | null;
    state: {
      status: `pending` | `scheduled` | `cancelled` | `refunded` | `booked` | `ongoing` | `completed`;
      confirmed: boolean;
      paid: boolean;
      refunded: boolean;
      cancelled: boolean;
    }
  },
  // this one is unwounded tour data the user bought tickets for, + I projected only the necessary fields.
  tour: {
    _id: string;
    title: string;
    location: string;
    image: string,
    rating: number,
    reviews: number,
    duration: string
  }
}

export type UnwoundUserData = {
  _id: string;
  email: string;
  firstName: string;
  image: string | null;
  registeredManually: boolean;
  twoFactorAuthEnabled: boolean;
  // can be null because e.g. Google Auth/GitHub doesn't provide a last name
  lastName: string | null;
  // can be null because  by registering with Google Auth/GitHub, the user doesn't provide a password
  password: string | null;
  // can be null because I do not require the user to provide a phone number when
  // he registers
  phone: string | null;
  notifications: UserNotificationsType[] | [];
  wishlist: UserWishlistItemType[] | [];
  // When working with saved articles, make sure to change the type to the correct one.
  savedArticles: savedArticlesType[] | [];
  orders: UserOrdersType[] | [];
}

export default function AccountSettingsContainer({ page }: AccountSettingsContainerType) {

  const [userData, setUserData] = useState<UnwoundUserData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // get access to session data
  const { data: session, status, update } = useSession();

  useEffect(() => {
    if (session && session.user?.email) {
      // console.log(`Session data coming from AccountSettings:`, session);


      // use useEffect here, get access to user email via session data and
      // fetch it from the server to get the user data.
      const fetchedUser = fetch(`/api/fetch-user`, {
        method: `POST`,
        headers: {
          'Content-Type': `application/json`
        },
        body: JSON.stringify({
          userEmail: session?.user.email,
          options: { _id: 0 },
          unwind: true
        })

      }).then(res => res.json()).then(data => {

        setIsLoading(false);

        setUserData(data.result[0]);

      }).catch((err) => {
        setIsLoading(false);
        console.error(`Error fetching user data: `, err);
      });

    }
  }, [session, page]);


  return (
    <>
      <section className="account-settings-wrapper container">
        <h1 className="secondary-heading account-settings__heading">Account Settings</h1>
        <div className="account-settings grid">
          {(isLoading) && (
            <>
              <AccountSettingsSidebarSkeleton />
              <div className="account-settings__content">
                <div className={`account-settings-content-container`}>
                  <UserProfileHeadingSkeleton />
                  {page === `profile` && (
                    <>
                      <UserSkeleton />
                      <UserDataSkeleton />
                      <UserProfileAdditionalSkeleton />
                    </>
                  )}
                  {page === `notifications` && (
                    <div className={`grid gap-13px margin-top-big`}>
                      <UserNotificationSkeleton />
                      <UserNotificationSkeleton />
                      <UserNotificationSkeleton />
                      <UserNotificationSkeleton />
                      <UserNotificationSkeleton />
                    </div>
                  )}
                  {(page === `wishlist` || page === `saved-articles`) && (
                    <>
                      <UserWishlistItemsSkeletons />
                    </>
                  )}
                  {page === `tour-purchases` && (
                    <>
                      <UserTourPurchasesSkeleton />
                    </>
                  )}
                </div>
              </div>
            </>
          )}
          {!isLoading && (
            <AccountSettingsSidebar notificationsCount={Number(userData?.notifications.length)} activeUrl={page} />
          )}
          {(!isLoading && session && session.user?.email && userData) && (
            <>
              <div className="account-settings__content">
                {page === `profile` && (
                  <UserProfile
                    updateSession={update}
                    registeredManually={userData.registeredManually}
                    userEmailFromSession={String(session.user!.email)}
                    twoFactorAuthEnabled={userData.twoFactorAuthEnabled}
                    image={userData.image}
                    userPassword={userData.password}
                    userLastName={userData.lastName}
                    userName={userData.firstName}
                    userEmail={userData.email}
                    userPhone={userData.phone}
                    userInitials={`${userData.firstName} ${userData.lastName}`}
                  />
                )}
                {page === `notifications` && (
                  <>
                    <UserNotifications userEmail={session.user.email}
                                       notifications={userData.notifications as UserNotificationsType[]} />
                  </>
                )}
                {page === `wishlist` && (
                  <>
                    <UserWishlist
                      wishlistItems={userData.wishlist.length > 0 ? userData.wishlist as UserWishlistItemType[] : []}
                      userEmail={userData.email}
                    />
                  </>
                )}
                {page === `tour-purchases` && (
                  <>
                    <UserTourPurchases userOrders={userData.orders} />
                  </>
                )}
                {page === `saved-articles` && (
                  <>
                    <UserSavedArticles userSavedArticles={userData.savedArticles} />
                  </>
                )}
                {page === `delete-account` && (
                  <>
                    <UserDeleteAccount userEmail={userData.email} />
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
