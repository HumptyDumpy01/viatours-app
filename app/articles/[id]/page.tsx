// 'use client';
import './page.scss';
import { getArticleDetails, TagsType, TypesType } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import ArticleDescrMainWrapper from '@/components/article-description/ArticleDescrMainWrapper';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/lib/auth';
import TourDescriptionLoadingPage from '@/app/tours/[id]/loading-page';

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
  abuseReports: string[];
};
export type ArticleAuthorType = {
  _id: string;
  name?: string;
  firstName: string;
  lastName: string;
  employment: string;
  image: string;
  rating: number[];
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

  // fetch the session from the server
  const session = await getServerSession(authConfig);

  if (session === undefined) {
    return <TourDescriptionLoadingPage />;
  }


  let sessionVar;
  if (session === null) {
    sessionVar = {
      user: {
        email: '',
        name: ''
      }
    };
  } else {
    sessionVar = {
      user: {
        email: session!.user!.email,
        name: session!.user!.name
      }
    };
  }
  console.log(`Session: `, sessionVar);

  return (
    <>
      {/*@ts-ignore*/}
      <ArticleDescrMainWrapper article={article.article[0]} session={sessionVar} /> </>
  );
}
