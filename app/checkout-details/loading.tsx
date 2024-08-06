// 'use client';

import '@/app/checkout-details/page.scss';

/*type LoadingType = {
  // children: ReactNode;
}*/
import { Skeleton } from '@mui/material';
import SkeletonHeading from '@/components/skeletons/Heading/SkeletonHeading';

export default function LoadingCheckoutDetails(/*{  }: LoadingType*/) {
  return (
    <>
      <section className="thanks-for-purchase-container">
        <div className="thanks-for-purchase grid">
          <div className="thanks-for-purchase-col-1">
            <h1 className="thanks-for-purchase__heading flex flex-direction-column gap-sm">
              <SkeletonHeading animation={`wave`} width={`90%`} height={50} amount={1} />
              <SkeletonHeading animation={`wave`} width={`60%`} height={50} amount={1} />
            </h1>
            <p className="thanks-for-purchase__text">
              <Skeleton variant="text" sx={{ width: '90%', height: 30 }} />
              <Skeleton variant="text" sx={{ width: '70%', height: 30 }} />
              <Skeleton variant="text" sx={{ width: '30%', height: 30 }} />
            </p>
            <div className="flex flex-align-center gap-25px margin-bottom-41px">
              <Skeleton variant="rectangular" sx={{ width: 150, height: 70, borderRadius: `12px` }} />
              <Skeleton variant="rectangular" sx={{ width: 150, height: 70, borderRadius: `12px` }} />
            </div>
            {/* ////////////////////  */}

            <div className="thanks-for-purchase__support grid">
              <div className="thanks-for-purchase__support-phone flex flex-align-center">

                <Skeleton variant="circular" sx={{ width: 20, height: 20 }} />
                <a className="highlighted text-decoration-none">
                  <Skeleton variant="text" sx={{ width: '14rem', height: 30 }} />
                </a>
              </div>
              <div className="thanks-for-purchase__support-chat-now flex flex-align-center">

                <Skeleton variant="circular" sx={{ width: 20, height: 20 }} />
                <a className="highlighted text-decoration-none">
                  <Skeleton variant="text" sx={{ width: '14rem', height: 30 }} />
                </a>
              </div>
            </div>

          </div>
          <div style={{ marginBottom: `3rem` }}>
            <Skeleton variant="rectangular" animation={`wave`}
                      sx={{ width: '84%', height: '60rem', borderRadius: `12px` }} />
          </div>
        </div>
      </section>
    </>
  );
}
