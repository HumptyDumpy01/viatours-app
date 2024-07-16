// 'use client';

import '@/components/UI/Layout/LeaveReply.scss';

type RateType = {
  label: string;
  name: string;
  // children: ReactNode;
}

export default function Rate({ name, label }: RateType) {
  return (
    <>
      <div
        className="leave-a-reply__form-rate-wrapper flex flex-align-center leave-a-reply__form-rate-wrapper-location">
        <p className="leave-a-reply__form-rate-label location-p">{label}</p>
        <div className="leave-a-reply__form-rate-wrapper--inputs-stars">
          <label htmlFor={`${name}-1`}></label>
          <label htmlFor={`${name}-2`}></label>
          <label htmlFor={`${name}-3`}></label>
          <label htmlFor={`${name}-4`}></label>
          <label htmlFor={`${name}-5`}></label>
          <input type="radio" id={`${name}-1`} name={label} value="1"
                 className="leave-a-reply__form-rate-location-input" required />
          <input type="radio" id={`${name}-2`} name={label} value="2"
                 className="leave-a-reply__form-rate-location-input" required />
          <input type="radio" id={`${name}-3`} name={label} value="3"
                 className="leave-a-reply__form-rate-location-input" required />
          <input type="radio" id={`${name}-4`} name={label} value="4"
                 className="leave-a-reply__form-rate-location-input" required />
          <input type="radio" id={`${name}-5`} name={label} value="5"
                 className="leave-a-reply__form-rate-location-input" required />
        </div>
      </div>
    </>
  );
}
