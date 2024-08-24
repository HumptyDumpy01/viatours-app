// 'use client';

/*type ArticlesHeaderType = {
  // children: ReactNode;
}*/

import ArticlesHeaderQuickNav from '@/components/articles/header/ArticlesHeaderQuickNav';

export default function ArticlesHeader(/*{  }: ArticlesHeaderType*/) {
  return (
    <>
      <div className="travel-articles__heading-container">
        <h2 className="travel-articles__heading secondary-heading">Travel Articles</h2>
        <p className="travel-articles__text">Welcome to our travel articles hub! Whether you’re a seasoned
          globetrotter
          or a
          curious wanderer, our collection of captivating travel stories will ignite your sense of adventure!</p>
        <h3 className="travel-articles__quick-nav-heading">Quick Navigation</h3>
        <ArticlesHeaderQuickNav />
      </div>
    </>
  );
}
