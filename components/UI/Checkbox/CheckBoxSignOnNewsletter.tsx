// 'use client';

import '@/app/checkout/page.scss';

/*type CheckBoxSignOnNewsletterType = {
  // children: ReactNode;
}*/

export default function CheckBoxSignOnNewsletter(/*{  }: CheckBoxSignOnNewsletterType*/) {
  return (
    <>
      <div className="book-now__details-1__sub-on-newsletter-check">
        <div className="book-now__details-1__sub-on-newsletter-check-container cursor-pointer">
          <input type="checkbox" id="newsletter-check"
                 className="book-now__details-1__sub-on-newsletter-check__checkbox" />
          <label htmlFor="newsletter-check"
                 className="book-now__details-1__sub-on-newsletter-check__label cursor-pointer">Get emails with special
            offers,
            inspiration, tips, and other updates from Viatours. You can unsubscribe at any time.</label>
        </div>
      </div>
    </>
  );
}
