'use client';

import { useCartDispatch, useCartSelector } from '@/store/hooks';
import classes from '@/app/track-order/page.module.scss';
import { useRef, useState, useTransition } from 'react';
import { OrderDetailsType, trackOrderSliceActions } from '@/store/trackOrderSlice';

type VerifyActionFormType = {
  action: {
    type: `cancellation` | `refund`;
    stage: 1 | 2 | 3;
  }
  // children: ReactNode;
}

export default function VerifyActionForm({ action }: VerifyActionFormType) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>(``);
  const dispatch = useCartDispatch();
  const { type } = useCartSelector((state) => state.trackOrder.actionsStage) as {
    type: `cancellation` | `refund`;
    stage: 1 | 2 | 3;
  };

  const { _id } = useCartSelector((state) => state.trackOrder.orderDetails) as OrderDetailsType;


  const userCode = useRef<HTMLInputElement>(null);

  // console.log(`action.stage`, action.stage);

  async function handleSubmit() {

    if (userCode?.current?.value.toString().trim().length !== 6 || isNaN(+userCode.current.value)) {
      setError(`The code should be 6 digits long.`);
      return;
    }
    // console.log(`userCode`, userCode.current.value);

    if (!userCode.current.value) {
      setError(`Please, enter the code.`);
      return;
    }

    if (type === `cancellation`) {
      /* Create an API endpoint to check whether the token user entered is correct.
      *  If so, change the action stage to the third. Then use another api endpoint to push a document with
      *  all the necessary data onto orderCancellations collections. */
      startTransition(async () => {
        setError(``);
        const response = await fetch(`/api/verify-order-cancellation-token`, {
          method: `POST`,
          headers: {
            'Content-Type': `application/json`
          },
          body: JSON.stringify({
            orderId: _id.toString(),
            userToken: userCode.current!.value ? userCode.current!.value : false
          })
        });

        const data = await response.json();

        if (data.error || !data.acknowledged) {
          setError(data.message || `An error occurred. Please, try again.`);
          return;
        }

        console.log(`data`, data);

        /* Use api endpoint to push user's order to orderCancellations collection,
        *  and also remember to change the actual order data.
        *  If the user is authenticated, then push the corresponding notification to his notification array.*/
        const finalResultForCancellationReq = await fetch(`/api/approve-request-for-cancellation`, {
          method: `POST`,
          headers: {
            'Content-Type': `application/json`
          },
          body: JSON.stringify({
            orderId: _id.toString()
          })
        });

        const finalResultForCancellationReqData = await finalResultForCancellationReq.json();

        if (finalResultForCancellationReqData.error || !finalResultForCancellationReqData.acknowledged) {
          setError(finalResultForCancellationReqData.message || `An error occurred. Please, try again.`);
          return;
        }

        // if everything is successful, then change the stage to 3
        dispatch(trackOrderSliceActions.setActionsStage({
          type: action.type,
          stage: 3
        }));
        // clear the error
        setError(``);

      });
    }

    if (type === `refund`) {

      startTransition(async () => {
        setError(``);
        const response = await fetch(`/api/verify-order-refund-token`, {
          method: `POST`,
          headers: {
            'Content-Type': `application/json`
          },
          body: JSON.stringify({
            orderId: _id.toString(),
            userToken: userCode.current!.value ? userCode.current!.value : false
          })
        });

        const data = await response.json();

        if (data.error || !data.acknowledged) {
          setError(data.message || `An error occurred. Please, try again.`);
          return;
        }

        console.log(`data`, data);

        /* Use api endpoint to push user's order to orderCancellations collection,
        *  and also remember to change the actual order data.
        *  If the user is authenticated, then push the corresponding notification to his notification array.*/
        const finalResultForRefundReq = await fetch(`/api/approve-request-for-refund`, {
          method: `POST`,
          headers: {
            'Content-Type': `application/json`
          },
          body: JSON.stringify({
            orderId: _id.toString()
          })
        });

        const finalResultForRefundReqData = await finalResultForRefundReq.json();

        if (finalResultForRefundReqData.error || !finalResultForRefundReqData.acknowledged) {
          setError(finalResultForRefundReqData.message || `An error occurred. Please, try again.`);
          return;
        }

        // if everything is successful, then change the stage to 3
        dispatch(trackOrderSliceActions.setActionsStage({
          type: action.type,
          stage: 3
        }));
        // clear the error
        setError(``);

      });
    }


    // resetting the form
    // currObject.reset();
    // output
  }

  return (
    <form onSubmit={handleSubmit}>
      {action.stage === 2 && (
        <>
          {error && (
            <div className={`flex margin-top-3rem`}>
              {error && <p className={`paragraph paragraph-error`}>{error}</p>}
            </div>
          )}
          <label className={`${classes[`label`]}`} htmlFor={`orderId`}>Enter Verification Code</label>
          <form className={`flex ${classes['track-order-input-container']} margin-bottom-42px`}>
            <input disabled={isPending} ref={userCode} name={`code`} className={`${classes[`input`]}`} type={`password`}
                   id={`orderId`}
                   required
                   placeholder={`6-digit code`} />
            <button onClick={handleSubmit} type={`button`}
                    className={`${classes[`track-order-track-btn`]} ${isPending ? `${classes[`disabled`]}` : ``} `}>Verify
            </button>
          </form>
        </>
      )}
    </form>
  );
}
