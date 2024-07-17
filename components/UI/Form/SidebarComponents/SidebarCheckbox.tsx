// 'use client';

type SidebarCheckboxType = {
  label: string;
  servicePrice: number;
  name: string;
  // children: ReactNode;
}

export default function SidebarCheckbox({ label, servicePrice, name }: SidebarCheckboxType) {
  return (
    <div
      className="description__tour-overview-sidebar__tickets__checkbox-wrapper flex flex-align-center flex-space-between margin-bottom-very-small">
      <div className="flex flex-align-center">
        <input type="checkbox" id={name} name={name}
               className="description__tour-overview-sidebar__tickets__checkbox" />
        <label htmlFor={name}
               className="description__tour-overview-sidebar__tickets__checkbox-label">{label}</label>
      </div>
      <span className="service-per-booking-price">${servicePrice}</span>
    </div>
  );
}
