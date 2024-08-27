'use client';

import './ArticleDescrComments.scss';
import SortBy from '@/components/UI/SortBy/SortBy';
import ArticleDescrComment from '@/components/article-description/comments/ArticleDescrComment';

type ArticleDescrCommentsType = {
  comments: {}[];
  // children: ReactNode;
}

export default function ArticleDescrComments({ comments }: ArticleDescrCommentsType) {
  return (
    <section className="comments-container">
      <div className="comments container">
        <div className="comments__heading-container">
          <h3 className="comments__heading secondary-heading">Comments</h3>
          <SortBy options={[
            { value: `newest`, label: `Newest` },
            { value: `oldest`, label: `Oldest` },
            { value: `likes`, label: `Likes` }]} handleOnChange={() => {
          }} disabled={false} />
        </div>

        <div className="comments__comment-container">
          <div className="comments__section">
            <ArticleDescrComment />
            <ArticleDescrComment />
            <ArticleDescrComment />
            <ArticleDescrComment />
          </div>
          <div className={`margin-top-7rem`}>
            <button className="btn comments__comment__see-more flex flex-align-center">See more comments
              <svg className="comments__comment__see-more-icon" xmlns="http://www.w3.org/2000/svg" width="14"
                   height="15"
                   viewBox="0 0 14 15" fill="none">
                <path className="comments__comment__see-more-path"
                      d="M12.4598 8.01294L6.71137 13.6874L1.03692 7.93897M6.7165 12.8941L6.7915 1.31262"
                      stroke="#EB662B"
                      strokeWidth="1.90385" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
