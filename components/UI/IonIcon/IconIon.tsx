'use client';

import React from 'react';
import { IonIcon } from '@ionic/react';
import {
  callOutline,
  chevronUpOutline,
  closeOutline,
  filterOutline,
  logoAndroid,
  logoApple,
  logoFacebook,
  logoInstagram,
  logoTwitter,
  logoWhatsapp
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
  filterOutline
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