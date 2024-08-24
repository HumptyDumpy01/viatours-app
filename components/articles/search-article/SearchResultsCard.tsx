// 'use client';

type SearchResultsCardType = {
  imageUrl: any;
  // children: ReactNode;
}

import Link from 'next/link';

export default function SearchResultsCard({ imageUrl }: SearchResultsCardType) {
  return (
    <figure className="travel-articles__the-newest__card grid search-article-card" data-date="2023-07-22T21:10:00"
            data-views="1004"
            data-title="Kenya vs Tanzania Safari: The Better African Safari Experience(Kenya, Tanzania)"
            data-tag="historic">
      <Link href="#" className="travel-articles__card-hover link search-results-anchor">
        <span className="inline-block travel-articles__the-newest__card-tag">Trips</span>
        <img data-src="img/search-any-article/tour-image-1.png" src={imageUrl.src}
             alt="dummy image for the newest topic card"
             className="travel-articles__the-newest__card-img" />
        <div className="travel-articles__the-newest__card-info flex">
          <span className="travel-articles__the-newest__card-info__date inline-block">July 07 2023</span>
          <span className="travel-articles__the-newest__card-info__author inline-block">By Viktoria Birmingham</span>
        </div>
        <h3 className="travel-articles__the-newest__card-heading">
          Kenya vs Tanzania Safari: The Better African
          Safari Experience
        </h3>
      </Link>
    </figure>
  );
}
