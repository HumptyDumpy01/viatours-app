// 'use client';

import { TourCardInterface } from '@/components/UI/Card/TourCard';

import starFilled from '../../../assets/images/homepage/findPopularTours/one-star.svg';
import starEmpty from '../../../assets/images/homepage/findPopularTours/empty-star.svg';
import Image from 'next/image';
import Link from 'next/link';
/*interface FigureInterface {
  // children: ReactNode;
}*/


// export interface TourCardInterface {
//   href: string;
//   imgSrc: string;
//   imgAlt: string;
//   info: {
//     country: string;
//     city: string;
//     heading: string;
//     rating: number;
//     ratingCount: number;
//     duration: string;
//     price: number;
//   }[];
//   // children: ReactNode;
// }

export default function Figure({ href, imgSrc, imgAlt, info }: TourCardInterface) {
  return (
    <>
      <div className="all-tours__content__figures__figure-wrapper">
        <div className="all-tours__content__figures__figure grid">
          <div className="all-tours__content__figures__figure-img-container">
            <Image fill src={imgSrc}
                   alt={imgAlt}
                   className="all-tours__content__figures__figure-img" />
            {/* <!--                <span
                            class="all-tours__content__figures__figure-img-tag all-tours__content__figures__figure-img-tag&#45;&#45;20-off">20% off</span>--> */}
          </div>
          <div className="all-tours__content__figures__figure-description">
            <span
              className="all-tours__content__figures__figure-description--subheading">{info[0].country}, {info[0].city}</span>
            <h3 className="all-tours__content__figures__figure-description-heading">{info[0].heading}</h3>
            <div className="all-tours__content__figures__figure-description-rating flex">
              {Array.from({ length: 5 }, (_, i) => {
                if (i < Number(info[0].rating.toFixed(0))) {
                  return <Image key={i} width={15} height={15} src={starFilled} alt="star filled" />;
                } else {
                  return <Image key={i} width={15} height={15} src={starEmpty} alt="star empty" />;
                }
              })}
              <span
                className="all-tours__content__figures__figure-description-rate-numbers"><span>{info[0].rating.toFixed(1)}</span> ({info[0].ratingCount})</span>
            </div>
            <p
              className="all-tours__content__figures__figure-description-text">{info[0].overview!.slice(0, 80) + '...'}</p>
            <div
              className="all-tours__content__figures__figure-description-features flex flex-align-center flex-space-between">
                  <span
                    className="all-tours__content__figures__figure-description-features-feature">Best Price Guarantee</span>
              <span
                className="all-tours__content__figures__figure-description-features-feature">Free cancellation</span>
            </div>
          </div>
          <div className="all-tours__content__figures__figure-details">
            <span className="all-tours__content__figures__figure-details-descr">{info[0].duration} long</span>
            <span className="all-tours__content__figures__figure-details-price--crossed">$1200</span>
            <span
              className="all-tours__content__figures__figure-details-price">From <span>${info[0].price}</span></span>
            <Link href={`/tours/${href}`} className="link all-tours__content__figures__figure-details-link">View
              Details</Link>
          </div>
        </div>
      </div>
    </>
  );
}
