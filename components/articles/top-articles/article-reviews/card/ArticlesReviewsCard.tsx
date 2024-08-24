// 'use client';

import Link from 'next/link';
import Image from 'next/image';

type ArticlesReviewsCardType = {
  imageUrl: any;
  // children: ReactNode;
}

export default function ArticlesReviewsCard({ imageUrl }: ArticlesReviewsCardType) {
  return (
    <>
      <Link href="#" className="travel-articles__card-hover first-element text-decoration-none">
        <div className="traveller-reviews__review first-element">
          <h3 className="traveller-reviews__review-heading">
            Great work!
          </h3>
          <q className="inline-block traveller-reviews__review-text">Don’t miss St. Mark’s Basilica—the intricate
            mosaics
            are
            awe-inspiring. Venice truly lives up to its reputation as the City of Bridges...</q>
          <div className="traveller-reviews__review-author flex gap-20px flex-align-center">
            <Image src={imageUrl} alt="traveller image 1"
                   className="traveller-reviews__review-author__img" />
            <div className="traveller-reviews__review-author__info">
              <h4 className="traveller-reviews__review-author__info__name">Bobby London</h4>
              <p className="traveller-reviews__review-author__info__employment">Painter</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
