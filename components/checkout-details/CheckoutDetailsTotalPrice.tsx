// 'use client';

type CheckoutDetailsTotalPriceType = {
  totalPrice: number;
  // children: ReactNode;
}

export default function CheckoutDetailsTotalPrice({ totalPrice }: CheckoutDetailsTotalPriceType) {
  return (
    <div className="flex flex-align-center flex-space-between">
      <h3 className="thanks-for-purchase-col-2__extras-total font-weight-bold">Total Price</h3>
      <span
        className="thanks-for-purchase-col-2__extras-total__price inline-block highlighted">{totalPrice.toFixed(2)}$</span>
    </div>
  );
}
