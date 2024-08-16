// 'use client';

import '@/components/homepage/top-trending/TopTrending.scss';
import TourDescriptionNavigation from '@/components/tourDescription/TourDescriptionNav/TourDescriptionNavigation';
import DescriptionTag from '@/components/tourDescription/DescriptionTag';
import { TourInterface } from '@/data/DUMMY_TOURS';
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
import LeaveReply from '@/components/UI/Layout/LeaveReply';
import TopTrendingHeading from '@/components/homepage/top-trending/TopTrendingHeading';
import TopTrendingSlider from '@/components/homepage/top-trending/TopTrendingSlider';
import TopTrendingWrapper from '@/components/homepage/top-trending/TopTrendingWrapper';
import '@/components/UI/Form/SidebarForm.scss';
import React from 'react';
import SidebarForm from '@/components/UI/Form/SidebarForm';
import TourStatsContainer from '@/components/tourDescription/TourOverview/TourStatsContainer';
import TourCommentsContainer from '@/components/tourDescription/TourComments/TourCommentsContainer';

type TourDescriptionType = {
  params: {
    id: string;
  }
  tour: TourInterface;
  similarTours: TourInterface[];
  session: any;
  userEmail: string;
  userName: string;
  // children: ReactNode;
}

export default async function
  TourDescriptionSection({
                           params,
                           tour,
                           similarTours,
                           session,
                           userEmail,
                           userName
                         }: TourDescriptionType) {

  // console.log(`Session, executed in TourDescriptionSection:`, session);

  return (
    <>
      <TourDescriptionNavigation title={tour.title} params={params} />
      <section className="description container">
        <DescriptionTag />
        <h1 className="description__heading margin-bottom-small">{tour.title}</h1>
        <div className="description__stats-wrapper">
          <TourStatsContainer
            session={session}
            info={{
              title: tour.title,
              rating: tour.rating.overall,
              totalReviews: tour.reviews,
              city: tour.city,
              country: tour.country,
              booked: tour.booked,
              views: tour.views
            }}
          />
        </div>
        <Gallery info={{
          images: tour.images,
          title: tour.title
        }} />
        <DescriptionOverview sideBar={(
          <>
            {tour.onSale && (
              <>
                <SidebarForm
                  tourId={tour._id}
                  time={tour.time}
                  price={tour.onSale.newPrice}
                  tourMeetingPoint={tour.meetingPoint}
                  tourTitle={tour.title}
                  priceForExtra={tour.price.extra}
                />
              </>
            )}
            {!tour.onSale && (
              <>
                <SidebarForm
                  tourId={tour._id}
                  time={tour.time}
                  tourTitle={tour.title}
                  tourMeetingPoint={tour.meetingPoint}
                  price={tour.price}
                  priceForExtra={tour.price.extra}
                />
              </>
            )}
          </>
        )}>
          <TourOverviewInfo info={
            {
              duration: tour.duration,
              groupSize: tour.groupSize,
              ages: tour.ages,
              languages: tour.languages
            }
          } />

          <TourOverviewHeading overview={tour.overview} />
          <TourHighlights tour_highlights={tour.tourHighlights} />

          <TourIncluded what_included={tour.whatsIncluded} />

          <TourItinerary itinerary={tour.itinerary} />
          <h2 className={`subheading`}>Here comes GoogleMap! Enable It when testing or deploying.</h2>
          {/*<GoogleMap locations={tour.tour_map} />*/}
          <QuestionAnswer />
          <CustomerReviews rating={tour.rating} />
          <TourCommentsContainer currTourComments={tour.tourComments} />
          <LeaveReply
            tourTitle={tour.title}
            session={session}
            userEmail={userEmail}
            userName={userName}
            tourId={tour._id} />
        </DescriptionOverview>
      </section>
      <div>
        <TopTrendingHeading heading={`You might also like...`} href={`/tours?query=${tour.tags[0]}`} />
      </div>
      <section className="top-trending container-cta">
        <TopTrendingWrapper>
          <TopTrendingSlider tours={similarTours} />
        </TopTrendingWrapper>
      </section>

    </>
  );
}
