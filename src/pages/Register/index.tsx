import React from "react";
import styled from "styled-components";
import RegisterForm from "../../components/forms/AuthForms/RegisterForm";

const StWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  margin-top: 50px;
  flex-direction: column;
`;

const RegisterPage = () => {
  return (
    <StWrapper>
      <RegisterForm />
    </StWrapper>
  );
};

export default RegisterPage;
