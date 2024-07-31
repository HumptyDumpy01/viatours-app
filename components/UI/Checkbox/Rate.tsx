import React, { useState } from 'react';
import '@/components/UI/Layout/LeaveReply.scss';

type RateType = {
  label: string;
  name: string;
}

const Rate = ({ name, label }: RateType) => {
  const [rating, setRating] = useState(0);

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  return (
    <>
      <div className="leave-a-reply__form-rate-wrapper flex flex-align-center">
        <p className="leave-a-reply__form-rate-label">{label}</p>
        <div className="leave-a-reply__form-rate-wrapper--inputs-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <input
              key={star}
              type="radio"
              id={`${name}-${star}`}
              name={name}
              value={star}
              className="leave-a-reply__form-rate-input"
              // required
              onClick={() => handleRating(star)}
              style={{
                backgroundImage: rating >= star ? 'url(\'/tourDescription/icon-stars/filled-star.svg\')' : 'url(\'/tourDescription/icon-stars/empty-star.svg\')'
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Rate;