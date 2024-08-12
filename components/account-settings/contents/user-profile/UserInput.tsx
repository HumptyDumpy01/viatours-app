// 'use client';

type UserInputType = {
  readonly: boolean;
  defaultVal: string | undefined;
  type: `email` | `password` | `tel` | `text`;
  htmlFor: string;
  placeholder: string;
  label: string;
  redBox?: boolean;
  required: boolean;
  // children: ReactNode;
}

export default function
  UserInput({
              readonly,
              required,
              defaultVal,
              redBox,
              htmlFor,
              type,
              placeholder,
              label
            }: UserInputType) {
  return (
    <>
      <div className={`account-settings__content__input${redBox ? `-red` : ``} flex flex-column`}>
        <label htmlFor={htmlFor}
               className={`account-settings__content__input-label ${readonly ? `disabled-input-label` : ``}`}>{label}</label>
        <input required={required} type={type} id={htmlFor} name={htmlFor}
               className={`account-settings__content__input-field ${readonly ? `disabled-input-field` : ``}`}
               defaultValue={defaultVal} placeholder={placeholder} readOnly={readonly} />
      </div>
    </>
  );
}
