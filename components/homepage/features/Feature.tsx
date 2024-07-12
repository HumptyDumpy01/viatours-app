// 'use client';

import ticketIcon from '@/assets/images/homepage/why-choose-tourz/ticket.svg';
import balloonIcon from '../../../assets/images/homepage/why-choose-tourz/hot-air-balloon.svg';
import diamondIcon from '../../../assets/images/homepage/why-choose-tourz/diamond.svg';
import medalIcon from '../../../assets/images/homepage/why-choose-tourz/medal.svg';
import Image from 'next/image';

interface FeatureInterface {
  title: string;
  text: string;
  type: `ticket` | `balloon` | `diamond` | `medal`;
  // children: ReactNode;
}

export default function Feature({ title, text, type }: FeatureInterface) {
  let imageSrc = type === `ticket` ? ticketIcon : type === `balloon` ? balloonIcon : type === `diamond` ? diamondIcon : medalIcon;

  if (!type) {
    throw new Error(`You must provide a type prop to the Feature component.`);
  }

  return (
    <div className="section-features__layout-el">
      <div>
        <Image className="section-features__layout__img" src={imageSrc} alt={`${type} icon`} />
      </div>
      <span>{title}</span>
      <p>{text}</p>
    </div>
  );
}
