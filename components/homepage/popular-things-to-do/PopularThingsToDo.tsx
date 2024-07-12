// 'use client';
import './PopularThingsToDo.scss';
import './PopularThingsGallery.scss';
/*interface PopularThingsToDoInterface {
  // children: ReactNode;
}*/
import PopularThingsHeading from '@/components/homepage/popular-things-to-do/PopularThingsHeading';
import PopularThingsGallery from '@/components/homepage/popular-things-to-do/PopularThingsGallery';

export default function PopularThingsToDo(/*{  }: PopularThingsToDoInterface*/) {
  return (
    <>
      <PopularThingsHeading />
      <PopularThingsGallery />
    </>
  );
}
