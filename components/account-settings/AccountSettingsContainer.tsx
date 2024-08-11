'use client';

import { useRouter } from 'next/navigation';
import UserProfile from '@/components/account-settings/contents/user-profile/UserProfile';
import { useSession } from 'next-auth/react';
import AccountSettingsSidebarSkeleton from '@/components/skeletons/other/Sidebar/AccountSettingsSkeleton';

type AccountSettingsContainerType = {
  page: 'profile' | `notifications` | `wishlist` | `tour-purchases` | `delete-account`;
  // children: ReactNode;
}

export default function AccountSettingsContainer({ page }: AccountSettingsContainerType) {

  // get access to session data
  const { data: session, status } = useSession();
  const router = useRouter();

  if (!session && status !== `loading`) {
    router.push(`/`);
  }

  if (status === `loading`) {
  }

  if (session) {
    console.log(`Session data coming from AccountSettings:`, session);
  }

  // TODO: use useEffect here, get access to user email via session data and
  //  fetch it from the server to get the user data.

  return (
    <>
      <section className="account-settings-wrapper container">
        <h1 className="secondary-heading account-settings__heading">Account Settings</h1>
        <div className="account-settings grid">
          {/*<AccountSettingsSidebar notificationsCount={12} activeUrl={page} />*/}
          <AccountSettingsSidebarSkeleton />
          <div className="account-settings__content">
            {page === `profile` && (
              <UserProfile
                userPassword={`123`}
                userLastName={`Baker`}
                userName={`Nikolas`}
                userEmail={`example@gmail.com`}
                userPhone={`+1234567890`}
                userInitials={`Nikolas Baker`}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
