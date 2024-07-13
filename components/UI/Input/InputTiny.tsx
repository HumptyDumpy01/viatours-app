// 'use client';
import '../Filter/Filter.scss';

interface InputTinyInterface {
  placeholder: string;
  id: string;
  name: string;
  // children: ReactNode;
}

export default function InputTiny({ placeholder, id, name }: InputTinyInterface) {
  return (
    <label htmlFor={id}>
      <input
        id={id}
        name={name}
        type="text"
        className="all-tours__content__filter-datepicker"
        placeholder={placeholder}
        required />
    </label>
  );
}
