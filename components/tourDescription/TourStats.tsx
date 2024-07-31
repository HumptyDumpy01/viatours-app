// 'use client';
import './TourStats.scss';
import Stars from '@/components/UI/Layout/Stars';
import IconIon from '@/components/UI/IonIcon/IconIon';

type TourStatsType = {
  info: {
    rating: number;
    totalReviews: number;
    city: string;
    country: string;
    booked: number;
    views: number;

  }
  // children: ReactNode;
}

export default function TourStats({ info }: TourStatsType) {
  return (
    <>
      <div className="description__stats flex">
        <div className="description__stats-rating flex">
          <Stars rating={info.rating} />
          <div className="description__stats-rating--rate flex">
            <p className="description__stats-rating--rate">{info.rating.toFixed(1)}</p>
            <p className="description__stats-rating--reviews">({info.totalReviews})</p>
          </div>
        </div>
        <div className="description__stats-country flex">
          <p className="paragraph">{info.city}, {info.country}</p>
        </div>
        <div className="description__stats-booked">
          <p
            className="paragraph">{info.views < 1000 ? info.views : `${(info.views / 1000).toFixed()}K+`} Views</p>
        </div>
        <div className="description__stats-booked">
          <p
            className="paragraph">{info.booked < 1000 ? info.booked : `${(info.booked / 1000).toFixed()}K+`} booked</p>
        </div>
      </div>
      <div className="description__stats-share flex flex-align-center">
        <button className="paragraph--share">
          {/*<ion-icon name="arrow-redo" className="icon icon--share"></ion-icon>*/}
          <IconIon type={`arrowRedo`} className="icon icon--share"></IconIon>
          Share
        </button>
        <button className="paragraph--wishlist">
          {/*<ion-icon name="bookmark-outline" className="icon icon--bookmark"></ion-icon>*/}
          <IconIon type={`bookmarkOutline`} className="icon icon--bookmark"></IconIon>
          Wishlist
        </button>
      </div>
    </>
  );
}
