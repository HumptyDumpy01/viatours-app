// 'use client';
import '@/app/tours/page.scss';
import PageNavigation from '@/components/UI/Layout/PageNavigation/PageNavigation';
/*interface ToursHeaderInterface {
  // children: ReactNode;
}*/

export default function ToursHeader(/*{  }: ToursHeaderInterface*/) {
  return (
    <>
      <PageNavigation
        links={[{ href: '/', label: 'Home' }, { href: '/tours', label: 'Tours' }]}
        subheading="Viatours Tours & Excursions"
      />
      <h1 className="secondary-heading all-tours__heading">Explore all things to do all over the world!</h1>
    </>
  );
}
