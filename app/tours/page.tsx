// 'use client';
import './page.scss';
import AllTours from '@/components/tours/AllTours';
import { Suspense } from 'react';
/*interface ToursPageInterface {
  // children: ReactNode;
}*/

export const metadata = {
  title: `Explore countless tours with Viatours Travel Agency!`,
  description: `This is the tours page of Viatours Travel Agency. Here you can explore countless tours to the most beautiful places in the world.`
};

export default function ToursPage(/*{  }: ToursPageInterface*/) {
  return (
    <main className={`main`}>
      <section className="all-tours container-all-tours">
        <Suspense>
          <AllTours />
        </Suspense>
      </section>
    </main>
  );
}
