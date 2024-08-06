// 'use client';

type CheckoutDetailsHeadingType = {
  orderId: string;
  orderDate: string;
  tourTitle: string;
  // children: ReactNode;
}

export default function CheckoutDetailsHeading({ orderId, orderDate, tourTitle }: CheckoutDetailsHeadingType) {
  return (
    <>
      <h3 className="thanks-for-purchase-col-2__heading color-white">Your Order</h3>
      <div>
        <p className="thanks-for-purchase-col-2__order-text color-white">Order No.</p>
        <p className="thanks-for-purchase-col-2__order-number">{orderId}</p>
      </div>
      <div className="flex flex-align-center flex-space-between margin-bottom-34px">
        <p className="thanks-for-purchase-col-2__date-text">Date</p>
        <p className="thanks-for-purchase-col-2__date-number">{orderDate}</p>
      </div>
      <h3 className="thanks-for-purchase-col-2__heading-2">Tour</h3>
      <p className="thanks-for-purchase-col-2__tour-title margin-bottom-24px">{tourTitle}</p>
    </>
  );
}
