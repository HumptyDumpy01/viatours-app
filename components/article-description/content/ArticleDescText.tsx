// 'use client';


export type ArticleDescTextType = {
  content: any;
  author: string;
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
                            {item.text}
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
          </>
        );
      })}

      <h2 className="tour-articles-descr__content-1__heading margin-bottom-med">
        First thing you need to consider
      </h2>
      <p className="tour-articles-descr__content-1__par margin-bottom-big color-blue-3">Lorem ipsum dolor sit amet,
        consectetur
        adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et
        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
        nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.</p>
      <h2 className="tour-articles-descr__content-1__heading margin-bottom-med">Do not forget about the weather</h2>
      <p className="tour-articles-descr__content-1__par color-blue-3 margin-bottom-30px">Lorem ipsum dolor sit amet,
        consectetur adipiscing
        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

      <p className="tour-articles-descr__content-1__par color-blue-3 margin-bottom-21px">Lorem ipsum dolor sit amet,
        consectetur adipiscing
        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla</p>
      <p className="tour-articles-descr__content-1__quote-marked color-blue-3 margin-bottom-38px">“Lorem ipsum dolor
        sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.” </p>
      <p className="tour-articles-descr__content-1__par color-blue-3 margin-bottom-big">Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla</p>
      <h2 className="tour-articles-descr__content-1__heading margin-bottom-med">At any cost, always take this with
        you</h2>
      <ol className="tour-articles-descr__content-1__list margin-bottom-42px">
        <li className="tour-articles-descr__content-1__list-item">Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla
        </li>
        <li className="tour-articles-descr__content-1__list-item">Duis aute irure dolor in reprehenderit in voluptate
        </li>
        <li className="tour-articles-descr__content-1__list-item">Duis aute irure dolor in reprehenderit in voluptate
          duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        </li>
      </ol>

      <p className="tour-articles-descr__content-1__par color-blue-3 margin-bottom-big">Duis aute irure dolor in
        reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
        culpa
        qui officia deserunt.</p>

      <h2 className="tour-articles-descr__content-1__heading margin-bottom-med">At last, enjoy every minute in
        Colosseum!</h2>
      <p className="tour-articles-descr__content-1__par color-blue-3 margin-bottom-big">Lorem ipsum dolor sit amet,
        consectetur adipiscing
        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
        in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
        sunt in culpa qui officia deserunt.</p>
      <p className="tour-articles-descr__content-1__author--bottom">Author: <span
        className="inline-block author">{author}</span></p>
      <p className="tour-articles-descr__content-1__date-of-publication">Date of Publication:
        <span className="inline-block date-of-publication">{dateOfPublication}</span></p>
    </div>
  );
}
