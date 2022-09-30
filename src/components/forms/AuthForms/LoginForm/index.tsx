import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { login } from "../../../../redux/thunks/auth.thunks";
import { validate } from "../../../../utils/validate";
import { AllRoutes } from "../../../AppRoutes";
import { StForm, StField, StError, StLabel, StInput, StBtn, StText, StBtnBlock } from "../styles";

interface IForm {
  email: string;
  password: string;
}

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const { isAuth, loginError } = useAppSelector((state) => state.auth);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<IForm>();

  const onSubmit: SubmitHandler<IForm> = (data) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (isAuth) {
      nav(AllRoutes.main);
    }
  }, [isAuth]);

  return (
    <StForm onSubmit={handleSubmit(onSubmit)}>
      <StField>
        {errors.email ? <StError>{errors.email.message}</StError> : <StLabel htmlFor="email">Email</StLabel>}
        <StInput type="email" placeholder="Your Email" id="email" {...register("email", validate(5, 50))} />
      </StField>
      <StField>
        {errors.password ? (
          <StError>{errors.password.message}</StError>
        ) : (
          <StLabel htmlFor="password">Password</StLabel>
        )}
        <StInput
          type="password"
          placeholder="Password"
          id="password"
          {...register("password", validate(3, 32))}
        />
      </StField>
      <StBtnBlock>
        {loginError && <StError>{loginError}</StError>}
        <StBtn type="submit" disabled={!!errors.email || !!errors.password}>
          Login
        </StBtn>
        <StText>
          Don't have an account? <NavLink to={AllRoutes.register}>Create account</NavLink>
        </StText>
      </StBtnBlock>
    </StForm>
  );
};

export default LoginForm;
