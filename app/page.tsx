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


async function GetTrendingDestinations() {
  const tours = await getTours(22, { tags: `new` }) as TourInterface[];
  return <TrendingDestinations tours={tours} />;
}

async function GetPopularTours() {
  const tours = await getTours(4, { tags: `popular` }) as TourInterface[];
  console.log(`Executing tours: `, tours);
  return <FindPopularTours tours={tours} />;
}

export default async function Home() {
  return (
    <main>
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
                            href={`/tours?tag=featured`} />
      </div>
      <section className="top-trending container-cta">
        <TopTrendingWrapper>
          <TopTrendingSlider max={8} tag={`featured`} />
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
