import cn from "classnames";
import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC, PropsWithChildren } from "react";
import styled from "styled-components";

const StBtn = styled.button<{ variant?: "text" | "default" }>`
  color: ${({ theme }) => theme.currentTheme.text.primary};
  background-color: ${({ theme }) => theme.colors.common.primaryBlue};
  padding: 10px 24px;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.3s ease-in-out;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
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
`;

interface IProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: "text" | "default";
}

const Button: FC<PropsWithChildren<IProps>> = ({ children, variant = "default", ...props }) => {
  return (
    <StBtn {...(props as any)} className={cn(variant)}>
      {children}
    </StBtn>
  );
};

export default Button;
