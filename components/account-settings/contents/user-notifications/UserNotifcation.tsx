// 'use client';
import './UserNotification.scss';
import { UserNotificationsType } from '@/lib/mongodb';
import { formatDate } from '@/lib/helpers/formatDate';
import DOMPurify from 'dompurify';
import { motion } from 'framer-motion';

export default function UserNotification({ type, icon, text, addedAt, timestamp }: UserNotificationsType) {

  const sanitizedText = DOMPurify.sanitize(text);

  return (
    <>
      <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}
                  className="account-settings__content__element grid gap-16px">
        <div className={`account-settings__content__element-logo ${type}`}>

          {icon === 'bell' && (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
              <path
                d="M8.93816 0C7.08165 0 5.30117 0.737498 3.98842 2.05025C2.67566 3.36301 1.93816 5.14348 1.93816 7V10.528C1.93831 10.6831 1.90236 10.8362 1.83316 10.975L0.116163 14.408C0.0322892 14.5757 -0.00731514 14.7621 0.00111129 14.9494C0.00953771 15.1368 0.0657151 15.3188 0.164308 15.4783C0.262901 15.6379 0.400635 15.7695 0.56443 15.8608C0.728224 15.9521 0.912641 16 1.10016 16H16.7762C16.9637 16 17.1481 15.9521 17.3119 15.8608C17.4757 15.7695 17.6134 15.6379 17.712 15.4783C17.8106 15.3188 17.8668 15.1368 17.8752 14.9494C17.8836 14.7621 17.844 14.5757 17.7602 14.408L16.0442 10.975C15.9746 10.8362 15.9383 10.6832 15.9382 10.528V7C15.9382 5.14348 15.2007 3.36301 13.8879 2.05025C12.5752 0.737498 10.7947 0 8.93816 0ZM8.93816 19C8.31754 19.0002 7.71214 18.8079 7.20531 18.4498C6.69848 18.0916 6.31517 17.5851 6.10816 17H11.7682C11.5612 17.5851 11.1778 18.0916 10.671 18.4498C10.1642 18.8079 9.55878 19.0002 8.93816 19Z"
                fill="white" />
            </svg>

          )}
          {icon === `key` && (
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
              <path
                d="M17.0625 1.625C15.9206 1.62474 14.7945 1.89196 13.7745 2.40525C12.7545 2.91854 11.8689 3.66363 11.1887 4.58081C10.5084 5.49798 10.0525 6.56175 9.85743 7.68685C9.66235 8.81195 9.73352 9.96711 10.0652 11.0598L1.625 19.5V24.375H6.5L14.9403 15.9347C15.946 16.24 17.0058 16.3249 18.0474 16.1836C19.089 16.0423 20.0878 15.6781 20.9759 15.1158C21.864 14.5535 22.6204 13.8064 23.1936 12.9253C23.7668 12.0443 24.1434 11.05 24.2976 10.0103C24.4518 8.97053 24.38 7.90977 24.0872 6.90027C23.7943 5.89078 23.2873 4.95628 22.6007 4.16046C21.914 3.36463 21.0639 2.7262 20.1081 2.28866C19.1524 1.85112 18.1136 1.62476 17.0625 1.625ZM17.0625 14.625C16.5031 14.6248 15.9468 14.5422 15.4115 14.3796L14.4796 14.0969L13.7914 14.7851L11.2068 17.3696L10.0864 16.25L8.9375 17.3989L10.0579 18.5193L8.76931 19.8079L7.64887 18.6875L6.5 19.8364L7.62044 20.9568L5.82725 22.75H3.25V20.1727L11.2141 12.2086L11.9031 11.5204L11.6204 10.5885C11.2731 9.44368 11.2957 8.21851 11.6848 7.08725C12.074 5.95599 12.81 4.97626 13.7882 4.28742C14.7663 3.59858 15.9367 3.23571 17.1329 3.25043C18.3292 3.26515 19.4903 3.6567 20.4512 4.3694C21.4121 5.08209 22.1237 6.07963 22.485 7.22012C22.8462 8.36061 22.8386 9.58597 22.4633 10.7219C22.088 11.8578 21.364 12.8465 20.3944 13.5472C19.4247 14.248 18.2588 14.6251 17.0625 14.625Z"
                fill="white" />
              <path
                d="M17.875 9.75C18.7725 9.75 19.5 9.02246 19.5 8.125C19.5 7.22754 18.7725 6.5 17.875 6.5C16.9775 6.5 16.25 7.22754 16.25 8.125C16.25 9.02246 16.9775 9.75 17.875 9.75Z"
                fill="white" />
            </svg>
          )}
          {icon === `money` && (
            <div className="account-settings__content__element-logo red">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12.0049 2C17.5279 2 22.0049 6.477 22.0049 12C22.0049 17.523 17.5279 22 12.0049 22C9.67338 22.0034 7.41454 21.1888 5.62189 19.698L5.37789 19.489L6.27889 17.587C7.56687 18.9071 9.27142 19.7416 11.104 19.9493C12.9366 20.157 14.7847 19.7252 16.3354 18.7268C17.8862 17.7285 19.0444 16.225 19.6139 14.4708C20.1835 12.7166 20.1295 10.8195 19.461 9.1006C18.7925 7.38169 17.5506 5.94654 15.9456 5.03807C14.3405 4.1296 12.4708 3.80362 10.653 4.1153C8.83524 4.42697 7.18096 5.35717 5.9702 6.74843C4.75944 8.1397 4.06658 9.90657 4.00889 11.75L4.00489 12H6.50489L3.79889 17.716C2.62811 16.0401 2.00173 14.0444 2.00489 12C2.00489 6.477 6.4819 2 12.0049 2ZM13.0049 6V8H15.5049V10H10.0049C9.87995 9.99977 9.75944 10.0463 9.66711 10.1305C9.57478 10.2147 9.51731 10.3304 9.50602 10.4548C9.49473 10.5793 9.53044 10.7034 9.60611 10.8028C9.68179 10.9023 9.79195 10.9697 9.91489 10.992L10.0049 11H14.0049C14.6679 11 15.3038 11.2634 15.7727 11.7322C16.2415 12.2011 16.5049 12.837 16.5049 13.5C16.5049 14.163 16.2415 14.7989 15.7727 15.2678C15.3038 15.7366 14.6679 16 14.0049 16H13.0049V18H11.0049V16H8.50489V14H14.0049C14.1298 14.0002 14.2503 13.9537 14.3427 13.8695C14.435 13.7853 14.4925 13.6696 14.5038 13.5452C14.5151 13.4207 14.4794 13.2966 14.4037 13.1972C14.328 13.0977 14.2178 13.0303 14.0949 13.008L14.0049 13H10.0049C9.34185 13 8.70597 12.7366 8.23713 12.2678C7.76829 11.7989 7.50489 11.163 7.50489 10.5C7.50489 9.83696 7.76829 9.20107 8.23713 8.73223C8.70597 8.26339 9.34185 8 10.0049 8H11.0049V6H13.0049Z"
                  fill="white" />
              </svg>
            </div>
          )}
          {icon === `map` && (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <g clipPath="url(#clip0_850_5185)">
                <path
                  d="M14.8939 10.0098L17.3854 12.3456M17.3854 12.3456L19.877 14.6814M17.3854 12.3456L19.877 10.0098M17.3854 12.3456L14.8939 14.6814M8.66504 3L1.19043 7.67163V21.6865L8.66504 18.1828L16.1396 21.6865L23.6143 17.0149V3L16.1396 6.50372L8.66504 3Z"
                  stroke="white" strokeWidth="1.86865" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              <defs>
                <clipPath id="clip0_850_5185">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          )}
          {icon === `letter` && (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M21.7812 3.21875H3.21875C2.7712 3.21875 2.34197 3.39654 2.02551 3.71301C1.70904 4.02947 1.53125 4.4587 1.53125 4.90625V20.0938C1.53125 20.5413 1.70904 20.9705 2.02551 21.287C2.34197 21.6035 2.7712 21.7812 3.21875 21.7812H21.7812C22.2288 21.7812 22.658 21.6035 22.9745 21.287C23.291 20.9705 23.4688 20.5413 23.4688 20.0938V4.90625C23.4688 4.4587 23.291 4.02947 22.9745 3.71301C22.658 3.39654 22.2288 3.21875 21.7812 3.21875ZM6.59375 14.1875C6.59373 14.3534 6.5448 14.5157 6.45307 14.6539C6.36134 14.7922 6.23088 14.9003 6.07801 14.9648C5.97429 15.0089 5.8627 15.0315 5.75 15.0312H4.48438C4.2606 15.0312 4.04599 14.9424 3.88775 14.7841C3.72952 14.6259 3.64062 14.4113 3.64062 14.1875C3.64062 13.9637 3.72952 13.7491 3.88775 13.5909C4.04599 13.4326 4.2606 13.3438 4.48438 13.3438H4.90625V8.28125H4.48438C4.2606 8.28125 4.04599 8.19236 3.88775 8.03412C3.72952 7.87589 3.64062 7.66128 3.64062 7.4375C3.64062 7.21372 3.72952 6.99911 3.88775 6.84088C4.04599 6.68265 4.2606 6.59375 4.48438 6.59375H5.75C5.89778 6.59409 6.04289 6.63323 6.17079 6.70727C6.29869 6.78131 6.4049 6.88764 6.47879 7.01562L8.70312 10.8252L10.9275 7.01562C11.0014 6.88764 11.1076 6.78131 11.2355 6.70727C11.3634 6.63323 11.5085 6.59409 11.6562 6.59375H12.9219C13.1457 6.59375 13.3603 6.68265 13.5185 6.84088C13.6767 6.99911 13.7656 7.21372 13.7656 7.4375C13.7656 7.66128 13.6767 7.87589 13.5185 8.03412C13.3603 8.19236 13.1457 8.28125 12.9219 8.28125H12.5V13.3438H12.9219C13.1457 13.3438 13.3603 13.4326 13.5185 13.5909C13.6767 13.7491 13.7656 13.9637 13.7656 14.1875C13.7656 14.4113 13.6767 14.6259 13.5185 14.7841C13.3603 14.9424 13.1457 15.0312 12.9219 15.0312H11.6562C11.5435 15.0315 11.432 15.0089 11.3282 14.9648C11.1754 14.9003 11.0449 14.7922 10.9532 14.6539C10.8614 14.5157 10.8125 14.3534 10.8125 14.1875V10.5583L9.43191 12.9219C9.35761 13.0492 9.25121 13.1549 9.12334 13.2284C8.99547 13.3018 8.85059 13.3404 8.70312 13.3404C8.55566 13.3404 8.41078 13.3018 8.28291 13.2284C8.15504 13.1549 8.04864 13.0492 7.97434 12.9219L6.59375 10.5583V14.1875ZM20.0938 18.4062H8.28125C8.05747 18.4062 7.84286 18.3174 7.68463 18.1591C7.52639 18.0009 7.4375 17.7863 7.4375 17.5625C7.4375 17.3387 7.52639 17.1241 7.68463 16.9659C7.84286 16.8076 8.05747 16.7188 8.28125 16.7188H20.0938C20.3175 16.7188 20.5321 16.8076 20.6904 16.9659C20.8486 17.1241 20.9375 17.3387 20.9375 17.5625C20.9375 17.7863 20.8486 18.0009 20.6904 18.1591C20.5321 18.3174 20.3175 18.4062 20.0938 18.4062ZM20.0938 15.0312H15.875C15.6512 15.0312 15.4366 14.9424 15.2784 14.7841C15.1201 14.6259 15.0312 14.4113 15.0312 14.1875C15.0312 13.9637 15.1201 13.7491 15.2784 13.5909C15.4366 13.4326 15.6512 13.3438 15.875 13.3438H20.0938C20.3175 13.3438 20.5321 13.4326 20.6904 13.5909C20.8486 13.7491 20.9375 13.9637 20.9375 14.1875C20.9375 14.4113 20.8486 14.6259 20.6904 14.7841C20.5321 14.9424 20.3175 15.0312 20.0938 15.0312ZM20.0938 11.6562H15.875C15.6512 11.6562 15.4366 11.5674 15.2784 11.4091C15.1201 11.2509 15.0312 11.0363 15.0312 10.8125C15.0312 10.5887 15.1201 10.3741 15.2784 10.2159C15.4366 10.0576 15.6512 9.96875 15.875 9.96875H20.0938C20.3175 9.96875 20.5321 10.0576 20.6904 10.2159C20.8486 10.3741 20.9375 10.5887 20.9375 10.8125C20.9375 11.0363 20.8486 11.2509 20.6904 11.4091C20.5321 11.5674 20.3175 11.6562 20.0938 11.6562Z"
                fill="white" />
            </svg>
          )}
          {icon === `ticket` && (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M23.194 12.5451L13.444 2.79508C13.054 2.40508 12.5123 2.16675 11.9165 2.16675H4.33317C3.1415 2.16675 2.1665 3.14175 2.1665 4.33341V11.9167C2.1665 12.5126 2.40484 13.0542 2.80567 13.4551L12.5557 23.2051C12.9457 23.5951 13.4873 23.8334 14.0832 23.8334C14.679 23.8334 15.2207 23.5951 15.6107 23.1942L23.194 15.6109C23.5948 15.2209 23.8332 14.6792 23.8332 14.0834C23.8332 13.4876 23.584 12.9351 23.194 12.5451ZM14.0832 21.6776L4.33317 11.9167V4.33341H11.9165V4.32258L21.6665 14.0726L14.0832 21.6776Z"
                fill="white" />
              <path
                d="M7.0415 8.66675C7.93897 8.66675 8.6665 7.93921 8.6665 7.04175C8.6665 6.14429 7.93897 5.41675 7.0415 5.41675C6.14404 5.41675 5.4165 6.14429 5.4165 7.04175C5.4165 7.93921 6.14404 8.66675 7.0415 8.66675Z"
                fill="white" />
            </svg>
          )}
          {icon === `sale` && (
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
              <path
                d="M22.4781 13L23.6741 10.933C23.8179 10.6843 23.857 10.3887 23.7828 10.1112C23.7087 9.8337 23.5274 9.597 23.2787 9.45316L21.2096 8.25716V5.87382C21.2096 5.58651 21.0954 5.31096 20.8923 5.10779C20.6891 4.90463 20.4135 4.79049 20.1262 4.79049H17.744L16.5491 2.72241C16.4047 2.47423 16.1685 2.29287 15.8915 2.21757C15.7541 2.18032 15.6106 2.17072 15.4695 2.18932C15.3283 2.20791 15.1923 2.25434 15.0692 2.32591L13.0001 3.52191L10.9309 2.32482C10.6821 2.18117 10.3864 2.14224 10.1089 2.2166C9.83134 2.29096 9.59473 2.47251 9.45106 2.72132L8.25506 4.79049H5.87281C5.58549 4.79049 5.30994 4.90463 5.10678 5.10779C4.90362 5.31096 4.78948 5.58651 4.78948 5.87382V8.25607L2.72031 9.45208C2.59685 9.52309 2.48863 9.61781 2.40188 9.73077C2.31513 9.84374 2.25156 9.97274 2.21482 10.1104C2.17807 10.248 2.16888 10.3915 2.18777 10.5327C2.20666 10.6738 2.25326 10.8099 2.3249 10.933L3.5209 13L2.3249 15.067C2.18188 15.3159 2.14308 15.6113 2.21695 15.8887C2.29082 16.1661 2.47137 16.4031 2.71923 16.5479L4.7884 17.7439V20.1262C4.7884 20.4135 4.90253 20.689 5.1057 20.8922C5.30886 21.0954 5.58441 21.2095 5.87173 21.2095H8.25506L9.45106 23.2787C9.54697 23.4426 9.68391 23.5788 9.84841 23.6737C10.0129 23.7687 10.1993 23.8192 10.3892 23.8203C10.5777 23.8203 10.7651 23.7705 10.932 23.6741L12.999 22.4781L15.0681 23.6741C15.3169 23.8175 15.6124 23.8565 15.8898 23.7823C16.1672 23.7082 16.4039 23.5271 16.548 23.2787L17.7429 21.2095H20.1251C20.4125 21.2095 20.688 21.0954 20.8912 20.8922C21.0943 20.689 21.2085 20.4135 21.2085 20.1262V17.7439L23.2776 16.5479C23.4009 16.4767 23.5089 16.3819 23.5955 16.2689C23.6821 16.1559 23.7455 16.0269 23.7823 15.8894C23.819 15.7519 23.8283 15.6084 23.8095 15.4673C23.7908 15.3262 23.7444 15.1902 23.6731 15.067L22.4781 13ZM10.2906 7.57249C10.7218 7.57263 11.1352 7.74403 11.4399 8.04898C11.7447 8.35393 11.9158 8.76745 11.9156 9.19858C11.9155 9.6297 11.7441 10.0431 11.4392 10.3478C11.1342 10.6526 10.7207 10.8237 10.2896 10.8236C9.85844 10.8234 9.44504 10.652 9.14029 10.3471C8.83554 10.0421 8.66442 9.62861 8.66456 9.19749C8.66471 8.76637 8.83611 8.35297 9.14106 8.04822C9.446 7.74347 9.85952 7.57235 10.2906 7.57249ZM10.6156 17.9725L8.88231 16.6736L15.3823 8.00691L17.1156 9.30583L10.6156 17.9725ZM15.7073 18.4058C15.4938 18.4058 15.2825 18.3636 15.0853 18.2819C14.8881 18.2001 14.7089 18.0803 14.558 17.9293C14.4071 17.7783 14.2875 17.5991 14.2058 17.4019C14.1242 17.2046 14.0822 16.9932 14.0823 16.7797C14.0824 16.5663 14.1245 16.3549 14.2063 16.1577C14.288 15.9605 14.4078 15.7814 14.5588 15.6305C14.7098 15.4796 14.889 15.3599 15.0863 15.2783C15.2835 15.1966 15.4949 15.1547 15.7084 15.1547C16.1395 15.1549 16.5529 15.3263 16.8577 15.6312C17.1624 15.9362 17.3335 16.3497 17.3334 16.7808C17.3333 17.2119 17.1619 17.6254 16.8569 17.9301C16.552 18.2348 16.1384 18.406 15.7073 18.4058Z"
                fill="white" />
            </svg>
          )}
          {icon === `smile` && (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 24C18.6168 24 24 18.6168 24 12C24 5.3832 18.6168 0 12 0C5.3832 0 0 5.3832 0 12C0 18.6168 5.3832 24 12 24ZM16.1916 8.4C16.4309 8.39389 16.6689 8.43575 16.8917 8.5231C17.1146 8.61046 17.3176 8.74155 17.489 8.90864C17.6604 9.07573 17.7965 9.27544 17.8895 9.496C17.9824 9.71655 18.0303 9.95348 18.0302 10.1928C18.0301 10.4322 17.9821 10.6691 17.889 10.8895C17.7959 11.11 17.6596 11.3097 17.4881 11.4766C17.3167 11.6436 17.1135 11.7746 16.8906 11.8618C16.6677 11.949 16.4297 11.9907 16.1904 11.9844C15.7231 11.9722 15.2791 11.7779 14.953 11.443C14.6268 11.1081 14.4444 10.6591 14.4446 10.1916C14.4447 9.72417 14.6275 9.27526 14.9538 8.94059C15.2801 8.60591 15.7243 8.41194 16.1916 8.4ZM11.0304 16.7028C11.6704 16.8312 12.3296 16.8312 12.9696 16.7028C13.2732 16.6404 13.5756 16.5456 13.8696 16.4232C14.1504 16.3032 14.4264 16.1544 14.6844 15.9816C14.934 15.8112 15.1728 15.6144 15.3936 15.3948C15.6132 15.1764 15.81 14.9376 15.9804 14.6844L17.97 16.0248C17.4527 16.7915 16.7932 17.4518 16.0272 17.97C15.2468 18.4967 14.3706 18.8652 13.4484 19.0548C12.4923 19.2469 11.5075 19.2465 10.5516 19.0536C9.62909 18.8668 8.75292 18.4984 7.974 17.97C7.20797 17.4505 6.54783 16.7899 6.0288 16.0236L8.0184 14.6832C8.19 14.9364 8.3868 15.1752 8.604 15.3912C9.26655 16.0571 10.1104 16.5132 11.0304 16.7028ZM7.8 8.4C8.03646 8.40008 8.27059 8.44673 8.48901 8.53729C8.70744 8.62785 8.9059 8.76055 9.07304 8.92781C9.24019 9.09506 9.37275 9.29361 9.46317 9.51209C9.55358 9.73058 9.60008 9.96474 9.6 10.2012C9.59992 10.4377 9.55327 10.6718 9.46271 10.8902C9.37215 11.1086 9.23945 11.3071 9.07219 11.4742C8.90494 11.6414 8.7064 11.774 8.48791 11.8644C8.26942 11.9548 8.03526 12.0013 7.7988 12.0012C7.32125 12.001 6.86333 11.8112 6.52576 11.4734C6.18819 11.1356 5.99864 10.6775 5.9988 10.2C5.99896 9.72245 6.18882 9.26453 6.52661 8.92696C6.8644 8.58939 7.32245 8.39984 7.8 8.4Z"
                fill="white" />
            </svg>
          )}


        </div>
        <div className="grid">
          <h2 className="account-settings__content__element-title"
              dangerouslySetInnerHTML={{ __html: sanitizedText }}></h2>
          <div className="account-settings__content__element-date">{formatDate(addedAt.toString())}</div>
        </div>
      </motion.div>
    </>
  );
}
