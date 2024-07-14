// 'use client';

import starFilled from '@/assets/images/homepage/findPopularTours/one-star.svg';
import starEmpty from '@/assets/images/homepage/findPopularTours/empty-star.svg';
import Image from 'next/image';

type StarsType = {
  rating: number;
  // children: ReactNode;
}

export default function Stars({ rating }: StarsType) {
  return (
    <>
      {Array.from({ length: 5 }, (_, i) => {
        if (i < Number(rating.toFixed(0))) {
          return <Image key={i} width={15} height={15} src={starFilled} alt="star filled" />;
        } else {
          return <Image key={i} width={15} height={15} src={starEmpty} alt="star empty" />;
        }
      })}
    </>
  );
}
