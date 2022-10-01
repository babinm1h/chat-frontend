import React from "react";
import styled from "styled-components";
import { SendIcon } from "../../../utils/icons";

const StWrapper = styled.form`
  background-color: ${({ theme }) => theme.currentTheme.background.secondary};
  padding: 10px 20px;
  flex-shrink: 0;
  display: flex;
  gap: 10px;
  button {
    font-size: 28px;
    transform: rotate(45deg);
    color: ${({ theme }) => theme.colors.common.primaryBlue};
    background-color: transparent;
    transition: all 0.2s ease-in;
    &:hover {
      color: ${({ theme }) => theme.colors.common.blueHover};
    }
  }
`;

const StInput = styled.input`
  flex: 1 1 auto;
  padding: 10px;
  color: ${({ theme }) => theme.currentTheme.text.primary};
  background-color: transparent;
`;

const DialogForm = () => {
  return (
    <StWrapper>
      <StInput placeholder="New message..." />
      <button>
        <SendIcon />
      </button>
    </StWrapper>
  );
};

export default DialogForm;
