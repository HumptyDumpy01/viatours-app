// 'use client';

import { UserOrdersType } from '@/components/account-settings/AccountSettingsContainer';
import { formatDate } from '@/lib/helpers/formatDate';
import { motion } from 'framer-motion';
import loadingSpinner from '@/animations/loading-spinner.json';
import React, { useState } from 'react';
import Lottie from 'lottie-react';


type UserOrderCardBackType = {
  handleOpenCard: (openCard: boolean) => void;
  order: UserOrdersType;
  isSubmittingReqCancel: boolean;
  userRequestedCancellation: boolean;
  handleSubmitCancellationReq: () => void;

  isSubmittingReqRefund: boolean;
  userRequestedRefund: boolean;
  handleSubmitRefundReq: () => void;

  // children: ReactNode;
}

export default function
  UserOrderCardBack({
                      handleOpenCard,
                      order,
                      userRequestedCancellation,
                      isSubmittingReqCancel,
                      handleSubmitCancellationReq, handleSubmitRefundReq, userRequestedRefund, isSubmittingReqRefund
                    }: UserOrderCardBackType) {
  const [copyLabel, setCopyLabel] = useState<string>(`Copy`);

  function copyOrderId() {
    // get access to the clipboard and copy the  text you want to copy
    navigator.clipboard.writeText(order._id);
    // set the copied text to the state
    setCopyLabel(`Copied!`);
    // set the copied text back to the original text after 3 seconds
    setTimeout(() => {
      setCopyLabel(`Copy`);
    }, 3000);
  }

  function submitCancellationReq() {
    handleSubmitCancellationReq();
  }

  return (
    <motion.div
      initial={{ scale: .8, y: -400 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ y: -400, scale: .8 }}
      transition={{ type: `spring`, stiffness: 100, damping: 20 }}
      className={`tour-purchases__card-details-1--back`}>
      <motion.svg
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleOpenCard(false)} className="tour-purchases__card-details-1--back-icon-go-back"
        xmlns="http://www.w3.org/2000/svg"
        width="26" height="20" viewBox="0 0 26 20" fill="none">
        <path fillRule="evenodd" clipRule="evenodd"
              d="M0.357831 0.958068C0.465135 0.699263 0.646769 0.478086 0.879766 0.322502C1.11276 0.166918 1.38666 0.0839139 1.66683 0.0839844H15.8335C17.1358 0.0839844 18.4253 0.340486 19.6284 0.838846C20.8316 1.3372 21.9248 2.06766 22.8456 2.98851C23.7665 3.90936 24.4969 5.00256 24.9953 6.20571C25.4937 7.40885 25.7502 8.69838 25.7502 10.0007C25.7502 11.3029 25.4937 12.5925 24.9953 13.7956C24.4969 14.9987 23.7665 16.0919 22.8456 17.0128C21.9248 17.9336 20.8316 18.6641 19.6284 19.1625C18.4253 19.6608 17.1358 19.9173 15.8335 19.9173H3.0835C2.70777 19.9173 2.34744 19.7681 2.08176 19.5024C1.81609 19.2367 1.66683 18.8764 1.66683 18.5007C1.66683 18.1249 1.81609 17.7646 2.08176 17.4989C2.34744 17.2332 2.70777 17.084 3.0835 17.084H15.8335C17.7121 17.084 19.5138 16.3377 20.8422 15.0093C22.1706 13.6809 22.9168 11.8793 22.9168 10.0007C22.9168 8.12203 22.1706 6.32036 20.8422 4.99198C19.5138 3.6636 17.7121 2.91732 15.8335 2.91732H5.08666L7.62675 5.4574C7.8848 5.72459 8.0276 6.08244 8.02437 6.45389C8.02114 6.82533 7.87215 7.18065 7.60949 7.44331C7.34683 7.70597 6.99151 7.85496 6.62007 7.85819C6.24862 7.86142 5.89077 7.71863 5.62358 7.46057L0.665247 2.50223C0.46701 2.30412 0.331988 2.05166 0.277267 1.77679C0.222545 1.50192 0.250582 1.217 0.357831 0.958068Z"
              fill="white" />
      </motion.svg>
      <div className="tour-purchases__card-details-1__date flex flex-align-center">
        <p className="tour-purchases__card-details-1__date-value uppercase">01</p>
        {/*<div class="text-align-center">*/}
        {/*  <p class="tour-purchases__card-details-2__status-title responsive uppercase">Status</p>*/}
        {/*  <p class="tour-purchases__card-details-2__status-info responsive-info uppercase status-state">*/}
        {/*    Booked</p>*/}
        {/*  <p class="tour-purchases__card-details-2__status-title responsive uppercase">Order</p>*/}
        {/*  <p class="tour-purchases__card-details-2__status-info responsive-info uppercase">4VEBDJB13</p>*/}
        {/*</div>*/}
      </div>
      <div className="tour-purchases__card-details-1__amount-of-tickets  flex gap-sm flex-align-center">
        <p
          className="tour-purchases__card-details-1__amount-of-tickets-title responsive-amount-of-tickets">Amount
          of tickets:</p>
        <p
          className="tour-purchases__card-details-1__amount-of-tickets-count responsive-amount-of-tickets">{order.tickets.overall}</p>
      </div>
      <div className="grid grid-responsive">

        <div className="tour-purchases__card-details-1__tickets">
          <div className="tour-purchases__card-details-1__tickets-adult flex gap-sm flex-align-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 16 12" fill="none">
              <path fillRule="evenodd" clipRule="evenodd"
                    d="M12.4051 2.53167C13.0697 2.53167 13.6086 2.00112 13.6086 1.34665C13.6086 0.692175 13.0697 0.161621 12.4051 0.161621C11.7404 0.161621 11.2016 0.692175 11.2016 1.34665C11.2016 2.00112 11.7404 2.53167 12.4051 2.53167ZM9.95548 6.74986L10.9522 4.39297V5.20416V8.06347V11.3437C10.9522 11.6082 11.1763 11.8246 11.4502 11.8246C11.7241 11.8246 11.9482 11.6082 11.9482 11.3437V8.06347H12.8903V11.3437C12.8903 11.6082 13.1144 11.8246 13.3883 11.8246C13.6622 11.8246 13.8863 11.6082 13.8863 11.3437V8.06347V5.20416V4.55599L14.858 6.75763C14.9803 7.03455 15.3075 7.16153 15.5888 7.04122C15.8702 6.92091 15.9992 6.59886 15.8769 6.32194L14.6741 3.59668C14.5349 3.28134 14.2188 3.07735 13.8696 3.07735H12.1003H11.3386H10.8902C10.536 3.07735 10.2166 3.28707 10.0805 3.60893L8.9299 6.32971C8.81199 6.60845 8.94604 6.92849 9.22925 7.0445C9.51245 7.16054 9.83761 7.02861 9.95548 6.74986ZM1.0512 6.3921L2.03675 4.47479V6.10687L1.08943 8.5051C0.979829 8.7826 1.1878 9.08179 1.49029 9.08179H2.03675V11.3195C2.03675 11.605 2.26522 11.8385 2.54444 11.8385C2.82366 11.8385 3.05213 11.605 3.05213 11.3195V9.08179H3.98285V11.3195C3.98285 11.605 4.21132 11.8385 4.49056 11.8385C4.76977 11.8385 4.99824 11.605 4.99824 11.3195V9.08179H5.64842C5.95758 9.08179 6.16576 8.77036 6.04338 8.49092L4.99913 6.10687H4.99824V4.47297L5.98472 6.3921C6.12321 6.66155 6.45737 6.76943 6.7311 6.63312C7.00482 6.49685 7.11447 6.16792 6.97598 5.89851L5.79931 3.60936C5.63153 3.28298 5.29152 3.07724 4.91993 3.07724H3.27224H2.49476H2.11602C1.7444 3.07724 1.40439 3.28298 1.23663 3.60936L0.0599418 5.89851C-0.0785464 6.16792 0.0310882 6.49685 0.304817 6.63312C0.578542 6.76943 0.912708 6.66155 1.0512 6.3921ZM3.51793 2.53167C4.18259 2.53167 4.72141 2.00112 4.72141 1.34665C4.72141 0.692175 4.18259 0.161621 3.51793 0.161621C2.85328 0.161621 2.31446 0.692175 2.31446 1.34665C2.31446 2.00112 2.85328 2.53167 3.51793 2.53167Z"
                    fill="#EB662B" />
            </svg>
            <p className="tour-purchases__card-details-1__tickets-adult-title">Adult:</p>
            <p className="tour-purchases__card-details-1__tickets-adult-count">{order.tickets.adultTickets}</p>
          </div>
        </div>
        <div className="tour-purchases__card-details-1__tickets">
          <div className="tour-purchases__card-details-1__tickets-youth flex gap-sm flex-align-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 14 14" fill="none">
              <path fillRule="evenodd" clipRule="evenodd"
                    d="M4.62966 2.59281C4.62966 3.04673 4.42552 3.45296 4.104 3.72473C4.6147 3.82492 5.00003 4.27496 5.00003 4.81503V5.22199L6.16714 6.68092C6.19625 6.71569 6.22059 6.75347 6.24 6.79325C6.3137 6.94369 6.31414 7.11799 6.24681 7.2668C6.22877 7.30666 6.20585 7.34469 6.17818 7.37995L5.07411 8.85206C5.00574 8.94317 4.91477 9.00736 4.81485 9.04258V12.9632C4.81485 13.27 4.56611 13.5187 4.25929 13.5187C3.95248 13.5187 3.70374 13.27 3.70374 12.9632V10.0002H2.59263V12.9632C2.59263 13.27 2.34389 13.5187 2.03707 13.5187C1.73026 13.5187 1.48152 13.27 1.48152 12.9632V9.04258C1.38157 9.00736 1.2906 8.94321 1.22224 8.85206L0.118256 7.38006C0.0902521 7.34443 0.0671187 7.30592 0.0489668 7.26554C-0.0179998 7.11662 -0.0171664 6.94232 0.0569447 6.79203C0.0762261 6.75273 0.100319 6.71543 0.129078 6.68106L1.29632 5.22199V4.81503C1.29632 4.27496 1.68163 3.82492 2.19233 3.72473C1.87081 3.45296 1.6667 3.04673 1.6667 2.59281C1.6667 1.77462 2.32996 1.11133 3.14818 1.11133C3.96637 1.11133 4.62966 1.77462 4.62966 2.59281ZM4.43796 7.8484L5.03807 7.04821L4.81485 6.76918V7.2094L4.42422 6.94899C4.32118 6.88029 4.25929 6.76466 4.25929 6.6408V4.44466H3.88892V3.8761C3.671 4.00214 3.418 4.07429 3.14818 4.07429C2.87833 4.07429 2.62533 4.00214 2.40744 3.8761V4.44466H2.03707V6.6408C2.03707 6.76466 1.97518 6.88029 1.87215 6.94899L1.48152 7.2094V6.76914L1.25825 7.04821L1.85841 7.8484L2.28304 7.56532C2.59215 7.35925 2.77781 7.01232 2.77781 6.6408V4.44466H3.51855V6.6408C3.51855 7.01232 3.70422 7.35925 4.01333 7.56532L4.43796 7.8484Z"
                    fill="#EB662B" />
              <path fillRule="evenodd" clipRule="evenodd"
                    d="M11.6667 0.150166C11.6667 0.0399249 11.5406 -0.0326713 11.4313 0.0147768L10.1852 0.555539L8.93917 0.0147768C8.82991 -0.0326713 8.70377 0.0399249 8.70377 0.150166V0.960913C8.70377 1.07121 8.82991 1.14375 8.93917 1.09635L10.1852 0.555539L11.4313 1.09635C11.5406 1.14375 11.6667 1.07121 11.6667 0.960913V0.150166ZM11.6668 2.59259C11.6668 3.04651 11.4626 3.45274 11.1411 3.72451C11.6518 3.8247 12.0371 4.27474 12.0371 4.81481V5.22177L13.2042 6.6807C13.2334 6.71548 13.2577 6.75325 13.2771 6.79303C13.3508 6.94347 13.3512 7.11777 13.2839 7.26659C13.2659 7.30644 13.2429 7.34447 13.2153 7.37973L12.1112 8.85184C12.0428 8.94295 11.9519 9.00714 11.8519 9.04236V9.04766L12.5927 10.7407H11.8519V12.9629C11.8519 13.2698 11.6032 13.5185 11.2964 13.5185C10.9896 13.5185 10.7408 13.2698 10.7408 12.9629V10.7407H9.62973V12.9629C9.62973 13.2698 9.38099 13.5185 9.07417 13.5185C8.76736 13.5185 8.51862 13.2698 8.51862 12.9629V10.7407H7.77784L8.51862 9.04758V9.04236C8.41866 9.00714 8.32769 8.94299 8.25936 8.85184L7.15536 7.37984C7.12736 7.34421 7.10421 7.3057 7.08606 7.26533C7.0191 7.1164 7.01995 6.9421 7.09406 6.79181C7.11332 6.75251 7.13743 6.71522 7.16617 6.68084L8.33343 5.22177V4.81481C8.33343 4.27474 8.71873 3.8247 9.22943 3.72451C8.90791 3.45274 8.7038 3.04651 8.7038 2.59259C8.7038 1.7744 9.36706 1.11111 10.1853 1.11111C11.0035 1.11111 11.6668 1.7744 11.6668 2.59259ZM11.4751 7.84818L12.0752 7.04799L11.8519 6.76896V7.20918L11.4613 6.94877C11.3583 6.88007 11.2964 6.76444 11.2964 6.64059V4.44444H10.926V3.87588C10.7081 4.00192 10.4551 4.07407 10.1853 4.07407C9.91543 4.07407 9.66243 4.00192 9.44454 3.87588V4.44444H9.07417V6.64059C9.07417 6.76444 9.01228 6.88007 8.90925 6.94877L8.51862 7.20918V6.76892L8.29536 7.04799L8.89551 7.84818L9.32014 7.5651C9.62925 7.35903 9.81491 7.0121 9.81491 6.64059V4.44444H10.5557V6.64059C10.5557 7.0121 10.7413 7.35903 11.0504 7.5651L11.4751 7.84818Z"
                    fill="#EB662B" />
            </svg>
            <p className="tour-purchases__card-details-1__tickets-adult-title">Youth:</p>
            <p className="tour-purchases__card-details-1__tickets-adult-count">{order.tickets.youthTickets}</p>
          </div>
        </div>
        <div className="tour-purchases__card-details-1__tickets">
          <div className="tour-purchases__card-details-1__tickets-child flex gap-sm flex-align-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 14 12" fill="none">
              <path fillRule="evenodd" clipRule="evenodd"
                    d="M11.5546 0.156182C11.5546 0.0415194 11.4234 -0.0339764 11.3098 0.0153667L10.014 0.577741L8.7181 0.0153667C8.60452 -0.0339764 8.47333 0.0415194 8.47333 0.156182V0.9993C8.47333 1.114 8.60452 1.18942 8.7181 1.14015L10.014 0.577741L11.3098 1.14015C11.4234 1.18942 11.5546 1.114 11.5546 0.9993V0.156182ZM10.014 3.94791C10.7585 3.94791 11.362 3.34436 11.362 2.59984C11.362 1.85532 10.7585 1.25177 10.014 1.25177C9.26946 1.25177 8.66591 1.85532 8.66591 2.59984C8.66591 3.34436 9.26946 3.94791 10.014 3.94791ZM9.05108 4.52565C8.85788 4.52565 8.67751 4.62221 8.57036 4.7829L7.02971 7.09387C6.85273 7.35936 6.92444 7.71806 7.18994 7.89508C7.45543 8.07206 7.81413 8.00031 7.99111 7.73485L8.47333 7.01156V7.70323L7.70301 9.24388H8.47333V10.4957C8.47333 10.8147 8.73197 11.0734 9.05108 11.0734C9.37014 11.0734 9.62882 10.8147 9.62882 10.4957V9.24388H10.3991V10.4957C10.3991 10.8147 10.6578 11.0734 10.9769 11.0734C11.296 11.0734 11.5546 10.8147 11.5546 10.4957V9.24388H12.3249L11.5546 7.70323V7.01156L12.0368 7.73485C12.2138 8.00031 12.5725 8.07206 12.838 7.89508C13.1035 7.71806 13.1752 7.35936 12.9982 7.09387L11.4576 4.7829C11.3504 4.62221 11.17 4.52565 10.9769 4.52565H9.05108Z"
                    fill="#EB662B" />
              <path fillRule="evenodd" clipRule="evenodd"
                    d="M3.08137 3.94808C3.82589 3.94808 4.42943 3.34454 4.42943 2.60002C4.42943 1.8555 3.82589 1.25195 3.08137 1.25195C2.33685 1.25195 1.7333 1.8555 1.7333 2.60002C1.7333 3.34454 2.33685 3.94808 3.08137 3.94808ZM2.11847 4.52583C1.92527 4.52583 1.7449 4.62239 1.63774 4.78308L0.0970907 7.09405C-0.0798987 7.35954 -0.00815856 7.71824 0.257329 7.89526C0.522817 8.07224 0.881522 8.00048 1.05851 7.73503L1.54072 7.01174V10.4958C1.54072 10.8149 1.79936 11.0736 2.11847 11.0736C2.43753 11.0736 2.69621 10.8149 2.69621 10.4958V8.57002H3.46653V10.4958C3.46653 10.8149 3.72517 11.0736 4.04427 11.0736C4.36334 11.0736 4.62202 10.8149 4.62202 10.4958V7.01174L5.1042 7.73503C5.28118 8.00048 5.63988 8.07224 5.90537 7.89526C6.17087 7.71824 6.24262 7.35954 6.0656 7.09405L4.52495 4.78308C4.4178 4.62239 4.23743 4.52583 4.04427 4.52583H2.11847Z"
                    fill="#EB662B" />
            </svg>
            <p className="tour-purchases__card-details-1__tickets-adult-title">Children</p>
            <p
              className="tour-purchases__card-details-1__tickets-adult-count">{order.tickets.childrenTickets}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-direction-column margin-top-3rem date-responsive">
        <div className={`flex`}>
          <p className="tour-purchases__card-details-1__date-title">Date:&nbsp;</p>
          <p
            className="tour-purchases__card-details-1__date-info">{formatDate(order.extraDetails.createdAt).slice(0, 24) + `...`}</p>
        </div>
        <div className={`flex margin-top-normal`}>
          <p className="tour-purchases__card-details-1__date-title">Order ID:&nbsp;</p>
          <p
            className="tour-purchases__card-details-1__date-info">{order._id.slice(0, 6) + `...`}</p>
          <motion.p
            onClick={copyOrderId}
            className={`tour-purchases__card-details-1__date-copy`}>{copyLabel}
          </motion.p>
        </div>
      </div>

      <div className={`flex flex-direction-column margin-top-normal`}>
        <div className={`flex gap-15px justify-items-center`}>
          <motion.button
            disabled={isSubmittingReqRefund || userRequestedRefund}
            onClick={order.extraDetails.refund.available ? handleSubmitRefundReq : undefined}
            whileHover={{ scale: 1.2, rotate: 5, backfaceVisibility: `hidden` }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 500 }}
            className={`tour-purchases__card-details-1__btns-request-a-refund
               ${(!order.extraDetails.refund.available || isSubmittingReqRefund || userRequestedRefund)
              ? `disabled-card-details-btn` : ``}`}>
            {userRequestedRefund ? `Refund Requested` : `Request a Refund`}

          </motion.button>
          {isSubmittingReqRefund && (
            <div className={`loading-spinner-pending-request`}>
              <Lottie animationData={loadingSpinner} />
            </div>
          )}
        </div>
        <div className="tour-purchases__card-details-1__btns grid">
          <motion.button
            disabled={isSubmittingReqCancel || userRequestedCancellation}
            onClick={order.extraDetails.cancellation.available ? submitCancellationReq : undefined}
            whileHover={{ scale: 1.2, rotate: 5, backfaceVisibility: `hidden` }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 500 }}
            className={`tour-purchases__card-details-1__btns-cancel
               ${(!order.extraDetails.cancellation.available || isSubmittingReqCancel || userRequestedCancellation) ? `disabled-card-details-btn` : ``}`}>
            {userRequestedCancellation ? `Cancellation Requested` : `Cancel`}
          </motion.button>
          {isSubmittingReqCancel && (
            <div className={`loading-spinner-pending-request`}>
              <Lottie animationData={loadingSpinner} />
            </div>
          )}
        </div>
      </div>
      <div className="tour-purchases__card-details-2__total-responsive">
        <p className="tour-purchases__card-details-2__total-responsive-title uppercase">total</p>
        <p
          className="tour-purchases__card-details-2__total-responsive-info uppercase">${order.totalPrice.toFixed()}</p>
      </div>
    </motion.div>
  );
}
