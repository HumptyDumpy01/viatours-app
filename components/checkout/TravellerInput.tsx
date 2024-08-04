// 'use client';

type TravellerInputType = {
  traveler: `Adult` | `Youth` | `Child`;
  index: number;
  formIsSubmitted: boolean;
  // children: ReactNode;
}

export default function TravellerInput({ index, traveler, formIsSubmitted }: TravellerInputType) {
  return (
    <>
      <h2 className="book-now__details__traveller-heading">Traveller ({traveler})</h2>
      <div className="book-now__details-2__form-traveller__inputs">
        <div className="grid gap-13px">
          <label htmlFor={`travelerName${index}`}
                 className="book-now__details-label">Name</label>
          <input
            id={`traveler${index}${traveler}`}
            name={`traveler${index}${traveler}`}
            type="text"
            placeholder="Name"
            className={`book-now__details__input ${formIsSubmitted ? `book-now__details__input-success` : ``}`}
            required />
        </div>

        <div className="grid gap-13px">
          <label
            htmlFor={`travelerLastName${index}${traveler}`}
            className="book-now__details-label">Surname</label>
          <input
            id={`travelerLastName${index}${traveler}`}
            name={`travelerLastName${index}${traveler}`}
            type="text"
            placeholder="Last Name"
            className={`book-now__details__input ${formIsSubmitted ? `book-now__details__input-success` : ``}`}
            required />
        </div>
      </div>
    </>
  );
}
