import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { registrate } from "../../../../redux/thunks/auth.thunks";
import { validate } from "../../../../utils/validate";
import { AllRoutes } from "../../../AppRoutes";
import {
  StForm,
  StField,
  StError,
  StLabel,
  StInput,
  StDoubleFields,
  StBtn,
  StText,
  StBtnBlock,
} from "../styles";

interface IForm {
  email: string;
  password: string;
  name1: string;
  name2: string;
}

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const { isAuth, registerError } = useAppSelector((state) => state.auth);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<IForm>();

  const onSubmit: SubmitHandler<IForm> = (data) => {
    dispatch(registrate({ ...data, firstName: data.name1, lastName: data.name2 }));
  };

  useEffect(() => {
    if (!isAuth) return;
    if (isAuth) {
      reset();
      nav(AllRoutes.main);
    }
  }, [isAuth]);

  return (
    <StForm onSubmit={handleSubmit(onSubmit)}>
      <StField>
        {errors.email ? (
          <StError>{errors.email.message}</StError>
        ) : registerError ? (
          <StError>{registerError}</StError>
        ) : (
          <StLabel htmlFor="email">Email</StLabel>
        )}
        <StInput type="email" placeholder="Your Email" id="email" {...register("email", validate(5, 50))} />
      </StField>
      <StDoubleFields>
        <StField>
          {errors.name1 ? (
            <StError>{errors.name1.message}</StError>
          ) : (
            <StLabel htmlFor="name1">First name</StLabel>
          )}
          <StInput type="text" placeholder="Firstname" id="name1" {...register("name1", validate(1, 30))} />
        </StField>
        <StField>
          {errors.name2 ? (
            <StError>{errors.name2.message}</StError>
          ) : (
            <StLabel htmlFor="name2">Second name</StLabel>
          )}

          <StInput type="text" placeholder="Lastname" id="name2" {...register("name2", validate(1, 30))} />
        </StField>
      </StDoubleFields>
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
        <StBtn type="submit">Create Account</StBtn>
        <StText>
          Already have an account? <NavLink to={AllRoutes.login}>Login</NavLink>
        </StText>
      </StBtnBlock>
    </StForm>
  );
};

export default RegisterForm;
