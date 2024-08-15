// 'use client';
import '@/app/account-settings/page.scss';
import React from 'react';
import { motion } from 'framer-motion';

type SortByType = {
  options: { value: string; label: string; }[];
  handleOnChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled: boolean;

  // children: ReactNode;
}

export default function SortBy({ options, handleOnChange, disabled }: SortByType) {
  return (
    <>
      <motion.div
        whileHover={{ scale: 1.3, backfaceVisibility: `hidden` }}
        transition={{ type: `spring`, stiffness: 260, damping: 20 }}
        className="account-settings__content-sort-by-wrapper flex gap-29px">
        <div className="account-settings__content__actions-wrapper flex flex-align-center">
          <p className="sort-by-text">Sort by:</p>
          <label htmlFor="sort-by"></label>
          <select disabled={disabled} onChange={handleOnChange} name="sort-by" id="sort-by">
            <option value="default">Choose</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </motion.div>
    </>
  );
}
