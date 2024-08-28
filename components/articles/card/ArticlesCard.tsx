// 'use client';
import './ArticlesCard.scss';
import Link from 'next/link';

type ArticlesCardType = {
  type: string[];
  image: string;
  // children: ReactNode;
}

export default function ArticlesCard({ image }: ArticlesCardType) {
  return (
    <figure className="travel-articles__the-newest__card grid">
      <Link href={`/articles/1`} className="link travel-articles__card-hover">
        <span className="inline-block travel-articles__the-newest__card-tag">Trips</span>
        <img src={image}
             alt="dummy image for the newest topic card"
             className="travel-articles__the-newest__card-img" />
        <div className="travel-articles__the-newest__card-info flex">
          <span className="travel-articles__the-newest__card-info__date inline-block">April 06 2023</span>
          <span className="travel-articles__the-newest__card-info__author inline-block">By ALI Tufan</span>
        </div>
        <h3 className="travel-articles__the-newest__card-heading">
          Kenya vs Tanzania Safari: The Better African
          Safari Experience
        </h3>
      </Link>
    </figure>
  );
}
