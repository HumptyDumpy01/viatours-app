// 'use client';
import '@/app/checkout/page.scss';
import CheckoutDetailsFirstStep from '@/components/checkout/checkout-details/CheckoutDetailsFirstStep';
import CheckoutDetailsSecondStep from '@/components/checkout/checkout-details/CheckoutDetailsSecondStep';
import { DUMMY_TOURS } from '@/data/DUMMY_TOURS';
import CheckoutDetailsThirdStep from '@/components/checkout/checkout-details/CheckoutDetailsThirdStep';
/*type CheckoutDetailsType = {
  // children: ReactNode;
}*/


export type OrderInterface = {
  date: string;
  time: string;
  adultTickets: number;
  youthTickets: number;
  childrenTickets: number;
  service_per_booking?: `on`;
  service_per_person?: `on`;
  totalPrice: number;
  tourId: number | string;
}

export default function CheckoutDetails(/*{  }: CheckoutDetailsType*/) {

  // extract order from local storage and convert it to JSON
  const order: OrderInterface = JSON.parse(localStorage.getItem(`order`)!);

  console.log(`Executing order: `, order);
  const tour = DUMMY_TOURS.find((item) => item.id === order.tourId);

  if (!tour) {
    throw new Error(`Tour not found`);
  }
  console.log(`Executing tour: `, tour);

  return (
    <div className="book-now__details">
      <CheckoutDetailsFirstStep />
      <CheckoutDetailsSecondStep tour={tour} order={order} />
      <CheckoutDetailsThirdStep />
    </div>
  );
}
