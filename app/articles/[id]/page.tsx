// 'use client';
import './page.scss';
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
import YouMightAlsoLike from '@/components/article-description/you-might-also-like/YouMightAlsoLike';
import ArticleDescrLeaveReply from '@/components/article-description/leave-reply/ArticleDescrLeaveReply';
import sliderImg1 from '@/assets/images/article-descr/slider/slider-img-1.png';
import sliderImg2 from '@/assets/images/article-descr/slider/slider-img-2.png';
import sliderImg3 from '@/assets/images/article-descr/slider/slider-img-3.png';
import sliderImg4 from '@/assets/images/article-descr/slider/slider-img-4.png';
import sliderImg5 from '@/assets/images/article-descr/slider/slider-img-5.png';

interface ArticleDescriptionInterface {
  params: {
    id: string;
  };
  // children: ReactNode;
}

/* TEMPORARY */
// @ts-ignore
const articleContent = [
  {
    part: `head`,
    content: [
      {
        type: `quote`,
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        author: `Saepul Saro`
      },
      {
        type: `paragraph`,
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat`,
        textColor: `grey`
      }
    ]
  },
  {
    part: `body`,
    content: [
      {
        type: `heading-paragraph`,
        // INFO: the first item in the array is the heading, the rest are paragraphs
        text: [`First thing you need to consider`,
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.`]
      },
      {
        type: `heading-paragraph`,
        text: [`Do not forget about the weather`,
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla`]
      },
      {
        type: `highlight`,
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
        marginTop: ``,
        marginBottom: `margin-bottom-38px`
      },
      {
        type: `paragraph`,
        text: `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla`,
        marginTop: ``,
        marginBottom: `margin-bottom-big`
      },
      {
        type: `heading-list`,
        heading: `At any cost take this with you`,
        items: [
          `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla`,
          `Duis aute irure dolor in reprehenderit in voluptate`,
          `Duis aute irure dolor in reprehenderit in voluptate duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla`
        ],
        marginTopHeading: ``,
        marginBottomHeading: `margin-bottom-med`,
        marginTopList: ``,
        marginBottomList: `margin-bottom-42px`
      },
      {
        type: `paragraph`,
        text: `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.`,
        marginTop: ``,
        marginBottom: `margin-bottom-big`
      },
      {
        type: `heading-paragraph`,
        text: [`At last, enjoy every minute in Colosseum!`,
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.`]
      }
    ]
  }
];

export default function ArticleDescription({ params }: ArticleDescriptionInterface) {
  const id = params.id;
  return (
    <>
      <section className="tour-article-descr-container">
        <div className="tour-article-descr container">
          <ArticleDescrPageNav tags={[]} title={`Wonders of the World: Colosseum`} />
          <ArticleDescrTags tags={[]} />
          <ArticleDescrHeading heading={`Exploring the Wonders of the World at Colosseum`}
                               subHeading={`WONDERS OF THE WORLD: COLOSSEUM`} />
          <ArticleDescrStats rating={4.5} location={`Colosseum, Rome, Italy`} views={1009} />
          <ArticleDescrExtraInfo author={`Nika Jackson`} role={`Travel writer`} readTime={`2 minutes`} />
          <ArticleDescrSlider
            images={[sliderImg1.src, sliderImg2.src, sliderImg3.src, sliderImg4.src, sliderImg5.src]} />
        </div>
      </section>
      <ArticleDescrContent>
        <ArticleDescText
          author={`Nika Jackson`}
          dateOfPublication={`Feb 02, 2024, 13:56`}
          // @ts-ignore
          content={articleContent} />
        <ArticleDescrSecondColumn />
      </ArticleDescrContent>
      <ArticleDescrCharity />
      <ArticleDescrAd />
      <ArticleDescrComments />
      <ArticleDescrLeaveReply />
      <YouMightAlsoLike />
    </>
  );
}
