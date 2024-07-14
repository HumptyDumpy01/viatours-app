// 'use client';
import './TourOverview.scss';
import { ReactNode } from 'react';

type DescriptionOverviewType = {
  children: ReactNode;
}

export default function DescriptionOverview({ children }: DescriptionOverviewType) {
  return (
    <section className="description__tour-overview grid">
      <div className="description__tour-overview-wrapper-1">
        {children}
      </div>
    </section>
  );
}
