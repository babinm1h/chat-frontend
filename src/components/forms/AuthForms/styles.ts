import styled from "styled-components";

export const StForm = styled.form`
  max-width: 800px;
  width: 100%;
`;

export const StField = styled.div`
  width: 100%;
  margin-top: 10px;
`;

export const StLabel = styled.label`
  color: ${({ theme }) => theme.currentTheme.text.secondary};
  display: block;
  margin: 2px 10px;
  font-size: 14px;
`;

export const StInput = styled.input`
  background-color: ${({ theme }) => theme.currentTheme.background.tertiary};
  padding: 12px 10px;
  color: ${({ theme }) => theme.currentTheme.text.primary};
  width: 100%;
  border-radius: 6px;
  font-size: 16px;
`;

export const StBtn = styled.button`
  color: ${({ theme }) => theme.currentTheme.text.primary};
  background-color: ${({ theme }) => theme.colors.common.primaryBlue};
  width: 100%;
  padding: 15px 0;
  border-radius: 6px;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.colors.common.blueHover};
  }
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

export const StBtnBlock = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 5px;
  flex-direction: column;
`;

export const StText = styled.div`
  color: ${({ theme }) => theme.currentTheme.text.primary};
  margin-top: 10px;
  a {
    text-decoration: underline;
    color: ${({ theme }) => theme.currentTheme.text.primary};
  }
`;

export const StError = styled.div`
  margin: 2px 10px;
  font-size: 14px;
  color: red;
`;

export const StDoubleFields = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;
