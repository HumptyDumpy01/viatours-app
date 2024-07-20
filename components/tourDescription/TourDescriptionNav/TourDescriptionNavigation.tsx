import './TourDescrNavigation.scss';
import PageNavigation from '@/components/UI/Layout/PageNavigation/PageNavigation';
import { DUMMY_TOURS } from '@/data/DUMMY_TOURS';

type TourDescriptionNavigationType = {
  params: {
    id: string;
  };
  title: string;
};

export default function TourDescriptionNavigation({ params, title }: TourDescriptionNavigationType) {

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