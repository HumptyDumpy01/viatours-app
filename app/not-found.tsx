'use client';

import './not-found.scss';
import Link from 'next/link';
import familyDrivingAnimated from '@/animations/family-driving.json';
import Lottie from 'lottie-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function NotFoundPage() {
  const navigate = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  function handleNavigateBack() {
    navigate.back();
  }

  return (
    <section className="four-o-four-container">
      <div className="four-o-four container grid">
        <div className="four-o-four__content">
          <span className="inline-block four-o-four__content-subtitle uppercase font-weight-bold">404 error</span>
          <h1 className="four-o-four__content-title">Oops! This
            page is <b className="color-error">not found!</b></h1>
          <p className="four-o-four__content-text">The page you are looking for might have been removed, had its name
            changed,
            or is
            temporarily unavailable. In the meantime, feel free to explore <Link href={`/tours`}
                                                                                 className="highlighted">other corners
              of
              our
              website.</Link></p>
          <p className="four-o-four__content-text">Who knows? You might stumble upon a hidden gem or a
            pixelated unicorn. Happy
            browsing!</p>
          <div className="four-o-four__content__btn-container flex flex-align-center gap-22px">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link href={`/`} className="btn four-o-four__content__btn four-o-four__content__btn--1">Go Home</Link>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNavigateBack}
              className="btn four-o-four__content__btn four-o-four__content__btn--2">Go Back
            </motion.button>
          </div>
        </div>

        <div className={`animation-404`}>
          {isMounted && <Lottie animationData={familyDrivingAnimated} />}
        </div>
      </div>
    </section>
  );
}