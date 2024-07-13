'use client';

/*interface GoToTheTopBtnInterface {
  // children: ReactNode;
}*/

import IconIon from '@/components/UI/IonIcon/IconIon';
import { useEffect, useState } from 'react';

export default function GoToTheTopBtn(/*{  }: GoToTheTopBtnInterface*/) {
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    const position = window.scrollY;
    const stickyThreshold = window.innerHeight * 2;
    setIsSticky(position > stickyThreshold);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function goToTheTop() {
    window.scrollTo({
      top: 0,
      behavior: `smooth`
    });
  }

  return (
    <div onClick={goToTheTop} className={`go-to-the-top-button ${isSticky ? `go-to-the-top-button-visible` : ``}`}>
      <IconIon type={`chevronUpOutline`} className={`go-to-the-top-button-icon`} />
    </div>
  );
}
