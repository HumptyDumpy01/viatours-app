// 'use client';

/*type ArticleReviewsOverallType = {
  // children: ReactNode;
}*/

export default function ArticleReviewsOverall(/*{  }: ArticleReviewsOverallType*/) {
  return (
    <>
      <div className="traveller-reviews__bottom-container">
        <div className="traveller-reviews__bottom">
          <span className="traveller-reviews__bottom-rating">4.9</span>
          <p className="traveller-reviews__bottom-count">1000+ reviews on this article</p>
        </div>
        <div className="traveller-reviews__bottom">
          <span className="traveller-reviews__bottom-rating">8k+</span>
          <p className="traveller-reviews__bottom-count">Views</p>
        </div>
        <div className="traveller-reviews__bottom-award winner">
          <span className="traveller-reviews__bottom-rating">Award winner</span>
          <p className="traveller-reviews__bottom-count">In <b className="highlighted">Top Viatours Articles</b> in one
            month!</p>
        </div>
      </div>
    </>
  );
}
