'use server';

import { DUMMY_ARTICLES, DummyArticleType } from '@/data/DUMMY_ARTICLES';

export async function fetchArticles(max?: number, tag?: `Trips` | `Culture` | `Nature` | `Historic`): Promise<DummyArticleType[]> {

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  if (!max && !tag) {
    const articles: DummyArticleType[] = DUMMY_ARTICLES;
    return articles;
  }

  if (max && tag) {
    // filter out articles that are new
    const sortedArticles = DUMMY_ARTICLES.filter((article) => article.tags.includes(tag));

    const articles: DummyArticleType[] = sortedArticles.length > max ? sortedArticles.slice(0, max) : sortedArticles;
    // console.log(articles);
    return articles;
  }
  if (max && !tag) {

    const articles: DummyArticleType[] = DUMMY_ARTICLES.length > max ? DUMMY_ARTICLES.slice(0, max) : DUMMY_ARTICLES;
    // console.log(articles);
    return articles;
  }
  const articles: DummyArticleType[] = DUMMY_ARTICLES.filter((article) => article.tags.includes(`${tag}`));
  // console.log(articles);
  return articles;
}