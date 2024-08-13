'use client';

/*interface GoToTheTopBtnInterface {
  // children: ReactNode;
}*/

import IconIon from '@/components/UI/IonIcon/IconIon';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

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
    <AnimatePresence>
      {isSticky && (
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 200 }}
          whileHover={{ scale: 1.5 }}
          whileTap={{ scale: 0.9, y: 500 }}
          transition={{ type: 'spring', stiffness: 200, duration: 0.1 }}
          onClick={goToTheTop} className={`go-to-the-top-button go-to-the-top-button-visible`}>
          <IconIon type={`chevronUpOutline`} className={`go-to-the-top-button-icon`} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
