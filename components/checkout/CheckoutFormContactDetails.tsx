// 'use client';
import '@/app/checkout/page.scss';
import LabelInput from '@/components/UI/Input/LabelInput';
import CheckBoxSignOnNewsletter from '@/components/UI/Checkbox/CheckBoxSignOnNewsletter';
import CheckoutBtn from '@/components/checkout/CheckoutBtn';
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
            <CheckBoxSignOnNewsletter />
            <CheckoutBtn label={`Next`} />
          </div>
        </div>

      </form>
    </div>
  );
}
