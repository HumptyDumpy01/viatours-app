import '../components/homepage/hero/Hero.scss';
import Hero from '@/components/homepage/hero/Hero';

export default function Home() {
  return (
    <main>
      <section className="hero flex flex-column">
        <Hero />
      </section>
    </main>
  );
}
