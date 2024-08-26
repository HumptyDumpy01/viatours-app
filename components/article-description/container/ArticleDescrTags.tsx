// 'use client';

type ArticleDescrTagsType = {
  tags: []
  // children: ReactNode;
}
export default function ArticleDescrTags({ tags }: ArticleDescrTagsType) {
  return (
    <>
      <div className="tour-article-descr__tag-container">
        <div className="tour-article-descr__tag flex flex-align-center gap-14px">
          {/* TODO:  PARSE THE REAL TAG AND INJECT IT HERE */}
          <span className="tour-article-descr__tag-text tag-trips">Trips</span>
          <span className="tour-article-descr__tag-text tag-culture">Culture</span>
          <span className="tour-article-descr__tag-text tag-nature">Nature</span>
          <span className="tour-article-descr__tag-text tag-historic">Historic</span>
        </div>
      </div>
    </>
  );
}
