// 'use client';

type TravellerInputType = {
  traveler: `Adult` | `Youth` | `Child`;
  index: number;
  // children: ReactNode;
}

export default function TravellerInput({ index, traveler }: TravellerInputType) {
  return (
    <>
      <h2 className="book-now__details__traveller-heading">Traveller {index} ({traveler})</h2>
      <div className="book-now__details-2__form-traveller__inputs">
        <div className="grid gap-13px">
          <label htmlFor={`travelerName${index}`}
                 className="book-now__details-label">Name</label>
          <input
            id={`travelerName${index}${traveler}`}
            name={`traveler${index}Name`}
            type="text"
            placeholder="Name"
            className="book-now__details__input" required />
        </div>

        <div className="grid gap-13px">
          <label
            htmlFor={`travelerLastName${index}`}
            className="book-now__details-label">Surname</label>
          <input
            id={`travelerLastName${index}`}
            name={`travelerLastName${index}${traveler}`}
            type="text"
            placeholder="Last Name"
            className="book-now__details__input" required />
        </div>
      </div>
    </>
  );
}
