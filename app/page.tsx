import '../components/homepage/hero/Hero.scss';
import HeroWrapper from '@/components/homepage/hero/HeroWrapper';

export default function Home() {
  return (
    <main>
      <section className="hero flex flex-column">
        <HeroWrapper />
      </section>
    </main>
  );
}
