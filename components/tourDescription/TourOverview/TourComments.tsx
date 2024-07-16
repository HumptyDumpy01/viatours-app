'use client';

import './TourComments.scss';
import Comment from '@/components/UI/Comment/Comment';
import { DUMMY_TOUR_COMMENTS } from '@/data/DUMMY_COMMENTS';
import IconIon from '@/components/UI/IonIcon/IconIon';
import { useState } from 'react';

type TourCommentsType = {
  tourId: string;
};

export default function TourComments({ tourId }: TourCommentsType) {

  /* IMPORTANT: THIS PAGINATION INSTRUCTION IF VALID WHEN YOU HAVE JUST ONE BUTTON
  *   FOR EACH PAGE, AFTER CLICKING IT, SHOWS "N" AMOUNT OF ITEMS, WHERE PREVIOUS ITEMS
  *   ARE SHOWN TOO */

  // the amount of comments to show per page
  const commentsPerPage = 3;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const currTourComments = DUMMY_TOUR_COMMENTS.filter((item) => item.tourId === tourId);

  if (currTourComments.length === 0) {
    return <h2 className="tertiary-heading">No comments yet!</h2>;
  }

  // Calculate the total number of comments to show based on the current page
  const totalCommentsToShow = currentPage * commentsPerPage;
  // Adjust the slice method to use totalCommentsToShow

  // use this array of object to loop over.
  const currentComments = currTourComments.slice(0, totalCommentsToShow);

  // change the page to show more comments
  const handleMoreReviews = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <section className="comments">
      {currentComments.map((comment) => (
        <Comment
          key={comment.id}
          id={comment.id}
          user={comment.user}
          date_added={comment.date_added}
          rated={comment.rated}
          title={comment.title}
          text={comment.text}
          images={comment.images}
          likes={comment.likes}
          dislikes={comment.dislikes}
          abuse_reports={comment.abuse_reports}
        />
      ))}
      {/* Only show the button if there are more comments to display */}
      {totalCommentsToShow < currTourComments.length && (
        <button onClick={handleMoreReviews} className="btn btn--show-more margin-top-md">See more reviews
          <IconIon type={`arrowForwardOutline`} className="icon icon--right-arrow"></IconIon>
        </button>
      )}
    </section>
  );
}