// 'use client';
import classes from './MeetingPoint.module.scss';
import Link from 'next/link';
import { motion } from 'framer-motion';

type MeetingPointType = {
  coordinates: {
    lat: number;
    lng: number;
  };
  // children: ReactNode;
}

export default function MeetingPoint({ coordinates }: MeetingPointType) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 200 }}
      viewport={{ once: true }}
      transition={{ type: `spring`, stiffness: 100, damping: 20 }}
      className={`${classes[`meeting-point-container`]}`}>
      <h2 className={`${classes[`meeting-point-heading`]}`}>Meeting Point</h2>
      <p className={`${classes[`meeting-point-text`]}`}>
        In order to see the meeting point, please click on the button below.
      </p>
      <div
        className={`flex`}
      >
        <Link
          target="_blank"
          href={`https://www.google.com/maps/@${coordinates.lng},${coordinates.lat},11z?entry=ttu&g_ep=EgoyMDI0MDkwMi4xIKXMDSoASAFQAw%3D%3D`}
          className={`${classes[`meeting-point-button`]}`}>Show meeting point</Link>
      </div>
    </motion.div>
  );
}
