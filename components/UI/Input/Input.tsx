'use client';

import './Input.scss';
import React, { ReactNode, useState } from 'react';
import Icon from '@/components/UI/Icons/Icon';

type EmailInputType = {
  type: `email`;
  iconVisible: boolean;
  placeholder: string;
  name: string;
  questionMarkVisible: boolean;
  disabled: boolean;
// children: ReactNode;

}

type ConfirmPasswordInputType = {
  type: `confirmPassword`;
  iconVisible: boolean;
  placeholder: string;
  name: string;
  disabled: boolean;
  // children: ReactNode;

}

type InputType = {
  type: `text` | `password` | `default`;
  iconVisible: boolean;
  placeholder: string;
  name: string;
  disabled: boolean;
  // children: ReactNode;
} | EmailInputType | ConfirmPasswordInputType;

export default function Input(props: InputType) {
  let icon: ReactNode;

  const [questionMarkIsHovered, setQuestionMarkIsHovered] = useState<boolean>(false);
  const [questionMarkIsVisible, setQuestionMarkIsVisible] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  function handleShowTooltip() {
    setQuestionMarkIsHovered(true);
  }

  function handleHideTooltip() {
    setQuestionMarkIsHovered(false);
  }

  function toggleShowPassword() {
    setShowPassword(prevState => !prevState);
  }

  function handleHideQuestionMark(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value.trim() !== ``) {
      setQuestionMarkIsVisible(false);
    } else {
      setQuestionMarkIsVisible(true);
    }
  }


  if (!props.type) {
    throw new Error(`Please provide a type for the input field!`);
  }

  if (props.type === `text`) {
    icon = (
      <>
        <Icon type={`user`} />
      </>
    );
  }
  if (props.type === `email`) {
    icon = (
      <>
        <Icon type={`email`} />
        {props.questionMarkVisible && (
          <>
            {questionMarkIsVisible && (
              <>
                <Icon isOpen={questionMarkIsHovered} type={`question-mark`} onMouseEnter={handleShowTooltip}
                      onMouseLeave={handleHideTooltip} />
              </>
            )}
          </>

        )}
      </>
    );
  }

  if (props.type === `password`) {
    icon = (
      <>
        <Icon showPassword={showPassword} toggleShowPassword={toggleShowPassword} type={`password`} />
      </>
    );
  }
  if (props.type === `confirmPassword`) {
    icon = (
      <Icon type={`confirm-password`} />
    );
  }

  return (
    <div
      className={`${props.type !== `password` ?
        `initials-input-wrapper` : `password-input-wrapper`} margin-bottom-24px`}>
      <label htmlFor={props.name}></label>
      {(
          props.type !== `email` &&
          props.type !== `default`) &&
        <input disabled={props.disabled} type={props.type === `confirmPassword` ? `password` :
          showPassword ? `text` : props.type} name={props.name} id={props.name}
               placeholder={props.placeholder}
               className={`register__input ${props.disabled ? `register__input-pending` : ``}`} required />
      }

      {props.type === `email` && (
        <>
          <input disabled={props.disabled} onChange={handleHideQuestionMark} type={`email`} id={props.name}
                 placeholder={props.placeholder} name={props.name}
                 className={`register__input ${props.disabled ? `register__input-pending` : ``}`} required />
        </>
      )}

      {props.type === `default` && (
        <>
          <input disabled={props.disabled} type={`text`} name={props.name} id={props.name}
                 placeholder={props.placeholder} minLength={1} maxLength={100}
                 className={`register__input ${props.disabled ? `register__input-pending` : ``}`} required
          />
        </>
      )}
      {props.iconVisible && (
        <>
          {icon}
        </>)}
    </div>
  );
}
