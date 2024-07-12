// 'use client';
import './PopularThingsToDo.scss';
import './PopularThingsGallery.scss';
/*interface PopularThingsHeadingInterface {
  // children: ReactNode;
}*/
import Link from 'next/link';

export default function PopularThingsHeading(/*{  }: PopularThingsHeadingInterface*/) {
  return (
    <>
      <div className="popular-things-to-do__heading-wrapper flex flex-space-between flex-align-center">
        <h2 className="secondary-heading popular-things-to-do-heading heading-scale-effect">Popular things to do</h2>
        <Link href={`/tours`} className="link">See all</Link>
      </div>
    </>
  );
}
