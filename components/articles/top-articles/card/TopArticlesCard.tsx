// 'use client';
import './TopArticlesCard.scss';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';

export type TopArticlesCardType = {
  _id: string;
  image: any;
  type: string[];
  title: string;
  country: string;
  readTime: string;
  author: string;
  // children: ReactNode;
}

export default function TopArticlesCard({ image, readTime, author, country, type, title, _id }: TopArticlesCardType) {

  const capitalizedType = type.map((type) => type.charAt(0).toUpperCase() + type.slice(1)).join(`, `);

  return (
    <Link href={`/articles/${_id}`} className="link travel-articles__card-hover">
      <figure className="travel-articles__the-top-articles__card">
        <span className="inline-block travel-articles__the-top-articles-tag">{capitalizedType}</span>
        <div className="travel-articles__the-top-articles__card-img">
          <CldImage
            width={320}
            height={246}
            className={`travel-articles__the-top-articles__card-img`}
            crop="fill"
            alt={title}
            src={`${image}`} />
        </div>
        <div className="travel-articles__the-top-articles__card-info">
          <h3
            className="travel-articles__the-top-articles__card-heading">{title.length > 30 ? title.slice(0, 30) + `...` : title}</h3>
          <div className="travel-articles__the-top-articles__card-info__location-and-time flex">
                <span
                  className="travel-articles__the-top-articles__card-info__location flex flex-align-center gap-5px">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="20" viewBox="0 0 14 20" fill="none">
                  <path
                    d="M7.03989 9.29455C6.39823 9.29455 5.78285 9.0475 5.32913 8.60774C4.87541 8.16798 4.62051 7.57153 4.62051 6.94962C4.62051 6.3277 4.87541 5.73126 5.32913 5.29149C5.78285 4.85173 6.39823 4.60468 7.03989 4.60468C7.68155 4.60468 8.29693 4.85173 8.75065 5.29149C9.20437 5.73126 9.45927 6.3277 9.45927 6.94962C9.45927 7.25756 9.39669 7.56248 9.27511 7.84698C9.15352 8.13149 8.97531 8.38999 8.75065 8.60774C8.52599 8.82549 8.25928 8.99821 7.96575 9.11606C7.67222 9.2339 7.35761 9.29455 7.03989 9.29455ZM7.03989 0.383789C5.24324 0.383789 3.52018 1.07554 2.24976 2.30688C0.97934 3.53821 0.265625 5.20825 0.265625 6.94962C0.265625 11.874 7.03989 19.1433 7.03989 19.1433C7.03989 19.1433 13.8142 11.874 13.8142 6.94962C13.8142 5.20825 13.1004 3.53821 11.83 2.30688C10.5596 1.07554 8.83654 0.383789 7.03989 0.383789Z"
                    fill="#F4F4F4" />
                  </svg>
                  {country}
                </span>
            <span className="travel-articles__the-top-articles__card-info__time flex flex-align-center gap-5px">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                  <path
                    d="M7.99615 0.947266C12.3132 0.947266 15.8126 4.4467 15.8126 8.76373C15.8126 13.0808 12.3132 16.5802 7.99615 16.5802C3.67912 16.5802 0.179688 13.0808 0.179688 8.76373C0.179688 4.4467 3.67912 0.947266 7.99615 0.947266ZM7.99615 2.51056C6.3377 2.51056 4.74719 3.16937 3.57449 4.34207C2.40179 5.51477 1.74298 7.10528 1.74298 8.76373C1.74298 10.4222 2.40179 12.0127 3.57449 13.1854C4.74719 14.3581 6.3377 15.0169 7.99615 15.0169C9.65459 15.0169 11.2451 14.3581 12.4178 13.1854C13.5905 12.0127 14.2493 10.4222 14.2493 8.76373C14.2493 7.10528 13.5905 5.51477 12.4178 4.34207C11.2451 3.16937 9.65459 2.51056 7.99615 2.51056ZM7.99615 4.07385C8.1876 4.07388 8.37238 4.14416 8.51545 4.27138C8.65852 4.3986 8.74992 4.57391 8.77232 4.76404L8.77779 4.8555V8.44012L10.8937 10.556C11.0339 10.6967 11.1153 10.8855 11.1213 11.084C11.1274 11.2825 11.0577 11.4758 10.9263 11.6248C10.795 11.7737 10.6119 11.8671 10.4142 11.8859C10.2165 11.9048 10.019 11.8476 9.86194 11.7262L9.78846 11.6613L7.44352 9.31635C7.32204 9.19476 7.24402 9.03652 7.22154 8.86612L7.2145 8.76373V4.8555C7.2145 4.64819 7.29685 4.44938 7.44344 4.30279C7.59003 4.1562 7.78884 4.07385 7.99615 4.07385Z"
                    fill="#F4F4F4" />
                  </svg>
              {readTime}</span>
          </div>
          <div className="travel-articles__the-top-articles__card-info__author">
            <p className="travel-articles__the-top-articles__card-info__author__p">By {author}</p>
          </div>
        </div>
      </figure>
    </Link>
  );
}
