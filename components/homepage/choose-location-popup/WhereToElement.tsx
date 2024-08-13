'use client';

import { ReactNode } from 'react';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';


type WhereToElementLocation = {
  type: `location`;
  title: string;
  country: string;
  href: string;
}
type WhereToElementTour = {
  type: `tour`;
  image: string;
  title: string;
  country: string;
  price: string;
  href: string;
}
type WhereToElementSearch = {
  type: `search-all`;
  title: string;
  href: string;
}

type WhereToElementInterface = WhereToElementLocation | WhereToElementTour | WhereToElementSearch;

export default function WhereToElement(props: WhereToElementInterface) {
  let content: ReactNode;
  if (props.type === `location`) {
    content = (
      <Link href={props.href}
            className="where-to-popup__element where-to-popup__element--location flex flex-align-center">
        <div className="where-to-popup__location-icon-wrapper">
          <svg className="where-to-popup__location-icon" xmlns="http://www.w3.org/2000/svg" width="17" height="23"
               viewBox="0 0 17 23" fill="none">
            <path
              d="M8.44044 10.9969C7.69341 10.9969 6.97698 10.7001 6.44874 10.1719C5.92051 9.64366 5.62375 8.92722 5.62375 8.18019C5.62375 7.43316 5.92051 6.71672 6.44874 6.18849C6.97698 5.66026 7.69341 5.3635 8.44044 5.3635C9.18748 5.3635 9.90391 5.66026 10.4321 6.18849C10.9604 6.71672 11.2571 7.43316 11.2571 8.18019C11.2571 8.55008 11.1843 8.91636 11.0427 9.25809C10.9012 9.59983 10.6937 9.91034 10.4321 10.1719C10.1706 10.4334 9.86008 10.6409 9.51835 10.7825C9.17661 10.924 8.81034 10.9969 8.44044 10.9969ZM8.44044 0.293457C6.34875 0.293457 4.34273 1.12438 2.86368 2.60343C1.38463 4.08248 0.553711 6.0885 0.553711 8.18019C0.553711 14.0952 8.44044 22.827 8.44044 22.827C8.44044 22.827 16.3272 14.0952 16.3272 8.18019C16.3272 6.0885 15.4963 4.08248 14.0172 2.60343C12.5382 1.12438 10.5321 0.293457 8.44044 0.293457Z"
              fill="#EB662B" />
          </svg>
        </div>
        <div className="where-to-popup__element__data">
          <span className="where-to-popup__element__data-span">{props.title}</span>
          <p className="where-to-popup__element__data-country">{props.country}</p>
        </div>
      </Link>
    );
  }

  if (props.type === `tour`) {
    content = (
      <Link href={props.href} className="where-to-popup__element where-to-popup__element--tour flex flex-align-center">
        <div className="where-to-popup__element__image-wrapper">
          {/*<Image fill className="where-to-popup__element__image" src={props.image}*/}
          {/*       alt="tour destination image" />*/}
          <CldImage fill src={props.image} className={`where-to-popup__element-image`} alt="tour destination image" />
        </div>
        <div className="where-to-popup__element__data">
            <span
              className="where-to-popup__element__data-span">{props.title}</span>
          <p className="where-to-popup__element__data-country">{props.country} | From {props.price}</p>
        </div>
      </Link>
    );
  }
  if (props.type === `search-all`) {
    content = (
      <Link href={props.href} className="where-to-popup__element flex flex-align-center">
        <div className="where-to-popup__location-icon-wrapper">
          <svg className="where-to-popup__search-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22"
               viewBox="0 0 22 22" fill="none">
            <path
              d="M16.7081 16.7403L20.3014 20.3337M19.2643 10.5115C19.2643 15.3963 15.3174 19.356 10.4501 19.356C5.5816 19.356 1.63477 15.3963 1.63477 10.5127C1.63477 5.62549 5.5816 1.66699 10.4489 1.66699C15.3174 1.66699 19.2643 5.62666 19.2643 10.5115Z"
              stroke="#EB662B" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="where-to-popup__element__data">
              <span className="where-to-popup__element__data-see-all">See all results for &quot;<span
                className="where-to-popup__element__data-span user-search-input">{props.title}</span>&quot;</span>
        </div>
      </Link>
    );
  }

  return (
    <>
      {content}
    </>
  );
}
