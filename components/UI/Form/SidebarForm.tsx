'use client';

import './SidebarForm.scss';
import IconIon from '@/components/UI/IonIcon/IconIon';
import SidebarPickDate from '@/components/UI/Form/SidebarComponents/SidebarPickDate';
import SidebarPickTime from '@/components/UI/Form/SidebarComponents/SidebarPickTime';
import SidebarCountButton from '@/components/UI/Form/SidebarComponents/SidebarCountButton';
import SidebarCheckbox from '@/components/UI/Form/SidebarComponents/SidebarCheckbox';
import SidebarTotal from '@/components/UI/Form/SidebarComponents/SidebarTotal';
import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CustomizedSnackbar from '@/components/UI/Toast/Snackbar';
import { SnackbarCloseReason } from '@mui/material/Snackbar/useSnackbar.types';

type SidebarFormType = {
  price: {
    adult: number;
    youth: number;
    children: number;
  };
  priceForExtra: {
    servicePerBooking: number;
    servicePerPerson: number;
    adult: number;
    youth: number;
  };
  time: string[];
  tourId: string;
  tourTitle: string;
  tourMeetingPoint: {};
  // children: ReactNode;
}

export default function
  SidebarForm({
                price,
                priceForExtra,
                time,
                tourId,
                tourMeetingPoint,
                tourTitle
              }: SidebarFormType) {
  const navigate = useRouter();
  // extract the current tour id

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [adultTickets, setAdultTickets] = useState<number>(0);
  const [youthTickets, setYouthTickets] = useState<number>(0);
  const [childrenTickets, setChildrenTickets] = useState<number>(0);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [servicePerBookingActive, setServicePerBookingActive] = useState<boolean>(false);
  const [servicePerPersonActive, setServicePerPersonActive] = useState<boolean>(false);

  const [open, setOpen] = useState(false);
  const [toastLabel, setToastLabel] = useState<string>(`Hello there!`);
  const [toastSeverity, setToastSeverity] = useState<string>(`info`);


  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {

    if (youthTickets === 0 && adultTickets === 0 && childrenTickets === 0) {
      // uncheck checkboxes on this page
      const checkboxes = document.querySelectorAll(`input[type="checkbox"]`);
      checkboxes.forEach((checkbox) => {
        (checkbox as HTMLInputElement).checked = false;
      });

      setTotalPrice(0);
      setServicePerBookingActive(false);
      setServicePerPersonActive(false);
    }

    if (youthTickets === 0 && adultTickets === 0 && childrenTickets > 0) {
      const addServicePerPerson = document.querySelector(`input[name="servicePerPerson"]`) as HTMLInputElement;
      addServicePerPerson.checked = false;
    }
  }, [adultTickets, youthTickets, childrenTickets]);


  function toggleServicePerBooking() {
    if (totalPrice === 0) {
      return;
    }
    if (servicePerBookingActive) {
      setServicePerBookingActive(false);
      setTotalPrice((prev) => prev - priceForExtra.servicePerBooking);
    } else {
      setServicePerBookingActive(true);
      setTotalPrice((prev) => prev + priceForExtra.servicePerBooking);
    }
  }

  function toggleServicePerPerson() {
    if (totalPrice === 0 || (youthTickets === 0 && adultTickets === 0 && childrenTickets > 0)) {
      return;
    }
    if (servicePerPersonActive) {

      if (youthTickets > 0) {
        setTotalPrice(prevState =>
          (prevState - (youthTickets * price.youth) - (youthTickets * priceForExtra.youth)) + (youthTickets * price.youth));
      }
      if (adultTickets > 0) {
        setTotalPrice(prevState =>
          (prevState - (adultTickets * price.adult) - (adultTickets * priceForExtra.adult) + (adultTickets * price.adult)));
      }
      setServicePerPersonActive(false);
      return;
    }

    // console.log(`Executing adultTickets: `, adultTickets);
    // console.log(`Executing youthTickets: `, youthTickets);
    if (youthTickets > 0) {
      setTotalPrice(prevState => (prevState - (youthTickets * price.youth))
        + (youthTickets * price.youth) + (youthTickets * priceForExtra.youth));
    }
    if (adultTickets > 0) {
      setTotalPrice(prevState => (prevState - (adultTickets * price.adult))
        + (adultTickets * price.adult) + (adultTickets * priceForExtra.adult));
    }

    setServicePerPersonActive((prev) => !prev);


  }

  function handleAddTicket(price: number, name: string) {
    // console.log(`Executing adultTickets: `, adultTickets);

    if (name === `adultTickets` && !servicePerPersonActive) {
      setAdultTickets((prev) => prev + 1);
      setTotalPrice((prev) => prev + price);
    }

    if (name === `youthTickets` && !servicePerPersonActive) {
      setYouthTickets((prev) => prev + 1);
      setTotalPrice((prev) => prev + price);
    }
    if (name === `childrenTickets`) {
      setChildrenTickets((prev) => prev + 1);
      setTotalPrice((prev) => prev + price);
    }

    if (name === `adultTickets` && servicePerPersonActive) {
      setAdultTickets((prev) => prev + 1);

      setTotalPrice((prev) => prev + price + priceForExtra.adult);
    }
    if (name === `youthTickets` && servicePerPersonActive) {
      setYouthTickets((prev) => prev + 1);
      setTotalPrice((prev) => prev + price + priceForExtra.youth);
    }
  }

  function handleRemoveTicket(price: number, name: string) {

    if (totalPrice === 0) {
      return;
    }

    if (name === `adultTickets` && !servicePerPersonActive) {
      if (adultTickets === 0) {
        return;
      }
      setAdultTickets((prev) => prev - 1);
      setTotalPrice((prev) => prev - price);
    }

    if (name === `youthTickets` && !servicePerPersonActive) {
      if (youthTickets === 0) {
        return;
      }
      setYouthTickets((prev) => prev - 1);
      setTotalPrice((prev) => prev - price);
    }

    if (name === `adultTickets` && servicePerPersonActive) {
      if (adultTickets === 0) {
        return;
      }
      setAdultTickets((prev) => prev - 1);
      setTotalPrice((prev) => prev - price - priceForExtra.adult);
    }
    if (name === `youthTickets` && servicePerPersonActive) {
      if (youthTickets === 0) {
        return;
      }
      setYouthTickets((prev) => prev - 1);
      setTotalPrice((prev) => prev - price - priceForExtra.youth);
    }


    if (name === `childrenTickets`) {
      if (childrenTickets === 0) {
        return;
      }
      setChildrenTickets((prev) => prev - 1);
      setTotalPrice((prev) => prev - price);
    }

  }

  function closeSidebar() {
    const closeBtn = document.querySelector(`.icon--close-sidebar`)! as HTMLButtonElement;
    closeBtn.addEventListener(`click`, () => {
      const sidebar = document.querySelector(`.description__tour-overview-sidebar`)! as HTMLDivElement;
      sidebar.classList.remove(`open`);

      const sidebarBackground = document.querySelector(`.sidebar-background`)! as HTMLDivElement;
      sidebarBackground.classList.remove(`open`);
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    const currObject = e.currentTarget;
    const formData = new FormData(currObject);
    const results = Object.fromEntries(formData.entries());

    if (results[`adultTickets`] === `0`
      && results[`youthTickets`] === `0`
      && results[`childrenTickets`] === `0`) {
      // alert(`Please select at least one ticket!`);
      setToastLabel(`Please select at least one ticket!`);
      setToastSeverity(`error`);
      handleClick();

      setIsSubmitting(false);
      return;
    }
    if (results[`date`] === ``) {
      // alert(`Please select a date!`);
      setToastLabel(`Please select a date!`);
      setToastSeverity(`error`);
      handleClick();

      setIsSubmitting(false);
      return;
    }
    if (results[`time`] === ``) {
      // alert(`Please select a time!`);
      setToastLabel(`Please select a time!`);
      setToastSeverity(`error`);
      handleClick();

      setIsSubmitting(false);
      return;
    }

    const data = {
      ...results,
      totalPrice,
      tourId,
      meetingPoint: tourMeetingPoint,
      tourTitle: tourTitle
    };


    // resetting the form
    currObject.reset();
    // output
    // console.log(data);

    // let's store the data in the local storage
    localStorage.setItem(`order`, JSON.stringify(data));

    setIsSubmitting(false);
    navigate.push(`/checkout`);
  }


  return (
    <>
      {/*@ts-ignore*/}
      <CustomizedSnackbar open={open} handleClose={handleClose} label={toastLabel} severity={toastSeverity} />
      <form onSubmit={handleSubmit} className="description__tour-overview-sidebar__form">
        <div className="description__tour-overview-sidebar">
          <div onClick={closeSidebar}>
            <IconIon type={`closeOutline`} className="icon icon--close-sidebar"></IconIon>
          </div>

          <p className="description__tour-overview-sidebar__p flex">From <span>${price.children}</span></p>
          <div className="description__tour-overview-sidebar-wrapper">
            <SidebarPickDate />
            <SidebarPickTime time={time} />
          </div>
          <div className="description__tour-overview-sidebar__tickets grid">
            <h3
              className="tertiary-heading margin-top-sm description__tour-overview-sidebar__tickets-heading">Tickets</h3>
            <SidebarCountButton totalTickets={adultTickets} addTicket={handleAddTicket}
                                removeTicket={handleRemoveTicket}
                                name={`adultTickets`}
                                label={`Adult (18+)`} price={price.adult} />
            <SidebarCountButton totalTickets={youthTickets} addTicket={handleAddTicket}
                                removeTicket={handleRemoveTicket}
                                name={`youthTickets`}
                                label={`Youth (13-17+)`} price={price.youth} />
            <SidebarCountButton totalTickets={childrenTickets} addTicket={handleAddTicket}
                                removeTicket={handleRemoveTicket}
                                name={`childrenTickets`} label={`Children (1-12+)`} price={price.children} />
          </div>
          <div className="description__tour-overview-sidebar__tickets grid">
            <h3 className="tertiary-heading margin-top-sm description__tour-overview-sidebar__tickets-heading">Add
              Extra</h3>
            <div className="flex flex-column border-bottom">
              {/*<!--          // insert a checkbox input here, with the Add Service per booking text--> */}
              <SidebarCheckbox disabled={totalPrice === 0} onClick={toggleServicePerBooking}
                               name={`servicePerBooking`}
                               label={`Add Service per booking `}
                               servicePrice={priceForExtra.servicePerBooking}
              />
              <SidebarCheckbox disabled={youthTickets === 0 && adultTickets === 0 && childrenTickets === 0 ||
                youthTickets === 0 && adultTickets === 0 && childrenTickets > 0}
                               onClick={toggleServicePerPerson}
                               name={`servicePerPerson`}
                               label={`Add Service per person `}
                               servicePrice={priceForExtra.servicePerPerson}
              />

              <p className="paragraph paragraph--descr flex">Adult: <span>${priceForExtra.adult}</span> -
                Youth: <span>${priceForExtra.youth}</span>
              </p>
            </div>
            <div>
              <SidebarTotal total={Number(totalPrice.toFixed(2))} />
              <button className="btn btn--book-now" id="book-now-btn-sidebar">{isSubmitting ? `Loading...` : `Book Now`}
                <IconIon type={`arrowForwardOutline`} className="icon icon--right-arrow"></IconIon>
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
