// 'use client';

import { ComponentPropsWithoutRef } from 'react';

type SidebarCheckboxType = {
  label: string;
  servicePrice: number;
  name: string;
  disabled: boolean;
  // children: ReactNode;
} & ComponentPropsWithoutRef<'input'>;

export default function SidebarCheckbox({ label, servicePrice, name, disabled, ...props }: SidebarCheckboxType) {
  return (
    <div
      className={`description__tour-overview-sidebar__tickets__checkbox-wrapper
       flex flex-align-center flex-space-between 
       margin-bottom-very-small ${disabled ? `cursor-not-allowed` : ``}`}>
      <div className={`flex flex-align-center`}>
        <input {...props} disabled={disabled} type="checkbox" id={name} name={name}
               className={`description__tour-overview-sidebar__tickets__checkbox`} />
        <label htmlFor={name}
               className={`description__tour-overview-sidebar__tickets__checkbox-label ${disabled ? `cursor-not-allowed` : ``}`}>{label}</label>
      </div>
      <span className="service-per-booking-price">${servicePrice}</span>
    </div>
  );
}
