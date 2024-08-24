// 'use client';
import './HeroTags.scss';
/*type HeroTagsType = {
  // children: ReactNode;
}*/

export default function HeroTags(/*{  }: HeroTagsType*/) {
  return (
    <>
      <div className="hero__article-tag-container">
        <a href="#"
           className="hero__article-tag hero__article-tag--active all">All</a>
        <a href="#" className="hero__article-tag culture">Culture</a>
        <a href="#"
           className="hero__article-tag historic">Historic</a>
        <a href="#" className="hero__article-tag nature">Nature</a>
        <a href="#" className="hero__article-tag trips">Trips</a>
      </div>
    </>
  );
}
