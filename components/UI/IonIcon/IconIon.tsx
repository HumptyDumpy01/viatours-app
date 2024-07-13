'use client';

import React, { useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import { callOutline, logoFacebook, logoInstagram, logoTwitter, logoWhatsapp, searchOutline } from 'ionicons/icons';

const iconMap = {
  callOutline,
  logoInstagram,
  logoFacebook,
  logoTwitter,
  logoWhatsapp,
  searchOutline
};

interface IconIonProps {
  type: keyof typeof iconMap;
  className?: string;
}

const IconIon: React.FC<IconIonProps> = ({ type, className }) => {

  // here I am using useEffect to suppress the warning that is being thrown by Ionicons
  // this warning is not relevant to the app and is just noise
  useEffect(() => {
    const originalConsoleWarn = console.warn;
    console.warn = (...args) => {
      if (args[0].startsWith('[Ionicons Warning]')) {
        return;
      }
      originalConsoleWarn(...args);
    };

    // Cleanup function to restore the original console.warn
    return () => {
      console.warn = originalConsoleWarn;
    };
  }, []); // Empty dependency array means this effect runs once on mount

  const IconComponent = iconMap[type];
  if (!IconComponent) {
    console.warn(`IconIon: No icon found for type "${type}"`);
    return null;
  }
  return <IonIcon icon={IconComponent} className={className} />;
};

export default IconIon;