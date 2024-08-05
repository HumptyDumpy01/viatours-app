// 'use client';

/*type CheckoutDetailsExtraType = {
  // children: ReactNode;
}*/

export default function CheckoutDetailsExtra(/*{  }: CheckoutDetailsExtraType*/) {
  return (
    <div className="thanks-for-purchase-col-2__extras grid">
      <div className="flex flex-align-center flex-space-between margin-bottom-20px">
        <p
          className="thanks-for-purchase-col-2__promo-code-text font-weight-bold font-size-18px color-blue-lighter">
          Promocodes</p>
        <span className="thanks-for-purchase-col-2__promo-code__status inline-block font-weight-bold">None</span>
      </div>

      <div className="flex flex-align-center flex-space-between">
        <p className="thanks-for-purchase-col-2__discount font-weight-bold highlighted">Discount</p>
        <span
          className="thanks-for-purchase-col-2__discount__status inline-block font-weight-bold highlighted">20%</span>
      </div>
    </div>
  );
}
