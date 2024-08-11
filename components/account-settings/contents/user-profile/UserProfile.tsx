// 'use client';

import UserProfileHeading from '@/components/account-settings/contents/user-profile/UserProfileHeading';
import User from '@/components/account-settings/contents/user-profile/User';
import UserData from '@/components/account-settings/contents/user-profile/UserData';
import UserProfileAdditional from '@/components/account-settings/contents/user-profile/UserProfileAdditional';
import UserProfileHeadingSkeleton from '@/components/account-settings/skeletons/UserProflleHeadingSkeleton';
import UserSkeleton from '@/components/account-settings/skeletons/UserSkeleton';
import UserDataSkeleton from '@/components/account-settings/skeletons/UserDataSkeleton';
import UserProfileAdditionalSkeleton from '@/components/account-settings/skeletons/UserProfileAdditionalSkeleton';

type UserProfileType = {
  userInitials: string;
  userEmail: string;
  userName: string;
  userLastName: string;
  userPassword: string;
  userPhone: string;
  loading: boolean;
  image: string | null;
  // children: ReactNode;
}

export default function
  UserProfile({
                userInitials,
                userEmail,
                userPassword,
                userPhone,
                userName,
                userLastName,
                loading,
                image
              }: UserProfileType) {

  // INFO: readonly prop should be handled here,
  //  when the btn edit in UserProfileHeading is clicked.

  return (
    <div className={`account-settings-content-container`}>
      {loading && (
        <>
          <UserProfileHeadingSkeleton />
          <UserSkeleton />
          <UserDataSkeleton />
          <UserProfileAdditionalSkeleton />
        </>
      )}
      {!loading && (
        <>
          <UserProfileHeading />
          <User image={image} userInitials={userInitials} userEmail={userEmail} />
          <UserData
            userEmail={userEmail}
            userName={userName}
            userLastName={userLastName}
            readonly={true}
            userPassword={userPassword}
            userPhone={userPhone}
          />
          <UserProfileAdditional />
        </>
      )}
    </div>
  );
}
