// 'use client';
import Link from 'next/link';
import { Skeleton } from '@mui/material';

export default function ArticleContentTopCreatorCardSkeleton() {
  return (
    <>
      <Link href="#"
            className="tour-article-descr__extra-info__author flex flex-align-center top-creators-container text-decoration-none">
        <Skeleton animation={`wave`} className={`tour-article-descr__extra-info__author-img top-creators-img`}
                  variant={`circular`}
                  width={75} height={75} />
        <div className="grid tour-article-descr__extra-info__author-credentials">
          <p className="tour-article-descr__extra-info__author-name top-creators-author">
            <Skeleton width={100} height={30} />
          </p>
          <p className="tour-article-descr__extra-info__author-employment top-creators-employment">
            <Skeleton width={60} />
          </p>
        </div>
      </Link>
    </>
  );
}
