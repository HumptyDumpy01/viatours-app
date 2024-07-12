// 'use client';
import quoteIcon from '@/assets/images/homepage/customerReviews/quote.svg';
import Image, { StaticImageData } from 'next/image';

interface CustomerReviewInterface {
  customerLogoImg: StaticImageData;
  title: string;
  text: string;
  initials: string;
  job: string;
  // children: ReactNode;
}

export default function CustomerReview({ customerLogoImg, title, text, initials, job }: CustomerReviewInterface) {
  return (
    <>
      <div className="customer-reviews__review">
        <div className="customer-reviews__review-img">
          <div className={`customer-reviews__review-img-wrapper`}>
            <Image
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={customerLogoImg}
              alt="Image of a customer" className="customer-reviews__img" />
          </div>
          <div className="customer-reviews__quote">
            <Image width={10} src={quoteIcon} alt="quote icon" />
          </div>
        </div>
        <span className="customer-reviews__subheading">{title}</span>
        <blockquote className="customer-reviews__commentary">{text}</blockquote>
        <h3 className="customer-reviews__author heading-scale-effect">{initials}</h3>
        <span className="customer-reviews__job">{job}</span>
      </div>
    </>
  );
}
