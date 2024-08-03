// 'use client';

import './PopularThingsGallery.scss';
import adventureImg from '@/assets/images/homepage/popularThingsToDo/adventure.png';
import cultural1 from '@/assets/images/homepage/popularThingsToDo/cultural-1.png';
import cultural2 from '@/assets/images/homepage/popularThingsToDo/cultural-2.png';
import cityToursImg from '@/assets/images/homepage/popularThingsToDo/city.png';
import foodImg from '@/assets/images/homepage/popularThingsToDo/food.png';
import natureImg from '@/assets/images/homepage/popularThingsToDo/nature.png';
import Image from 'next/image';
import Link from 'next/link';

/*interface PopularThingsGalleryInterface {
  // children: ReactNode;
}*/


export default function PopularThingsGallery(/*{  }: PopularThingsGalleryInterface*/) {
  return (
    <>
      <div className="popular-things-to-do__tours grid grid-five-cols">
        <div className="popular-things-to-do__tour popular-things-to-do__tours-1">
          <Link href={`/tours?filter-type=Adventure Tours`} className="popular-things-to-do__tour-link">
            <Image data-src="img/popularThingsToDo/cruises.svg" className=""
                   src={adventureImg}
                   alt="cruises image" />
            <p className="popular-things-to-do__tour-title">Adventure</p>
          </Link>
        </div>
        <div className="popular-things-to-do__tour popular-things-to-do__tours-2">
          <Link href={`/tours?filter-type=Cultural Tours`} className="popular-things-to-do__tour-link">
            <Image data-src="img/popularThingsToDo/museumTour.svg" className=""
                   src={cultural1}
                   alt="museum tour image" />
            <p className="popular-things-to-do__tour-title">Cultural</p>
          </Link>
        </div>
        <div className="popular-things-to-do__tour popular-things-to-do__tours-3">
          <Link href={`/tours/?filter-type=Cultural Tours`} className="popular-things-to-do__tour-link">
            <Image data-src="img/popularThingsToDo/beachTours.svg" className=""
                   src={cultural2}
                   alt="two people on the beach image" />
            <p className="popular-things-to-do__tour-title">Cultural</p>
          </Link>
        </div>
        <div className="popular-things-to-do__tour popular-things-to-do__tours-4">
          <Link href={`/tours/?filter=city`} className="popular-things-to-do__tour-link">
            <Image data-src="img/popularThingsToDo/cityTours.svg" className=""
                   src={cityToursImg}
                   alt="city tours image" />
            <p className="popular-things-to-do__tour-title">City Tours</p>
          </Link>
        </div>
        <div className="popular-things-to-do__tour popular-things-to-do__tours-5">
          <Link href={`/tours/?filter=food`} className="popular-things-to-do__tour-link">
            <Image data-src="img/popularThingsToDo/food.svg" className=""
                   src={foodImg}
                   alt="restaurant image" />
            <p className="popular-things-to-do__tour-title">Food</p>
          </Link>
        </div>
        <div className="popular-things-to-do__tour popular-things-to-do__tours-6">
          <Link href={`/tours/?filter=nature`} className="popular-things-to-do__tour-link">
            <Image data-src="img/popularThingsToDo/hiking.svg" className=""
                   src={natureImg}
                   alt="two people on a hike image" />
            <p className="popular-things-to-do__tour-title">Nature Tours</p>
          </Link>
        </div>
      </div>
    </>
  );
}
