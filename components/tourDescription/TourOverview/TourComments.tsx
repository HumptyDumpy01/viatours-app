// 'use client';
import './TourComments.scss';
import Comment from '@/components/UI/Comment/Comment';
import { DUMMY_TOUR_COMMENTS } from '@/data/DUMMY_COMMENTS';

type TourCommentsType = {
  tourId: string;
  // children: ReactNode;
}

export default function TourComments({ tourId }: TourCommentsType) {

  const currTourComments = DUMMY_TOUR_COMMENTS.filter((item) => item.tourId === tourId);
  if (currTourComments.length === 0) {
    return <p className="comments__no-comments">No comments yet</p>;
  }
  console.log(`Executing tourId: `, tourId);
  return (
    <section className="comments">
      {currTourComments.map((comment) => (
        <Comment
          key={comment.id}
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
    </section>
  );
}
