// 'use client';
import './page.scss';
import '@/components/checkout-details/Cols/CheckoutDetailsSecondCol.scss';
import CheckoutDetailsFirstCol from '@/components/checkout-details/Cols/CheckoutDetailsFirstCol';
import CheckoutDetailsSecondCol from '@/components/checkout-details/Cols/CheckoutDetailsSecondCol';
/*type ThanksForPurchaseType = {
  // children: ReactNode;
}*/

export default function ThanksForPurchase(/*{  }: ThanksForPurchaseType*/) {
  return (
    <section className="thanks-for-purchase-container">
      <div className="thanks-for-purchase grid">
        <div className="thanks-for-purchase-col-1">
          <CheckoutDetailsFirstCol />
        </div>
        <CheckoutDetailsSecondCol totalTickets={3} adultTickets={1} childrenTickets={0} youthTickets={2}
                                  totalPrice={1299}
                                  tourTitle={`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`}
                                  orderId={`e9grmfoggjkfb9`} orderDate={`May 02, 2024`} />
      </div>
    </section>
  );
}
