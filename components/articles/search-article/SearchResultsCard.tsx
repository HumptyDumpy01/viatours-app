// 'use client';

import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import '@/components/articles/card/ArticlesCard.scss';

export type SearchResultsCardType = {
  image: string;
  type: string[];
  title: string;
  createdAt: string;
  author: string;
  _id: string;
  // children: ReactNode;
}

export default function SearchResultsCard({ image, _id, author, createdAt, type, title }: SearchResultsCardType) {

  // console.log(`Executing image: `, image);

  // the createdAt prop I get is in ISO 8601 format, so I need to convert it to a more readable format
  // like this July 07, 2023
  const date = new Date(createdAt);
  const formattedDate = date.toDateString().split(' ').slice(1, 3).join(' ');

  const capitalizedType = type.map((type) => type.charAt(0).toUpperCase() + type.slice(1)).join(`, `);

  return (
    <figure className="travel-articles__the-newest__card grid search-article-card">
      <Link href={`/articles/${_id}`} className="travel-articles__card-hover link search-results-anchor">
        <span className="inline-block travel-articles__the-newest__card-tag">{capitalizedType}</span>
        <CldImage
          width={340}
          height={246}
          className={`travel-articles__the-newest__card-img`}
          crop="fill"
          alt={title}
          src={`${image}`}
        />
        <div className="travel-articles__the-newest__card-info flex">
          <span className="travel-articles__the-newest__card-info__date inline-block">{formattedDate}</span>
          <span className="travel-articles__the-newest__card-info__author inline-block">By {author}</span>
        </div>
        <h3 className="travel-articles__the-newest__card-heading">{title}</h3>
      </Link>
    </figure>
  );
}
