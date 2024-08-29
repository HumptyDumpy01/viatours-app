// 'use client';
import './ArticlesCard.scss';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';
import { SearchResultsCardType } from '@/components/articles/search-article/SearchResultsCard';

/*type ArticlesCardType = {
  // type: string[];
  // children: ReactNode;
}*/

export default function ArticlesCard({ title, type, image, _id, author, createdAt }: SearchResultsCardType) {

  const date = new Date(createdAt);
  const formattedDate = date.toDateString().split(' ').slice(1, 3).join(' ');

  const capitalizedType = type.map((type) => type.charAt(0).toUpperCase() + type.slice(1)).join(`, `);

  return (
    <figure className="travel-articles__the-newest__card grid">
      <Link href={`/articles/${_id}`} className="link travel-articles__card-hover">
        <span className="inline-block travel-articles__the-newest__card-tag">{capitalizedType}</span>
        {/*@ts-ignore*/}
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
        <h3
          className="travel-articles__the-newest__card-heading">{title.length > 60 ? title.slice(0, 60) + `..` : title}</h3>
      </Link>
    </figure>
  );
}
