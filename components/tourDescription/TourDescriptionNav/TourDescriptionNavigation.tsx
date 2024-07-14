import './TourDescrNavigation.scss';
import PageNavigation from '@/components/UI/Layout/PageNavigation/PageNavigation';
import { DUMMY_TOURS } from '@/data/DUMMY_TOURS';

type TourDescriptionNavigationType = {
  params: {
    id: string;
  };
};

export default function TourDescriptionNavigation({ params }: TourDescriptionNavigationType) {
  const currentTour = DUMMY_TOURS.find((item) => item.id === params.id);
  const title = currentTour?.title || 'Tour Details';

  return (
    <>
      <section className="page-navigation container flex flex-align-center flex-space-between">
        <PageNavigation links={[
          { href: '/', label: 'Home' },
          { href: '/tours', label: 'Tours' },
          { href: `/tours/${params.id}`, label: title }
        ]} />
      </section>
    </>
  );
}