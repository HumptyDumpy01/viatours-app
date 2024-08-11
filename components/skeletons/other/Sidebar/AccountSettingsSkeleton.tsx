import { Skeleton } from '@mui/material';

export default function AccountSettingsSidebarSkeleton() {
  return (
    <div className="account-settings__sidebar">
      <div className="account-settings__sidebar__element-skeleton">
        <button
          className={`btn account-settings__element-title-skeleton my-profile flex flex-align-center justify-center`}>
          <Skeleton animation={`wave`} variant="text" width={`16rem`} height={28} />
        </button>
        <div className="account-settings__line"></div>
      </div>
      <div className="account-settings__sidebar__element-skeleton">
        <button
          className={`btn account-settings__element-title-skeleton my-profile flex flex-align-center justify-center`}>
          <Skeleton animation={`wave`} variant="text" width={`14rem`} height={28} />
        </button>
        <div className="account-settings__line"></div>
      </div>
      <div className="account-settings__sidebar__element-skeleton">
        <button
          className={`btn account-settings__element-title-skeleton my-profile flex flex-align-center justify-center`}>
          <Skeleton animation={`wave`} variant="text" width={`16rem`} height={28} />
        </button>
        <div className="account-settings__line"></div>
      </div>

      <div className="account-settings__sidebar__element-skeleton">
        <button
          className={`btn account-settings__element-title-skeleton my-profile flex flex-align-center justify-center`}>
          <Skeleton animation={`wave`} variant="text" width={`10rem`} height={28} />
        </button>
        <div className="account-settings__line"></div>
      </div>
    </div>
  );
}