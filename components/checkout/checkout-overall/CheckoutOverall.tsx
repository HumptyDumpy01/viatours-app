// 'use client';
import './CheckoutOverall.scss';
import { TourInterface } from '@/data/DUMMY_TOURS';
import { OrderInterface } from '@/components/checkout/checkout-details/CheckoutDetails';
import { CldImage } from 'next-cloudinary';

type CheckoutOverallType = {
  tour: TourInterface;
  order: OrderInterface;
  // children: ReactNode;
}

export default function CheckoutOverall({ tour, order }: CheckoutOverallType) {
  return (
    <>
      <div className="book-now__second-col-1">

        <div className="book-now__overall">
          <div className="book-now__overall__heading flex">
            <div className={`flex-align-center flex`}>
              <CldImage width={300} height={200} src={tour.images[0]} alt={tour.title}
                        className="book-now__overall__heading-img" />
              {/*<Image src={tour.images[0]} alt={tour.title}*/}
              {/*       className="book-now__overall__heading-img" />*/}
              <h3 className="book-now__overall__heading-text">{tour.title}</h3>
            </div>
            <span className="book-now__overall__heading-price inline-block">${order.totalPrice.toFixed(2)}</span>
          </div>
        </div>
        <div className="book-now__overall__details">
          <h3 className="book-now__overall__details-heading">Overall Details</h3>
          <h4 className="book-now__overall__details-heading__date-text">Date:</h4>
          <div className="book-now__overall__details-date flex flex-align-center gap-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M5.16739 1.66602C5.16739 1.53341 5.11471 1.40623 5.02094 1.31246C4.92717 1.21869 4.79999 1.16602 4.66739 1.16602C4.53478 1.16602 4.4076 1.21869 4.31383 1.31246C4.22006 1.40623 4.16739 1.53341 4.16739 1.66602V2.71935C3.20739 2.79602 2.57805 2.98402 2.11539 3.44735C1.65205 3.91002 1.46405 4.54002 1.38672 5.49935H14.6147C14.5374 4.53935 14.3494 3.91002 13.8861 3.44735C13.4234 2.98402 12.7934 2.79602 11.8341 2.71868V1.66602C11.8341 1.53341 11.7814 1.40623 11.6876 1.31246C11.5938 1.21869 11.4667 1.16602 11.3341 1.16602C11.2014 1.16602 11.0743 1.21869 10.9805 1.31246C10.8867 1.40623 10.8341 1.53341 10.8341 1.66602V2.67468C10.3907 2.66602 9.89338 2.66602 9.33405 2.66602H6.66739C6.10805 2.66602 5.61072 2.66602 5.16739 2.67468V1.66602Z"
                fill="#EB662B" />
              <path fillRule="evenodd" clipRule="evenodd"
                    d="M1.33301 7.99951C1.33301 7.44018 1.33301 6.94285 1.34167 6.49951H14.6577C14.6663 6.94285 14.6663 7.44018 14.6663 7.99951V9.33284C14.6663 11.8468 14.6663 13.1042 13.885 13.8848C13.1043 14.6662 11.847 14.6662 9.33301 14.6662H6.66634C4.15234 14.6662 2.89501 14.6662 2.11434 13.8848C1.33301 13.1042 1.33301 11.8468 1.33301 9.33284V7.99951ZM11.333 9.33284C11.5098 9.33284 11.6794 9.26261 11.8044 9.13758C11.9294 9.01256 11.9997 8.84299 11.9997 8.66618C11.9997 8.48937 11.9294 8.3198 11.8044 8.19477C11.6794 8.06975 11.5098 7.99951 11.333 7.99951C11.1562 7.99951 10.9866 8.06975 10.8616 8.19477C10.7366 8.3198 10.6663 8.48937 10.6663 8.66618C10.6663 8.84299 10.7366 9.01256 10.8616 9.13758C10.9866 9.26261 11.1562 9.33284 11.333 9.33284ZM11.333 11.9995C11.5098 11.9995 11.6794 11.9293 11.8044 11.8042C11.9294 11.6792 11.9997 11.5097 11.9997 11.3328C11.9997 11.156 11.9294 10.9865 11.8044 10.8614C11.6794 10.7364 11.5098 10.6662 11.333 10.6662C11.1562 10.6662 10.9866 10.7364 10.8616 10.8614C10.7366 10.9865 10.6663 11.156 10.6663 11.3328C10.6663 11.5097 10.7366 11.6792 10.8616 11.8042C10.9866 11.9293 11.1562 11.9995 11.333 11.9995ZM8.66634 8.66618C8.66634 8.84299 8.5961 9.01256 8.47108 9.13758C8.34605 9.26261 8.17649 9.33284 7.99967 9.33284C7.82286 9.33284 7.65329 9.26261 7.52827 9.13758C7.40325 9.01256 7.33301 8.84299 7.33301 8.66618C7.33301 8.48937 7.40325 8.3198 7.52827 8.19477C7.65329 8.06975 7.82286 7.99951 7.99967 7.99951C8.17649 7.99951 8.34605 8.06975 8.47108 8.19477C8.5961 8.3198 8.66634 8.48937 8.66634 8.66618ZM8.66634 11.3328C8.66634 11.5097 8.5961 11.6792 8.47108 11.8042C8.34605 11.9293 8.17649 11.9995 7.99967 11.9995C7.82286 11.9995 7.65329 11.9293 7.52827 11.8042C7.40325 11.6792 7.33301 11.5097 7.33301 11.3328C7.33301 11.156 7.40325 10.9865 7.52827 10.8614C7.65329 10.7364 7.82286 10.6662 7.99967 10.6662C8.17649 10.6662 8.34605 10.7364 8.47108 10.8614C8.5961 10.9865 8.66634 11.156 8.66634 11.3328ZM4.66634 9.33284C4.84315 9.33284 5.01272 9.26261 5.13775 9.13758C5.26277 9.01256 5.33301 8.84299 5.33301 8.66618C5.33301 8.48937 5.26277 8.3198 5.13775 8.19477C5.01272 8.06975 4.84315 7.99951 4.66634 7.99951C4.48953 7.99951 4.31996 8.06975 4.19494 8.19477C4.06991 8.3198 3.99967 8.48937 3.99967 8.66618C3.99967 8.84299 4.06991 9.01256 4.19494 9.13758C4.31996 9.26261 4.48953 9.33284 4.66634 9.33284ZM4.66634 11.9995C4.84315 11.9995 5.01272 11.9293 5.13775 11.8042C5.26277 11.6792 5.33301 11.5097 5.33301 11.3328C5.33301 11.156 5.26277 10.9865 5.13775 10.8614C5.01272 10.7364 4.84315 10.6662 4.66634 10.6662C4.48953 10.6662 4.31996 10.7364 4.19494 10.8614C4.06991 10.9865 3.99967 11.156 3.99967 11.3328C3.99967 11.5097 4.06991 11.6792 4.19494 11.8042C4.31996 11.9293 4.48953 11.9995 4.66634 11.9995Z"
                    fill="#EB662B" />
            </svg>
            <p className="book-now__overall__details-date-text">{order.date}, {order.time}</p>
          </div>

          <h3 className="book-now__details-2__activity-details__card-date-tickets">Amount of tickets: <span
            className="inline-block overall-tickets font-weight-bold">
            {Number(order.adultTickets) + Number(order.youthTickets) + Number(order.childrenTickets)}
          </span></h3>
          <div className="book-now__details-2__activity-details__card-date-adult margin-bottom-7px">
            <div className="flex flex-align-center gap-7px">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 16 12" fill="none">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M12.4051 2.53167C13.0697 2.53167 13.6086 2.00112 13.6086 1.34665C13.6086 0.692175 13.0697 0.161621 12.4051 0.161621C11.7404 0.161621 11.2016 0.692175 11.2016 1.34665C11.2016 2.00112 11.7404 2.53167 12.4051 2.53167ZM9.95548 6.74986L10.9522 4.39297V5.20416V8.06347V11.3437C10.9522 11.6082 11.1763 11.8246 11.4502 11.8246C11.7241 11.8246 11.9482 11.6082 11.9482 11.3437V8.06347H12.8903V11.3437C12.8903 11.6082 13.1144 11.8246 13.3883 11.8246C13.6622 11.8246 13.8863 11.6082 13.8863 11.3437V8.06347V5.20416V4.55599L14.858 6.75763C14.9803 7.03455 15.3075 7.16153 15.5888 7.04122C15.8702 6.92091 15.9992 6.59886 15.8769 6.32194L14.6741 3.59668C14.5349 3.28134 14.2188 3.07735 13.8696 3.07735H12.1003H11.3386H10.8902C10.536 3.07735 10.2166 3.28707 10.0805 3.60893L8.9299 6.32971C8.81199 6.60845 8.94604 6.92849 9.22925 7.0445C9.51245 7.16054 9.83761 7.02861 9.95548 6.74986ZM1.0512 6.3921L2.03675 4.47479V6.10687L1.08943 8.5051C0.979829 8.7826 1.1878 9.08179 1.49029 9.08179H2.03675V11.3195C2.03675 11.605 2.26522 11.8385 2.54444 11.8385C2.82366 11.8385 3.05213 11.605 3.05213 11.3195V9.08179H3.98285V11.3195C3.98285 11.605 4.21132 11.8385 4.49056 11.8385C4.76977 11.8385 4.99824 11.605 4.99824 11.3195V9.08179H5.64842C5.95758 9.08179 6.16576 8.77036 6.04338 8.49092L4.99913 6.10687H4.99824V4.47297L5.98472 6.3921C6.12321 6.66155 6.45737 6.76943 6.7311 6.63312C7.00482 6.49685 7.11447 6.16792 6.97598 5.89851L5.79931 3.60936C5.63153 3.28298 5.29152 3.07724 4.91993 3.07724H3.27224H2.49476H2.11602C1.7444 3.07724 1.40439 3.28298 1.23663 3.60936L0.0599418 5.89851C-0.0785464 6.16792 0.0310882 6.49685 0.304817 6.63312C0.578542 6.76943 0.912708 6.66155 1.0512 6.3921ZM3.51793 2.53167C4.18259 2.53167 4.72141 2.00112 4.72141 1.34665C4.72141 0.692175 4.18259 0.161621 3.51793 0.161621C2.85328 0.161621 2.31446 0.692175 2.31446 1.34665C2.31446 2.00112 2.85328 2.53167 3.51793 2.53167Z"
                      fill="#EB662B" />
              </svg>
              <p className="color-blue-lighter font-weight-med">Adult: <span
                className="inline-block font-weight-med">{order.adultTickets}</span>
              </p>
            </div>
          </div>

          <div className="book-now__details-2__activity-details__card-date-youth margin-bottom-7px">
            <div className="flex flex-align-center gap-7px">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 14 14" fill="none">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M11.6667 0.390888C11.6667 0.280648 11.5406 0.208051 11.4313 0.255499L10.1852 0.796262L8.93917 0.255499C8.82991 0.208051 8.70377 0.280648 8.70377 0.390888V1.20164C8.70377 1.31193 8.82991 1.38447 8.93917 1.33708L10.1852 0.796262L11.4313 1.33708C11.5406 1.38447 11.6667 1.31193 11.6667 1.20164V0.390888ZM11.6668 2.83331C11.6668 3.28724 11.4626 3.69346 11.1411 3.96524C11.6518 4.06542 12.0371 4.51546 12.0371 5.05553V5.46249L13.2042 6.92142C13.2334 6.9562 13.2577 6.99398 13.2771 7.03375C13.3508 7.1842 13.3512 7.35849 13.2839 7.50731C13.2659 7.54716 13.2429 7.5852 13.2153 7.62046L12.1112 9.09257C12.0428 9.18368 11.9519 9.24786 11.8519 9.28308V9.28838L12.5927 10.9815H11.8519V13.2037C11.8519 13.5105 11.6032 13.7592 11.2964 13.7592C10.9896 13.7592 10.7408 13.5105 10.7408 13.2037V10.9815H9.62973V13.2037C9.62973 13.5105 9.38099 13.7592 9.07417 13.7592C8.76736 13.7592 8.51862 13.5105 8.51862 13.2037V10.9815H7.77784L8.51862 9.28831V9.28308C8.41866 9.24786 8.32769 9.18371 8.25936 9.09257L7.15536 7.62057C7.12736 7.58494 7.10421 7.54642 7.08606 7.50605C7.0191 7.35712 7.01995 7.18283 7.09406 7.03253C7.11332 6.99323 7.13743 6.95594 7.16618 6.92157L8.33343 5.46249V5.05553C8.33343 4.51546 8.71873 4.06542 9.22943 3.96524C8.90791 3.69346 8.7038 3.28724 8.7038 2.83331C8.7038 2.01513 9.36706 1.35183 10.1853 1.35183C11.0035 1.35183 11.6668 2.01513 11.6668 2.83331ZM11.4751 8.0889L12.0752 7.28872L11.8519 7.00968V7.4499L11.4613 7.18949C11.3583 7.12079 11.2964 7.00516 11.2964 6.88131V4.68516H10.926V4.11661C10.7081 4.24264 10.4551 4.31479 10.1853 4.31479C9.91543 4.31479 9.66243 4.24264 9.44454 4.11661V4.68516H9.07417V6.88131C9.07417 7.00516 9.01228 7.12079 8.90925 7.18949L8.51862 7.4499V7.00964L8.29536 7.28872L8.89551 8.0889L9.32014 7.80583C9.62925 7.59975 9.81491 7.25283 9.81491 6.88131V4.68516H10.5557V4.87035V6.88131C10.5557 7.25283 10.7413 7.59975 11.0504 7.80583L11.4751 8.0889Z"
                      fill="#EB662B" />
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M4.62966 2.83353C4.62966 3.28746 4.42552 3.69368 4.104 3.96546C4.6147 4.06564 5.00003 4.51568 5.00003 5.05575V5.46271L6.16714 6.92164C6.19625 6.95642 6.22059 6.99419 6.24 7.03397C6.3137 7.18442 6.31414 7.35871 6.24681 7.50753C6.22877 7.54738 6.20585 7.58542 6.17818 7.62068L5.07411 9.09278C5.00574 9.1839 4.91477 9.24808 4.81485 9.2833V13.2039C4.81485 13.5107 4.56611 13.7594 4.25929 13.7594C3.95248 13.7594 3.70374 13.5107 3.70374 13.2039V10.2409H2.59263V13.2039C2.59263 13.5107 2.34389 13.7594 2.03707 13.7594C1.73026 13.7594 1.48152 13.5107 1.48152 13.2039V9.2833C1.38157 9.24808 1.2906 9.18393 1.22224 9.09278L0.118256 7.62079C0.0902521 7.58516 0.0671187 7.54664 0.0489668 7.50627C-0.0179998 7.35734 -0.0171664 7.18305 0.0569447 7.03275C0.0762261 6.99345 0.100319 6.95616 0.129078 6.92179L1.29632 5.46271V5.05575C1.29632 4.51568 1.68163 4.06564 2.19233 3.96546C1.87081 3.69368 1.6667 3.28746 1.6667 2.83353C1.6667 2.01535 2.32996 1.35205 3.14818 1.35205C3.96637 1.35205 4.62966 2.01535 4.62966 2.83353ZM4.43796 8.08912L5.03807 7.28893L4.81485 7.0099V7.45012L4.42422 7.18971C4.32118 7.12101 4.25929 7.00538 4.25929 6.88153V4.68538H3.88892V4.11683C3.671 4.24286 3.418 4.31501 3.14818 4.31501C2.87833 4.31501 2.62533 4.24286 2.40744 4.11683V4.68538H2.03707V6.88153C2.03707 7.00538 1.97518 7.12101 1.87215 7.18971L1.48152 7.45012V7.00986L1.25825 7.28893L1.85841 8.08912L2.28304 7.80605C2.59215 7.59997 2.77781 7.25305 2.77781 6.88153V4.68538H3.51855V4.87057V6.88153C3.51855 7.25305 3.70422 7.59997 4.01333 7.80605L4.43796 8.08912Z"
                      fill="#EB662B" />
              </svg>
              <p className="color-blue-lighter font-weight-med">Youth: <span
                className="inline-block font-weight-med">{order.youthTickets}</span>
              </p>
            </div>
          </div>

          <div className="book-now__details-2__activity-details__card-date-children margin-bottom-15px">
            <div className="flex flex-align-center gap-7px">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 14 12" fill="none">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M3.08137 4.41146C3.82589 4.41146 4.42943 3.80791 4.42943 3.0634C4.42943 2.31888 3.82589 1.71533 3.08137 1.71533C2.33685 1.71533 1.7333 2.31888 1.7333 3.0634C1.7333 3.80791 2.33685 4.41146 3.08137 4.41146ZM2.11847 4.98921C1.92527 4.98921 1.7449 5.08577 1.63774 5.24646L0.0970907 7.55743C-0.0798987 7.82292 -0.00815856 8.18162 0.257329 8.35864C0.522817 8.53562 0.881522 8.46386 1.05851 8.19841L1.54072 7.47512V10.9592C1.54072 11.2783 1.79936 11.537 2.11847 11.537C2.43753 11.537 2.69621 11.2783 2.69621 10.9592V9.0334H3.46653V10.9592C3.46653 11.2783 3.72517 11.537 4.04427 11.537C4.36334 11.537 4.62202 11.2783 4.62202 10.9592V7.47512L5.1042 8.19841C5.28118 8.46386 5.63988 8.53562 5.90537 8.35864C6.17087 8.18162 6.24262 7.82292 6.0656 7.55743L4.52495 5.24646C4.4178 5.08577 4.23743 4.98921 4.04427 4.98921H2.11847Z"
                      fill="#EB662B" />
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M11.5546 0.619561C11.5546 0.504898 11.4234 0.429403 11.3098 0.478746L10.014 1.04112L8.7181 0.478746C8.60452 0.429403 8.47333 0.504898 8.47333 0.619561V1.46268C8.47333 1.57738 8.60452 1.6528 8.7181 1.60353L10.014 1.04112L11.3098 1.60353C11.4234 1.6528 11.5546 1.57738 11.5546 1.46268V0.619561ZM10.014 4.41128C10.7585 4.41128 11.362 3.80774 11.362 3.06322C11.362 2.3187 10.7585 1.71515 10.014 1.71515C9.26946 1.71515 8.66591 2.3187 8.66591 3.06322C8.66591 3.80774 9.26946 4.41128 10.014 4.41128ZM9.05108 4.98903C8.85788 4.98903 8.67751 5.08559 8.57036 5.24628L7.02971 7.55725C6.85273 7.82274 6.92444 8.18144 7.18994 8.35846C7.45543 8.53544 7.81413 8.46369 7.99111 8.19823L8.47333 7.47494V8.16661L7.70301 9.70726H8.47333V10.959C8.47333 11.2781 8.73197 11.5368 9.05108 11.5368C9.37014 11.5368 9.62882 11.2781 9.62882 10.959V9.70726H10.3991V10.959C10.3991 11.2781 10.6578 11.5368 10.9769 11.5368C11.296 11.5368 11.5546 11.2781 11.5546 10.959V9.70726H12.3249L11.5546 8.16661V7.47494L12.0368 8.19823C12.2138 8.46369 12.5725 8.53544 12.838 8.35846C13.1035 8.18144 13.1752 7.82274 12.9982 7.55725L11.4576 5.24628C11.3504 5.08559 11.17 4.98903 10.9769 4.98903H9.05108Z"
                      fill="#EB662B" />
              </svg>
              <p className="color-blue-lighter font-weight-med">Children: <span
                className="inline-block font-weight-med">{order.childrenTickets}</span>
              </p>
            </div>
          </div>
          <div className="grid book-now__overall__details-promo">
            <label>
              <input type="text" className="book-now__details__input book-now__overall__details-promo__input"
                     placeholder="Add Promo Code" />
            </label>
            <button type="button" className="book-now__overall__details-promo__btn">Apply</button>
          </div>
          <div className="book-now__overall__details-total-container flex flex-align-center flex-space-between">
            <h3 className="book-now__overall__details-total">Total Price</h3>
            <span className="inline-block book-now__overall__details-total-price">${order.totalPrice.toFixed(2)}$</span>
          </div>
        </div>
      </div>
    </>
  );
}
