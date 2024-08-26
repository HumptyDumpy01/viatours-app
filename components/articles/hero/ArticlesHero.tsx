// 'use client';

/*type ArticlesHeroType = {
  // children: ReactNode;
}*/

import HeroArticlesForm from '@/components/articles/hero/HeroArticlesForm';

export default function ArticlesHero(/*{  }: ArticlesHeroType*/) {
  return (
    <>
      <div className="articles-hero container text-align-center">
        <h1 className="articles-hero__heading main-heading heading-scale-effect">Welcome to <br />
          Viatours Travel Articles!</h1>
        <p className="articles-hero__text">From local escapes to far-flung adventures</p>
        <HeroArticlesForm />
      </div>
    </>
  );
}
