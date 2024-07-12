'use client';

import { useFormState } from 'react-dom';
import FormSubmit from '@/components/UI/Button/FormSubmit';

/* IMPORTANT: DEFINE A CORRECT TYPE FOR ACTION */
// @ts-ignore
export default function CTAForm({ action }) {
  // Thus you would be able to use the error messages to inject them onto your form.
  const [state, formAction] = useFormState(action, { errors: null });

  return (
    <div className="cta-secondary-wrapper-first-col">
      <h2 className="secondary-heading cta-secondary__heading">Get 5% off your 1st <br />
        app booking</h2>
      <p className="cta-secondary__paragraph">Booking's better on the app. Use promo code <br />
        "TourBooking" to save!</p>
      <h4 className="cta-secondary__input-heading">Get a magic link sent to your email</h4>
      <div className="cta-secondary__input-container flex">
        <form action="#" className="cta-secondary__form flex">
          <label>
            <input className="cta-secondary__input" type="email" placeholder="Email" required />
          </label>
          <FormSubmit
            btnClassName={`btn btn--cta-secondary`}
            btnTextIsPending={`Sending...`}
            btnTextDefault={`Send`}
          />
        </form>
      </div>
    </div>
  );
}
