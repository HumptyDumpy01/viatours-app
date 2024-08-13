'use client';

import '@/components/UI/Pagnation/Pagination.scss';
import UserNotification from '@/components/account-settings/contents/user-notifications/UserNotifcation';

import Popup from '@/components/UI/Popup/Popup';
import SortBy from '@/components/UI/SortBy/SortBy';
import { UserNotificationsType } from '@/lib/mongodb';
import Pagination from '@/components/UI/Pagnation/Pagination';
import React, { useEffect, useState } from 'react';

type UserNotificationsTypeComponent = {
  notifications: UserNotificationsType[];
  // children: ReactNode;
}

export default function UserNotifications({ notifications }: UserNotificationsTypeComponent) {

  const notificationsPerPage = 5;
  // define the current page
  const [currentPage, setCurrentPage] = useState(1);
  const [userNotifications, setUserNotifications] = useState<UserNotificationsType[]>(notifications);
  const [originalNotifications] = useState<UserNotificationsType[]>([...notifications]);

  const indexOfLastTour = currentPage * notificationsPerPage;
  const indexOfFirstTour = indexOfLastTour - notificationsPerPage;

  useEffect(() => {
    setUserNotifications(notifications.slice(indexOfFirstTour, indexOfLastTour));
  }, [currentPage, notifications]);

  function handleNotificationSorting(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value as 'newest' | 'oldest' | 'red' | 'green' | 'specials' | 'other' | `default`;

    let sortedNotifications = [...originalNotifications];

    if (value === `newest`) {
      sortedNotifications = sortedNotifications.sort((a, b) => (new Date(a.addedAt) > new Date(b.addedAt)) ? -1 : 1);
    }

    if (value === `oldest`) {
      sortedNotifications = sortedNotifications.sort((a, b) => (new Date(a.addedAt) < new Date(b.addedAt)) ? -1 : 1);
    }

    if (value === `red`) {
      sortedNotifications = sortedNotifications.filter(notification => notification.type === `red`);
    }

    if (value === `green`) {
      sortedNotifications = sortedNotifications.filter(notification => notification.type === `green`);
    }

    if (value === `specials`) {
      sortedNotifications = sortedNotifications.filter(notification => notification.icon === `sale` || notification.icon === `ticket`);
    }

    if (value === `other`) {
      sortedNotifications = sortedNotifications.filter(notification => notification.type === `darkOrange`);
    }

    setUserNotifications(sortedNotifications.slice(indexOfFirstTour, indexOfLastTour));
    console.log(`Sorting by: `, value);
  }

  return (
    <div className={`account-settings__content__title-wrapper-container`}>
      <div className="account-settings__content__title-wrapper flex">
        <div className="flex flex-align-center gap-15px">
          <h2 className="account-settings__content__title">Notifications</h2>
          <Popup />
        </div>
        <SortBy handleOnChange={handleNotificationSorting} options={[
          { value: `newest`, label: `Newest` },
          { value: `oldest`, label: `Oldest` },
          { value: `red`, label: `Marked as Red` },
          { value: `green`, label: `Marked as Green` },
          { value: `specials`, label: `Special Offers` },
          { value: `other`, label: `Other` }
        ]} />
      </div>
      <div className="account-settings__content__element-wrapper grid">
        {userNotifications.length > 0 && userNotifications.map(function(notification: UserNotificationsType) {
          return (
            <UserNotification key={notification.text} {...notification} />
          );
        })}
        {userNotifications.length === 0 && (
          <div className="account-settings__content__element-wrapper__no-items">
            <p>No notifications found.</p>
          </div>
        )}
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalItems={notifications.length}
                  itemsPerPage={notificationsPerPage} />
    </div>
  );
}