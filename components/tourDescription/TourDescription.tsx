// 'use client';

import '@/components/homepage/top-trending/TopTrending.scss';
import TourDescriptionNavigation from '@/components/tourDescription/TourDescriptionNav/TourDescriptionNavigation';
import DescriptionTag from '@/components/tourDescription/DescriptionTag';
import { TourInterface } from '@/data/DUMMY_TOURS';
import TourStats from '@/components/tourDescription/TourStats';
import Gallery from '@/components/UI/Gallery/Gallery';
import DescriptionOverview from '@/components/tourDescription/TourOverview/DescriptionOverview';
import TourOverviewInfo from '@/components/tourDescription/TourOverview/TourOverviewInfo';
import TourOverviewHeading from '@/components/tourDescription/TourOverview/TourOverviewHeading';
import TourHighlights from '@/components/tourDescription/TourOverview/TourHighlights';
import TourIncluded from '@/components/tourDescription/TourOverview/TourIncluded';
import TourItinerary from '@/components/tourDescription/TourOverview/Itinerary/TourItinerary';
// import GoogleMap from '@/components/UI/Map/Map';
import QuestionAnswer from '@/components/tourDescription/FAQ/QuestionAnswer';
import CustomerReviews from '@/components/tourDescription/CustomerReviews/CustomerReviews';
import TourComments from '@/components/tourDescription/TourOverview/TourComments';
import LeaveReply from '@/components/UI/Layout/LeaveReply';
import TopTrendingHeading from '@/components/homepage/top-trending/TopTrendingHeading';
import TopTrendingSlider from '@/components/homepage/top-trending/TopTrendingSlider';
import TopTrendingWrapper from '@/components/homepage/top-trending/TopTrendingWrapper';
import '@/components/UI/Form/SidebarForm.scss';
import React from 'react';
import SidebarForm from '@/components/UI/Form/SidebarForm';
import { fetchTour } from '@/lib/api/fetchTour';
import { notFound } from 'next/navigation';

type TourDescriptionType = {
  params: {
    id: string;
  }
  // children: ReactNode;
}

export default async function TourDescriptionSection({ params }: TourDescriptionType) {
  const currTour = await fetchTour(params.id) as TourInterface;

  if (!currTour) {
    notFound();
  }

  return (
    <>
      <TourDescriptionNavigation title={currTour.title} params={params} />
      <section className="description container">
        <DescriptionTag />
        <h1 className="description__heading margin-bottom-small">{currTour.title}</h1>
        <div className="description__stats-wrapper flex flex-space-between">
          <TourStats
            info={{
              rating: currTour.rating.overall,
              totalReviews: currTour.reviewed,
              city: currTour.city,
              country: currTour.country,
              booked: currTour.booked
            }}
          />
        </div>
        <Gallery info={{
          images: currTour.images,
          title: currTour.title
        }} />
        <DescriptionOverview sideBar={(
          <>
            <SidebarForm
              tourId={currTour.id}
              time={currTour.time}
              price={currTour.price}
              price_for_extra={currTour.price_for_extra}
            />
          </>
        )}>
          <TourOverviewInfo info={
            {
              duration: currTour.duration,
              groupSize: currTour.group_size,
              ages: currTour.ages,
              languages: currTour.languages
            }
          } />

          <TourOverviewHeading overview={currTour.overview} />
          <TourHighlights tour_highlights={currTour.tour_highlights} />

          <TourIncluded what_included={currTour.what_included} />

          <TourItinerary itinerary={currTour.itinerary} />
          <h2 className={`subheading`}>Here comes GoogleMap! Enable It when testing or deploying.</h2>
          {/*<GoogleMap locations={currTour.tour_map} />*/}
          <QuestionAnswer />
          <CustomerReviews rating={currTour.rating} />
          <TourComments tourId={currTour.id} />
          <LeaveReply />
        </DescriptionOverview>
      </section>
      <div>
        <TopTrendingHeading heading={`You might also like...`} href={`/tours?query=top`} />
      </div>
      <section className="top-trending container-cta">
        <TopTrendingWrapper>
          <TopTrendingSlider tag={currTour.tag[0]} />
        </TopTrendingWrapper>
      </section>

    </>
  );
}
