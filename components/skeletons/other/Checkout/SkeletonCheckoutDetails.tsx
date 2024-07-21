// 'use client';
import '@/components/checkout/checkout-overall/CheckoutOverall.scss';
/*type SkeletonCheckoutDetailsType = {
  // children: ReactNode;
}*/
import { Skeleton } from '@mui/material';
import SkeletonHeading from '@/components/skeletons/Heading/SkeletonHeading';
import SkeletonText from '@/components/skeletons/Text/SkeletonText';
import React from 'react';

export default function SkeletonCheckoutDetails(/*{  }: SkeletonCheckoutDetailsType*/) {
  return (
    <>
      <div className="book-now__overall-container">
        <div className="book-now__second-col-1">
          <div className="book-now__overall">
            <Skeleton variant="rectangular" width={`100%`} height={100} sx={{
              borderTopLeftRadius: `12px`,
              borderTopRightRadius: `12px`
            }} />
            <div style={{ paddingLeft: `3rem`, paddingRight: `3rem` }}>
              <div style={{ marginTop: `4rem`, marginBottom: `2rem` }}>
                <SkeletonHeading width={`20rem`} height={40} amount={1} />
                <SkeletonText widths={[`10rem`, `22rem`]} height={20} marginTop={`2rem`} />
              </div>
              <div style={{ display: 'flex', gap: `1rem`, marginTop: `2.4rem` }}>
                <SkeletonText widths={[`16rem`]} height={17} />
                <SkeletonText widths={[`3rem`]} height={17} />
              </div>

              <div style={{
                display: `flex`,
                flexDirection: `column`,
                gap: `.8rem`
              }}>
                <div style={{ display: 'flex', gap: `1rem`, alignItems: `center` }}>
                  <Skeleton variant={`circular`} width={14} height={14} />
                  <SkeletonText marginBottom={`0`} marginTop={`0`} widths={[`10rem`]} height={17} />
                </div>
                <div style={{ display: 'flex', gap: `1rem`, alignItems: `center` }}>
                  <Skeleton variant={`circular`} width={14} height={14} />
                  <SkeletonText marginBottom={`0`} marginTop={`0`} widths={[`10rem`]} height={17} />
                </div>
                <div style={{ display: 'flex', gap: `1rem`, alignItems: `center` }}>
                  <Skeleton variant={`circular`} width={14} height={14} />
                  <SkeletonText marginBottom={`0`} marginTop={`0`} widths={[`10rem`]} height={17} />
                </div>
                <div style={{ marginTop: `2rem` }}>
                  <Skeleton variant={`rounded`} animation={`wave`} width={'100%'} height={'5.7rem'}
                            sx={{ borderRadius: `12px` }} />
                </div>
                <div style={{
                  display: `flex`,
                  justifyContent: `space-between`,
                  marginTop: `2rem`
                }}>
                  <SkeletonText widths={[`15rem`]} height={20} />
                  <SkeletonText widths={[`7rem`]} height={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
