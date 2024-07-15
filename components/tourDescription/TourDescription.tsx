// 'use client';

import TourDescriptionNavigation from '@/components/tourDescription/TourDescriptionNav/TourDescriptionNavigation';
import DescriptionTag from '@/components/tourDescription/DescriptionTag';
import { DUMMY_TOURS } from '@/data/DUMMY_TOURS';
import { notFound } from 'next/navigation';
import TourStats from '@/components/tourDescription/TourStats';
import Gallery from '@/components/UI/Gallery/Gallery';
import GallerySlider from '@/components/UI/Gallery/GallerySlider';
import DescriptionOverview from '@/components/tourDescription/TourOverview/DescriptionOverview';
import TourOverviewInfo from '@/components/tourDescription/TourOverview/TourOverviewInfo';
import TourOverviewHeading from '@/components/tourDescription/TourOverview/TourOverviewHeading';
import TourHighlights from '@/components/tourDescription/TourOverview/TourHighlights';
import TourIncluded from '@/components/tourDescription/TourOverview/TourIncluded';
import TourItinerary from '@/components/tourDescription/TourOverview/Itinerary/TourItinerary';
import GoogleMap from '@/components/UI/Map/Map';
import QuestionAnswer from '@/components/tourDescription/FAQ/QuestionAnswer';
import CustomerReviews from '@/components/tourDescription/CustomerReviews/CustomerReviews';

type TourDescriptionType = {
  params: {
    id: string;
  }
  // children: ReactNode;
}

export default function TourDescriptionSection({ params }: TourDescriptionType) {
  const currTour = DUMMY_TOURS.find((item) => item.id === params.id);

  if (!currTour) {
    notFound();
  }

  return (
    <>
      <TourDescriptionNavigation params={params} />
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
        <GallerySlider info={
          {
            images: currTour.images,
            title: currTour.title
          }
        } />
        <DescriptionOverview>
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
          <GoogleMap locations={currTour.tour_map} />
          <QuestionAnswer />
          <CustomerReviews rating={currTour.rating} />
        </DescriptionOverview>
      </section>

    </>
  );
}
