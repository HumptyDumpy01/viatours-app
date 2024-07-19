// 'use client';

/*type NonRefundableCancellationType = {
  // children: ReactNode;
}*/

export default function NonRefundableCancellation(/*{  }: NonRefundableCancellationType*/) {
  return (
    <>
      <div className="non-refundable flex flex-align-center gap-7px">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M1 10L0 9L4 5L0 1L1 0L5 4L9 0L10 1L6 5L10 9L9 10L5 6L1 10Z" fill="#1E2050" />
        </svg>
        <p className="color-blue-lighter font-weight-med">Non-refundable <a href="#"
                                                                            className="color-blue-lighter font-weight-med text-decoration-underline">Cancellation
          Policy</a></p>
      </div>
    </>
  );
}
