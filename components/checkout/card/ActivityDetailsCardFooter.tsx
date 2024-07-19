// 'use client';

type ActivityDetailsCardFooterType = {
  duration: string;
  priceFrom: number;
  // children: ReactNode;
}

export default function ActivityDetailsCardFooter({ duration, priceFrom }: ActivityDetailsCardFooterType) {
  return (
    <>
      <div
        className="book-now__details-2__activity-details__card-extra-info flex flex-align-center flex-space-between">
        <p className="">{duration}</p>
        <p className="">From <span className="inline-block">${priceFrom}</span></p>
      </div>
    </>
  );
}
