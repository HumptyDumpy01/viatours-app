'use client';

/*interface ToastContainerInterface {
  // children: ReactNode;
}*/

import { useCartDispatch, useCartSelector } from '@/store/hooks';
import { ToastSliceActions } from '@/store/ToastSlice';

export default function ToastContainer(/*{  }: Interface*/) {
  const showNotification = useCartSelector((state) => state.notification.showNotification);
  const dispatch = useCartDispatch();

  return (
    <div onClick={() => dispatch(ToastSliceActions.hideNotification())}
         className={`action-notificator ${showNotification ? `toast-open apply-animation` : ``}`}>
    </div>
  );
}
