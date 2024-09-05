// 'use client';
import { ComponentPropsWithoutRef } from 'react';
import { motion } from 'framer-motion';
import { item } from '@/components/account-settings/contents/user-tour-purchases/UserTourPurchases';

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
} & ComponentPropsWithoutRef<'input'>;

export default function
  UserInput({
              readonly,
              required,
              defaultVal,
              redBox,
              htmlFor,
              type,
              placeholder,
              label,
              ...props
            }: UserInputType) {
  return (
    <motion.div
      variants={item}
      className={`account-settings__content__input${redBox ? `-red` : ``} flex flex-column`}>
      <label htmlFor={htmlFor}
             className={`account-settings__content__input-label ${readonly ? `disabled-input-label` : ``}`}>{label}</label>
      <input {...props} required={required} type={type} id={htmlFor} name={htmlFor}
             className={`account-settings__content__input-field ${readonly ? `disabled-input-field` : `input-field`}`}
             defaultValue={defaultVal} placeholder={placeholder} readOnly={readonly} />
    </motion.div>
  );
}
