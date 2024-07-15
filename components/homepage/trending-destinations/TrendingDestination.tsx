// 'use client';

import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import './TrendingDestinations.scss';

interface TrendingDestinationInterface {
  href: string;
  imgSrc: StaticImageData | string;
  alt: string;
  country: string;
  text: string;
  // children: ReactNode;
}

export default function TrendingDestination({ href, imgSrc, alt, country, text }: TrendingDestinationInterface) {
  return (
    <Link className="trending-destinations-figure-link" href={href}>
      <figure className="trending-destinations-figure">
        <div className="trending-destinations-figure-wrapper-img">
          {/*<img className="trending-destinations__img" src="img/topTrending/tourCard_image_5.svg"*/}
          <Image fill className="trending-destinations__img" src={imgSrc}
                 alt={alt} />
        </div>
        <h3 className="tertiary-heading">{country}</h3>
        <p>{text}</p>
      </figure>
    </Link>
  );
}
