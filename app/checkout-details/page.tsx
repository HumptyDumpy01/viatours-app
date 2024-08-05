// 'use client';
import './page.scss';
import '@/components/checkout-details/Cols/CheckoutDetailsSecondCol.scss';
import CheckoutDetailsFirstCol from '@/components/checkout-details/Cols/CheckoutDetailsFirstCol';
import CheckoutDetailsSecondCol from '@/components/checkout-details/Cols/CheckoutDetailsSecondCol';

type ThanksForPurchaseType = {
  searchParams: {
    promoApplied: 'false' | {},
    tourDiscount: 'false' | number,
    totalTickets: string,
    adultTickets: string,
    childrenTickets: string,
    youthTickets: string,
    totalPrice: string,
    tourTitle: string,
    orderId: string,
    orderDate: string
  }
  // children: ReactNode;
}

export default function ThanksForPurchase({ searchParams }: ThanksForPurchaseType) {
  const {
    promoApplied,
    tourDiscount,
    totalTickets,
    adultTickets,
    childrenTickets,
    youthTickets,
    totalPrice,
    tourTitle,
    orderId,
    orderDate
  } = searchParams;
  console.log(`promoApplied: ${promoApplied}`);
  console.log(`promoApplied: ${typeof promoApplied}`);
  console.log(`tourDiscount: ${tourDiscount}`);
  console.log(`totalTickets: ${totalTickets}`);
  console.log(`adultTickets: ${adultTickets}`);
  console.log(`childrenTickets: ${childrenTickets}`);
  console.log(`youthTickets: ${youthTickets}`);
  console.log(`totalPrice: ${totalPrice}`);
  console.log(`tourTitle: ${tourTitle}`);
  console.log(`orderId: ${orderId}`);
  console.log(`orderDate: ${orderDate}`);

  return (
    <section className="thanks-for-purchase-container">
      <div className="thanks-for-purchase grid">
        <div className="thanks-for-purchase-col-1">
          <CheckoutDetailsFirstCol />
        </div>
        <CheckoutDetailsSecondCol
          promoApplied={promoApplied === `false` ? false : promoApplied}
          tourDiscount={tourDiscount === `false` ? false : Number(tourDiscount)}
          totalTickets={Number(totalTickets)}
          adultTickets={Number(adultTickets)}
          childrenTickets={Number(childrenTickets)}
          youthTickets={Number(youthTickets)}
          totalPrice={Number(totalPrice)}
          tourTitle={tourTitle}
          orderId={orderId}
          orderDate={orderDate} />
      </div>
    </section>
  );
}
