// 'use client';

import './Features.scss';
/*interface FeaturesInterface {
  // children: ReactNode;
}*/
import Feature from '@/components/homepage/features/Feature';

export default function Features(/*{  }: FeaturesInterface*/) {
  return (
    <>
      <span className="subheading section-features__heading-span">features</span>
      <h2 className="secondary-heading section-features__heading">Why choose Viatours</h2>
      <div className="section-features__layout grid">
        <Feature
          type={`ticket`}
          title={`Ultimate flexibility`}
          text={`You're in control, with free
          cancellation and payment options to
          satisfy any plan or budget.`}
        />
        <Feature
          type={`balloon`}
          title={`Memorable experiences`}
          text={`Browse and book tours and activities
          so incredible, you'll want to tell your
          friends.`}
        />
        <Feature
          type={`diamond`}
          title={`Quality at our core`}
          text={`You're in control, with free
          cancellation and payment options to
          satisfy any plan or budget.`}
        />
        <Feature
          type={`medal`}
          title={`Award-winning support`}
          text={`New price? New plan? No problem.
          We're here to help, 24/7.`}
        />
      </div>
    </>
  );
}
