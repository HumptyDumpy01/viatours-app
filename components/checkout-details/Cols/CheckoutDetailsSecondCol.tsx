// 'use client';
import './CheckoutDetailsSecondCol.scss';
import '@/components/checkout/card/card-second-col/ActivityDetailsCard.scss';
import ViatoursLogo from '@/components/checkout-details/ViatoursLogo';
import CheckoutDetailsHeading from '@/components/checkout-details/CheckoutDetailsHeading';
import CheckoutDetailsTickets from '@/components/checkout-details/CheckoutDetailsTickets';
import CheckoutDetailsTotalPrice from '@/components/checkout-details/CheckoutDetailsTotalPrice';
import CheckoutDetailsExtra from '@/components/checkout-details/CheckoutDetailsExtra';

type CheckoutDetailsSecondColType = {
  orderId: string;
  orderDate: string;
  tourTitle: string;
  adultTickets: number;
  childrenTickets: number;
  youthTickets: number;
  totalTickets: number;
  totalPrice: number;
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
                             totalPrice
                           }: CheckoutDetailsSecondColType) {
  return (
    <div className="thanks-for-purchase-col-2-container">
      <div className="thanks-for-purchase-col-2">
        <ViatoursLogo />
        <CheckoutDetailsHeading orderDate={orderDate} orderId={orderId} tourTitle={tourTitle} />
        <CheckoutDetailsTickets totalTickets={totalTickets} youthTickets={youthTickets}
                                childrenTickets={childrenTickets} adultTickets={adultTickets} />
        <CheckoutDetailsExtra />
        <CheckoutDetailsTotalPrice totalPrice={totalPrice} />
      </div>
    </div>
  );
}
