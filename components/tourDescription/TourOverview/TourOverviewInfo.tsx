'use client';

import { container, item } from '@/components/account-settings/contents/user-tour-purchases/UserTourPurchases';
import { motion } from 'framer-motion';
import IconIon from '@/components/UI/IonIcon/IconIon';

type TourOverviewInfoType = {
  info: {
    duration: string;
    groupSize: number;
    ages: string;
    languages: string[];
  }
  // children: ReactNode;
}

export default function TourOverviewInfo({ info }: TourOverviewInfoType) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={container}
      className="description__tour-overview-info">
      <motion.div
        variants={item}
        className="description__tour-overview-info-container grid grid-two-cols flex flex-align-center">
        <IconIon type={`hourglass`} className="icon icon--info" />
        <div className="description__tour-overview-info-container-text">
          <p className="description__tour-overview-duration">Duration</p>
          <p className="description__tour-overview-hours">{info.duration}</p>
        </div>
      </motion.div>
      <motion.div
        variants={item}
        className="description__tour-overview-info-container grid grid-two-cols flex flex-align-center">
        <IconIon type={`people`} className="icon icon--info" />
        <div className="description__tour-overview-info-container-text">
          <p className="description__tour-overview-duration">Group Size</p>
          <p className="description__tour-overview-hours">{info.groupSize} people</p>
        </div>
      </motion.div>
      <motion.div
        variants={item}
        className="description__tour-overview-info-container grid grid-two-cols flex flex-align-center">
        <IconIon type={`body`} className="icon icon--info" />
        <div className="description__tour-overview-info-container-text">
          <p className="description__tour-overview-duration">Ages</p>
          <p className="description__tour-overview-hours">{info.ages[0]} yrs</p>
        </div>
      </motion.div>
      <motion.div
        variants={item}
        className="description__tour-overview-info-container grid grid-two-cols flex flex-align-center">
        <IconIon type={`language`} className="icon icon--info" />
        <div className="description__tour-overview-info-container-text">
          <p className="description__tour-overview-duration">Languages</p>
          <p
            className="description__tour-overview-hours">{info.languages.map((item, index) => info.languages.length - 1 ===
          index ? item : item + `, `)}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
