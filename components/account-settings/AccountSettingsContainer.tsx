'use client';

import UserProfile from '@/components/account-settings/contents/user-profile/UserProfile';
import { useSession } from 'next-auth/react';
import AccountSettingsSidebar from '@/components/account-settings/AccountSettingsSidebar';
import React, { useEffect, useState } from 'react';
import AccountSettingsSidebarSkeleton from '@/components/skeletons/other/Sidebar/AccountSettingsSkeleton';
import { UserNotificationsType, UserType } from '@/lib/mongodb';
import UserProfileHeadingSkeleton from '@/components/account-settings/skeletons/UserProflleHeadingSkeleton';
import UserSkeleton from '@/components/account-settings/skeletons/UserSkeleton';
import UserDataSkeleton from '@/components/account-settings/skeletons/UserDataSkeleton';
import UserProfileAdditionalSkeleton from '@/components/account-settings/skeletons/UserProfileAdditionalSkeleton';
import UserNotifications from '@/components/account-settings/contents/user-notifications/UserNotifications';

type AccountSettingsContainerType = {
  page: 'profile' | `notifications` | `wishlist` | `tour-purchases` | `delete-account`;
  // children: ReactNode;
}

export default function AccountSettingsContainer({ page }: AccountSettingsContainerType) {

  const [userData, setUserData] = useState<UserType>();
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
          options: { _id: 0 }
        })

      }).then(res => res.json()).then(data => {
        // console.log(`Fetched User Data: `, data.result[0]);

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
          {isLoading && (
            <>
              <AccountSettingsSidebarSkeleton />
              <div className="account-settings__content">
                <div className={`account-settings-content-container`}>
                  <UserProfileHeadingSkeleton />
                  <UserSkeleton />
                  <UserDataSkeleton />
                  <UserProfileAdditionalSkeleton />
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
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
