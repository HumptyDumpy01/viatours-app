'use client';
import '@/app/tours/page.scss';
import { useFormState } from 'react-dom';
import FormSubmit from '@/components/UI/Button/FormSubmit';
import SearchInput from '@/components/UI/Input/SearchInput';

/* IMPORTANT: DO NOT FORGET TO GIVE A PROPER TYPE FOR ACTION */
// @ts-ignore
export default function FormSearch({ action }) {
  // Thus you would be able to use the error messages to inject them onto your form.
  const [state, formAction] = useFormState(action, { errors: null });

  return (
    <>
      <form action={formAction} className="flex gap-sm">
        <SearchInput
          type={`search`}
          name={`search-term`}
          className={`all-tours__search-tour-input`}
          placeholder={`Search`}
        />
        <FormSubmit
          btnClassName={`all-tours__search-tour-btn`}
          btnTextIsPending={`Searching...`}
          btnTextDefault={`Search`} />
      </form>
    </>
  );
}
