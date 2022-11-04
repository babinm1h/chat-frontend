import React, { DetailedHTMLProps, InputHTMLAttributes, FC } from "react";
import styled from "styled-components";

const StRadio = styled.span`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.currentTheme.background.icon};
  z-index: 1;
  cursor: pointer;
  position: relative;
  &::after {
    position: absolute;
    content: "";
    width: 10px;
    height: 10px;
    background-color: ${({ theme }) => theme.colors.common.primaryBlue};
    display: inline-block;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: all 0.21s ease-in-out;
  }
  &::before {
    position: absolute;
    content: "";
    width: 30px;
    height: 30px;
    background-color: rgba(80, 182, 255, 0.15);
    display: inline-block;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: all 0.15s ease-in-out;
  }
  &:active {
    &::before {
      transform: translate(-50%, -50%) scale(1);
      width: 40px;
      height: 40px;
    }
  }
  &:hover {
    &::before {
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

const StWrapper = styled.label`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 15px;
  align-self: flex-start;
  input {
    display: none;
    &:checked {
      ~ ${StRadio} {
        border-color: ${({ theme }) => theme.colors.common.primaryBlue};
        &::after {
          transform: translate(-50%, -50%) scale(1);
        }
      }
    }
  }
`;

const StLabel = styled.span`
  color: ${({ theme }) => theme.currentTheme.text.primary};
`;

interface IProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  error?: string;
}

const RadioButton: FC<IProps> = ({ label, error, ...props }) => {
  return (
    <StWrapper>
      <input {...props} type="radio" />
      <StRadio />
      <StLabel>{label}</StLabel>
    </StWrapper>
  );
};

export default RadioButton;
