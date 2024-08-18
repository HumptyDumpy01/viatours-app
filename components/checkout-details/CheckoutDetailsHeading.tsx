'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

type CheckoutDetailsHeadingType = {
  orderId: string;
  orderDate: string;
  tourTitle: string;
  // children: ReactNode;
}

export default function CheckoutDetailsHeading({ orderId, orderDate, tourTitle }: CheckoutDetailsHeadingType) {
  const [orderIdState, setOrderIdState] = useState<string>(orderId);
  const [userCopiedText, setUserCopiedText] = useState<boolean>(false);
  const timer2 = useRef<NodeJS.Timeout | null>(null);

  function toggleOrderIdLabel(text: string) {
    if (!userCopiedText) {
      setOrderIdState(text);
    }
  }


  function copyOrderId() {
    setUserCopiedText(true);
    // get access to the clipboard and copy the  text you want to copy
    navigator.clipboard.writeText(orderId);
    // set the copied text to the state
    setOrderIdState(`Copied!`);
    // set the copied text back to the original text after 3 seconds

    if (timer2.current) {
      clearTimeout(timer2.current);
    }

    timer2.current = setTimeout(() => {
      setOrderIdState(orderId);
      setUserCopiedText(false);
    }, 3000);
  }

  return (
    <>
      <h3 className="thanks-for-purchase-col-2__heading color-white">Your Order</h3>
      <div>
        <p className="thanks-for-purchase-col-2__order-text color-white">Order No.</p>
        <div>
          <motion.p
            onClick={copyOrderId}
            whileHover={{ scale: 1.1, x: 15, backfaceVisibility: 'hidden' }}
            whileTap={{ scale: 0.9, x: -15 }}
            onMouseLeave={() => toggleOrderIdLabel(orderId)}
            onMouseEnter={() => toggleOrderIdLabel(`Copy me!`)}
            className="thanks-for-purchase-col-2__order-number">{orderIdState}</motion.p>
        </div>
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
