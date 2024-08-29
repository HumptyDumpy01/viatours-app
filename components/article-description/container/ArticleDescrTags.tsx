// 'use client';

import { TypesType } from '@/lib/mongodb';

type ArticleDescrTagsType = {
  types: TypesType[]
  // children: ReactNode;
}
export default function ArticleDescrTags({ types }: ArticleDescrTagsType) {
  return (
    <>
      <div className="tour-article-descr__tag-container">
        <div className="tour-article-descr__tag flex flex-align-center gap-14px">
          {/* TODO:  PARSE THE REAL TAG AND INJECT IT HERE */}
          {types.map(function(type) {
            return (
              <>
                {type === `trips` && <span className="tour-article-descr__tag-text tag-trips">Trips</span>}
                {type === `culture` && <span className="tour-article-descr__tag-text tag-culture">Culture</span>}
                {type === `nature` && <span className="tour-article-descr__tag-text tag-nature">Nature</span>}
                {type === `historic` && <span className="tour-article-descr__tag-text tag-historic">Historic</span>}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
