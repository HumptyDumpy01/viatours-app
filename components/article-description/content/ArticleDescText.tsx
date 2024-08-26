// 'use client';

/*type ArticleDescTextType = {
  // children: ReactNode;
}*/

export default function ArticleDescText(/*{  }: ArticleDescTextType*/) {
  return (
    <div className="tour-articles-descr__content-1">
      <p className="tour-articles-descr__content-1__quote">
        “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
        est
        laborum.”
      </p>
      <p className="tour-articles-descr__content-1__author flex flex-align-center gap-14px">
        <svg xmlns="http://www.w3.org/2000/svg" width="91" height="3" viewBox="0 0 91 3" fill="none">
          <path d="M1 1.5H90" stroke="#1E2050" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="tour-articles-descr__content-1__author-name inline-block italic">Saepul Daro</span>

      </p>
      <p className="tour-articles-descr__content-1__par color-grey">Lorem ipsum dolor sit amet, consectetur adipiscing
        elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
        culpa
        qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit
        esse
        cillum dolore eu fugiat</p>

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
        sit
        amet,
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.” </p>
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
        className="inline-block author">Nika Jackson</span></p>
      <p className="tour-articles-descr__content-1__date-of-publication">Date of Publication:
        <span className="inline-block date-of-publication">Feb 02, 2024, 13:56</span></p>
    </div>
  );
}