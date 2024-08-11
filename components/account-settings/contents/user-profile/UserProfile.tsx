// 'use client';

import UserSkeleton from '@/components/account-settings/skeletons/UserSkeleton';
import UserProfileHeadingSkeleton from '@/components/account-settings/skeletons/UserProflleHeadingSkeleton';
import UserDataSkeleton from '@/components/account-settings/skeletons/UserDataSkeleton';
import UserProfileAdditionalSkeleton from '@/components/account-settings/skeletons/UserProfileAdditionalSkeleton';
import UserProfileHeading from '@/components/account-settings/contents/user-profile/UserProfileHeading';
import User from '@/components/account-settings/contents/user-profile/User';
import UserData from '@/components/account-settings/contents/user-profile/UserData';
import UserProfileAdditional from '@/components/account-settings/contents/user-profile/UserProfileAdditional';

type UserProfileType = {
  userInitials: string;
  userEmail: string;
  userName: string;
  userLastName: string;
  userPassword: string;
  userPhone: string;
  // children: ReactNode;
}

export default function
  UserProfile({
                userInitials,
                userEmail,
                userPassword,
                userPhone,
                userName,
                userLastName
              }: UserProfileType) {

  // INFO: readonly prop should be handled here,
  //  when the btn edit in UserProfileHeading is clicked.

  return (
    <div className={`account-settings-content-container`}>
      <UserProfileHeading />
      {/*<UserProfileHeadingSkeleton />*/}
      <User userInitials={userInitials} userEmail={userEmail} />
      {/*<UserSkeleton />*/}
      <UserData
        userEmail={userEmail}
        userName={userName}
        userLastName={userLastName}
        readonly={true}
        userPassword={userPassword}
        userPhone={userPhone}
      />
      {/*<UserDataSkeleton />*/}
      <UserProfileAdditional />
      {/*<UserProfileAdditionalSkeleton />*/}
    </div>
  );
}
