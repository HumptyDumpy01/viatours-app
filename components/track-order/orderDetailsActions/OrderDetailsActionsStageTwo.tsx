'use client';
import classes from './OrderDetailsActionsStageTwo.module.scss';
import { useCartSelector } from '@/store/hooks';
import VerifyActionForm from '@/components/track-order/orderDetailsActions/VerifyActionForm';
/*type OrderDetailsActionsStageTwoType = {
  // children: ReactNode;
}*/

export default function OrderDetailsActionsStageTwo(/*{  }: OrderDetailsActionsStageTwoType*/) {
  const action = useCartSelector((state) => state.trackOrder.actionsStage) as {
    type: `cancellation` | `refund`;
    stage: 1 | 2 | 3;
  };

  return (
    <div className={classes[``]}>
      {action.stage !== 3 && (
        <p className={classes[`order-details-actions-par`]}>Before you can request
          a {action.type === `refund` ? `refund` : `cancellation`}, we
          do
          need to ensure it is you.
          Please, enter a verification code sent to <span
            className={`inline-block highlighted`}>tuznikolas@gmail.com</span>.</p>
      )}
      {action.stage === 3 && (
        <>
          <p className={classes[``]}>Your request for {action.type === `refund` ? `refund` : `cancellation`} has been
            successfully sent. We will get back to you shortly. <span className={`inline-block highlighted`}>
              Please, check out your email for further instructions.
            </span></p>

          <div className={`flex margin-top-3rem`}>
            <p className={`paragraph paragraph-success`}>Success! The request
              for {action.type === `refund` ? `refund` : `cancellation`} is sent.</p>
          </div>
        </>
      )}
      <VerifyActionForm action={action} />
    </div>

  );
}
