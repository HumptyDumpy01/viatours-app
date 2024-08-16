'use client';

import './TourComments.scss';
import Comment, { SessionType } from '@/components/UI/Comment/Comment';
import IconIon from '@/components/UI/IonIcon/IconIon';
import { useState } from 'react';

export type TourCommentsType = {
  currTourComments: [] | {
    _id: string;
    user: string;
    rating: number;
    title: string;
    text: string;
    images: string[];
    addedAt: string;
    likes: [];
    dislikes: [];
  }[];
  session: SessionType;
};

export default function TourComments({ currTourComments, session }: TourCommentsType) {

  /* IMPORTANT: THIS PAGINATION INSTRUCTION IS VALID WHEN YOU HAVE JUST ONE BUTTON
  *   FOR EACH PAGE, AFTER CLICKING IT, SHOWS "N" AMOUNT OF ITEMS, WHERE PREVIOUS ITEMS
  *   ARE SHOWN TOO */

  // the number of comments to show per page
  const commentsPerPage = 3;
  const [currentPage, setCurrentPage] = useState<number>(1);


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
          session={session}
          key={comment._id}
          id={comment._id}
          user={comment.user}
          date_added={comment.addedAt}
          rated={comment.rating}
          title={comment.title}
          text={comment.text}
          images={comment.images}
          likes={comment.likes.length}
          likesArray={comment.likes}
          dislikesArray={comment.dislikes}
          dislikes={comment.dislikes.length}
          // abuse_reports={comment.abuseReports}
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