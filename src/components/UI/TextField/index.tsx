import cn from "classnames";
import React, { DetailedHTMLProps, FC, InputHTMLAttributes, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import styled from "styled-components";

const StLabel = styled.label`
  transition: all 0.15s ease-in-out;
  font-size: 80%;
  color: ${({ theme }) => theme.currentTheme.background.icon};
  &.error {
    color: red;
  }
`;

const StWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;

  input {
    width: 100%;
    border-radius: 2px 2px 0 0;
    background-color: ${({ theme }) => theme.currentTheme.background.tertiary};
    height: 40px;
    font-size: 1rem;
    color: ${({ theme }) => theme.currentTheme.text.primary};
    padding: 0 14px;
    transition: all 0.2s ease-in-out;
    border-bottom: 1px solid ${({ theme }) => theme.currentTheme.background.icon};
    &.error {
      border-color: red;
      &::placeholder {
        color: red;
      }
    }
    &:focus {
      &:not(&.error) {
        border-color: ${({ theme }) => theme.colors.common.primaryBlue};
      }
      background-color: ${({ theme }) => theme.currentTheme.background.tertiary};
    }
  }
`;

interface IProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  error?: string;
  register?: UseFormRegisterReturn;
}

const TextField: FC<IProps> = ({ label, error, ...props }) => {
  return (
    <StWrapper className={cn("textfield", props.className, { error: !!error })}>
      <StLabel htmlFor={label} className={cn("textfield__label", { error: !!error })}>
        {error ? error : label}
      </StLabel>
      <input {...props} id={label} className={cn({ error: !!error })} {...props?.register} />
    </StWrapper>
  );
};

export default TextField;
