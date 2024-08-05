// 'use client';
import './CheckoutDetailsSecondCol.scss';
import '@/components/checkout/card/card-second-col/ActivityDetailsCard.scss';
import ViatoursLogo from '@/components/checkout-details/ViatoursLogo';
import CheckoutDetailsHeading from '@/components/checkout-details/CheckoutDetailsHeading';
import CheckoutDetailsTickets from '@/components/checkout-details/CheckoutDetailsTickets';
import CheckoutDetailsTotalPrice from '@/components/checkout-details/CheckoutDetailsTotalPrice';
import CheckoutDetailsExtra from '@/components/checkout-details/CheckoutDetailsExtra';

type CheckoutDetailsSecondColType = {
  promoApplied: false | {},
  tourDiscount: false | number,
  totalTickets: number,
  adultTickets: number,
  childrenTickets: number,
  youthTickets: number,
  totalPrice: number,
  tourTitle: string,
  orderId: string,
  orderDate: string
  // children: ReactNode;
}

export default function
  CheckoutDetailsSecondCol({
                             orderId,
                             orderDate,
                             tourTitle,
                             childrenTickets,
                             youthTickets,
                             adultTickets,
                             totalTickets,
                             totalPrice,
                             promoApplied,
                             tourDiscount
                           }: CheckoutDetailsSecondColType) {
  return (
    <div className="thanks-for-purchase-col-2-container">
      <div className="thanks-for-purchase-col-2">
        <ViatoursLogo />
        <CheckoutDetailsHeading orderDate={orderDate} orderId={orderId} tourTitle={tourTitle} />
        <CheckoutDetailsTickets totalTickets={totalTickets} youthTickets={youthTickets}
                                childrenTickets={childrenTickets} adultTickets={adultTickets} />
        <CheckoutDetailsExtra tourDiscount={tourDiscount}
                              promoApplied={promoApplied} />
        <CheckoutDetailsTotalPrice totalPrice={totalPrice} />
      </div>
    </div>
  );
}
