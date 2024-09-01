'use client';

import '@/components/UI/Pagnation/Pagination.scss';
import UserNotification from '@/components/account-settings/contents/user-notifications/UserNotification';
import Popup from '@/components/UI/Popup/Popup';
import SortBy from '@/components/UI/SortBy/SortBy';
import { UserNotificationsType } from '@/lib/mongodb';
import Pagination from '@/components/UI/Pagnation/Pagination';
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { container } from '@/components/account-settings/contents/user-tour-purchases/UserTourPurchases';
import CustomizedSnackbar from '@/components/UI/Toast/Snackbar';
import { SnackbarCloseReason } from '@mui/material/Snackbar/useSnackbar.types';

type UserNotificationsTypeComponent = {
  notifications: UserNotificationsType[];
  userEmail: string;
}

export default function UserNotifications({ notifications, userEmail }: UserNotificationsTypeComponent) {
  const notificationsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const sortedNotificationsByDate = notifications.sort((a, b) => (new Date(a.addedAt) > new Date(b.addedAt)) ? -1 : 1);

  const [userNotifications, setUserNotifications] = useState<UserNotificationsType[]>(sortedNotificationsByDate);
  const [filteredNotifications, setFilteredNotifications] = useState<UserNotificationsType[]>(notifications);
  const [originalNotifications] = useState<UserNotificationsType[]>([...notifications]);
  const [userSignedUpToNewsletter, setUserSignedUpToNewsletter] = useState<boolean | undefined>(undefined);
  const [disableClearNotifications, setDisableClearNotifications] = useState<boolean>(false);
  const [userDeletedNotifications, setUserDeletedNotifications] = useState<boolean>(false);


  const [open, setOpen] = useState(false);
  const [toastLabel, setToastLabel] = useState<string>(`Hello there!`);
  const [toastSeverity, setToastSeverity] = useState<string>(`info`);

  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;

  useEffect(() => {

    if (notifications.length === 0) {
      setDisableClearNotifications(true);
    }

    setUserNotifications(filteredNotifications.slice(indexOfFirstNotification, indexOfLastNotification));

    const response = fetch(`/api/user-signed-up-to-newsletter`, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`
      },
      body: JSON.stringify({ userEmail })
    }).then(res => res.json()).then(data => {
      if (data.error) {
        console.error(`Failed to check whether the user signed up to newsletter or not.`);
        return;
      }
      setUserSignedUpToNewsletter(data.userSignedUpToNewsletter);


    }).catch((err) => {
      console.error(`Error fetching user signed up to newsletter data: `, err);
    });
  }, [currentPage, filteredNotifications, userSignedUpToNewsletter, notifications]);

  function handleNotificationSorting(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value as 'newest' | 'oldest' | 'red' | 'green' | 'specials' | 'other' | `default`;

    if (notifications.length === 0 && userNotifications.length === 0) {
      return;
    }

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

    setFilteredNotifications(sortedNotifications);
    setCurrentPage(1);
  }

  async function deleteAllNotifications() {
    const currUserNotifications = [...userNotifications];
    const currFilteredNotifications = [...filteredNotifications];
    // optimistically update the ui
    setUserNotifications([]);
    setFilteredNotifications([]);
    setUserDeletedNotifications(true);
    setOpen(true);
    setToastLabel(`All notifications have been deleted.`);
    setToastSeverity(`success`);

    // create a server function and api route to fetch user email from session
    // and delete all notifications from the database.
    // optimistically update the UI by removing all notifications from the state.
    const response = await fetch(`/api/delete-user-data`, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`
      },
      body: JSON.stringify({
        as: `notifications`,
        userEmail
      })
    });
    const responseData = await response.json();

    if (responseData.error) {
      // if an error occurs, revert the UI to the original state.
      setUserNotifications(currUserNotifications);
      setFilteredNotifications(currFilteredNotifications);
      setUserDeletedNotifications(false);

      console.error(`Failed to delete all notifications.`);
      return;
    }
  }

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: `spring`, stiffness: 100 }}
      viewport={{ once: false }}
      className={`account-settings__content__title-wrapper-container`}>
      <CustomizedSnackbar open={open} handleClose={handleClose} label={toastLabel} severity={toastSeverity} />
      <div className="account-settings__content__title-wrapper flex">
        <div className="flex flex-align-center gap-15px">
          <motion.h2
            whileHover={{ scale: 1.1, backfaceVisibility: `hidden` }}
            whileTap={{ scale: 0.9 }}
            className="account-settings__content__title">Notifications
          </motion.h2>
          <AnimatePresence>
            {userSignedUpToNewsletter !== undefined && (
              <Popup
                labelText={`Each new notification can come right to your inbox!`}
                showSignUpToNewsletterButton
                clearBtnLabel={`Clear Notifications`}
                disableClearItems={disableClearNotifications}
                deleteAllItems={deleteAllNotifications} userEmail={userEmail}
                signedInToNewsletter={userSignedUpToNewsletter} />
            )}
          </AnimatePresence>
        </div>
        <SortBy disabled={userDeletedNotifications || notifications.length === 0}
                handleOnChange={handleNotificationSorting} options={[
          { value: `newest`, label: `Newest` },
          { value: `oldest`, label: `Oldest` },
          { value: `red`, label: `Marked as Red` },
          { value: `green`, label: `Marked as Green` },
          { value: `specials`, label: `Special Offers` },
          { value: `other`, label: `Other` }
        ]} />
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="account-settings__content__element-wrapper grid">
        {userNotifications.length > 0 && userNotifications.map(notification => (
          <UserNotification key={notification.addedAt.toString()} {...notification} />
        ))}
        {userNotifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 200 }}
            className="account-settings__content__element-wrapper__no-items">
            <p>No notifications found.</p>
          </motion.div>
        )}
      </motion.div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalItems={filteredNotifications.length}
                  itemsPerPage={notificationsPerPage} />
    </motion.div>
  );
}