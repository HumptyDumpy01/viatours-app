// 'use client';

import { ArticleDescrType } from '@/app/articles/[id]/page';
import ArticleDescrPageNav from '@/components/article-description/container/ArticleDescrPageNav';
import ArticleDescrTags from '@/components/article-description/container/ArticleDescrTags';
import ArticleDescrHeading from '@/components/article-description/container/ArticleDescrHeading';
import ArticleDescrStats from '@/components/article-description/container/ArticleDescrStats';
import ArticleDescrExtraInfo from '@/components/article-description/container/ArticleDescrExtraInfo';
import ArticleDescrSlider from '@/components/article-description/container/ArticleDescrSlider';
import ArticleDescrContent from '@/components/article-description/content/ArticleDescrContent';
import ArticleDescText from '@/components/article-description/content/ArticleDescText';
import ArticleDescrSecondColumn from '@/components/article-description/content/ArticleDescrSecondColumn';
import ArticleDescrCharity from '@/components/article-description/article-descr-charity/ArticleDescrCharity';
import ArticleDescrAd from '@/components/article-description/article-descr-ad/ArticleDescrAd';
import ArticleDescrComments from '@/components/article-description/comments/ArticleDescrComments';
import ArticleDescrLeaveReply from '@/components/article-description/leave-reply/ArticleDescrLeaveReply';
import YouMightAlsoLike from '@/components/article-description/you-might-also-like/YouMightAlsoLike';

type ArticleDescrMainWrapperType = {
  session: {
    user: {
      email: string | ``;
      name: string | ``;
      image: string | `` | null;
    }
  },
  article: ArticleDescrType;
  // children: ReactNode;
}


export default function ArticleDescrMainWrapper({ session, article }: ArticleDescrMainWrapperType) {

  // if views number is e.g. 1453, the views will be 1.5k etc.
  // if views number is e.g. 1000, the views will be 1k etc
  const formattedViews = article.views >= 1000 ? `${(article.views / 1000).toFixed()}k+` : article.views.toString();

  // if the date in 2020-12-12T12:00:00Z format,
  // I do want it to be as 12 December 2020, 12:00
  const date = new Date(article.createdAt);
  const formattedDate = date.toLocaleString(`en-UA`, {
    day: `numeric`,
    month: `long`,
    year: `numeric`,
    hour: `numeric`,
    minute: `numeric`
  });

  return (
    <>
      <section className="tour-article-descr-container">
        <div className="tour-article-descr container">
          <ArticleDescrPageNav _id={article._id} tags={article.tags} title={article.title} />
          <ArticleDescrTags types={article.type} />
          <ArticleDescrHeading heading={article.title}
                               subHeading={article.subTitle.toUpperCase()} />
          <ArticleDescrStats rating={article.rating.reduce((acc, i) => acc + i, 0) / article.rating.length}
                             location={article.location}
                             views={formattedViews} />
          <ArticleDescrExtraInfo
            articleId={article._id}
            session={session}
            author={article.author}
            readTime={article.readTime} />
          <ArticleDescrSlider
            images={article.images} />
        </div>
      </section>
      <ArticleDescrContent>
        <ArticleDescText
          author={article.author}
          dateOfPublication={formattedDate}
          content={article.content} />
        <ArticleDescrSecondColumn />
      </ArticleDescrContent>
      <ArticleDescrCharity author={article.author} />
      <ArticleDescrAd />
      <ArticleDescrComments session={session} comments={article.comments} />
      <ArticleDescrLeaveReply author={article.author._id} session={session} articleId={article._id} />
      <YouMightAlsoLike types={article.type} />
    </>
  );
}
