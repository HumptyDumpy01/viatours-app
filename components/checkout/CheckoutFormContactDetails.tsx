// 'use client';
import '@/app/checkout/page.scss';
import LabelInput from '@/components/UI/Input/LabelInput';
/*type CheckoutFormContactDetailsType = {
  // children: ReactNode;
}*/

export default function CheckoutFormContactDetails(/*{  }: CheckoutFormContactDetailsType*/) {
  return (
    <div className="book-now__details-1__form">
      <form action="#">
        <div className="book-now__details-1__form-first-row">
          <div className="grid gap-13px">
            <LabelInput
              mode={`default`}
              type={`text`}
              label={`First Name`}
              placeholder={`Name`}
              name={`first-name`}
            />
          </div>

          <div className="grid gap-13px">
            <LabelInput
              label={`Last Name`}
              placeholder={`Last Name`}
              name={`last-name`}
              type={`text`}
              mode={`default`}
            />
          </div>
        </div>
        <div className="grid margin-bottom-30px">
          <div className="flex flex-direction-column gap-13px margin-bottom-small">
            <LabelInput
              label={`Email`}
              placeholder={`Your Email Address`}
              name={`email`}
              type={`email`}
              mode={`questionMark`}
            />
          </div>
        </div>

        <div className="grid">
          <div className="flex flex-direction-column gap-13px">

            <LabelInput
              label={`Phone`}
              placeholder={`Your Phone Number`}
              name={`phone`}
              type={`tel`}
              mode={`tel`}
            />
            <div className="book-now__details-1__sub-on-newsletter-check">
              <div className="book-now__details-1__sub-on-newsletter-check-container">
                <input type="checkbox" id="newsletter-check"
                       className="book-now__details-1__sub-on-newsletter-check__checkbox" />
                <label htmlFor="newsletter-check"
                       className="book-now__details-1__sub-on-newsletter-check__label">Get emails with special
                  offers,
                  inspiration, tips, and other updates from Viatours. You can unsubscribe at any time.</label>
              </div>
            </div>
            <div className="flex">
              <button className="btn btn--next contact-details-next" type="submit">Next</button>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
