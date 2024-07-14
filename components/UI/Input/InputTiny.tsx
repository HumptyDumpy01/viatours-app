// 'use client';
import '../Filter/Filter.scss';
import { ComponentPropsWithoutRef } from 'react';

type InputTinyInterface = {
  placeholder: string;
  id: string;
  name: string;
  readonly?: boolean | undefined;
  // children: ReactNode;
} & ComponentPropsWithoutRef<'input'>;

export default function InputTiny({ placeholder, id, name, readonly, ...props }: InputTinyInterface) {
  return (
    <label htmlFor={id}>
      <input
        readOnly={readonly}
        id={id}
        {...props}
        name={name}
        type="text"
        className="all-tours__content__filter-datepicker"
        placeholder={placeholder}
        required />
    </label>
  );
}
