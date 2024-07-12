import HeroWrapper from '@/components/homepage/hero/HeroWrapper';
import Features from '@/components/homepage/features/Features';
import TrendingDestinations from '@/components/homepage/trending-destinations/TrendingDestinations';
import FindPopularTours from '@/components/homepage/find-popular-tours/FindPopularTours';

export default function Home() {
  return (
    <main>
      <section className="hero flex flex-column">
        <HeroWrapper />
      </section>

      <section className="section-features container grid">
        <Features />
      </section>

      <section className="trending-destinations container grid" id="section-destinations">
        <TrendingDestinations />
      </section>

      <section className="find-popular-tours container">
        <FindPopularTours />
      </section>
    </main>
  );
}
