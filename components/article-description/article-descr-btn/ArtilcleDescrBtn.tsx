// 'use client';
import './ArticleDescrBtn.scss';

type ArticleDescrBtnType = {
  mode: `left` | `right`;
  // children: ReactNode;
}

export default function ArticleDescrBtn({ mode }: ArticleDescrBtnType) {
  return (
    <>
      {mode === `left` && (
        <>
          <div className="fix-btns-article-descr">
            <div className="btn-left-article-descr">
              <svg className="btn-left-icon" xmlns="http://www.w3.org/2000/svg" width="19" height="17"
                   viewBox="0 0 16 14"
                   fill="none">
                <path
                  d="M14.3164 8.06938C14.8075 8.06938 15.2056 7.67127 15.2056 7.18018C15.2056 6.68908 14.8075 6.29097 14.3164 6.29097L14.3164 8.06938ZM0.536138 6.55141C0.188883 6.89867 0.188883 7.46168 0.536139 7.80894L6.195 13.4678C6.54226 13.8151 7.10527 13.8151 7.45252 13.4678C7.79978 13.1205 7.79978 12.5575 7.45252 12.2103L2.42243 7.18018L7.45252 2.15008C7.79978 1.80282 7.79978 1.23981 7.45252 0.892554C7.10527 0.545298 6.54225 0.545298 6.195 0.892554L0.536138 6.55141ZM14.3164 6.29097L1.1649 6.29097L1.1649 8.06938L14.3164 8.06938L14.3164 6.29097Z"
                  fill="#1E2050" />
              </svg>
            </div>
          </div>
        </>
      )}
      {mode === `right` && (
        <>
          <div className="fix-btns-right-article-descr margin-left-auto">
            <div className="btn-right-article-descr">
              <svg className="btn-right-icon" xmlns="http://www.w3.org/2000/svg" width="19" height="17"
                   viewBox="0 0 16 14"
                   fill="none">
                <path
                  d="M1.75293 6.29097C1.26184 6.29097 0.863726 6.68908 0.863726 7.18018C0.863726 7.67127 1.26184 8.06938 1.75293 8.06938L1.75293 6.29097ZM15.5332 7.80894C15.8805 7.46168 15.8805 6.89867 15.5332 6.55141L9.87434 0.892552C9.52708 0.545296 8.96407 0.545297 8.61681 0.892552C8.26956 1.23981 8.26956 1.80282 8.61681 2.15008L13.6469 7.18017L8.61681 12.2103C8.26956 12.5575 8.26956 13.1205 8.61681 13.4678C8.96407 13.8151 9.52708 13.8151 9.87434 13.4678L15.5332 7.80894ZM1.75293 8.06938L14.9044 8.06938L14.9044 6.29097L1.75293 6.29097L1.75293 8.06938Z"
                  fill="#1E2050" />
              </svg>
            </div>
          </div>
        </>
      )}
    </>
  );
}
