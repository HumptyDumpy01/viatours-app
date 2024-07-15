// 'use client';

type TourIncludedType = {
  what_included: {
    green: string[];
    orange: string[];
  };
  // children: ReactNode;
}

import IconIon from '@/components/UI/IonIcon/IconIon';

export default function TourIncluded({ what_included }: TourIncludedType) {
  return (
    <section className="description__tour-overview-included-wrapper">
      <h2 className="secondary-heading margin-bottom-small">What&apos;s Included</h2>
      <div className="description__tour-overview-included-wrapper--1 grid">
        <ul className="description__tour-overview-included">
          {what_included.green.map((item, index) => (
            <li key={index}>
              <IconIon type={`checkmark`} className="icon icon--checkmark icon--green-bg" />
              {item}
            </li>
          ))
          }
        </ul>
        <div className="description__tour-overview-included-wrapper--2 grid">
          <ul className="description__tour-overview-included">
            {what_included.orange.map((item, index) => (
              <li key={index}>
                <IconIon type={`checkmark`} className="icon icon--checkmark icon--orange-bg" />
                {item}
              </li>
            ))
            }
          </ul>
        </div>
      </div>
    </section>
  );
}
