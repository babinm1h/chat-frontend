import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { AllRoutes } from "../../components/AppRoutes";
import LoginForm from "../../components/forms/AuthForms/LoginForm";
import RegisterForm from "../../components/forms/AuthForms/RegisterForm";

const StWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AuthPage = () => {
  const location = useLocation();

  return <StWrapper>{location.pathname === AllRoutes.register ? <RegisterForm /> : <LoginForm />}</StWrapper>;
};

export default AuthPage;
