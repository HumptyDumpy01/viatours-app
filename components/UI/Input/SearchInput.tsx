// 'use client';
import './SearchInput.scss';

interface SearchInputInterface {
  type: string;
  name: string;
  className: string;
  placeholder: string;
  // children: ReactNode;
}

export default function SearchInput({ type, name, className, placeholder }: SearchInputInterface) {
  return (
    <label>
      <input type={type} name={name} className={className} placeholder={placeholder}
             required />
    </label>
  );
}
