import HeroWrapper from '@/components/homepage/hero/HeroWrapper';
import Features from '@/components/homepage/features/Features';
import TrendingDestinations from '@/components/homepage/trending-destinations/TrendingDestinations';
import FindPopularTours from '@/components/homepage/find-popular-tours/FindPopularTours';
import CTA from '@/components/homepage/cta/CTA';
import PopularThingsToDo from '@/components/homepage/popular-things-to-do/PopularThingsToDo';
import TopTrendingHeading from '@/components/homepage/top-trending/TopTrendingHeading';
import TopTrendingWrapper from '@/components/homepage/top-trending/TopTrendingWrapper';
import TopTrendingSlider from '@/components/homepage/top-trending/TopTrendingSlider';
import CustomerReviews from '@/components/homepage/customer-reviews/CustomerReviews';
import CTASecondary from '@/components/homepage/cta-2/CTASecondary';
import TravelArticles from '@/components/homepage/travel-articles/TravelArticles';
import { getTours } from '@/lib/mongodb';
import React, { Suspense } from 'react';
import { TourInterface } from '@/data/DUMMY_TOURS';
import NewestDestinationsSkeleton from '@/components/homepage/skeletons/NewestDestinationsSkeleton';
import FindPopularToursSkeleton from '@/components/homepage/skeletons/FindPopularToursSkeleton';
import SkeletonCardFull from '@/components/skeletons/Card/SkeletonCardFull';
import FormCompTemp from '@/app/FormCompTemp';


async function GetTrendingDestinations() {
  const tours = await getTours(22, { tags: `new` }, 0, {
    _id: 1,
    title: 1,
    city: 1,
    country: 1,
    images: 1
  }) as TourInterface[];
  return <TrendingDestinations tours={tours} />;
}

async function GetPopularTours() {
  const tours = await getTours(4, { tags: `popular` }, 0, {
    _id: 1,
    images: 1,
    title: 1,
    country: 1,
    city: 1,
    rating: 1,
    reviews: 1,
    duration: 1,
    price: 1
  }) as TourInterface[];
  return <FindPopularTours tours={tours} />;
}

async function GetFeaturedTours() {
  const tours = await getTours(22, { tags: `featured` }, 0, {
    _id: 1,
    images: 1,
    title: 1,
    country: 1,
    city: 1,
    rating: 1,
    reviews: 1,
    duration: 1,
    price: 1
  }) as TourInterface[];
  return <TopTrendingSlider tours={tours} />;
}

export default async function Home() {

  return (
    <main>
      {/*<FormCompTemp />*/}
      <section className="hero flex flex-column">
        <HeroWrapper />
      </section>

      <section className="section-features container grid">
        <Features />
      </section>

      <section className="trending-destinations container grid" id="section-destinations">
        <Suspense fallback={
          <NewestDestinationsSkeleton />
        }>
          <GetTrendingDestinations />
        </Suspense>
      </section>

      <section className="find-popular-tours container">
        <Suspense fallback={
          <FindPopularToursSkeleton />
        }>
          <GetPopularTours />
        </Suspense>

      </section>

      <section className="cta container-cta grid">
        <CTA />
      </section>

      <section className="popular-things-to-do container grid">
        <PopularThingsToDo />
      </section>

      <div>
        <TopTrendingHeading heading={`Featured Tours`} subheading={`viatours recommends!`}
                            href={`/tours?filter=featured`} />
      </div>
      <section className="top-trending container-cta">
        <TopTrendingWrapper>
          <Suspense fallback={
            <>
              <SkeletonCardFull />
              <SkeletonCardFull />
              <SkeletonCardFull />
              <SkeletonCardFull />
              <SkeletonCardFull />
              <SkeletonCardFull />
              <SkeletonCardFull />
              <SkeletonCardFull />
            </>
          }>
            <GetFeaturedTours />
          </Suspense>
        </TopTrendingWrapper>
      </section>

      <section className="customer-reviews container-cta">
        <CustomerReviews />
      </section>

      <section className="cta-secondary container-cta">
        <CTASecondary />
      </section>

      <section className="travel-articles container">
        <TravelArticles />
      </section>
    </main>
  );
}
