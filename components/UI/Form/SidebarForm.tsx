'use client';

import './SidebarForm.scss';
import IconIon from '@/components/UI/IonIcon/IconIon';
import SidebarPickDate from '@/components/UI/Form/SidebarComponents/SidebarPickDate';
import SidebarPickTime from '@/components/UI/Form/SidebarComponents/SidebarPickTime';
import SidebarCountButton from '@/components/UI/Form/SidebarComponents/SidebarCountButton';
import SidebarCheckbox from '@/components/UI/Form/SidebarComponents/SidebarCheckbox';
import SidebarTotal from '@/components/UI/Form/SidebarComponents/SidebarTotal';
import { useState } from 'react';

type SidebarFormType = {
  price: {
    adult: number;
    youth: number;
    children: number;
  };
  price_for_extra: {
    service_per_booking: number;
    service_per_person: number;
    adult: number;
    youth: number;
  };
  time: string[];
  // children: ReactNode;
}

export default function SidebarForm({ price, price_for_extra, time }: SidebarFormType) {
  const [totalPrice, setTotalPrice] = useState<number>(0);

  /* IMPORTANT: Outsource your entire form(!) with the useFormState as a standalone component.
      add a prop, e.g. action, and pass this prop to your useFormState as the first arg.
      Then add this form to your PostForm file, where you handle server action. Pass your server action
      to this newly created component.   */

  // Thus you would be able to use the error messages to inject them onto your form.
  // const [state, formAction] = useFormState(YOUR_SERVER_ACTION, { errors: null });

  return (
    <form className="description__tour-overview-sidebar__form">
      <div className="description__tour-overview-sidebar">
        <IconIon type={`closeOutline`} className="icon icon--close-sidebar"></IconIon>

        <p className="description__tour-overview-sidebar__p flex">From <span>${price.children}</span></p>
        <div className="description__tour-overview-sidebar-wrapper">
          <SidebarPickDate />
          <SidebarPickTime time={time} />
        </div>
        <div className="description__tour-overview-sidebar__tickets grid">
          <h3
            className="tertiary-heading margin-top-sm description__tour-overview-sidebar__tickets-heading">Tickets</h3>
          <SidebarCountButton name={`ticket-adult-amount`} label={`Adult (18+ years)`} price={price.adult} />
          <SidebarCountButton name={`ticket-youth-amount`} label={`Youth (13-17+ years)`} price={price.youth} />
          <SidebarCountButton name={`ticket-children-amount`} label={`Children (1-12+ years)`} price={price.children} />
        </div>
        <div className="description__tour-overview-sidebar__tickets grid">
          <h3 className="tertiary-heading margin-top-sm description__tour-overview-sidebar__tickets-heading">Add
            Extra</h3>
          <div className="flex flex-column border-bottom">
            {/*<!--          // insert a checkbox input here, with the Add Service per booking text--> */}
            <SidebarCheckbox name={`service-per-booking`} label={`Add Service per booking `}
                             servicePrice={price_for_extra.service_per_booking} />
            <SidebarCheckbox name={`add-service-per-person`} label={`Add Service per person `}
                             servicePrice={price_for_extra.service_per_person} />

            <p className="paragraph paragraph--descr flex">Adult: <span>${price_for_extra.adult}</span> -
              Youth: <span>${price_for_extra.youth}</span></p>
          </div>
          <div>
            <SidebarTotal total={Number(totalPrice.toFixed(2))} />
            <button className="btn btn--book-now" id="book-now-btn-sidebar">Book Now
              <IconIon type={`arrowForwardOutline`} className="icon icon--right-arrow"></IconIon>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
