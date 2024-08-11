// 'use client';

/*type UserProfileHeadingType = {
  // children: ReactNode;
}*/
import SkeletonHeading from '@/components/skeletons/Heading/SkeletonHeading';
import { Skeleton } from '@mui/material';

export default function UserProfileHeadingSkeleton(/*{  }: UserProfileHeadingType*/) {
  return (
    <div className="account-settings__content-my-profile-heading flex">
      <h2 className="my-profile-heading">
        <SkeletonHeading animation={`wave`} width={200} height={30} amount={1} />
      </h2>
      <div>
        <Skeleton variant="rounded" width={83} height={39} sx={{
          borderRadius: `12px`
        }} />
      </div>
    </div>
  );
}
