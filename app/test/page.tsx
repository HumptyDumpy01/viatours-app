// 'use client';
import '@/components/homepage/top-trending/TopTrending.scss';
import '@/components/UI/Gallery/Gallery.scss';
import '@/components/tourDescription/TourOverview/TourOverview.scss';
import '@/components/UI/Form/SidebarForm.scss';
import classes from './page.module.scss';


/*type TestType = {
  // children: ReactNode;
}*/
import { Skeleton } from '@mui/material';
import React from 'react';
import SkeletonPageNav from '@/components/skeletons/Navigation/SkeletonPageNav';
import SkeletonBadge from '@/components/skeletons/Badge/SkeletonBadge';
import SkeletonHeading from '@/components/skeletons/Heading/SkeletonHeading';
import SkeletonRating from '@/components/skeletons/Rating/SkeletonRating';
import SkeletonGallery from '@/components/skeletons/Gallery/SkeletonGallery';
import SkeletonTourDetail from '@/components/skeletons/Badge/SkeletonTourDetail';
import SkeletonSecondaryHeading from '@/components/skeletons/Heading/SkeletonSecondaryHeading';
import SkeletonText from '@/components/skeletons/Text/SkeletonText';
import SkeletonListItem from '@/components/skeletons/ListItem/SkeletonListItem';

export default function Test(/*{  }: TestType*/) {
  return (
    <div className={`container`} style={{ paddingTop: `1rem` }}>
      <SkeletonPageNav amount={3} height={20} width={30} />
      <section className="description" style={{ marginTop: `3rem` }}>
        <SkeletonBadge width={90} height={35} amount={2} />
        <SkeletonHeading width={`70%`} height={40} amount={1} marginTop={`4rem`} />
        <SkeletonHeading width={`40%`} height={40} amount={1} marginTop={`1rem`} />
        <SkeletonRating extraInfo />
        <SkeletonGallery />
        <div className={classes[`skeleton-tour-details`]}>
          <div>
            <div className="description__tour-overview-info">
              <SkeletonTourDetail />
              <SkeletonTourDetail />
              <SkeletonTourDetail />
              <SkeletonTourDetail />
            </div>

            <div className="description__tour-tour-overview">
              <SkeletonSecondaryHeading amount={1} marginBottom={`2rem`} height={20} width={140} />
              <SkeletonText widths={[`90%`, `80%`, `50%`]} height={10} />
              <SkeletonText widths={[`90%`, `80%`, `50%`]} height={10} />
            </div>

            <div className="description__tour-overview-highlights-wrapper">
              <h3 className={`tertiary-heading margin-bottom-small`}>
                <SkeletonHeading width={120} height={16} amount={1} />
              </h3>
              <ul className="description__tour-overview-highlights">
                <SkeletonListItem heightText={8} widthsText={[`100%`, `95%`, `90%`, `78%`, `76%`]} widthCircle={7} />
              </ul>
            </div>

            <div className="description__tour-overview-included-wrapper">
              <SkeletonHeading width={200} height={30} amount={1} marginBottom={`4rem`} />
              <div
                className={`description__tour-overview-included-wrapper--1 grid ${classes[`skeleton-what-included`]}`}>
                <ul className="description__tour-overview-included">
                  <SkeletonListItem amount={6} heightText={15} widthsText={[`58%`]} widthCircle={20} />
                </ul>

                <div className="description__tour-overview-included-wrapper--2 grid">
                  <ul className="description__tour-overview-included">
                    <SkeletonListItem amount={4} heightText={15} widthsText={[`58%`]} widthCircle={20} />
                  </ul>
                </div>
              </div>
            </div>

          </div>
          <div>
            <form className={`description__tour-overview-sidebar__form`}>
              <div className="description__tour-overview-sidebar">
                <div style={{
                  display: 'flex',
                  gap: '.5rem',
                  marginBottom: `2.4rem`
                }}>
                  <Skeleton variant="rounded" width={50} height={12} />
                  <Skeleton variant="rounded" width={50} height={12} />
                </div>
                <div className="description__tour-overview-sidebar-wrapper">
                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem', paddingBottom: `1rem`,
                      paddingTop: `1rem`,
                      paddingLeft: `1rem`,
                      borderBottom: `1px solid #e0e0e0`
                    }}>
                      <Skeleton variant="circular" width={14} height={14} />
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '.5rem'
                      }}>
                        <Skeleton variant="rounded" width={50} height={10} />
                        <Skeleton variant="rounded" width={70} height={10} />
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem', paddingBottom: `1rem`,
                      paddingTop: `1rem`,
                      paddingLeft: `1rem`
                    }}>
                      <Skeleton variant="circular" width={14} height={14} />
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '.5rem'
                      }}>
                        <Skeleton variant="rounded" width={50} height={10} />
                        <Skeleton variant="rounded" width={70} height={10} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="description__tour-overview-sidebar__tickets grid">
                  <h3
                    className="tertiary-heading margin-top-sm description__tour-overview-sidebar__tickets-heading">
                    <Skeleton variant="rounded" width={100} height={17} />
                  </h3>
                  <div style={{
                    display: 'flex',
                    flexDirection: `column`,
                    gap: `1.4rem`
                  }}>

                    <div className="flex flex-space-between flex-align-center">
                      <div>
                        <Skeleton variant="rounded" width={120} height={13} />
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                      }}>
                        <Skeleton variant="circular" width={14} height={14} />
                        <Skeleton variant="rounded" width={10} height={13} />
                        <Skeleton variant="circular" width={14} height={14} />
                      </div>
                    </div>
                    <div className="flex flex-space-between flex-align-center">
                      <div>
                        <Skeleton variant="rounded" width={110} height={13} />
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                      }}>
                        <Skeleton variant="circular" width={14} height={14} />
                        <Skeleton variant="rounded" width={10} height={13} />
                        <Skeleton variant="circular" width={14} height={14} />
                      </div>
                    </div>
                    <div className="flex flex-space-between flex-align-center">
                      <div>
                        <Skeleton variant="rounded" width={90} height={13} />
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                      }}>
                        <Skeleton variant="circular" width={14} height={14} />
                        <Skeleton variant="rounded" width={10} height={13} />
                        <Skeleton variant="circular" width={14} height={14} />
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ marginBottom: `2rem` }} className="description__tour-overview-sidebar__tickets grid">
                  <h3
                    className="tertiary-heading margin-top-sm description__tour-overview-sidebar__tickets-heading">
                    <div>
                      <Skeleton variant="rounded" width={100} height={17} />
                    </div>
                  </h3>
                  <div style={{ marginBottom: `1rem` }}>
                    <div style={{ display: `flex`, justifyContent: `space-between`, gap: `1rem` }}>
                      <div style={{ display: `flex`, gap: `1rem` }}>
                        <Skeleton variant="rounded" width={14} height={14} />
                        <Skeleton variant="rounded" width={100} height={14} />
                      </div>
                      <Skeleton variant="rounded" width={25} height={14} />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: `flex`, justifyContent: `space-between`, gap: `1rem` }}>
                      <div style={{ display: `flex`, gap: `1rem` }}>
                        <Skeleton variant="rounded" width={14} height={14} />
                        <Skeleton variant="rounded" width={100} height={14} />
                      </div>
                      <Skeleton variant="rounded" width={25} height={14} />
                    </div>
                  </div>

                </div>
                <div style={{ marginBottom: `5rem` }}>
                  <p className="paragraph paragraph--descr flex">
                    <Skeleton variant="rounded" width={25} height={14} />
                    <span><Skeleton variant="rounded" width={14} height={14} /></span>
                    <Skeleton variant="rounded" width={25} height={14} />
                    <span><Skeleton variant="rounded" width={14} height={14} /></span>
                  </p>
                </div>
                <div style={{ display: `flex`, justifyContent: `space-between`, marginBottom: `2.2rem` }}>
                  <Skeleton variant="rounded" width={55} height={17} />
                  <Skeleton variant="rounded" width={25} height={17} />
                </div>
                <div style={{ display: `flex`, justifyContent: `center` }}>
                  <Skeleton animation={`wave`} variant="rounded" width={`90%`} height={40} sx={{
                    borderRadius: `12px`
                  }} />
                </div>

              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
