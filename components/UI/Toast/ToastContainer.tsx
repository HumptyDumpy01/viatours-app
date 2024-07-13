'use client';

/*interface ToastContainerInterface {
  // children: ReactNode;
}*/

import React from 'react';
import { useCartSelector } from '@/store/hooks';

export default function ToastContainer(/*{  }: Interface*/) {
  const showNotification = useCartSelector((state) => state.notification.showNotification);

  return (
    <div className={`action-notificator ${showNotification ? `toast-open` : ``}`}>
    </div>
  );
}
