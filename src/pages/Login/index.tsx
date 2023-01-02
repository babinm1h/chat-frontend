import React from 'react';
import styled from 'styled-components';
import LoginForm from '../../components/forms/AuthForms/LoginForm';

const StWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginPage = () => {
  return (
    <StWrapper>
      <LoginForm />
    </StWrapper>
  );
};

export default LoginPage;
