// 'use client';
import '../SidebarForm.scss';

type SidebarTotalType = {
  total: number;
  // children: ReactNode;
}

export default function SidebarTotal({ total }: SidebarTotalType) {
  return (
    <div className="sidebar__total flex flex-align-center flex-space-between">
      <p className="sidebar__total-p">Total:</p>
      <p className="sidebar__total-p--price">${total}</p>
    </div>
  );
}
