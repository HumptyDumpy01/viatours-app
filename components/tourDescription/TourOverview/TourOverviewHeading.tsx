'use client';

type TourOverviewHeadingType = {
  overview: string;
  // children: ReactNode;
}

import IconIon from '@/components/UI/IonIcon/IconIon';

export default function TourOverviewHeading({ overview }: TourOverviewHeadingType) {

  function handleOpenSidebar() {
    const sidebar = document.querySelector(`.description__tour-overview-sidebar`)! as HTMLDivElement;
    sidebar.classList.add(`open`);
    const sidebarBackground = document.querySelector(`.sidebar-background`)! as HTMLDivElement;
    sidebarBackground.classList.add(`open`);
  }

  return (
    <>
      <div className={`sidebar-background`}></div>
      <section className="description__tour-tour-overview">
        <h2 className="secondary-heading margin-bottom-small">Tour Overview</h2>
        <p className="paragraph">{overview}</p>
        <div className="flex flex-align-center btn--book-now-container">
          <button onClick={handleOpenSidebar} className="btn btn--book-now-responisve">Book Now
            <IconIon type={`arrowForwardOutline`} className="icon icon--right-arrow"></IconIon>
          </button>
        </div>
      </section>
    </>
  );
}
