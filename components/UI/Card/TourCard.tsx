// 'use client';

import locationIcon from '@/assets/images/homepage/findPopularTours/location-icon.svg';
import starFilled from '../../../assets/images/homepage/findPopularTours/one-star.svg';
import starEmpty from '../../../assets/images/homepage/findPopularTours/empty-star.svg';
import Link from 'next/link';
import '@/components/homepage/trending-destinations/TrendingDestinations.scss';
import Image from 'next/image';

export interface TourCardInterface {
  href: string;
  imgSrc: string;
  imgAlt: string;
  info: {
    country: string;
    city: string;
    heading: string;
    rating: number;
    ratingCount: number;
    duration: string;
    price: number;
    overview: string;
  }[];
  // children: ReactNode;
}

export default function TourCard({ href, imgSrc, imgAlt, info }: TourCardInterface) {
  return (
    <figure className="find-popular-tours__figure">
      <Link href={href} className="find-popular-tours__figure-link">
        <div className="find-popular-tours__figure__img-wrapper">
          <Image className="find-popular-tours__figure__img"
                 src={imgSrc}
                 alt={imgAlt} />
          <div className="find-popular-tours__figure-shape"></div>
        </div>
        <div className="find-popular-tours__figure-wrapper">
          <div className="sub-heading-wrapper flex">
            <Image width={20} height={60} src={locationIcon} alt="location icon"
                   className="sub-heading-location-icon" />
            <span>{info[0].city}, {info[0].country}</span>
          </div>

          <h3 className="find-popular-tours__figure__heading">{info[0].heading}</h3>
          <div className="find-popular-tours__figure__rating flex">
            {/*make a loop for the rating. We should ouput five stars, empty or filled
            depending on the rating*/}
            {Array.from({ length: 5 }, (_, i) => {
              if (i < Number(info[0].rating.toFixed(0))) {
                return <Image key={i} width={15} height={15} src={starFilled} alt="star filled" />;
              } else {
                return <Image key={i} width={15} height={15} src={starEmpty} alt="star empty" />;
              }
            })}

            <p>{info[0].rating.toFixed(1)}<span
              className="find-popular-tours__figure__rating--span">({info[0].ratingCount})</span></p>
          </div>

          <div className="find-popular-tours__bottom flex flex-space-between">
            <p>{info[0].duration}</p>
            <p>From <span className="find-popular-tours__bottom__span">${info[0].price}</span></p>
          </div>
        </div>
      </Link>
    </figure>
  );
}
