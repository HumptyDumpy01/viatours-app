// 'use client';
import '@/app/checkout/page.scss';

type CheckoutHeadingType = {
  number: number;
  label: string;
  // children: ReactNode;
}

export default function CheckoutHeading({ number, label }: CheckoutHeadingType) {
  return (
    <div className="book-now__details-1__heading-container flex flex-align-center">
      <div className="book-now__details-1__heading flex">
        <h3 className="book-now__details-1__heading-logo">{number}</h3>
      </div>
      <h3 className="book-now__details-1__heading-text">{label}</h3>
    </div>
  );
}
