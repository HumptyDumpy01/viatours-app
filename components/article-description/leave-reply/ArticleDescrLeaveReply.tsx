// 'use client';

import '@/components/UI/Layout/LeaveReply.scss';

/*type ArticleDescrLeaveReplyType = {
  // children: ReactNode;
}*/
import IconIon from '@/components/UI/IonIcon/IconIon';
import Rate from '@/components/UI/Checkbox/Rate';

export default function ArticleDescrLeaveReply(/*{  }: ArticleDescrLeaveReplyType*/) {
  return (
    <>
      <section className="leave-a-reply container">
        <div className="leave-a-reply__wrapper">
          <h2 className="secondary-heading margin-bottom-small">Leave a reply</h2>
          <p className="paragraph leave-a-reply-paragraph">Your email address will not be published. All fields are
            required, though.</p>
          <div className="leave-a-reply-form">
            <form action="#" method="GET" className="leave-a-reply__form">
              <div className="leave-a-reply__form-rate grid">
                <Rate label={`Rate`} name={`rate`} />
              </div>
              <div className="leave-a-reply__form-inputs-container grid">
                <div className="leave-a-reply__form-inputs flex flex-align-center flex-space-between">
                  <div className="leave-a-reply__form-inputs-wrapper">
                    <label htmlFor="user-initials"></label><input type="text" name="name" id="user-initials"
                                                                  placeholder="Initials"
                                                                  required />
                  </div>
                  <div className="leave-a-reply__form-inputs-wrapper">
                    <label htmlFor="user-email"></label><input type="email" name="user-email" id="user-email"
                                                               placeholder="Email" required />
                  </div>
                </div>
                <label htmlFor="title"></label><input type="text" name="title" id="title"
                                                      className="leave-a-reply__form-inputs-title" placeholder="Title"
                                                      required />
                <label htmlFor="comment"></label><textarea name="comment" id="comment" cols={30} rows={6}
                                                           className="leave-a-reply__form-inputs-comment"
                                                           placeholder="Comment" required></textarea>
              </div>
              <div className={`margin-bottom-41px`}>
                <button className="btn btn--submit flex flex-align-center">Post comment
                  {/*<ion-icon name="arrow-forward-outline" className="icon icon--right-arrow"></ion-icon>*/}
                  <IconIon type={`arrowForwardOutline`} className="icon icon--right-arrow" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}