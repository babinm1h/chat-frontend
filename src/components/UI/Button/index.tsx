import cn from "classnames";
import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC, PropsWithChildren } from "react";
import styled from "styled-components";

const StBtn = styled.button<{ variant?: "text" | "default" }>`
  color: ${({ theme }) => theme.currentTheme.text.primary};
  background-color: ${({ theme }) => theme.colors.common.primaryBlue};
  padding: 8px 15px;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.3s ease-in-out;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  position: relative;
  &:hover {
    background-color: ${({ theme }) => theme.colors.common.blueHover};
  }
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.common.blueActive};
  }
  &.outlined {
    background-color: transparent;
    color: ${({ theme }) => theme.colors.common.primaryBlue};
    border: 1px solid ${({ theme }) => theme.colors.common.primaryBlue};
    &::before {
      background-color: ${({ theme }) => theme.colors.common.primaryBlue};
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      opacity: 0;
      transition: all 0.2s ease-in-out;
    }
    &:hover {
      &::before {
        opacity: 0.04;
      }
    }
    &:active {
      &::before {
        opacity: 0.08;
      }
    }
  }
`;

interface IProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: "outlined" | "default";
}

const Button: FC<PropsWithChildren<IProps>> = ({ children, variant = "default", ...props }) => {
  return (
    <StBtn {...(props as any)} className={cn(variant)}>
      {children}
    </StBtn>
  );
};

export default Button;
