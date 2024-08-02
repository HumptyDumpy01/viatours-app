// 'use client';
import '../Filter/Filter.scss';
import starFilled from '../../../assets/images/homepage/findPopularTours/one-star.svg';
import Image from 'next/image';

interface CheckBoxRatingInterface {
  id: string;
  label: string;
  tag: `rating=`;
  stars: number;
  rated: number;
}

interface CheckBoxInterface {
  id: string;
  label: string;
  tag: `tour-type` | `price=` | `duration=` | `language=` | `tour-group-size` | `onsale=`;
  // children: ReactNode;
}

export default function CheckBox(props: CheckBoxInterface | CheckBoxRatingInterface) {
  if (!props.tag) throw new Error(`Tag is required!`);

  if (props.tag !== `rating=`) {
    return (
      <div className="all-tours__content__filter-filter-item">
        <input type="checkbox" id={props.id} name={`${props.tag}:${props.id}`}
               className="all-tours__content__filter-tour-type__checkbox" />
        <label className="all-tours__content__filter-tour-type__checkbox__label flex"
               htmlFor={props.id}>{props.label}</label>
      </div>
    );
  }
  if (props.tag === `rating=`) {
    return (
      <div className="all-tours__content__filter-filter-item">
        <input
          type="checkbox"
          id={`stars-${props.stars}`}
          name={`rating-${props.stars}`}
          className="all-tours__content__filter-tour-type__checkbox" />
        <label className="all-tours__content__filter-tour-type__checkbox__label flex" htmlFor={`${props.stars}-stars`}>
          {/* based on the star number, output the exact amount of star images*/}
          {Array.from({ length: props.stars }).map((_, index) => (
            <Image key={index} width={15} height={15} src={starFilled} alt="star filled" />
          ))}
        </label>
        <p>({props.rated})</p>
      </div>
    );
  }

}
