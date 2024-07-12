'use client';

import React, { useRef, useState } from 'react';
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
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [moveX, setMoveX] = useState(0);
  const reviewWrapperRef = useRef<HTMLDivElement>(null);


  // using buttons left and right to move a slider
  /* const handleNextReview = () => {
     setCurrentIndex((prevIndex) => (prevIndex + 1) % totalReviews);
   };

   const handlePreviousReview = () => {
     setCurrentIndex((prevIndex) => (prevIndex - 1 + totalReviews) % totalReviews);
   };*/


  const handleStart = (clientX: React.SetStateAction<number>) => {
    setIsDragging(true);
    setStartX(clientX);
    if (reviewWrapperRef.current) {
      reviewWrapperRef.current.classList.add('no-select');
      document.body.classList.add('no-select'); // Optional: Prevent text selection outside the component
    }
  };


  const handleMove = (clientX: number) => {
    if (isDragging) {
      const currentMoveX = clientX - startX;
      setMoveX(currentMoveX);
      if (reviewWrapperRef.current) {
        reviewWrapperRef.current.style.transform = `translateX(${(-currentIndex * 100) + (currentMoveX / window.innerWidth) * 100}%)`;
      }
    }
  };


  const handleEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      if (Math.abs(moveX) > window.innerWidth / 4) {
        if (moveX > 0) {
          setCurrentIndex((currentIndex - 1 + totalReviews) % totalReviews);
        } else {
          setCurrentIndex((currentIndex + 1) % totalReviews);
        }
      }
      if (reviewWrapperRef.current) {
        reviewWrapperRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
        reviewWrapperRef.current.classList.remove('no-select');
        document.body.classList.remove('no-select'); // Optional: Allow text selection outside the component
      }
      setMoveX(0);
    }
  };


  const handleMouseDown = (e: { clientX: React.SetStateAction<number>; }) => {
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: { clientX: number; }) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchX = e.touches[0].clientX;
    handleStart(touchX);
    e.preventDefault(); // Prevent scrolling when touching
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchX = e.touches[0].clientX;
    handleMove(touchX);
    e.preventDefault(); // Prevent scrolling when touching
  };
  const handleTouchEnd = () => {
    handleEnd();
  };


  /*
  // IMPORTANT: APPLY THESE STYLES TO YOUR WRAPPERS
    .customer-reviews__review-wrapper {
      display: flex;
      transition: transform 0.5s ease-in-out;
      width: 100%; // Ensure this is set to the full width of a single review
    }

    .customer-reviews__review {
      width: 100%; // This ensures each review takes up the full width of the container
      flex-shrink: 0; // Prevents the reviews from shrinking
    }

  */


  {/*WHEN USING DOTS*/
  }
  {/*<aside className="customer-reviews-btn-wrapper flex heading-scale-effect">
        <button onClick={handlePreviousReview}>&larr;</button>
        <button onClick={handleNextReview}>&rarr;</button>
      </aside>*/
  }

  return (
    <>
      <CustomerReviewsHeading />
      <div
        className="customer-reviews__review-wrapper"
        ref={reviewWrapperRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // Handle case where mouse leaves the component while dragging
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {/* CustomerReview components */}
        {/* Insert CustomerReview components here */}

        <CustomerReview customerLogoImg={customer1} title="Great experience!"
                        text="I had a great experience with Viatours Travel Agency. I went on a tour to the Grand Canyon and it was amazing!"
                        initials="John Smith" job="Software Engineer" />
        <CustomerReview customerLogoImg={customer2} title="Amazing to explore new things!"
                        text="I went on a tour to the Amazon Rainforest with Viatours Travel Agency and it was amazing!"
                        initials="Jane Doe" job="Nurse" />
        <CustomerReview customerLogoImg={customer3} title="That was Fantastic!"
                        text="I went on a tour to the Great Barrier Reef with Viatours Travel Agency and it was fantastic!"
                        initials="John Doe" job="Doctor" />
        <CustomerReview customerLogoImg={customer4} title="Wonderful! Thanks a lot Viatours!"
                        text="I went on a tour to the Grand Canyon with Viatours Travel Agency and it was wonderful!"
                        initials="Jane Smith" job="Teacher" />
      </div>
      {/* Navigation dots */}
      {/* Insert navigation dots here */}

      <aside className="customer-reviews-btn-wrapper flex heading-scale-effect">
        {Array.from({ length: totalReviews }, (_, index) => (
          <div
            key={index}
            className={`customer-reviews-toggle-btn ${currentIndex === index ? 'customer-reviews-toggle-btn--active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </aside>
    </>
  );
}