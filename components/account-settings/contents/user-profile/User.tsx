'use client';

import '@/app/account-settings/page.scss';
import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { item } from '@/components/account-settings/contents/user-tour-purchases/UserTourPurchases';

type UserType = {
  userInitials: string;
  userEmail: string;
  image: string | null;
  readOnly: boolean;
  handleOnClick: (() => void) | undefined;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFiles: File[];
  // children: ReactNode;
}

const User = forwardRef<HTMLInputElement, UserType>(function User(
  {
    userInitials, userEmail, handleOnClick,
    handleFileChange, image, readOnly, selectedFiles
  }, ref) {

  if (!userInitials || !userEmail) {
    throw new Error('userName and userEmail are required');
  }

  const userNameAbbr = userInitials.split(' ').map((name) => name.charAt(0)).join('.');

  return (
    <motion.div
      variants={item}
      className="account-settings__content-user">
      <div className="account-settings__content-user__info flex flex-align-center">
        <div className="user-logo-wrapper">

          {selectedFiles.length === 0 && (
            // <div onClick={handleOnClick}
            <div onClick={undefined}
                 className={selectedFiles.length === 0 || !image ? `user-logo` : ``}>
              {userNameAbbr}
            </div>
          )}

          {selectedFiles.length > 0 && (
            <>
              {/*<div onClick={handleOnClick}*/}
              <div onClick={undefined}
                   className={`user-img border-radius-round cursor-pointer ${selectedFiles[0] ? '' : 'none'}`}
                   style={selectedFiles[0] ? { backgroundImage: `url(${URL.createObjectURL(selectedFiles[0])})` } : {}}>
              </div>
            </>
          )}

          <input ref={ref} type="file" name="image" id="file"
                 className="hidden" max={1}
                 multiple onChange={handleFileChange} accept="image/jpg, image/jpeg, image/png" />
          {/*<svg onClick={handleOnClick}*/}
          <svg onClick={undefined}
               className={`user-logo__edit-icon${readOnly ? `-disabled` : ``}`}
               xmlns="http://www.w3.org/2000/svg"
               width="32" height="32"
               viewBox="0 0 32 32" fill="none">
            <path className={readOnly ? `edit-icon-path-1` : ``}
                  d="M32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16Z"
                  fill="#EB662B" />
            <path className={`edit-icon-path-2`}
                  d="M11 18.917V21H13.0831L19.2267 14.8564L17.1436 12.7733L11 18.917ZM20.8376 13.2455C20.889 13.1941 20.9299 13.1331 20.9578 13.0659C20.9857 12.9987 21 12.9266 21 12.8539C21 12.7811 20.9857 12.7091 20.9578 12.6419C20.9299 12.5747 20.889 12.5137 20.8376 12.4623L19.5377 11.1624C19.4863 11.111 19.4253 11.0701 19.3581 11.0422C19.2909 11.0143 19.2189 11 19.1461 11C19.0734 11 19.0013 11.0143 18.9341 11.0422C18.8669 11.0701 18.8059 11.111 18.7545 11.1624L17.738 12.179L19.821 14.262L20.8376 13.2455Z"
                  fill="white" />
          </svg>
        </div>
        {/*{image && (
          <>
            <div className="account-settings__content-user__info flex flex-align-center">
              <div className="user-logo-wrapper">
                <div className={selectedFiles.length === 0 || !image ? `user-logo` : ``}>

                  {selectedFiles.length === 0 && (
                    <img onClick={handleOnClick} className={`user-image`} src={image}
                         alt="User Avatar" />
                  )}

                  {selectedFiles.length > 0 && (
                    <>
                      <div onClick={handleOnClick}
                           className={`user-img border-radius-round cursor-pointer ${selectedFiles[0] ? '' : 'none'}`}
                           style={selectedFiles[0] ? { backgroundImage: `url(${URL.createObjectURL(selectedFiles[0])})` } : {}}>
                      </div>
                    </>
                  )}

                  <input ref={ref} type="file" name="image" id="file"
                         className="hidden" max={1}
                         multiple onChange={handleFileChange} accept="image/jpg, image/jpeg, image/png" />
                  <svg
                    onClick={handleOnClick}
                    className={`user-logo__edit-icon${readOnly ? `-disabled` : ``}`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="32" height="32"
                    viewBox="0 0 32 32" fill="none">
                    <path className={readOnly ? `edit-icon-path-1` : ``}
                          d="M32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16Z"
                          fill="#EB662B" />
                    <path className={`edit-icon-path-2`}
                          d="M11 18.917V21H13.0831L19.2267 14.8564L17.1436 12.7733L11 18.917ZM20.8376 13.2455C20.889 13.1941 20.9299 13.1331 20.9578 13.0659C20.9857 12.9987 21 12.9266 21 12.8539C21 12.7811 20.9857 12.7091 20.9578 12.6419C20.9299 12.5747 20.889 12.5137 20.8376 12.4623L19.5377 11.1624C19.4863 11.111 19.4253 11.0701 19.3581 11.0422C19.2909 11.0143 19.2189 11 19.1461 11C19.0734 11 19.0013 11.0143 18.9341 11.0422C18.8669 11.0701 18.8059 11.111 18.7545 11.1624L17.738 12.179L19.821 14.262L20.8376 13.2455Z"
                          fill="white" />
                  </svg>
                </div>
              </div>
            </div>
          </>
        )}*/}

        <div className="user-initials">
          <h3 className="user-initials__name">{userInitials}</h3>
          <p className="user-initials__email">{userEmail}</p>
        </div>
      </div>
      <svg className="viatours-logo" xmlns="http://www.w3.org/2000/svg" width="116" height="22" viewBox="0 0 116 22"
           fill="none">
        <g clipPath="url(#clip0_788_1621)">
          <path
            d="M38.3817 18.5952L34.6279 8.36523H37.3917L39.9904 16.0996L42.5892 8.36523H45.3529L41.5786 18.5952H38.3817Z"
            fill="white" />
          <path
            d="M48.4415 6.77699C47.9602 6.77699 47.5615 6.63262 47.2453 6.34387C46.9428 6.05512 46.7915 5.69074 46.7915 5.25074C46.7915 4.81074 46.9428 4.45324 47.2453 4.17824C47.5615 3.88949 47.9602 3.74512 48.4415 3.74512C48.9227 3.74512 49.3146 3.88949 49.6171 4.17824C49.9334 4.45324 50.0915 4.81074 50.0915 5.25074C50.0915 5.69074 49.9334 6.05512 49.6171 6.34387C49.3146 6.63262 48.9227 6.77699 48.4415 6.77699ZM47.1215 18.5952V8.36515H49.7615V18.5952H47.1215Z"
            fill="white" />
          <path
            d="M56.0438 18.8427C55.1638 18.8427 54.4419 18.7052 53.8781 18.4302C53.3144 18.1414 52.895 17.7633 52.62 17.2958C52.345 16.8283 52.2075 16.3127 52.2075 15.7489C52.2075 14.8002 52.5788 14.0302 53.3213 13.4389C54.0638 12.8477 55.1775 12.5521 56.6625 12.5521H59.2613V12.3046C59.2613 11.6033 59.0619 11.0877 58.6631 10.7577C58.2644 10.4277 57.7694 10.2627 57.1781 10.2627C56.6419 10.2627 56.1744 10.3933 55.7756 10.6546C55.3769 10.9021 55.1294 11.2733 55.0331 11.7683H52.455C52.5238 11.0258 52.7713 10.3796 53.1975 9.82955C53.6375 9.27955 54.2013 8.86018 54.8888 8.57143C55.5763 8.26893 56.3463 8.11768 57.1988 8.11768C58.6563 8.11768 59.8044 8.48205 60.6431 9.2108C61.4819 9.93955 61.9013 10.9708 61.9013 12.3046V18.5952H59.6531L59.4056 16.9452C59.1031 17.4952 58.6769 17.9489 58.1269 18.3064C57.5906 18.6639 56.8963 18.8427 56.0438 18.8427ZM56.6419 16.7802C57.3981 16.7802 57.9825 16.5327 58.395 16.0377C58.8213 15.5427 59.0894 14.9308 59.1994 14.2021H56.9513C56.25 14.2021 55.7481 14.3327 55.4456 14.5939C55.1431 14.8414 54.9919 15.1508 54.9919 15.5221C54.9919 15.9208 55.1431 16.2302 55.4456 16.4502C55.7481 16.6702 56.1469 16.7802 56.6419 16.7802Z"
            fill="white" />
          <path
            d="M68.8378 18.5952C67.7652 18.5952 66.9059 18.334 66.2597 17.8115C65.6134 17.289 65.2903 16.3609 65.2903 15.0271V10.5721H63.5371V8.36523H65.2903L65.5996 5.62207H67.9303V8.36523H70.6941V10.5721H67.9303V15.0477C67.9303 15.5427 68.0334 15.8865 68.2396 16.079C68.4596 16.2577 68.8309 16.3471 69.3535 16.3471H70.6322V18.5952H68.8378Z"
            fill="white" />
          <path
            d="M77.6074 18.8427C76.6174 18.8427 75.7237 18.6158 74.9262 18.1621C74.1424 17.7083 73.5168 17.0827 73.0493 16.2852C72.5955 15.4739 72.3687 14.5389 72.3687 13.4802C72.3687 12.4214 72.6024 11.4933 73.0699 10.6958C73.5374 9.88455 74.163 9.25205 74.9468 8.7983C75.7443 8.34455 76.638 8.11768 77.628 8.11768C78.6043 8.11768 79.4843 8.34455 80.268 8.7983C81.0655 9.25205 81.6912 9.88455 82.1449 10.6958C82.6124 11.4933 82.8462 12.4214 82.8462 13.4802C82.8462 14.5389 82.6124 15.4739 82.1449 16.2852C81.6912 17.0827 81.0655 17.7083 80.268 18.1621C79.4705 18.6158 78.5836 18.8427 77.6074 18.8427ZM77.6074 16.5533C78.2949 16.5533 78.893 16.2989 79.4018 15.7902C79.9105 15.2677 80.1649 14.4977 80.1649 13.4802C80.1649 12.4627 79.9105 11.6996 79.4018 11.1908C78.893 10.6683 78.3018 10.4071 77.628 10.4071C76.9268 10.4071 76.3218 10.6683 75.813 11.1908C75.318 11.6996 75.0705 12.4627 75.0705 13.4802C75.0705 14.4977 75.318 15.2677 75.813 15.7902C76.3218 16.2989 76.9199 16.5533 77.6074 16.5533Z"
            fill="white" />
          <path
            d="M89.0428 18.8427C87.764 18.8427 86.774 18.444 86.0728 17.6465C85.3853 16.849 85.0415 15.6802 85.0415 14.1402V8.36523H87.6609V13.8927C87.6609 14.7727 87.8396 15.4465 88.1971 15.914C88.5546 16.3815 89.1184 16.6152 89.8884 16.6152C90.6171 16.6152 91.2153 16.354 91.6828 15.8315C92.164 15.309 92.4046 14.5802 92.4046 13.6452V8.36523H95.0446V18.5952H92.714L92.5077 16.8627C92.1915 17.4677 91.7309 17.949 91.1259 18.3065C90.5346 18.664 89.8403 18.8427 89.0428 18.8427Z"
            fill="white" />
          <path
            d="M97.7549 18.5952V8.36518H100.106L100.354 10.2833C100.725 9.6233 101.227 9.1008 101.859 8.7158C102.506 8.31705 103.262 8.11768 104.128 8.11768V10.9021H103.386C102.808 10.9021 102.292 10.9914 101.839 11.1702C101.385 11.3489 101.027 11.6583 100.766 12.0983C100.519 12.5383 100.395 13.1502 100.395 13.9339V18.5952H97.7549Z"
            fill="white" />
          <path
            d="M110.16 18.8427C109.253 18.8427 108.455 18.6983 107.768 18.4096C107.08 18.107 106.53 17.6946 106.118 17.1721C105.705 16.6496 105.458 16.0445 105.375 15.357H108.036C108.119 15.7558 108.339 16.0995 108.696 16.3883C109.067 16.6633 109.542 16.8008 110.119 16.8008C110.697 16.8008 111.116 16.6839 111.377 16.4502C111.652 16.2164 111.79 15.9483 111.79 15.6458C111.79 15.2058 111.597 14.9102 111.212 14.7589C110.827 14.5939 110.291 14.4358 109.604 14.2846C109.164 14.1883 108.717 14.0714 108.263 13.9339C107.809 13.7964 107.39 13.6246 107.005 13.4183C106.634 13.1983 106.331 12.9233 106.097 12.5933C105.864 12.2496 105.747 11.8302 105.747 11.3352C105.747 10.4277 106.104 9.66455 106.819 9.0458C107.548 8.42705 108.565 8.11768 109.872 8.11768C111.082 8.11768 112.044 8.39955 112.759 8.9633C113.488 9.52705 113.921 10.3039 114.059 11.2939H111.563C111.412 10.5377 110.841 10.1596 109.851 10.1596C109.356 10.1596 108.971 10.2558 108.696 10.4483C108.435 10.6408 108.304 10.8814 108.304 11.1702C108.304 11.4727 108.504 11.7133 108.902 11.8921C109.301 12.0708 109.83 12.2358 110.49 12.3871C111.205 12.5521 111.859 12.7377 112.45 12.9439C113.055 13.1364 113.536 13.4321 113.894 13.8308C114.251 14.2158 114.43 14.7727 114.43 15.5014C114.444 16.1339 114.279 16.7046 113.935 17.2133C113.591 17.7221 113.096 18.1208 112.45 18.4096C111.804 18.6983 111.04 18.8427 110.16 18.8427Z"
            fill="white" />
          <path
            d="M27.6982 4.74512C26.8223 4.79791 25.9569 4.96363 25.1235 5.23814C24.2761 5.47596 23.4513 5.78758 22.6584 6.16942C21.8579 6.51249 21.1034 6.95414 20.4123 7.48413C19.7068 7.9715 19.0468 8.5215 18.4402 9.1276C17.8291 9.76416 17.2617 10.4413 16.742 11.1545C16.2516 11.8714 15.8123 12.6219 15.4272 13.4005C15.0692 14.2034 14.7582 15.0266 14.496 15.8656C14.279 16.7129 14.1143 17.5728 14.003 18.4403C13.9449 17.5651 13.7794 16.7003 13.51 15.8656C13.2721 15.0183 12.9605 14.1934 12.5787 13.4005C12.2356 12.6 11.794 11.8455 11.264 11.1545C10.7632 10.442 10.2141 9.76477 9.62049 9.1276C8.98331 8.53401 8.30606 7.98491 7.5936 7.48413C6.90257 6.95414 6.14806 6.51249 5.34759 6.16942C4.56239 5.76982 3.73573 5.45753 2.88245 5.23814C2.04903 4.96363 1.18363 4.79791 0.307752 4.74512C0.307752 5.23814 0.252972 5.73117 0.252972 6.2242C0.231815 7.2356 0.323686 8.24616 0.526876 9.23712C0.628938 9.73652 0.756933 10.2302 0.910342 10.7162C1.02538 11.2067 1.19059 11.6839 1.40337 12.1406C1.58117 12.6068 1.78229 13.0639 2.00596 13.5101L2.77289 14.8248L3.70416 16.03L4.69023 17.1256L5.78584 18.1664L6.99102 19.0429C7.42929 19.3716 7.8675 19.5907 8.30578 19.8646L9.67528 20.522L11.0448 21.015L12.5239 21.3985L14.003 21.6176L15.482 21.3985L16.9611 21.015L18.3854 20.522L19.755 19.8646L21.0149 19.0429L22.2201 18.1664C22.6114 17.8481 22.9776 17.5 23.3157 17.1256C23.6902 16.7875 24.0381 16.4213 24.3566 16.03L25.2331 14.8248C25.507 14.3866 25.7809 13.9483 26 13.5101L26.6574 12.1406L27.1504 10.7162C27.286 10.2294 27.3957 9.73562 27.4791 9.23712C27.5789 8.74844 27.652 8.25468 27.6982 7.75803C27.7721 7.25031 27.7904 6.73596 27.753 6.2242C27.762 5.73054 27.7437 5.23676 27.6982 4.74512Z"
            fill="url(#paint0_linear_788_1621)" />
          <path
            d="M17.4543 3.8136C17.4654 4.05232 17.447 4.29152 17.3995 4.52574C17.3516 4.77014 17.2781 5.00883 17.1804 5.2379L16.8517 5.84048L16.4134 6.38829L15.8656 6.82654L15.2082 7.15522L14.5509 7.37432H13.1266L12.4145 7.15522L11.8119 6.82654L11.2641 6.38829L10.7711 5.84048L10.4424 5.2379L10.2232 4.52574C10.2232 4.30662 10.1685 4.0875 10.1685 3.8136C10.1685 3.53969 10.2232 3.37535 10.2232 3.15622C10.2232 2.9371 10.3876 2.6632 10.4424 2.44407L10.7711 1.84148L11.2641 1.29368C11.4212 1.1184 11.6064 0.970323 11.8119 0.855428L12.4145 0.526741L13.1266 0.307617H14.5509L15.2082 0.526741L15.8656 0.855428L16.4134 1.29368L16.8517 1.84148L17.1804 2.44407C17.2855 2.67037 17.3592 2.90997 17.3995 3.15622C17.4448 3.37226 17.4631 3.59305 17.4543 3.8136Z"
            fill="#FBD7C8" />
        </g>
        <defs>
          <linearGradient id="paint0_linear_788_1621" x1="4.7223" y1="7.27589" x2="31" y2="22"
                          gradientUnits="userSpaceOnUse">
            <stop stopColor="white" />
            <stop offset="1" stopColor="#F28555" />
          </linearGradient>
          <clipPath id="clip0_788_1621">
            <rect width="114.812" height="22" fill="white" transform="translate(0.25)" />
          </clipPath>
        </defs>
      </svg>
    </motion.div>
  );
});


export default User;