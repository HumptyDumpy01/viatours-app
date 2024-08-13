// import { storePost } from '@/lib/posts';
// import { redirect } from 'next/navigation';
import FormSubmit from '@/components/UI/Button/FormSubmit';
import { motion } from 'framer-motion';

// creating a for validation helper.
function isEmpty(variable: string) {
  return !variable || variable.trim() === ``;
}

export default function CTA2FirstCol() {
  return (
    <>
      <div className="cta-secondary-wrapper-first-col">
        <motion.h2
          whileHover={{ scale: 1.1, x: 15 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="secondary-heading cta-secondary__heading">Get 5% off your 1st <br />
          app booking
        </motion.h2>
        <p className="cta-secondary__paragraph">Booking&apos;s better on the app. Use promo code <br />
          &quot;TourBooking&quot; to save!</p>
        <h4 className="cta-secondary__input-heading">Get a magic link sent to your email</h4>
        <div className="cta-secondary__input-container flex">
          <form action="#" className="cta-secondary__form flex">
            <label>
              <motion.input
                whileFocus={{ y: -5 }}
                className="cta-secondary__input" type="email" placeholder="Email" required />
            </label>
            <FormSubmit
              btnClassName={`btn btn--cta-secondary`}
              btnTextIsPending={`Sending...`}
              btnTextDefault={`Send`}
            />
          </form>
        </div>
      </div>
    </>
  );
}
