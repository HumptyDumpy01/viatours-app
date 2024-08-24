// 'use client';
import './page.scss';
import ArticlesHero from '@/components/articles/hero/ArticlesHero';
import ArticlesContainer from '@/components/articles/container/ArticlesContainer';
import ArticlesNavigation from '@/components/articles/header/ArticlesNavigation';
import ArticlesHeader from '@/components/articles/header/ArticlesHeader';
import ArticlesCardContainer from '@/components/articles/card/ArticlesCardContainer';
import NewestArticlesContainer from '@/components/articles/newest/NewestArticlesContainer';
/*interface ArticlesPageInterface {
  // children: ReactNode;
}*/
export default function ArticlesPage(/*{  }: ArticlesPageInterface*/) {
  return (
    <>
      <section className="articles-hero-container">
        <ArticlesHero />
      </section>
      <ArticlesContainer>
        <div className="travel-articles container">
          <ArticlesNavigation />
          <ArticlesHeader />
        </div>
        <ArticlesCardContainer>
          <NewestArticlesContainer />
        </ArticlesCardContainer>
      </ArticlesContainer>
    </>
  );
}
