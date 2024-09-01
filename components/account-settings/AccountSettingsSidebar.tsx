'use client';

import { useRouter } from 'next/navigation';

type AccountSettingsSidebarType = {
  activeUrl: 'profile' | `notifications` | `wishlist` | `tour-purchases` | `delete-account` | `saved-articles`;
  notificationsCount: number;
  // children: ReactNode;
}

export default function AccountSettingsSidebar({ activeUrl, notificationsCount }: AccountSettingsSidebarType) {
  const router = useRouter();

  return (
    <div className="account-settings__sidebar">
      <div className="account-settings__sidebar__element">
        <button onClick={() => router.push(`/account-settings?page=profile`)}
                className={`btn account-settings__element-title my-profile ${activeUrl === `profile` ? `account-settings-active-url` : ``}`}>My
          Profile
        </button>
        <div className="account-settings__line"></div>
      </div>
      <div className="account-settings__sidebar__element">
        <button onClick={() => router.push(`/account-settings?page=notifications`)}
                className={`btn account-settings__element-title flex justify-center ${activeUrl === `notifications` ? `account-settings-active-url` : ``}`}>
          Notifications<span className={`notifications inline-block`}>({notificationsCount})</span>
        </button>
      </div>
      <div className="account-settings__sidebar__element">
        <button onClick={() => router.push(`/account-settings?page=wishlist`)}
                className={`btn account-settings__element-title  ${activeUrl === `wishlist` ? `account-settings-active-url` : ``}`}>Wishlist
        </button>
        <div className="account-settings__line"></div>
      </div>
      <div className="account-settings__sidebar__element">
        <button onClick={() => router.push(`/account-settings?page=saved-articles`)}
                className={`btn account-settings__element-title  ${activeUrl === `saved-articles` ? `account-settings-active-url` : ``}`}>Saved
          Articles
        </button>
        <div className="account-settings__line"></div>
      </div>
      <div className="account-settings__sidebar__element">
        <button onClick={() => router.push(`/account-settings?page=tour-purchases`)}
                className={`btn account-settings__element-title  ${activeUrl === `tour-purchases` ? `account-settings-active-url` : ``}`}>Tour
          Purchases
        </button>
        <div className="account-settings__line"></div>
      </div>
      <div className="account-settings__sidebar__element delete-account">
        <button onClick={() => router.push(`/account-settings?page=delete-account`)}
                className={`btn account-settings__element-title delete-account ${activeUrl === `delete-account` ? `delete-account-active` : ``} `}>Delete
          Account
        </button>
        <div className="account-settings__line"></div>
      </div>
    </div>
  );
}
