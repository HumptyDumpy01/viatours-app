'use client';

import { useRouter } from 'next/navigation';

type AccountSettingsSidebarType = {
  activeUrl: 'profile' | `notifications` | `wishlist` | `tour-purchases` | `delete-account`;
  notificationsCount: number;
  // children: ReactNode;
}

export default function AccountSettingsSidebar({ activeUrl, notificationsCount }: AccountSettingsSidebarType) {
  const router = useRouter();

  return (
    <div className="account-settings__sidebar">
      <div className="account-settings__sidebar__element">
        <button onClick={() => router.push(`/account-settings?page=profile`)}
                className={`btn account-settings__element-title my-profile ${activeUrl === `profile` ? `active` : ``}`}>My
          Profile
        </button>
        <div className="account-settings__line"></div>
      </div>
      <div className="account-settings__sidebar__element fix-alpha-badge">
        <button onClick={() => router.push(`/account-settings?page=notifications`)}
                className={`btn account-settings__element-title notifications  ${activeUrl === `notifications` ? `active` : ``}`}>Notifications
        </button>
        <div className="account-settings__line"></div>
        <div className="alpha-badge">
          <span className="notifications">{notificationsCount}</span>
        </div>
      </div>
      <div className="account-settings__sidebar__element">
        <button onClick={() => router.push(`/account-settings?page=wishlist`)}
                className={`btn account-settings__element-title  ${activeUrl === `wishlist` ? `active` : ``}`}>Wishlist
        </button>
        <div className="account-settings__line"></div>
      </div>
      <div className="account-settings__sidebar__element">
        <button onClick={() => router.push(`/account-settings?page=tour-purchases`)}
                className={`btn account-settings__element-title  ${activeUrl === `tour-purchases` ? `active` : ``}`}>Tour
          Purchases
        </button>
        <div className="account-settings__line"></div>
      </div>
      <div className="account-settings__sidebar__element delete-account">
        <button onClick={() => router.push(`/account-settings?page=delete-account`)}
                className={`btn account-settings__element-title delete-account ${activeUrl === `delete-account` ? `active` : ``} `}>Delete
          Account
        </button>
        <div className="account-settings__line"></div>
      </div>
    </div>
  );
}
