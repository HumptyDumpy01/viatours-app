// 'use client';

/*type ArticlesNavigationType = {
  // children: ReactNode;
}*/

export default function ArticlesNavigation(/*{  }: ArticlesNavigationType*/) {
  return (
    <>
      <div className="travel-articles__navigation">
        <a href="#" className="inline-block">Home &gt;</a>
        <a href="#" className="inline-block highlighted">Travel Articles</a>
      </div>
    </>
  );
}
