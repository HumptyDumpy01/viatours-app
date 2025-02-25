'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CldImage } from 'next-cloudinary';

interface ArticleCardInterface {
  imgSrc: string;
  href: string;
  type: string[];
  date: string;
  author: string;
  title: string;
  // children: ReactNode;
}

const item = {
  transition: { type: 'spring', stiffness: 100, damping: 10 },
  hidden: { opacity: 0, scale: 0.5 },
  show: { opacity: 1, scale: 1 }
};

export default function ArticleCard({ imgSrc, href, type, date, author, title }: ArticleCardInterface) {

  const capitalizedType = type.map((type) => type.charAt(0).toUpperCase() + type.slice(1)).join(`, `);
  return (
    <motion.div
      variants={item}
      whileHover={{ scale: 1.1 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <Link href={`/articles/${href}`} className="travel-articles-link">
        <article className="travel-articles__articles__article travel-articles__articles__article-1">
          <div className="travel-articles__articles__article__img-wrapper">

            <CldImage
              width={340}
              height={246}
              className={`travel-articles__articles__article__img`}
              crop="fill"
              alt={title}
              src={`${imgSrc}`}
            />
            <p className="travel-articles__articles__article__img-shape">{capitalizedType}</p>
          </div>
          <div className="travel-articles__articles__article__details flex flex-align-center">
            <p className="paragraph paragraph--travel-articles-date">{date}</p>
            <span
              className="paragraph paragraph--travel-articles-date">By {author.length > 15 ? author.slice(0, 15) + `...` : author}</span>
          </div>
          <h3 className="tertiary-heading travel-articles__articles__article__title">{title}</h3>
        </article>
      </Link>
    </motion.div>
  );
}
