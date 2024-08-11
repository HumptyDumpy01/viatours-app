// 'use client';
import './UserProfileAdditional.scss';
/*type UserProfileAdditionalType = {
  // children: ReactNode;
}*/

export default function UserProfileAdditional(/*{  }: UserProfileAdditionalType*/) {
  return (
    <div className="account-settings__content__secondary">
      <h3 className="account-settings__content__secondary-heading">Might also be useful</h3>
      <div className="account-settings__content__secondary__p-wrapper ">
        <svg className="account-settings__content__secondary__p-icon" xmlns="http://www.w3.org/2000/svg" width="8"
             height="12" viewBox="0 0 8 12" fill="none">
          <path
            d="M7.33293 3.4999C7.33366 2.72882 7.07974 1.97908 6.6106 1.36713C6.14146 0.755187 5.48337 0.315293 4.73855 0.115777C3.99373 -0.0837396 3.20387 -0.0317085 2.49165 0.263787C1.77944 0.559283 1.18474 1.0817 0.79993 1.7499C0.667321 1.97971 0.631436 2.25279 0.700168 2.50905C0.7689 2.76532 0.936619 2.98379 1.16643 3.1164C1.39624 3.24901 1.66932 3.28489 1.92558 3.21616C2.18185 3.14743 2.40032 2.97971 2.53293 2.7499C2.6649 2.52193 2.85446 2.33265 3.08262 2.20102C3.31078 2.06939 3.56952 2.00004 3.83293 1.9999C4.23075 1.9999 4.61229 2.15794 4.89359 2.43924C5.17489 2.72054 5.33293 3.10208 5.33293 3.4999C5.33293 3.89773 5.17489 4.27926 4.89359 4.56056C4.61229 4.84187 4.23075 4.9999 3.83293 4.9999H3.82993C3.76543 5.00638 3.70177 5.01945 3.63993 5.0389C3.57278 5.04573 3.50646 5.05912 3.44193 5.0789C3.38704 5.10889 3.33514 5.14405 3.28693 5.1839C3.22949 5.21522 3.17523 5.25206 3.12493 5.2939C3.07997 5.34766 3.04076 5.40598 3.00793 5.4679C2.97139 5.51293 2.93893 5.56112 2.91093 5.6119C2.88914 5.68085 2.87473 5.75191 2.86793 5.8239C2.85072 5.88133 2.839 5.94026 2.83293 5.9999V6.9999L2.83493 7.0109V7.5019C2.83546 7.76677 2.94105 8.02061 3.12853 8.20772C3.31601 8.39482 3.57006 8.4999 3.83493 8.4999H3.83793C3.96925 8.49964 4.09924 8.47351 4.22046 8.42302C4.34169 8.37252 4.45178 8.29864 4.54445 8.20559C4.63712 8.11255 4.71056 8.00216 4.76058 7.88074C4.81059 7.75931 4.83619 7.62922 4.83593 7.4979L4.83393 6.8359C5.55359 6.62211 6.18526 6.18221 6.63536 5.58135C7.08546 4.9805 7.33006 4.25064 7.33293 3.4999ZM3.12993 10.2899C2.98951 10.4292 2.89354 10.607 2.85415 10.8008C2.81477 10.9946 2.83374 11.1957 2.90866 11.3788C2.98359 11.5618 3.1111 11.7185 3.27509 11.8291C3.43907 11.9396 3.63216 11.9991 3.82993 11.9999C4.09498 11.9976 4.34908 11.8938 4.53993 11.7099C4.7256 11.5202 4.82959 11.2653 4.82959 10.9999C4.82959 10.7345 4.7256 10.4796 4.53993 10.2899C4.34852 10.1115 4.09659 10.0123 3.83493 10.0123C3.57327 10.0123 3.32134 10.1115 3.12993 10.2899Z"
            fill="white" />
        </svg>
        <p className="account-settings__content__secondary__p">You can change your initials, logo, password, email,
          and
          phone
          number.</p>
      </div>

      <div className="account-settings__content__secondary__p-wrapper">
        <svg className="account-settings__content__secondary__p-icon" xmlns="http://www.w3.org/2000/svg" width="8"
             height="12" viewBox="0 0 8 12" fill="none">
          <path
            d="M7.33293 3.4999C7.33366 2.72882 7.07974 1.97908 6.6106 1.36713C6.14146 0.755187 5.48337 0.315293 4.73855 0.115777C3.99373 -0.0837396 3.20387 -0.0317085 2.49165 0.263787C1.77944 0.559283 1.18474 1.0817 0.79993 1.7499C0.667321 1.97971 0.631436 2.25279 0.700168 2.50905C0.7689 2.76532 0.936619 2.98379 1.16643 3.1164C1.39624 3.24901 1.66932 3.28489 1.92558 3.21616C2.18185 3.14743 2.40032 2.97971 2.53293 2.7499C2.6649 2.52193 2.85446 2.33265 3.08262 2.20102C3.31078 2.06939 3.56952 2.00004 3.83293 1.9999C4.23075 1.9999 4.61229 2.15794 4.89359 2.43924C5.17489 2.72054 5.33293 3.10208 5.33293 3.4999C5.33293 3.89773 5.17489 4.27926 4.89359 4.56056C4.61229 4.84187 4.23075 4.9999 3.83293 4.9999H3.82993C3.76543 5.00638 3.70177 5.01945 3.63993 5.0389C3.57278 5.04573 3.50646 5.05912 3.44193 5.0789C3.38704 5.10889 3.33514 5.14405 3.28693 5.1839C3.22949 5.21522 3.17523 5.25206 3.12493 5.2939C3.07997 5.34766 3.04076 5.40598 3.00793 5.4679C2.97139 5.51293 2.93893 5.56112 2.91093 5.6119C2.88914 5.68085 2.87473 5.75191 2.86793 5.8239C2.85072 5.88133 2.839 5.94026 2.83293 5.9999V6.9999L2.83493 7.0109V7.5019C2.83546 7.76677 2.94105 8.02061 3.12853 8.20772C3.31601 8.39482 3.57006 8.4999 3.83493 8.4999H3.83793C3.96925 8.49964 4.09924 8.47351 4.22046 8.42302C4.34169 8.37252 4.45178 8.29864 4.54445 8.20559C4.63712 8.11255 4.71056 8.00216 4.76058 7.88074C4.81059 7.75931 4.83619 7.62922 4.83593 7.4979L4.83393 6.8359C5.55359 6.62211 6.18526 6.18221 6.63536 5.58135C7.08546 4.9805 7.33006 4.25064 7.33293 3.4999ZM3.12993 10.2899C2.98951 10.4292 2.89354 10.607 2.85415 10.8008C2.81477 10.9946 2.83374 11.1957 2.90866 11.3788C2.98359 11.5618 3.1111 11.7185 3.27509 11.8291C3.43907 11.9396 3.63216 11.9991 3.82993 11.9999C4.09498 11.9976 4.34908 11.8938 4.53993 11.7099C4.7256 11.5202 4.82959 11.2653 4.82959 10.9999C4.82959 10.7345 4.7256 10.4796 4.53993 10.2899C4.34852 10.1115 4.09659 10.0123 3.83493 10.0123C3.57327 10.0123 3.32134 10.1115 3.12993 10.2899Z"
            fill="white" />
        </svg>
        <p className="account-settings__content__secondary__p">If you encounter any difficulties, <b><a
          className="account-settings__content__secondary-link"
          href="#">please
          contact our support team.</a></b></p>
      </div>
      <div className="account-settings__content__secondary__p-wrapper">
        <svg className="account-settings__content__secondary__p-icon" xmlns="http://www.w3.org/2000/svg" width="12"
             height="22" viewBox="0 0 10 20" fill="none">
          <g clipPath="url(#clip0_353_6862)">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M7.49999 11.611V8.99998C7.5 8.9165 7.496 8.83307 7.48799 8.74998C8.29357 8.21561 8.90565 7.43603 9.23361 6.52666C9.56157 5.61729 9.58797 4.62649 9.3089 3.70094C9.02984 2.7754 8.46014 1.96433 7.68417 1.38782C6.90819 0.811303 5.96719 0.5 5.00049 0.5C4.03379 0.5 3.09279 0.811303 2.31681 1.38782C1.54083 1.96433 0.971138 2.7754 0.692072 3.70094C0.413006 4.62649 0.439408 5.61729 0.767368 6.52666C1.09533 7.43603 1.70741 8.21561 2.51299 8.74998C2.50452 8.83305 2.50018 8.91648 2.49999 8.99998V17C2.49999 17.663 2.76338 18.2989 3.23222 18.7677C3.70106 19.2366 4.33695 19.5 4.99999 19.5C5.66303 19.5 6.29891 19.2366 6.76776 18.7677C7.2366 18.2989 7.49999 17.663 7.49999 17C7.50001 16.9262 7.4837 16.8533 7.45224 16.7866C7.42077 16.7199 7.37493 16.6609 7.31799 16.614L6.53199 15.968L7.24799 15.558C7.32452 15.5143 7.38813 15.4511 7.43238 15.3749C7.47664 15.2987 7.49996 15.2121 7.49999 15.124V14.349C7.49996 14.2166 7.44746 14.0897 7.35399 13.996L6.35599 12.995L7.35899 11.959C7.44941 11.8657 7.49998 11.7409 7.49999 11.611ZM6.45299 8.62498C6.48399 8.74598 6.49999 8.87198 6.49999 8.99998V11.409L5.29599 12.652C5.20474 12.7461 5.15413 12.8724 5.15506 13.0035C5.156 13.1346 5.2084 13.2601 5.30099 13.353L6.49999 14.556V14.834L5.40699 15.46C5.3367 15.5001 5.27721 15.5567 5.23363 15.625C5.19005 15.6932 5.16369 15.771 5.15681 15.8516C5.14992 15.9323 5.16272 16.0134 5.19411 16.088C5.22549 16.1626 5.27452 16.2285 5.33699 16.28L6.48399 17.223C6.42875 17.5982 6.23344 17.9386 5.93735 18.1756C5.64127 18.4126 5.2664 18.5286 4.8882 18.5004C4.50999 18.4721 4.15653 18.3016 3.89897 18.0232C3.6414 17.7448 3.49884 17.3792 3.49999 17V8.99998C3.49999 8.87198 3.51599 8.74598 3.54699 8.62498C3.57458 8.51773 3.56579 8.40435 3.52199 8.30264C3.4782 8.20092 3.40187 8.11663 3.30499 8.06298C2.62616 7.68723 2.09143 7.09658 1.78484 6.38384C1.47825 5.67111 1.41717 4.8767 1.61121 4.12548C1.80525 3.37426 2.24341 2.7088 2.85681 2.2337C3.47022 1.7586 4.22411 1.50079 4.99999 1.50079C5.77587 1.50079 6.52976 1.7586 7.14316 2.2337C7.75657 2.7088 8.19473 3.37426 8.38877 4.12548C8.58281 4.8767 8.52173 5.67111 8.21514 6.38384C7.90854 7.09658 7.37381 7.68723 6.69499 8.06298C6.59811 8.11663 6.52178 8.20092 6.47798 8.30264C6.43418 8.40435 6.42539 8.51773 6.45299 8.62498Z"
                  fill="white" />
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M5 5.5C5.39782 5.5 5.77936 5.34196 6.06066 5.06066C6.34196 4.77936 6.5 4.39782 6.5 4C6.5 3.60218 6.34196 3.22064 6.06066 2.93934C5.77936 2.65804 5.39782 2.5 5 2.5C4.60218 2.5 4.22064 2.65804 3.93934 2.93934C3.65804 3.22064 3.5 3.60218 3.5 4C3.5 4.39782 3.65804 4.77936 3.93934 5.06066C4.22064 5.34196 4.60218 5.5 5 5.5ZM5 3.5C5.13261 3.5 5.25979 3.55268 5.35355 3.64645C5.44732 3.74021 5.5 3.86739 5.5 4C5.5 4.13261 5.44732 4.25979 5.35355 4.35355C5.25979 4.44732 5.13261 4.5 5 4.5C4.86739 4.5 4.74021 4.44732 4.64645 4.35355C4.55268 4.25979 4.5 4.13261 4.5 4C4.5 3.86739 4.55268 3.74021 4.64645 3.64645C4.74021 3.55268 4.86739 3.5 5 3.5Z"
                  fill="white" />
          </g>
          <defs>
            <clipPath id="clip0_353_6862">
              <rect width="10" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <p className="account-settings__content__secondary__p">Turn on <b><a href="#"
                                                                             className="account-settings__content__secondary-link">two-step
          verification</a></b></p>
      </div>
    </div>
  );
}