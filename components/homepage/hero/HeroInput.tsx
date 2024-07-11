'use client';

import Image from 'next/image';
import { ReactNode } from 'react';


interface HeroInputInterface {
  icon: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className: string;
  };
  children: ReactNode;
}

export default function HeroInput({ icon, children }: HeroInputInterface) {
  return (
    <figure className="hero__second-part-first-col flex">
      <div className="hero__second-part-empty-box">
        <Image width={icon.width} height={icon.height} priority src={icon.src} alt={icon.alt}
               className={icon.className} />
      </div>
      <div className="hero__second-part-details flex flex-column">
        {children}
      </div>
    </figure>
  );
}
