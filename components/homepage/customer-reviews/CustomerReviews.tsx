'use client';

import React, { useState } from 'react';
import CustomerReview from '@/components/homepage/customer-reviews/CustomerReview';
import CustomerReviewsHeading from '@/components/homepage/customer-reviews/CustomerReviewsHeading';
// Import other necessary components and assets
import customer1 from '@/assets/images/homepage/customerReviews/customer-1.png';
import customer2 from '@/assets/images/homepage/customerReviews/customer-2.png';
import customer3 from '@/assets/images/homepage/customerReviews/customer-3.png';
import customer4 from '@/assets/images/homepage/customerReviews/customer-4.png';

export default function CustomerReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalReviews = 4; // Assuming there are 4 reviews. Adjust as necessary.

  // using buttons left and right to move a slider
  /* const handleNextReview = () => {
     setCurrentIndex((prevIndex) => (prevIndex + 1) % totalReviews);
   };

   const handlePreviousReview = () => {
     setCurrentIndex((prevIndex) => (prevIndex - 1 + totalReviews) % totalReviews);
   };*/

  // using dots to switch between reviews
  const handleDotClick = (index: React.SetStateAction<number>) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <CustomerReviewsHeading />
      <div className="customer-reviews__review-wrapper" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {/* CustomerReview components */}

        <CustomerReview
          customerLogoImg={customer1}
          title="Great experience!"
          text="I had a great experience with Viatours Travel Agency. I went on a tour to the Grand Canyon and it was amazing!"
          initials="John Smith"
          job="Software Engineer"
        />
        <CustomerReview
          customerLogoImg={customer2}
          title="Amazing to explore new things!"
          text="I went on a tour to the Amazon Rainforest with Viatours Travel Agency and it was amazing!"
          initials="Jane Doe"
          job="Nurse"
        />
        <CustomerReview
          customerLogoImg={customer3}
          title="That was Fantastic!"
          text="I went on a tour to the Great Barrier Reef with Viatours Travel Agency and it was fantastic!"
          initials="John Doe"
          job="Doctor"
        />
        <CustomerReview
          customerLogoImg={customer4}
          title="Wonderful! Thanks a lot Viatours!"
          text="I went on a tour to the Grand Canyon with Viatours Travel Agency and it was wonderful!"
          initials="Jane Smith"
          job="Teacher"
        />
      </div>

      {/* WHEN USING BUTTONS LEFT AND RIGHT*/}
      {/*<aside className="customer-reviews-btn-wrapper flex heading-scale-effect">
        <button onClick={handlePreviousReview}>&larr;</button>
        <button onClick={handleNextReview}>&rarr;</button>
      </aside>*/}
      {/*WHEN USING DOTS*/}
      <aside className="customer-reviews-btn-wrapper flex heading-scale-effect">
        {Array.from({ length: totalReviews }, (_, index) => (
          <div
            key={index}
            className={`customer-reviews-toggle-btn ${currentIndex === index ? 'customer-reviews-toggle-btn--active' : ''}`}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </aside>
    </>
  );
}