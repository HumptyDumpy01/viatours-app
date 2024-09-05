'use client';

import './not-found.scss';
import Link from 'next/link';
import familyDrivingAnimated from '@/animations/family-driving.json';
// import manDriving from '@/animations/man-driving.json';
// import peopleWalking from '@/animations/people-walking.json';
// import traveller  from '@/animations/traveller.json';
import Lottie from 'lottie-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

/*type NotFoundPageType = {
  // children: ReactNode;
}*/

export default function NotFoundPage(/*{  }: NotFoundPageType*/) {
  const navigate = useRouter();

  function handleNavigateBack() {
    navigate.back();
  }

  return (
    <section className="four-o-four-container">
      <div className="four-o-four container grid">
        <div className="four-o-four__content">
          <span className="inline-block four-o-four__content-subtitle uppercase font-weight-bold">500 error</span>
          <h1 className="four-o-four__content-title">Unexpected <b
            className="color-error">Error!</b></h1>
          <p className="four-o-four__content-text">
            We are sorry, but something went wrong. Our team has been notified about this issue and we will try to fix
            it. In the meantime, feel free to explore <Link href={`/tours`} className="highlighted">other corners of our
            website.</Link>
          </p>
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
          {/*<Lottie animationData={manDrivingAnimated} />*/}
          <Lottie animationData={familyDrivingAnimated} />
        </div>
        {/*<div className="four-o-four__vid-container">*/}
        {/*  /!*<!--      <img src="img/404/404-img.png" alt="A animal chilling high in the mountains." class="four-o-four__img">-->*!/*/}
        {/*  /!*<!-- instead of the image, let's insert the mp4 video and loop it -->*!/*/}
        {/*  <video className="four-o-four__vid" autoPlay loop muted>*/}
        {/*    <source src={`/vid/nature-vid-2.mp4`} type="video/mp4" />*/}
        {/*    Your browser does not support the video tag.*/}
        {/*  </video>*/}
        {/*</div>*/}
      </div>
    </section>
  );
}
