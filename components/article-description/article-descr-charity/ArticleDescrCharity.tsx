// 'use client';

import './ArticleDescrCharity.scss';

/*type ArticleDescrCharityType = {
  // children: ReactNode;
}*/

export default function ArticleDescrCharity(/*{  }: ArticleDescrCharityType*/) {
  return (
    <>
      <aside className="donation-to-author-container">
        <div className="donation-to-author container">
          <div className="donation-to-author__first-col">
            <h3 className="donation-to-author__heading">Did you like that article?</h3>
            <p className="donation-to-author__par">You can <u>buy Nika a coffee!</u></p>
          </div>
          <div className="donation-to-author__second-col">
            <button type="button" className="donation-to-author__btn">Buy me a coffee!</button>
          </div>
        </div>
      </aside>
    </>
  );
}
