// 'use client';
import './Popup.scss';
/*type PopupType = {
  // children: ReactNode;
}*/

export default function Popup(/*{  }: PopupType*/) {
  return (
    <>
      <div className="account-settings_icon-container">
        <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16"
             fill="none">
          <path d="M13 14V16H2V14H13ZM18 7V9H0V7H18ZM16 0V2H5V0H16Z" fill="#1E2050" />
        </svg>


        <div className="popup-container">
          <div className="popup">
            <p className="popup-text">Each new notification can come right to your inbox!</p>
            <div className="grid">
              <button className="btn popup-btn popup-unsubscribe flex flex-align-center popup-btn--disabled">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <g clipPath="url(#clip0_918_1166)">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M6.5305 9.52767C6.5305 8.06164 7.11288 6.65566 8.14952 5.61902C9.18616 4.58238 10.5921 4 12.0582 4C13.5242 4 14.9302 4.58238 15.9668 5.61902C17.0035 6.65566 17.5858 8.06164 17.5858 9.52767V12.5L19.0246 15.3775C19.0909 15.51 19.1221 15.6571 19.1155 15.8051C19.1088 15.953 19.0645 16.0968 18.9866 16.2227C18.9087 16.3487 18.8 16.4527 18.6706 16.5248C18.5413 16.5969 18.3957 16.6347 18.2476 16.6347H15.1173C14.9417 17.3124 14.546 17.9126 13.9923 18.3411C13.4386 18.7696 12.7583 19.0021 12.0582 19.0021C11.3581 19.0021 10.6778 18.7696 10.1241 18.3411C9.57038 17.9126 9.17466 17.3124 8.999 16.6347H5.86876C5.72068 16.6347 5.57506 16.5969 5.44571 16.5248C5.31637 16.4527 5.2076 16.3487 5.12975 16.2227C5.05189 16.0968 5.00753 15.953 5.00088 15.8051C4.99422 15.6571 5.0255 15.51 5.09173 15.3775L6.5305 12.5V9.52767ZM10.6905 16.6347C10.8291 16.8747 11.0285 17.0741 11.2685 17.2127C11.5086 17.3513 11.781 17.4243 12.0582 17.4243C12.3354 17.4243 12.6077 17.3513 12.8478 17.2127C13.0879 17.0741 13.2873 16.8747 13.4259 16.6347H10.6905ZM12.0582 5.57933C11.011 5.57933 10.0067 5.99532 9.26628 6.73578C8.52582 7.47623 8.10984 8.48051 8.10984 9.52767V12.5C8.10982 12.745 8.05278 12.9867 7.94322 13.2059L7.01931 15.0553H17.0978L16.1739 13.2059C16.0641 12.9868 16.0068 12.7451 16.0065 12.5V9.52767C16.0065 8.48051 15.5905 7.47623 14.8501 6.73578C14.1096 5.99532 13.1053 5.57933 12.0582 5.57933Z"
                          fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_918_1166">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Turn on Notifications
              </button>
              <button
                className="btn popup-btn color-strawberry-red popup-clear flex flex-align-center flex-justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M5.8335 17.5C5.37516 17.5 4.98294 17.3369 4.65683 17.0108C4.33072 16.6847 4.16738 16.2922 4.16683 15.8333V5H3.3335V3.33333H7.50016V2.5H12.5002V3.33333H16.6668V5H15.8335V15.8333C15.8335 16.2917 15.6704 16.6842 15.3443 17.0108C15.0182 17.3375 14.6257 17.5006 14.1668 17.5H5.8335ZM14.1668 5H5.8335V15.8333H14.1668V5ZM7.50016 14.1667H9.16683V6.66667H7.50016V14.1667ZM10.8335 14.1667H12.5002V6.66667H10.8335V14.1667Z"
                    fill="#EB2B2B" />
                </svg>
                Clear notifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
