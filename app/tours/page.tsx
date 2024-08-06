// 'use client';
import './page.scss';
import AllTours from '@/components/tours/AllTours';

export type AllToursInterface = {
  searchParams: {
    filter?: string;
    [`filter-type`]?: string;
    [`filter-search`]?: string;
  }
}

export const metadata = {
  title: `Explore countless tours with Viatours Travel Agency!`,
  description: `This is the tours page of Viatours Travel Agency. Here you can explore countless tours to the most beautiful places in the world.`
};

export default function ToursPage({ searchParams }: AllToursInterface) {
  const searchParamsData = {
    filter: searchParams?.filter ?? '',
    [`filter-type`]: searchParams?.[`filter-type`] ?? '',
    [`filter-search`]: searchParams?.[`filter-search`] ?? ''
  };
  console.log(searchParamsData);

  return (
    <main className={`main`}>
      <section className="all-tours container-all-tours">
        <AllTours searchParams={searchParamsData} />
      </section>
    </main>
  );
}