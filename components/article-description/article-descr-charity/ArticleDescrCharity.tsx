// 'use client';

import './ArticleDescrCharity.scss';
import { ArticleAuthorType } from '@/app/articles/[id]/page';

type ArticleDescrCharityType = {
  author: ArticleAuthorType;
  // children: ReactNode;
}

export default function ArticleDescrCharity({ author }: ArticleDescrCharityType) {
  return (
    <>
      <aside className="donation-to-author-container">
        <div className="donation-to-author container">
          <div className="donation-to-author__first-col">
            <h3 className="donation-to-author__heading">Did you like that article?</h3>
            <p className="donation-to-author__par">You can <u>buy {author.name.split(` `)[0]} a coffee!</u></p>
          </div>
          <div className="donation-to-author__second-col">
            <button type="button" className="donation-to-author__btn">Buy me a coffee!</button>
          </div>
        </div>
      </aside>
    </>
  );
}
