'use client';

type UserProfileHeadingType = {
  handleEnableEditing: () => void;
  handleCancelChanges: () => void;
  mode: 'view' | 'edit';
  // children: ReactNode;
}
export default function
  UserProfileHeading({
                       handleEnableEditing,
                       handleCancelChanges,
                       mode
                     }: UserProfileHeadingType) {

  return (
    <div className="account-settings__content-my-profile-heading flex">
      <h2 className="my-profile-heading">My Profile</h2>

      {mode === `edit` && (
        <button type={`button`} onClick={handleCancelChanges}
                className="my-profile-cancel-button-wrapper flex flex-align-center">
          <p className="btn my-profile-cancel-button">Cancel</p>
          <svg className="my-profile-cancel-button--icon" xmlns="http://www.w3.org/2000/svg" width="12" height="12"
               viewBox="0 0 12 12" fill="none">
            <path d="M0.75708 11.2438L6.00008 6.00081L11.2431 11.2438M11.2431 0.757812L5.99908 6.00081L0.75708 0.757812"
                  stroke="#EB662B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
      <button type={mode === `view` ? `button` : `submit`} onClick={mode === `view` ? handleEnableEditing : undefined}
              className="btn my-profile-edit-button-wrapper flex flex-align-center">
        <p className="btn my-profile-edit-button">{mode === `view` ? `Edit` : `Apply`}</p>
        <svg className="my-profile-edit-button__icon" xmlns="http://www.w3.org/2000/svg" width="13" height="14"
             viewBox="0 0 13 14" fill="none">
          <path
            d="M-0.000976562 10.7922V13.5005H2.70729L10.6949 5.5129L7.98662 2.80462L-0.000976562 10.7922ZM12.7893 3.4185C12.8562 3.35169 12.9094 3.27232 12.9456 3.18496C12.9818 3.09759 13.0005 3.00393 13.0005 2.90934C13.0005 2.81476 12.9818 2.7211 12.9456 2.63373C12.9094 2.54637 12.8562 2.467 12.7893 2.40019L11.0993 0.710228C11.0325 0.643277 10.9531 0.590161 10.8658 0.553919C10.7784 0.517678 10.6848 0.499023 10.5902 0.499023C10.4956 0.499023 10.4019 0.517678 10.3146 0.553919C10.2272 0.590161 10.1478 0.643277 10.081 0.710228L8.75938 2.03186L11.4676 4.74014L12.7893 3.4185Z"
            fill="#EB662B" />
        </svg>
        <svg className="my-profile-edit-button__icon--save hidden" xmlns="http://www.w3.org/2000/svg" width="24"
             height="24"
             viewBox="0 0 24 24" fill="none">
          <path
            d="M13.23 22V19.79L18.564 14.483C18.6627 14.3963 18.765 14.333 18.871 14.293C18.9777 14.2517 19.0843 14.231 19.191 14.231C19.301 14.231 19.4123 14.2523 19.525 14.295C19.6383 14.3383 19.7377 14.403 19.823 14.489L20.748 15.433C20.83 15.5317 20.8923 15.6343 20.935 15.741C20.9783 15.847 21 15.9533 21 16.06C21 16.1667 20.9827 16.274 20.948 16.382C20.9133 16.49 20.8467 16.5933 20.748 16.692L15.44 22H13.23ZM6.77 9.77H14.192V6.77H6.77V9.77ZM19.19 17.016L20.115 16.06L19.191 15.116L18.241 16.066L19.19 17.016ZM10.463 20H5.616C5.168 20 4.78667 19.8427 4.472 19.528C4.15733 19.2133 4 18.8323 4 18.385V5.615C4 5.16833 4.15733 4.78733 4.472 4.472C4.78667 4.15733 5.168 4 5.616 4H16.577L20 7.423V11.569C19.8373 11.5123 19.6813 11.4793 19.532 11.47C19.3827 11.4607 19.2247 11.4617 19.058 11.473C18.6347 11.4843 18.2133 11.5727 17.794 11.738C17.3747 11.9033 17.006 12.1427 16.688 12.456L13.866 15.26C13.93 15.1493 13.9747 15.042 14 14.938C14.0253 14.834 14.0383 14.7137 14.039 14.577C14.039 14.013 13.8467 13.5387 13.462 13.154C13.0773 12.7693 12.603 12.577 12.039 12.577C11.475 12.577 11.0007 12.7693 10.616 13.154C10.2313 13.5387 10.039 14.013 10.039 14.577C10.039 15.141 10.2313 15.6153 10.616 16C11.0007 16.3847 11.475 16.577 12.039 16.577C12.1577 16.577 12.2737 16.564 12.387 16.538C12.5003 16.512 12.61 16.4673 12.716 16.404L10.462 18.638L10.463 20Z"
            fill="white" />
        </svg>
      </button>

    </div>
  );
}
