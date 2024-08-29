// 'use client';
import './page.scss';
import { getArticleDetails, TagsType, TypesType } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import ArticleDescrMainWrapper from '@/components/article-description/ArticleDescrMainWrapper';

interface ArticleDescriptionInterface {
  params: {
    id: string;
  };
  // children: ReactNode;
}

export type ArticleComment = {
  _id: ObjectId;
  user: string;
  rating: number;
  title: string;
  text: string;
  addedAt: string;
  likes: string[];
  dislikes: string[];
};
export type ArticleAuthorType = {
  name: string;
  employment: string;
  image: string;
}

export type ArticleAuthorTypeFull = {
  _id: string;
  firstName: string;
  lastName: string;
  articles: string[];
  reportAbuse: string[];
  image: string;
  rating: number[];
  employment: string;
  email: string;
}

export type ArticleDescrType = {
  _id: string;
  subTitle: string;
  title: string;
  images: string[];
  tags: TagsType[];
  type: TypesType[];
  rating: number[];
  views: number;
  location: string;
  author: ArticleAuthorType;
  readTime: string;
  content: [];
  createdAt: string;
  comments: ArticleComment[];
}

/* TEMPORARY */
// @ts-ignore
export default async function ArticleDescription({ params }: ArticleDescriptionInterface) {
  const id = params.id;


  /* IMPORTANT: FOR PRODUCTION */
  /*
    // fetch the article from the server based on url id
    const article: {
      error: boolean;
      article: ArticleType[];

    } = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-article-details`, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`
      },
      body: JSON.stringify({ id })
    }).then((response) => response.json()).catch((error) => {
      console.error(`Fetch error:`, error);
    });

    if (article.error) {
      throw new Error(`Failed to fetch article`);
    }

    console.log(`Article: `, article.article[0]);*/
  ///////////////////////////////////////

  // TODO: fetch the session from the server

  /* IMPORTANT: FOR DEVELOPMENT */

  // @ts-ignore
  const article: {
    error: boolean;
    article: ArticleDescrType[];
  } = await getArticleDetails(id);

  if (!article) {
    throw new Error(`Failed to fetch article`);
  }
  console.log(`Article: `, article.article[0]);

  return (
    <>
      {/*@ts-ignore*/}
      <ArticleDescrMainWrapper article={article.article[0]} session={[]} />
    </>
  );
}
