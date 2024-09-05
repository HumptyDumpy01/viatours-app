// 'use client';
import classes from './MeetingPoint.module.scss';
import Link from 'next/link';

type MeetingPointType = {
  coordinates: {
    lat: number;
    lng: number;
  };
  // children: ReactNode;
}

export default function MeetingPoint({ coordinates }: MeetingPointType) {
  return (
    <div className={`${classes[`meeting-point-container`]}`}>
      <h2 className={`${classes[`meeting-point-heading`]}`}>Meeting Point</h2>
      <p className={`${classes[`meeting-point-text`]}`}>
        In order to see the meeting point, please click on the button below.
      </p>
      <Link
        target="_blank"
        href={`https://www.google.com/maps/@${coordinates.lng},${coordinates.lat},11z?entry=ttu&g_ep=EgoyMDI0MDkwMi4xIKXMDSoASAFQAw%3D%3D`}
        className={`${classes[`meeting-point-button`]}`}>Show meeting point</Link>
    </div>
  );
}
