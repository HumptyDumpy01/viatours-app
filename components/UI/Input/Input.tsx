'use client';

import './Input.scss';
import { ReactNode, useState } from 'react';
import Icon from '@/components/UI/Icons/Icon';

type EmailInputType = {
  type: `email`;
  iconVisible: boolean;
  placeholder: string;
  name: string;
  questionMarkVisible: boolean;
// children: ReactNode;

}

type ConfirmPasswordInputType = {
  type: `confirm-password`;
  iconVisible: boolean;
  placeholder: string;
  name: string;
  // children: ReactNode;

}

type InputType = {
  type: `text` | `password`;
  iconVisible: boolean;
  placeholder: string;
  name: string;
  // children: ReactNode;
} | EmailInputType | ConfirmPasswordInputType;

export default function Input(props: InputType) {
  let icon: ReactNode;

  const [questionMarkIsHovered, setQuestionMarkIsHovered] = useState<boolean>(false);
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
            <Icon isOpen={questionMarkIsHovered} type={`question-mark`} onMouseEnter={handleShowTooltip}
                  onMouseLeave={handleHideTooltip} />
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
  if (props.type === `confirm-password`) {
    icon = (
      <Icon type={`confirm-password`} />
    );
  }

  return (
    <div
      className={`${props.type !== `password` ?
        `initials-input-wrapper` : `password-input-wrapper`} margin-bottom-24px`}>
      <label htmlFor={props.name}></label>
      <input type={props.type === `confirm-password` ? `password` :
        showPassword ? `text` : props.type} name={props.name} id={props.name}
             placeholder={props.placeholder}
             className="register__input" required />
      {props.iconVisible && (
        <>
          {icon}
        </>)}
    </div>
  );
}
