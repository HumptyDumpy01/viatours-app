'use client';

import '@/components/homepage/top-trending/TopTrending.scss';
import '@/components/UI/Gallery/Gallery.scss';
import '@/components/tourDescription/TourOverview/TourOverview.scss';
import '@/components/UI/Form/SidebarForm.scss';
import classes from './loading.module.scss';

/*type TestType = {
  // children: ReactNode;
}*/
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
import SkeletonSidebarForm from '@/components/skeletons/other/Sidebar/SkeletonSidebarForm';

export default function TourDescriptionLoadingPage(/*{  }: TestType*/) {

  /* IMPORTANT: DISABLED SCROLLING TO THE TOP WHEN PAGE LOADS */
  /*React.useEffect(() => {
    return () => {
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      }
    };

  }, []);*/
  // scroll to the top of the page abruptly

  return (
    <div className={`container ${classes[`skeleton-container`]}`} style={{ paddingTop: `1rem` }}>
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
            <SkeletonSidebarForm />
          </div>
        </div>
      </section>
    </div>
  );
}
