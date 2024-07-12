// 'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ArticleCardInterface {
  imgSrc: string;
  href: string;
  tag: string;
  date: string;
  author: string;
  title: string;
  // children: ReactNode;
}

export default function ArticleCard({ imgSrc, href, tag, date, author, title }: ArticleCardInterface) {
  return (
    <>
      <Link href={href} className="travel-articles-link">
        <article className="travel-articles__articles__article travel-articles__articles__article-1">
          <div className="travel-articles__articles__article__img-wrapper">
            <Image
              className="travel-articles__articles__article__img"
              src={imgSrc}
              alt="Image of a travel article" />
            <p className="travel-articles__articles__article__img-shape">{tag}</p>
          </div>
          <div className="travel-articles__articles__article__details flex flex-align-center">
            <p className="paragraph paragraph--travel-articles-date">{date}</p>
            <span className="paragraph paragraph--travel-articles-date">By {author}</span>
          </div>
          <h3 className="tertiary-heading travel-articles__articles__article__title">{title}</h3>
        </article>
      </Link>
    </>
  );
}
