// 'use client';

type UserProfileType = {
  userInitials: string;
  userEmail: string;
  userName: string;
  userLastName: string;
  userPassword: string;
  userPhone: string;
  // children: ReactNode;
}

import UserProfileHeading from '@/components/account-settings/contents/user-profile/UserProfileHeading';
import User from '@/components/account-settings/contents/user-profile/User';
import UserData from '@/components/account-settings/contents/user-profile/UserData';
import UserProfileAdditional from '@/components/account-settings/contents/user-profile/UserProfileAdditional';

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
      <User userInitials={userInitials} userEmail={userEmail} />
      <UserData
        userEmail={userEmail}
        userName={userName}
        userLastName={userLastName}
        readonly={true}
        userPassword={userPassword}
        userPhone={userPhone}
      />
      <UserProfileAdditional />
    </div>
  );
}
