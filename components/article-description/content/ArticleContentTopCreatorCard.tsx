// 'use client';

type ArticleContentTopCreatorCardType = {
  image: string;
  name: string;
  role: string;
  // children: ReactNode;
}

export default function ArticleContentTopCreatorCard({ image, name, role }: ArticleContentTopCreatorCardType) {
  return (
    <>
      <div
        className="tour-article-descr__extra-info__author flex flex-align-center top-creators-container text-decoration-none">
        <img src={image}
             alt="author logo"
             className="tour-article-descr__extra-info__author-img top-creators-img" />
        <div className="grid tour-article-descr__extra-info__author-credentials">
          <p className="tour-article-descr__extra-info__author-name top-creators-author">{name}</p>
          <p className="tour-article-descr__extra-info__author-employment top-creators-employment">{role}</p>
        </div>
      </div>
    </>
  );
}
