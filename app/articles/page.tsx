// 'use client';
import './page.scss';
import ArticlesHero from '@/components/articles/hero/ArticlesHero';
import ArticlesContainer from '@/components/articles/container/ArticlesContainer';
import ArticlesNavigation from '@/components/articles/header/ArticlesNavigation';
import ArticlesHeader from '@/components/articles/header/ArticlesHeader';
import NewestArticlesContainer from '@/components/articles/newest/NewestArticlesContainer';
import TopArticlesContainer from '@/components/articles/top-articles/TopArticlesContainer';
import ArticlesTravellerReviews from '@/components/articles/top-articles/article-reviews/ArticlesTravellerReviews';
import ArticlesTravellerHeading from '@/components/articles/top-articles/article-reviews/ArticlesTravellerHeading';
import ArticlesReviewsCardContainer
  from '@/components/articles/top-articles/article-reviews/card/ArticlesReviewsCardContainer';
import SearchArticleContainer from '@/components/articles/search-article/SearchArticleContainer';
import HotArticlesCTA from '@/components/articles/cta/HotArticlesCTA';

/*interface ArticlesPageInterface {
  // children: ReactNode;
}*/

export default async function ArticlesPage(/*{  }: ArticlesPageInterface*/) {
  return (
    <>
      <section className="articles-hero-container">
        <ArticlesHero />
      </section>
      <ArticlesContainer>
        <div className="travel-articles container">
          <ArticlesNavigation />
          <ArticlesHeader />
          <NewestArticlesContainer newestArticles={[]} />
          <TopArticlesContainer topArticles={[]} />
        </div>
        <ArticlesTravellerReviews>
          <ArticlesTravellerHeading />
          <ArticlesReviewsCardContainer />
        </ArticlesTravellerReviews>
        <SearchArticleContainer />
        <HotArticlesCTA />
      </ArticlesContainer>
    </>
  );
}
