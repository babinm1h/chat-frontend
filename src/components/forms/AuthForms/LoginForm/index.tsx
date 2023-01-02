import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { login } from '../../../../redux/thunks/auth.thunks';
import { validate } from '../../../../utils/validate';
import { AllRoutes } from '../../../AppRoutes';
import Button from '../../../UI/Button';
import TextField from '../../../UI/TextField';
import { StForm, StError, StText, StBtnBlock } from '../styles';

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
      nav(AllRoutes.dialogs);
      reset();
    }
  }, [isAuth]);

  return (
    <StForm onSubmit={handleSubmit(onSubmit)} style={{ gap: `10px` }}>
      <TextField
        label="Email"
        error={errors.email?.message}
        register={register('email', validate(5, 50))}
        placeholder="Your email"
        type="email"
      />
      <TextField
        label="Password"
        error={errors.password?.message}
        register={register('password', validate(3, 32))}
        placeholder="Your password"
        type="password"
      />
      <StBtnBlock>
        {loginError && <StError>{loginError}</StError>}
        <Button type="submit" disabled={!!errors.email || !!errors.password}>
          Login
        </Button>
        <StText>
          Don't have an account? <NavLink to={AllRoutes.register}>Create account</NavLink>
        </StText>
      </StBtnBlock>
    </StForm>
  );
};

export default LoginForm;
