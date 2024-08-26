'use client';

/*type HeroArticlesFormType = {
  // children: ReactNode;
}*/

import HeroTags from '@/components/articles/hero/HeroTags';
import { FormEvent, useState } from 'react';

export type TagType = `all` | `culture` | `historic` | `nature` | `trips`;

export default function HeroArticlesForm(/*{  }: HeroArticlesFormType*/) {
  const [activeTag, setActiveTag] = useState<TagType>(`all`);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const currObject = e.currentTarget;
    const formData = new FormData(currObject);
    const results = Object.fromEntries(formData.entries());

    if (activeTag.trim() === ``) {
      results.tag = `all`;
    }

    results.tag = activeTag;

    // output
    console.log(results);
  }

  return (
    <>
      <div className="articles-hero__search-articles-input-container">
        <form onSubmit={handleSubmit} className="articles-hero__search-articles-input">
          <label>
            <input type="search" name={`searchTerm`}
                   className="articles-hero__search-articles-input articles-hero-input"
                   placeholder="Search articles" />
          </label>
          <button type="submit" className="btn articles-hero__search-articles-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M15.0008 15.0008L18.3385 18.3385M17.3751 9.21518C17.3751 13.7524 13.7091 17.4304 9.18809 17.4304C4.666 17.4304 1 13.7524 1 9.21626C1 4.67684 4.666 1 9.187 1C13.7091 1 17.3751 4.67792 17.3751 9.21518Z"
                stroke="white" strokeWidth="1.62548" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <svg className="articles-hero__icon-location" xmlns="http://www.w3.org/2000/svg" width="21" height="21"
               viewBox="0 0 21 21"
               fill="none">
            <g clipPath="url(#clip0_847_11131)">
              <path
                d="M10.8302 4.4292C8.78285 4.4292 7.11719 6.09486 7.11719 8.1422C7.11719 10.1896 8.78285 11.8552 10.8302 11.8552C12.8776 11.8552 14.5432 10.1896 14.5432 8.1422C14.5432 6.09486 12.8776 4.4292 10.8302 4.4292ZM10.8302 10.2919C9.64488 10.2919 8.68055 9.32752 8.68055 8.1422C8.68055 6.95689 9.64488 5.99256 10.8302 5.99256C12.0155 5.99256 12.9799 6.95689 12.9799 8.1422C12.9799 9.32752 12.0155 10.2919 10.8302 10.2919Z"
                fill="#EB662B" />
              <path
                d="M10.8307 0.129883C6.41266 0.129883 2.81836 3.72422 2.81836 8.14219V8.36367C2.81836 10.5981 4.09938 13.2018 6.62594 16.1025C8.4575 18.2053 10.2635 19.6715 10.3394 19.7329L10.8307 20.1299L11.3219 19.733C11.3979 19.6716 13.2039 18.2053 15.0354 16.1025C17.5619 13.2018 18.843 10.5981 18.843 8.36371V8.14222C18.843 3.72422 15.2487 0.129883 10.8307 0.129883ZM17.2796 8.36371C17.2796 12.1397 12.4144 16.7106 10.8307 18.0982C9.24656 16.7102 4.38172 12.1394 4.38172 8.36371V8.14222C4.38172 4.58629 7.27473 1.69328 10.8307 1.69328C14.3866 1.69328 17.2796 4.58629 17.2796 8.14222V8.36371Z"
                fill="#EB662B" />
            </g>
            <defs>
              <clipPath id="clip0_847_11131">
                <rect width="20" height="20" fill="white" transform="translate(0.830078 0.129883)" />
              </clipPath>
            </defs>
          </svg>
        </form>
      </div>
      <HeroTags activeTag={activeTag} setActiveTag={setActiveTag} />
    </>
  );
}
