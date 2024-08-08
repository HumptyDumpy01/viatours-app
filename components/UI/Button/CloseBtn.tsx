// 'use client';

/*type CloseBtnType = {
  // children: ReactNode;
}*/

import Image from 'next/image';
import closeIcon from '@/assets/images/homepage/grab-up-banner/close-icon.svg';
import { navigationSliceActions } from '@/store/navigationSlice';
import { useCartDispatch } from '@/store/hooks';

export default function CloseBtn(/*{  }: CloseBtnType*/) {

  const dispatch = useCartDispatch();

  function handleCloseSidebar() {
    dispatch(navigationSliceActions.toggleSideNavigation('close'));
  }

  return (
    <>
      <div onClick={handleCloseSidebar}>
        <Image src={closeIcon} alt="close icon" className="user-actions-sidebar__close-btn" />
      </div>

    </>
  );
}
