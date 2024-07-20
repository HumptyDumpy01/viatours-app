'use client';

import '@/app/checkout/page.scss';
import { Skeleton } from '@mui/material';
import SkeletonText from '@/components/skeletons/Text/SkeletonText';
import SkeletonButton from '@/components/skeletons/Button/SkeletonButton';
import React from 'react';
import SkeletonHeading from '@/components/skeletons/Heading/SkeletonHeading';
import '@/components/checkout/checkout-overall/CheckoutOverall.scss';

export default function CheckoutLoadingPage(/*{  }: CheckoutLoadingPageType*/) {
  // scroll to the top of the page,
  // so that the user sees the loading state
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="book-now-container">
      <div className="book-now grid container">
        <div className="book-now__details">

          <div className="book-now__details">
            <div className="book-now__details-1" style={{
              paddingBottom: `3.4rem`
            }}>

              <div style={{
                display: `flex`,
                alignItems: `center`,
                gap: `1.3rem`,
                marginTop: `-1.4rem`
              }}>
                <Skeleton variant={`circular`} width={`5.3rem`} height={`5.3rem`} />
                <div style={{
                  marginTop: `2rem`
                }}>
                  <SkeletonText widths={[`14rem`]} height={20} />
                </div>
              </div>
              <div>
                <SkeletonText widths={[`100%`]} height={13} marginTop={`2rem`} marginBottom={`1rem`} />
                <SkeletonText widths={[`80%`]} height={13} />
              </div>
              <div style={{ marginBottom: `3.4rem` }}>
                <SkeletonButton width={`100%`} height={50} borderRadius={`12px`} />
              </div>
              <div style={{
                display: `grid`,
                gridTemplateColumns: `repeat(auto-fill, minmax(29.4rem, 1fr))`,
                alignItems: `center`,
                gap: `1.3rem`
              }}>
                <div>
                  <SkeletonText widths={[`12rem`]} height={21} marginTop={`2rem`} marginBottom={`1rem`} />
                  <Skeleton variant={`rounded`} animation={`wave`} width={`29.4rem`} height={57} sx={{
                    borderRadius: `12px`
                  }} />
                </div>

                <div>
                  <SkeletonText widths={[`12rem`]} height={21} marginTop={`2rem`} marginBottom={`1rem`} />
                  <Skeleton variant={`rounded`} animation={`wave`} width={`29.4rem`} height={57} sx={{
                    borderRadius: `12px`
                  }} />
                </div>
              </div>
              <div>
                <SkeletonText widths={[`12rem`]} height={21} marginTop={`2rem`} marginBottom={`1rem`} />
                <Skeleton variant={`rounded`} animation={`wave`} width={`100%`} height={57} sx={{
                  borderRadius: `12px`
                }} />
              </div>

              <SkeletonText widths={[`12rem`]} height={21} marginTop={`2rem`} marginBottom={`1rem`} />
              <div style={{
                display: `flex`,
                justifyContent: `space-between`,
                alignItems: `center`
              }}>
                <div>
                  <Skeleton variant={`rounded`} animation={`wave`} width={`23.4rem`} height={57} sx={{
                    borderRadius: `12px`
                  }} />
                </div>
                <div>
                  <Skeleton variant={`rounded`} animation={`wave`} width={`35rem`} height={57} sx={{
                    borderRadius: `12px`
                  }} />
                </div>
                <div style={{
                  display: `flex`,
                  gap: `1.3rem`
                }}>
                </div>

              </div>
              <div style={{
                marginTop: `2rem`,
                display: `flex`,
                gap: `1.3rem`,
                alignItems: `center`
              }}>
                <Skeleton variant={`rounded`} animation={`wave`} width={'2rem'} height={'2rem'} />
                <div style={{
                  display: `flex`,
                  flexDirection: `column`,
                  gap: `1.3rem`
                }}>
                  <SkeletonText marginBottom={`0`} marginTop={`0`} widths={[`50rem`]} height={10} />
                  <SkeletonText marginBottom={`0`} marginTop={`0`} widths={[`30rem`]} height={10} />
                </div>
              </div>
              <Skeleton variant={`rounded`} animation={`wave`} width={'15rem'} height={'5rem'} sx={{
                borderRadius: `12px`,
                marginTop: `4.4rem`
              }} />
            </div>
          </div>
          {/* /////////////////////////////////////*/}
          <div className="book-now__details">

            <div className="book-now__details">
              <div className="book-now__details-1" style={{
                paddingBottom: `1.4rem`
              }}>
                <div style={{
                  display: `flex`,
                  alignItems: `center`,
                  gap: `1.3rem`,
                  marginTop: `-1.4rem`
                }}>
                  <Skeleton animation={`wave`} variant={`circular`} width={`5.3rem`} height={`5.3rem`} />
                  <div style={{
                    marginTop: `2rem`
                  }}>
                    <SkeletonText animation={`wave`} widths={[`14rem`]} height={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /////////////////////////////////////*/}

          {/* /////////////////////////////////////*/}
          <div className="book-now__details">

            <div className="book-now__details">
              <div className="book-now__details-1" style={{
                paddingBottom: `1.4rem`
              }}>
                <div style={{
                  display: `flex`,
                  alignItems: `center`,
                  gap: `1.3rem`,
                  marginTop: `-1.4rem`
                }}>
                  <Skeleton animation={`wave`} variant={`circular`} width={`5.3rem`} height={`5.3rem`} />
                  <div style={{
                    marginTop: `2rem`
                  }}>
                    <SkeletonText animation={`wave`} widths={[`14rem`]} height={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /////////////////////////////////////*/}
        </div>
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
      </div>
    </section>
  );
}
