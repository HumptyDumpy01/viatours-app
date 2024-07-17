// 'use client';
import './TourOverview.scss';
import { ReactNode } from 'react';

type DescriptionOverviewType = {
  sideBar: ReactNode;
  children: ReactNode;
}

export default function DescriptionOverview({ children, sideBar }: DescriptionOverviewType) {
  return (
    <section className="description__tour-overview grid">
      <div className="description__tour-overview-wrapper-1">
        {children}
      </div>
      {sideBar}
    </section>
  );
}
