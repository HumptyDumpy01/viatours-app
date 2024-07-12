'use client';
import './TopTrending.scss';
import React, { ReactNode } from 'react';

interface TopTrendingWrapperInterface {
  children: ReactNode;
}

export default function TopTrendingWrapper({ children }: TopTrendingWrapperInterface) {
  return (
    <div className="top-trending-wrapper container">
      <div className="top-trending__items-wrapper container">
        <div className="top-trending__items flex">
          {children}
        </div>
      </div>
      <div className="top-trending-toggle-left">&larr;</div>
      <div className="top-trending-toggle-right">&rarr;</div>
    </div>
  );
};
