'use client';

import './ArticleDescrComments.scss';
import SortBy from '@/components/UI/SortBy/SortBy';
import ArticleDescrComment from '@/components/article-description/comments/ArticleDescrComment';
import { ArticleComment } from '@/app/articles/[id]/page';
import React, { useEffect, useRef, useState } from 'react';
import CommentSkeleton from '@/components/tourDescription/skeletons/CommentSkeleton';
import { SessionType } from '@/components/UI/Comment/Comment';
import { useCartSelector } from '@/store/hooks';
import { motion } from 'framer-motion';

type ArticleDescrCommentsType = {
  comments: ArticleComment[];
  session: SessionType;
  // children: ReactNode;
}

export default function ArticleDescrComments({ comments, session }: ArticleDescrCommentsType) {
  const commentsPerPage = 3;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currArticlesComments, setCurrArticlesComments] = useState<ArticleComment[] | []>([]);
  const [disableSorting, setDisableSorting] = useState(comments.length === 0);

  const isArticleCommentAdded = useCartSelector((state) => state.articleDescription.articleCommentAdded);
  const newArticleReviews = useCartSelector((state) => state.articleDescription.newArticleReviews);

  useEffect(() => {
    setCurrArticlesComments(comments);
  }, [isArticleCommentAdded, comments]);

  const timer = useRef<NodeJS.Timeout | null>(null);

  const totalCommentsToShow = currentPage * commentsPerPage;
  // Adjust the slice method to use totalCommentsToShow

  // use this array of an object to loop over.
  const currentComments = currArticlesComments.slice(0, totalCommentsToShow);

  // change the page to show more comments
  const handleMoreReviews = () => {
    setCurrentPage((prev) => prev + 1);
  };

  function handleSorting(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;

    setDisableSorting(true);

    timer.current = setTimeout(() => {
      setDisableSorting(false);
      clearTimeout(timer.current as NodeJS.Timeout);
    }, 1000);

    if (value === `newest`) {
      setCurrArticlesComments([...comments].sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()));
    }
    if (value === `oldest`) {
      setCurrArticlesComments([...comments].sort((a, b) => new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime()));
    }
    if (value === `likes`) {
      setCurrArticlesComments([...comments].sort((a, b) => b.likes.length - a.likes.length));
    }
  }


  return (
    <motion.section
      initial={{ opacity: 0, y: 300 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className="comments-container">
      <div className="comments container">
        <div className="comments__heading-container">
          <h3 className="comments__heading secondary-heading">Comments</h3>
          <SortBy options={[
            { value: `newest`, label: `Newest` },
            { value: `oldest`, label: `Oldest` },
            { value: `likes`, label: `Likes` }]} handleOnChange={handleSorting} disabled={disableSorting} />
        </div>

        {comments.length === 0 && newArticleReviews.length === 0 && (
          <p className="paragraph">No comments yet. Be the first to comment!</p>
        )}
        <div className="comments__comment-container">
          <div
            className="comments__section">
            {isArticleCommentAdded && (
              <>
                <CommentSkeleton showImageSkeleton={false} />
              </>
            )}
            {newArticleReviews?.length > 0 && newArticleReviews.map(function(review, index) {
              return (
                <ArticleDescrComment
                  disableLikesAndDislikesBtn={true}
                  key={index}
                  session={session}
                  comment={{
                    _id: ``,
                    user: review.user,
                    rating: review.rating,
                    title: review.title,
                    text: review.text,
                    addedAt: review.addedAt!,
                    likes: [],
                    dislikes: [],
                    abuseReports: []
                  }} />
              );
            })}

            {currentComments.map(function(comment) {
              return (
                <ArticleDescrComment key={comment._id.toString()} session={session} comment={comment} />
              );
            })}
          </div>

          {totalCommentsToShow < currArticlesComments.length && (
            <>
              <div className={`margin-top-7rem`}>
                <motion.button
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: `spring`, stiffness: 300 }}
                  onClick={handleMoreReviews}
                  className="btn comments__comment__see-more flex flex-align-center">See more comments
                  <svg className="comments__comment__see-more-icon" xmlns="http://www.w3.org/2000/svg" width="14"
                       height="15"
                       viewBox="0 0 14 15" fill="none">
                    <path className="comments__comment__see-more-path"
                          d="M12.4598 8.01294L6.71137 13.6874L1.03692 7.93897M6.7165 12.8941L6.7915 1.31262"
                          stroke="#EB662B"
                          strokeWidth="1.90385" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.button>
              </div>
            </>
          )}
        </div>

      </div>
    </motion.section>
  );
}
