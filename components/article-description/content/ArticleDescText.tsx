// 'use client';


import { ArticleAuthorType } from '@/app/articles/[id]/page';

export type ArticleDescTextType = {
  content: any;
  author: ArticleAuthorType;
  dateOfPublication: string;
  // children: ReactNode;
}

export default function ArticleDescText({ content, author, dateOfPublication }: ArticleDescTextType) {
  return (
    <div className="tour-articles-descr__content-1">
      {content.map(function(item: any) {
        return (
          <>
            {item.part === `head` && (
              <>
                {/*@ts-ignore*/}
                {item.content.map(function(item) {
                  return (
                    <>
                      {item.type === `quote` && (
                        <>
                          <blockquote className="tour-articles-descr__content-1__quote">
                            <q>
                              {item.text}
                            </q>
                          </blockquote>
                          <p className="tour-articles-descr__content-1__author flex flex-align-center gap-14px">
                            <svg xmlns="http://www.w3.org/2000/svg" width="91" height="3" viewBox="0 0 91 3"
                                 fill="none">
                              <path d="M1 1.5H90" stroke="#1E2050" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            <span
                              className="tour-articles-descr__content-1__author-name inline-block italic">{item.author}</span>

                          </p>
                        </>
                      )}
                      {item.type === `paragraph` && (
                        <>
                          <p
                            className={`tour-articles-descr__content-1__par ${item?.textColor === `grey` ? `color-grey` : `color-blue-3`}`}>{item.text}</p>
                        </>
                      )}
                    </>
                  );
                })}

              </>
            )}
            {item.part === `body` && (
              <>
                {/*@ts-ignore*/}
                {item.content.map(function(item) {
                  return (
                    <>
                      {item.type === `heading-paragraph` && (
                        <>
                          {/*@ts-ignore*/}
                          {item.text.map(function(item, index) {
                            return (
                              <>
                                {index === 0 && (
                                  <h2 className="tour-articles-descr__content-1__heading margin-bottom-med">
                                    {item}
                                  </h2>
                                )}
                                {index !== 0 && (
                                  <>
                                    <p
                                      className="tour-articles-descr__content-1__par margin-bottom-big color-blue-3">{item}</p>
                                  </>
                                )}
                              </>
                            );
                          })}

                        </>
                      )}
                      {item.type === `highlight` && (
                        <>
                          <blockquote
                            className={`tour-articles-descr__content-1__quote-marked color-blue-3 
                            ${item.marginBottom ? item.marginBottom : ``}
                            ${item.marginTop ? item.marginTop : ``}`}>{item.text}</blockquote>
                        </>
                      )}
                      {item.type === `paragraph` && (
                        <>
                          <p className={`tour-articles-descr__content-1__par color-blue-3 
                          ${item.marginBottom ? item.marginBottom : ``}
                          ${item.marginTop ? item.marginTop : ``}`}>{item.text}</p>
                        </>
                      )}

                      {item.type === `heading-list` && (
                        <>
                          <h2 className={`tour-articles-descr__content-1__heading 
                          ${item.marginBottomHeading ? item.marginBottomHeading : ``}
                          ${item.marginTopHeading ? item.marginTopHeading : ``}`}>{item.heading}</h2>

                          <ol className={`tour-articles-descr__content-1__list margin-bottom-42px`}>
                            {/*@ts-ignore*/}
                            {item.items.map(function(item) {
                              return (
                                <>
                                  <li className="tour-articles-descr__content-1__list-item">{item}</li>
                                </>
                              );
                            })}
                          </ol>
                        </>
                      )}
                    </>
                  );
                })}
              </>
            )}
          </>
        );
      })}
      <p className="tour-articles-descr__content-1__author--bottom">Author: <span
        className="inline-block author">{author.name}</span></p>
      <p className="tour-articles-descr__content-1__date-of-publication">Date of Publication:
        <span className="inline-block date-of-publication">{dateOfPublication}</span></p>
    </div>
  );
}
