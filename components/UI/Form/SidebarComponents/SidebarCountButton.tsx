// 'use client';

import React from 'react';

type SidebarCountButtonType = {
  name: `ticket-adult-amount` | `ticket-youth-amount` | `ticket-children-amount`;
  label: string;
  price: number;
  addTicket: (price: number, name: string) => void;
  removeTicket: (price: number, name: string) => void;
  totalTickets: number;
  // children: ReactNode;
}

export default function
  SidebarCountButton({
                       label,
                       price,
                       name,
                       addTicket,
                       removeTicket,
                       totalTickets
                     }: SidebarCountButtonType) {
  return (
    <div className="flex flex-space-between flex-align-center">
      <p className="description__tour-overview-sidebar__tickets-p">{label}<span
        className="ticket-adult-price">${price}</span>
      </p>
      <div className="description__tour-overview-sidebar__tickets__btn-wrapper flex flex-align-center">
        <a onClick={() => removeTicket(price, name)}
           className="description__tour-overview-sidebar__tickets__btn btn-minus">-</a>
        <input type="number" className="description__tour-overview-sidebar__tickets__input" defaultValue={totalTickets}
               name={name} />
        {/*<!--              <p class="description__tour-overview-sidebar__tickets__p" id="ticket-adult-amount">0</p>-->*/}
        <a onClick={() => addTicket(price, name)}
           className="description__tour-overview-sidebar__tickets__btn btn-plus">+</a>
      </div>
    </div>
  );
}
