// 'use client';

import '@/app/checkout/page.scss';

type CheckoutBtnType = {
  label: string;
  // children: ReactNode;
}

export default function CheckoutBtn({ label }: CheckoutBtnType) {
  return (
    <>
      <div className="flex">
        <button className="btn btn--next contact-details-next">{label}</button>
      </div>
    </>
  );
}
