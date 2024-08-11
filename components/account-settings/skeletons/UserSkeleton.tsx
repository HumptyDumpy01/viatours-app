// 'use client';

import { Skeleton } from '@mui/material';

export default function UserSkeleton() {
  return (
    <div className="account-settings__content-user-skeleton">
      <div className="account-settings__content-user__info flex flex-align-center">
        <div className="user-logo-wrapper">
          <Skeleton variant="circular" width={62} animation={`wave`} height={62} />
        </div>
        <div className="user-initials">
          <h3 className="user-initials__name">
            <Skeleton variant="text" width={120} height={20} />
          </h3>
          <p className="user-initials__email">
            <Skeleton variant="text" width={100} height={18} />
          </p>
        </div>
      </div>
    </div>
  );
}