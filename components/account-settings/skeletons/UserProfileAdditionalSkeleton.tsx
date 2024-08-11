// 'use client';
import '@/components/account-settings/contents/user-profile/UserProfileAdditional.scss';
import { Skeleton } from '@mui/material';
/*type UserProfileAdditionalType = {
  // children: ReactNode;
}*/

export default function UserProfileAdditionalSkeleton(/*{  }: UserProfileAdditionalType*/) {
  return (
    <div className="account-settings__content__secondary">
      <h3 className="account-settings__content__secondary-heading">
        <Skeleton variant="text" width={200} height={30} />
      </h3>
      <div className="account-settings__content__secondary__p-wrapper ">
        <Skeleton variant="circular" width={20} height={20} />
        <Skeleton variant="text" animation={`wave`} className={`account-settings__content__secondary__p`} width={`80%`}
                  height={20} />
      </div>

      <div className="account-settings__content__secondary__p-wrapper ">
        <Skeleton variant="circular" width={20} height={20} />
        <Skeleton variant="text" animation={`wave`} className={`account-settings__content__secondary__p`} width={`50%`}
                  height={20} />
      </div>
      <div className="account-settings__content__secondary__p-wrapper ">
        <Skeleton variant="circular" width={20} height={20} />
        <Skeleton variant="text" animation={`wave`} className={`account-settings__content__secondary__p`} width={`30%`}
                  height={20} />
      </div>
    </div>
  );
}
