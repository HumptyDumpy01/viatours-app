// 'use client';
import '@/app/tours/page.scss';
import Link from 'next/link';
/*interface ToursHeaderInterface {
  // children: ReactNode;
}*/

export default function ToursHeader(/*{  }: ToursHeaderInterface*/) {
  return (
    <>
      <div className="all-tours__navigation__wrapper flex flex-align-center flex-space-between">
        <div className="all-tours__navigation">
          <Link href={`/`} className="link link__navigation__link">Home</Link>
          <span>&gt;</span>
          <Link href={`/tours`} className="link link__navigation__link">Tours</Link>
        </div>
        <div className="all-tours__navigation__second">
          <span className="all-tours__navigation__second--span">THE 10 BEST Phuket Tours & Excursions</span>
        </div>
      </div>
      <h1 className="secondary-heading all-tours__heading">Explore all things to do in Phuket</h1>
    </>
  );
}
