'use client';

import '@/app/checkout/page.scss';
import SkeletonText from '@/components/skeletons/Text/SkeletonText';
import SkeletonButton from '@/components/skeletons/Button/SkeletonButton';
import React from 'react';
import '@/components/checkout/checkout-overall/CheckoutOverall.scss';
import SkeletonCheckoutDetailsSteps from '@/components/skeletons/other/Checkout/SkeletonCheckoutDetailsSteps';
import SkeletonInput from '@/components/skeletons/Input/SkeletonInput';
import SkeletonPhoneInput from '@/components/skeletons/other/Checkout/SkeletonPhoneInput';
import SkeletonCheckBoxUltra from '@/components/skeletons/Checkbox/SkeletonCheckBoxUltra';
import SkeletonButtonDefault from '@/components/skeletons/Button/SkeletonButtonDefault';
import SkeletonCheckoutDetails from '@/components/skeletons/other/Checkout/SkeletonCheckoutDetails';

export default function CheckoutLoadingPage(/*{  }: CheckoutLoadingPageType*/) {
  // scroll to the top of the page,
  // so that the user sees the loading state
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="book-now-container">
      <div className="book-now grid container">
        <div className="book-now__details">

          <div className="book-now__details">
            <div className="book-now__details-1" style={{
              paddingBottom: `3.4rem`
            }}>

              <SkeletonCheckoutDetailsSteps />
              <div>
                <SkeletonText widths={[`100%`]} height={13} marginTop={`2rem`} marginBottom={`1rem`} />
                <SkeletonText widths={[`80%`]} height={13} />
              </div>
              <div style={{ marginBottom: `3.4rem` }}>
                <SkeletonButton width={`100%`} height={50} borderRadius={`12px`} />
              </div>
              <div style={{
                display: `grid`,
                gridTemplateColumns: `repeat(auto-fill, minmax(29.4rem, 1fr))`,
                alignItems: `center`,
                gap: `1.3rem`
              }}>
                <SkeletonInput
                  animationInput={`wave`}
                  widthInput={`29.4rem`}
                  heightInput={57}
                  heightLabel={21}
                  widthLabel={`12rem`}
                  marginBottomLabel={`1rem`}
                  marginTopLabel={`2rem`}
                />

                <SkeletonInput
                  animationInput={`wave`}
                  widthInput={`29.4rem`}
                  heightInput={57}
                  heightLabel={21}
                  widthLabel={`12rem`}
                  marginBottomLabel={`1rem`}
                  marginTopLabel={`2rem`}
                />
              </div>

              <SkeletonInput
                animationInput={`wave`}
                widthInput={`100%`}
                heightInput={57}
                heightLabel={21}
                widthLabel={`12rem`}
                marginBottomLabel={`1rem`}
                marginTopLabel={`2rem`}
              />
              <SkeletonPhoneInput />
              <SkeletonCheckBoxUltra widths={[`170%`, `30rem`]} />
              <SkeletonButtonDefault
                height={`5.5rem`}
                variant={`rounded`}
                animation={`wave`}
                width={`15rem`}
                marginTop={`4.4rem`}
              />
            </div>
          </div>
          {/* /////////////////////////////////////*/}
          <div className="book-now__details">
            <div className="book-now__details">
              <div className="book-now__details-1" style={{
                paddingBottom: `1.4rem`
              }}>
                <SkeletonCheckoutDetailsSteps />
              </div>
            </div>
          </div>
          {/* /////////////////////////////////////*/}

          {/* /////////////////////////////////////*/}
          <div className="book-now__details">
            <div className="book-now__details">
              <div className="book-now__details-1" style={{
                paddingBottom: `1.4rem`
              }}>
                <SkeletonCheckoutDetailsSteps />
              </div>
            </div>
          </div>
          {/* /////////////////////////////////////*/}
        </div>
        <SkeletonCheckoutDetails />
      </div>
    </section>
  );
}
