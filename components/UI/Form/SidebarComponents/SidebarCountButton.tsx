// 'use client';

type SidebarCountButtonType = {
  name: string;
  label: string;
  price: number;
  // children: ReactNode;
}

export default function SidebarCountButton({ label, price, name }: SidebarCountButtonType) {
  return (
    <div className="flex flex-space-between flex-align-center">
      <p className="description__tour-overview-sidebar__tickets-p">{label}<span
        className="ticket-adult-price">${price}</span>
      </p>
      <div className="description__tour-overview-sidebar__tickets__btn-wrapper flex flex-align-center">
        <a className="description__tour-overview-sidebar__tickets__btn btn-minus">-</a>
        <input type="number" className="description__tour-overview-sidebar__tickets__input" defaultValue={0}
               name={name} />
        {/*<!--              <p class="description__tour-overview-sidebar__tickets__p" id="ticket-adult-amount">0</p>-->*/}
        <a className="description__tour-overview-sidebar__tickets__btn btn-plus">+</a>
      </div>
    </div>
  );
}
