'use client';
import React, { useState } from 'react';
import '@/components/UI/Layout/LeaveReply.scss';
import { motion } from 'framer-motion';

type RateType = {
  label: string;
  name: string;
}

const Rate = ({ name, label }: RateType) => {
  // this state is used to store the rating value
  const [rating, setRating] = useState(0);

  // this state is used to store the hovered star value
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  // this function is used to set the rating value
  const handleRating = (rate: number) => {
    setRating(rate);
  };

  // this function is used to set the hovered star value
  const handleMouseEnter = (star: number) => {
    setHoveredStar(star);
  };

  // this function is used to reset the hovered star value
  const handleMouseLeave = () => {
    setHoveredStar(null);
  };

  return (
    <>
      <div className="leave-a-reply__form-rate-wrapper flex flex-align-center">
        <p className="leave-a-reply__form-rate-label">{label}</p>
        <div className="leave-a-reply__form-rate-wrapper--inputs-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.input
              whileHover={{
                scale: 1.5,
                backgroundImage: 'url(\'/tourDescription/icon-stars/filled-star.svg\')',
                zIndex: 99
              }}
              whileTap={{ scale: 0.8 }}
              key={star}
              type="radio"
              id={`${name}-${star}`}
              name={name}
              value={star}
              className="leave-a-reply__form-rate-input"
              required
              onClick={() => handleRating(star)}
              onMouseEnter={() => handleMouseEnter(star)}
              onMouseLeave={handleMouseLeave}
              style={{
                // this style is used to change the star image based on the rating value
                // so, before it, store the needed star image in the public folder
                backgroundImage: rating >= star || (hoveredStar !== null && star <= hoveredStar)
                  ? 'url(\'/tourDescription/icon-stars/filled-star.svg\')'
                  : 'url(\'/tourDescription/icon-stars/empty-star.svg\')'
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Rate;