// 'use client';
import '@/components/account-settings/contents/user-notifications/UserNotification.scss';
import { Skeleton } from '@mui/material';

export default function UserNotificationSkeleton() {
  return (
    <>
      <div className="account-settings__content__element grid gap-16px">
        <div>
          <Skeleton animation={`wave`} variant="circular" width={55} height={55} />
        </div>
        <div className="grid account-settings__content__element-skeleton">
          <h2 className="account-settings__content__element-title-skeleton">
            <Skeleton animation={`wave`} variant="text" width={`90%`} height={26} />
          </h2>
          <div className="account-settings__content__element-date">
            <Skeleton animation={`wave`} variant="text" width={80} height={20} />
          </div>
        </div>
      </div>
    </>
  );
}