'use client';

import '../../homepage/cta-2/CTASecondary.scss';

import { useFormStatus } from 'react-dom';

interface FormSubmitInterface {
  btnClassName: string;
  btnTextIsPending: string;
  btnTextDefault: string;
  // children: ReactNode;
}

export default function FormSubmit({ btnClassName, btnTextIsPending, btnTextDefault }: FormSubmitInterface) {
  const status = useFormStatus();
  const isPending = status.pending;

  return (
    <>
      <button className={btnClassName} disabled={isPending}>{!isPending ? btnTextDefault : btnTextIsPending}</button>
    </>
  );
}
