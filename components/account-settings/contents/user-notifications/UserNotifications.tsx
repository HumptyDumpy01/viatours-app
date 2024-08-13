// 'use client';
import '@/components/UI/Pagnation/Pagination.scss';
import UserNotification from '@/components/account-settings/contents/user-notifications/UserNotifcation';

import Popup from '@/components/UI/Popup/Popup';
import SortBy from '@/components/UI/SortBy/SortBy';
import { UserNotificationsType } from '@/lib/mongodb';
import Pagination from '@/components/UI/Pagnation/Pagination';

type UserNotificationsTypeComponent = {
  notifications: UserNotificationsType[];
  // children: ReactNode;
}

export default function UserNotifications({ notifications }: UserNotificationsTypeComponent) {

  return (
    <div className={`account-settings__content__title-wrapper-container`}>
      <div className="account-settings__content__title-wrapper flex">
        <div className="flex flex-align-center gap-15px">
          <h2 className="account-settings__content__title">Notifications</h2>
          <Popup />
        </div>
        <SortBy options={[
          { value: `newest`, label: `Newest` },
          { value: `oldest`, label: `Oldest` },
          { value: `red`, label: `Marked as Red` },
          { value: `green`, label: `Marked as Green` },
          { value: `specials`, label: `Special Offers` },
          { value: `other`, label: `Other` }
        ]} />
      </div>
      <div className="account-settings__content__element-wrapper grid">
        {notifications.map(function(notification: UserNotificationsType) {
          return (
            <>
              <UserNotification {...notification} />
            </>
          );
        })}
      </div>
      <Pagination currentPage={1} setCurrentPage={() => {
      }} totalItems={6} itemsPerPage={6} />
    </div>
  );
}
