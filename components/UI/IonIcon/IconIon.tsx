'use client';

import React from 'react';
import { IonIcon } from '@ionic/react';
import {
  arrowBackOutline,
  arrowForwardOutline,
  body,
  businessOutline,
  callOutline,
  callSharp,
  checkmark,
  chevronUpOutline,
  closeOutline,
  ellipse,
  filterOutline,
  flagOutline,
  happyOutline,
  hourglass,
  iceCreamOutline,
  language,
  logoAndroid,
  logoApple,
  logoFacebook,
  logoInstagram,
  logoTwitter,
  logoWhatsapp,
  mapOutline,
  people,
  restaurantOutline,
  thumbsDownOutline,
  thumbsUpOutline,
  walletOutline,
  calendarOutline,
  timeOutline,
  bookmarkOutline,
  arrowRedo
} from 'ionicons/icons';


const iconMap = {
  callOutline,
  logoInstagram,
  logoFacebook,
  logoTwitter,
  logoWhatsapp,
  logoAndroid,
  logoApple,
  chevronUpOutline,
  closeOutline,
  filterOutline,
  arrowForwardOutline,
  arrowBackOutline,
  hourglass,
  people,
  body,
  language,
  ellipse,
  checkmark,
  flagOutline,
  happyOutline,
  mapOutline,
  iceCreamOutline,
  restaurantOutline,
  walletOutline,
  businessOutline,
  callSharp,
  thumbsUpOutline,
  thumbsDownOutline,
  calendarOutline,
  timeOutline,
  bookmarkOutline,
  arrowRedo
};

interface IconIonProps {
  type: keyof typeof iconMap;
  className?: string;
}

const IconIon: React.FC<IconIonProps> = ({ type, className }) => {

  const IconComponent = iconMap[type];
  if (!IconComponent) {
    throw new Error(`Invalid icon type: ${type}`);
  }
  return <IonIcon icon={IconComponent} className={className} />;
};

export default IconIon;