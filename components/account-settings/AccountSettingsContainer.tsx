'use client';

import UserProfile from '@/components/account-settings/contents/user-profile/UserProfile';
import { useSession } from 'next-auth/react';
import AccountSettingsSidebar from '@/components/account-settings/AccountSettingsSidebar';
import React, { useEffect, useState } from 'react';
import AccountSettingsSidebarSkeleton from '@/components/skeletons/other/Sidebar/AccountSettingsSkeleton';
import { UserNotificationsType } from '@/lib/mongodb';
import UserProfileHeadingSkeleton from '@/components/account-settings/skeletons/UserProflleHeadingSkeleton';
import UserSkeleton from '@/components/account-settings/skeletons/UserSkeleton';
import UserDataSkeleton from '@/components/account-settings/skeletons/UserDataSkeleton';
import UserProfileAdditionalSkeleton from '@/components/account-settings/skeletons/UserProfileAdditionalSkeleton';
import UserNotifications from '@/components/account-settings/contents/user-notifications/UserNotifications';
import UserNotificationSkeleton from '@/components/account-settings/skeletons/UserNotificationSkeleton';
import UserWishlist from '@/components/account-settings/contents/user-wishlist/UserWishlist';
import { UserWishlistItemType } from '@/components/account-settings/contents/user-wishlist/UserWishlistItem';
import { Timestamp } from 'mongodb';
import UserWishlistItemsSkeletons from '@/components/account-settings/skeletons/UserWishlistSkeletons';

type AccountSettingsContainerType = {
  page: 'profile' | `notifications` | `wishlist` | `tour-purchases` | `delete-account`;
  // children: ReactNode;
}

export type UserOrdersType = {
  _id: string;
  date: string;
  tickets: {
    overall: number;
    adultTickets: number;
    youthTickets: number;
    childrenTickets: number;
  },
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
      status: `pending` | `scheduled` | `cancelled` | `refunded` | `booked` | `ongoing` | `finished`;
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
}[]

export type UnwoundUserData = {
  _id: string;
  email: string;
  firstName: string;
  image: string | null;
  // can be null because e.g. Google Auth/GitHub doesn't provide a last name
  lastName: string | null;
  // can be null because  by registering with Google Auth/GitHub, the user doesn't provide a password
  password: string | null;
  // can be null because I do not require the user to provide a phone number when
  // he registers
  phone: string | null;
  notifications: UserNotificationsType[] | [];
  wishlist: UserWishlistItemType[] | [];
  // TODO: When working with saved articles, make sure to change the type to the correct one.
  savedArticles: string[] | [];
  orders: UserOrdersType[] | [];
}

export default function AccountSettingsContainer({ page }: AccountSettingsContainerType) {

  const [userData, setUserData] = useState<UnwoundUserData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // get access to session data
  const { data: session, status } = useSession();

  if (status === `loading`) {
  }

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
        // console.log(`Fetched User Data: `, data.result[0]);

        console.log(`First result: `, data);
        setIsLoading(false);

        /* TEMPORARY */
        console.log(`User Data: `, userData?.wishlist);

        setUserData(data.result[0]);
        console.log(`User Data: `, userData);

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
                  {page === `wishlist` && (
                    <>
                      <UserWishlistItemsSkeletons />
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
                    userEmailFromSession={String(session.user!.email)}
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
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
