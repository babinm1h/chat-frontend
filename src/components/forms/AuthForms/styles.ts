import styled from "styled-components";

export const StForm = styled.form`
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
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
  border-radius: 2px 2px 0 0;
  font-size: 1rem;
  position: relative;
  display: inline-flex;
`;



export const StBtnBlock = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 5px;
  flex-direction: column;
`;

export const StText = styled.div`
  color: ${({ theme }) => theme.currentTheme.text.primary};
  margin: 8px 0;
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

export const StCommonError = styled.div`
  margin: 5px 0;
  color: red;
`;
