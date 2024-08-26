'use client';

import './HeroTags.scss';
import { Dispatch, SetStateAction } from 'react';
import { TagType } from '@/components/articles/hero/HeroArticlesForm';

type HeroTagsType = {
  activeTag: string;
  setActiveTag: Dispatch<SetStateAction<TagType>>;
  // children: ReactNode;
}


export default function HeroTags({ activeTag, setActiveTag }: HeroTagsType) {

  function toggleActiveTag(tag: TagType) {
    setActiveTag(tag);
  }

  return (
    <div className="hero__article-tag-container">
      <div onClick={() => toggleActiveTag(`all`)}
           className={`hero__article-tag ${activeTag === `all` ? ` hero__article-tag--active` : ``} 
        all flex flex-align-center font-size-16px font-weight-med`}>All
      </div>
      <div onClick={() => toggleActiveTag(`culture`)}
           className={`hero__article-tag culture flex flex-align-center
         ${activeTag === `culture` ? ` hero__article-tag--active` : ``}`}>
        Culture
      </div>
      <div onClick={() => toggleActiveTag(`historic`)}
           className={`hero__article-tag culture flex flex-align-center 
        ${activeTag === `historic` ? ` hero__article-tag--active` : ``}`}>
        Historic
      </div>
      <div onClick={() => toggleActiveTag(`nature`)}
           className={`hero__article-tag culture flex flex-align-center 
        ${activeTag === `nature` ? ` hero__article-tag--active` : ``}`}>
        Nature
      </div>
      <div onClick={() => toggleActiveTag(`trips`)}
           className={`hero__article-tag culture flex flex-align-center 
        ${activeTag === `trips` ? ` hero__article-tag--active` : ``}`}>
        Trips
      </div>
    </div>
  );
}
