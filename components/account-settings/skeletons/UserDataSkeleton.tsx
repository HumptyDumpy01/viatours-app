// 'use client';

import { Skeleton } from '@mui/material';

export default function UserDataSkeleton() {
  return (
    <>
      <div className="account-settings__content__inputs grid grid-two-cols">
        <div className="account-settings__content__input flex flex-column">
          <Skeleton variant="text" width={120} height={22} />
          <Skeleton animation={`wave`} variant="text" width={'100%'} height={73} sx={{
            borderRadius: `12px`
          }} />
        </div>
        <div className="account-settings__content__input flex flex-column">
          <Skeleton variant="text" width={120} height={22} />
          <Skeleton animation={`wave`} variant="text" width={'100%'} height={73} sx={{
            borderRadius: `12px`
          }} />
        </div>

        <div className="account-settings__content__input flex flex-column">
          <Skeleton variant="text" width={120} height={22} />
          <Skeleton animation={`wave`} variant="text" width={'100%'} height={73} sx={{
            borderRadius: `12px`
          }} />
        </div>

        <div className="account-settings__content__input flex flex-column">
          <Skeleton variant="text" width={120} height={22} />
          <Skeleton animation={`wave`} variant="text" width={'100%'} height={73} sx={{
            borderRadius: `12px`
          }} />
        </div>
        <div className="account-settings__content__input flex flex-column">
          <Skeleton variant="text" width={120} height={22} />
          <Skeleton animation={`wave`} variant="text" width={'100%'} height={73} sx={{
            borderRadius: `12px`
          }} />
        </div>
        <div className="account-settings__content__input flex flex-column">
          <Skeleton variant="text" width={120} height={22} />
          <Skeleton animation={`wave`} variant="text" width={'100%'} height={73} sx={{
            borderRadius: `12px`
          }} />
        </div>
      </div>
    </>
  );
}
