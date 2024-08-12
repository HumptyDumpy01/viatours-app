'use client';

import { useRouter } from 'next/navigation';
import UserProfile from '@/components/account-settings/contents/user-profile/UserProfile';
import { useSession } from 'next-auth/react';
import AccountSettingsSidebar from '@/components/account-settings/AccountSettingsSidebar';
import { useEffect, useState } from 'react';
import AccountSettingsSidebarSkeleton from '@/components/skeletons/other/Sidebar/AccountSettingsSkeleton';
import { UserType } from '@/lib/mongodb';

type AccountSettingsContainerType = {
  page: 'profile' | `notifications` | `wishlist` | `tour-purchases` | `delete-account`;
  // children: ReactNode;
}

export default function AccountSettingsContainer({ page }: AccountSettingsContainerType) {

  const [userData, setUserData] = useState<UserType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // get access to session data
  const { data: session, status } = useSession();
  const router = useRouter();

  // if (!session && status !== `loading`) {
  //   router.push(`/`);
  // }

  if (status === `loading`) {
  }

  useEffect(() => {
    if (session && session.user?.email) {
      console.log(`Session data coming from AccountSettings:`, session);

      // TODO: use useEffect here, get access to user email via session data and
      //  fetch it from the server to get the user data.
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
  }, [session]);


  return (
    <>
      <section className="account-settings-wrapper container">
        <h1 className="secondary-heading account-settings__heading">Account Settings</h1>
        <div className="account-settings grid">
          {isLoading && (
            <AccountSettingsSidebarSkeleton />
          )}
          {!isLoading && (
            <AccountSettingsSidebar notificationsCount={12} activeUrl={page} />
          )}
          <div className="account-settings__content">
            {page === `profile` && (
              <UserProfile
                userEmailFromSession={session?.user?.email || ``}
                loading={isLoading}
                image={userData?.image || null}
                userPassword={userData?.password || null}
                userLastName={userData?.lastName || ``}
                userName={userData?.firstName || ``}
                userEmail={userData?.email || ``}
                userPhone={userData?.phone || ``}
                userInitials={`${userData?.firstName} ${userData?.lastName}`}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
