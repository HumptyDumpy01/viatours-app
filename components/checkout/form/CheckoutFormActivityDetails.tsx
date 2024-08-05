'use client';

import '@/components/checkout/card/card-second-col/ActivityDetailsExtraInfo.scss';
import TravellerInput from '@/components/checkout/TravellerInput';
import { MeetingPointType } from '@/data/DUMMY_MEETING_POINTS';
import { FormEvent, useState } from 'react';
import { useCartDispatch, useCartSelector } from '@/store/hooks';
import { checkoutSliceActions } from '@/store/checkoutSlice';

type CheckoutFormActivityDetailsType = {
  adultTickets: number;
  youthTickets: number;
  childrenTickets: number;
  meetingPoint: MeetingPointType;
  languages: string[];
  // children: ReactNode;
}

export type transformedResultsType = {
  specialRequirements: string | boolean;
  tourLanguage: string;
  adults: { firstName: string, lastName: string }[] | [];
  youths: { firstName: string, lastName: string }[] | [];
  children: { firstName: string, lastName: string }[] | [];
}

export default function
  CheckoutFormActivityDetails({
                                adultTickets,
                                youthTickets,
                                childrenTickets,
                                meetingPoint,
                                languages
                              }: CheckoutFormActivityDetailsType) {
  const dispatch = useCartDispatch();
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const isActivityDetailsEmpty = useCartSelector((state) => state.checkout.activityDetails !== null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const currObject = e.currentTarget;
    const formData = new FormData(currObject);
    const results = Object.fromEntries(formData.entries()) as any;

    let transformedResults: transformedResultsType = {
      specialRequirements: results.specialRequirements.trim() ? results.specialRequirements : false,
      tourLanguage: results.tourLanguage,
      adults: [],
      youths: [],
      children: []
    };


    // this code works as expected and transforms the "results" object into the desired format
    //IMPORTANT:  DO NOT MODIFY THIS CODE
    Object.keys(results).forEach(key => {
      if (key.startsWith('traveler') && key.includes('Adult')) {

        const index = Number(key.match(/\d+/)![0]);

        if (!transformedResults.adults[index - 1]) {
          // @ts-ignore
          transformedResults.adults[index - 1] = {};
        }

        if (key.includes('LastName')) {
          transformedResults.adults[index - 1].lastName = results[key];
        } else {
          transformedResults.adults[index - 1].firstName = results[key];
        }

      } else if (key.startsWith('traveler') && key.includes('Youth')) {
        const index = Number(key.match(/\d+/)![0]);
        if (!transformedResults.youths[index - 1]) {
          // @ts-ignore
          transformedResults.youths[index - 1] = {};
        }
        if (key.includes('LastName')) {
          transformedResults.youths[index - 1].lastName = results[key];
        } else {
          transformedResults.youths[index - 1].firstName = results[key];
        }

      } else if (key.startsWith('traveler') && key.includes('Child')) {

        const index = Number(key.match(/\d+/)![0]);

        if (!transformedResults.children[index - 1]) {
          // @ts-ignore
          transformedResults.children[index - 1] = {};
        }
        if (key.includes('LastName')) {
          transformedResults.children[index - 1].lastName = results[key];
        } else {
          transformedResults.children[index - 1].firstName = results[key];
        }
      }
    });

    dispatch(checkoutSliceActions.pushData({ type: `activity`, data: transformedResults }));
    dispatch(checkoutSliceActions.setOpenPaymentDetails(true));
    // console.log(`Dispatched Activity Details data to store: `, transformedResults);
    setFormSubmitted(true);

    // by this we scroll 300px down to the next section: Payment Details
    window.scrollBy(0, 300);

    // console.log(transformedResults);
  }

  function setSubmitFormToFalse() {
    setFormSubmitted(false);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="book-now__details-2__form-traveller">
        {Array.from({ length: adultTickets }, (_, i) => (
          <div key={i} onClick={setSubmitFormToFalse}>
            <TravellerInput formIsSubmitted={formSubmitted} key={`adult-${i}`} traveler={`Adult`}
                            index={i + 1} />
          </div>
        ))}
        {Array.from({ length: youthTickets }, (_, i) => (
          <div key={i} onClick={setSubmitFormToFalse}>
            <TravellerInput formIsSubmitted={formSubmitted} key={`youth-${i}`} traveler={`Youth`}
                            index={i + 1} />
          </div>
        ))}
        {Array.from({ length: childrenTickets }, (_, i) => (
          <div key={i} onClick={setSubmitFormToFalse}>
            <TravellerInput formIsSubmitted={formSubmitted} key={`child-${i}`} traveler={`Child`}
                            index={i + 1} />
          </div>
        ))}

        <div className="meeting-point-container">
          <div className="meeting-point">
            <h3 className="meeting-point__heading">Meeting point</h3>
            <div className="meeting-point__location flex flex-align-center gap-13px">
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="36" viewBox="0 0 35 36" fill="none">
                <path
                  d="M17.5003 17.2707C16.5334 17.2707 15.6061 16.8866 14.9223 16.2028C14.2386 15.5191 13.8545 14.5918 13.8545 13.6248C13.8545 12.6579 14.2386 11.7306 14.9223 11.0468C15.6061 10.3631 16.5334 9.979 17.5003 9.979C18.4673 9.979 19.3946 10.3631 20.0783 11.0468C20.762 11.7306 21.1462 12.6579 21.1462 13.6248C21.1462 14.1036 21.0519 14.5777 20.8686 15.02C20.6854 15.4624 20.4169 15.8643 20.0783 16.2028C19.7398 16.5414 19.3379 16.8099 18.8955 16.9931C18.4532 17.1764 17.9791 17.2707 17.5003 17.2707ZM17.5003 3.4165C14.7929 3.4165 12.1964 4.49202 10.2819 6.40646C8.36751 8.32089 7.29199 10.9174 7.29199 13.6248C7.29199 21.2811 17.5003 32.5832 17.5003 32.5832C17.5003 32.5832 27.7087 21.2811 27.7087 13.6248C27.7087 10.9174 26.6331 8.32089 24.7187 6.40646C22.8043 4.49202 20.2077 3.4165 17.5003 3.4165Z"
                  fill="#EB662B" />
              </svg>
              <p
                className="meeting-point__location__text color-blue-lighter">{meetingPoint.title}, {meetingPoint.city}({meetingPoint.state})</p>
            </div>
          </div>
        </div>
        <div className="extra-info-container">
          <div className="extra-info">
            <div className="extra-info__tour-language grid" onClick={setSubmitFormToFalse}>
              <h3 className="extra-info__tour-language__heading">Tour language</h3>
              <select className={`tour-language
               ${formSubmitted ? `book-now__details__input-success`
                : ``}`} name="tourLanguage"
                      id="tour-language" required>
                <option value="">Choose</option>
                {languages.map((language, index) => (
                  <option className={`extra-info__tour-language__text`} key={index} value={language}>{language}</option>
                ))}
              </select>
            </div>
            <div className="extra-info__special-requirements-container">
              <div className="extra-info__special-requirements" onClick={setSubmitFormToFalse}>
                <h3 className="extra-info__special-requirements__heading">Special Requirements</h3>

                <div className="flex flex-direction-column gap-13px">
                  <label htmlFor="special-requirements"></label>
                  <input id="special-requirements" name={`specialRequirements`} type="text"
                         placeholder="e.g. dietary requirements, mobility issues"
                         className={`book-now__details__input 
                         ${formSubmitted ? `book-now__details__input-success` :
                           ``}`} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-direction-column gap-sm">
          {!formSubmitted && (
            <>
              <button className="btn btn--next-activity-details contact-details-next"
                      type="submit">Next
              </button>
            </>
          )}
          {(formSubmitted && (
            <>
              <button className="btn btn--next-activity-details contact-details-next"
                      type="submit">Saved
              </button>
            </>
          ))}

          {(formSubmitted || (!formSubmitted && !isActivityDetailsEmpty)) &&
            (
              <>
                <div className={`paragraph-container`}>
                  <p className={`paragraph`}>*</p>
                  <p className={`paragraph`}>Activity Details are saved! If you want to update them, make
                    changes and click on the button
                    again.</p>
                </div>
              </>
            )}
        </div>
      </form>
    </>
  );
}
