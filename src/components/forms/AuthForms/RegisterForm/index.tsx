import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { registrate } from "../../../../redux/thunks/auth.thunks";
import { TGender } from "../../../../types/entities";
import { notifyError } from "../../../../utils/notifyError";
import { validate } from "../../../../utils/validate";
import { AllRoutes } from "../../../AppRoutes";
import Stepper from "../../../Stepper";
import StepperControls from "../../../Stepper/StepperControls";
import { StCommonError, StError, StForm, StText } from "../styles";
import EmailStep from "./EmailStep";
import NameStep from "./NameStep";
import PasswordStep from "./PasswordStep";

interface IForm {
  email: string;
  password: string;
  name1: string;
  name2: string;
  country: { value: string; label: string };
  gender: TGender;
}

const RegisterForm = () => {
  const steps = [
    { title: "Email", number: 1 },
    { title: "Name", number: 2 },
    { title: "Password", number: 3 },
  ];
  const [activeStep, setActiveStep] = useState<number>(1);

  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const { isAuth, registerError } = useAppSelector((state) => state.auth);

  const getRegisterError = () => {
    if (Array.isArray(registerError)) {
      return registerError.join(", ");
    }
    return registerError;
  };

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IForm>();

  const onSubmit: SubmitHandler<IForm> = (data) => {
    dispatch(registrate({ ...data, firstName: data.name1, lastName: data.name2 }));
  };

  const onCountryChange = (option: { value: string; label: string }) => {
    setValue("country", option);
  };

  const onGenderChange = (gender: TGender) => {
    setValue("gender", gender);
  };

  useEffect(() => {
    if (!isAuth) return;
    if (isAuth) {
      reset();
      nav(AllRoutes.main);
    }
  }, [isAuth]);

  return (
    <>
      <Stepper steps={steps} activeStep={activeStep} setActiveStep={setActiveStep} />
      <StForm onSubmit={handleSubmit(onSubmit)}>
        {activeStep === 1 ? (
          <EmailStep
            onCountryChange={onCountryChange}
            error={errors.email}
            register={register("email", validate(5, 40))}
          />
        ) : activeStep === 2 ? (
          <NameStep
            errors={errors}
            firstNameRegister={register("name1", validate(1, 30))}
            lastNameRegister={register("name2", validate(1, 30))}
            onGenderChange={onGenderChange}
          />
        ) : (
          <PasswordStep error={errors.password} register={register("password", validate(3, 32))} />
        )}

        <StText>
          Already have an account? <NavLink to={AllRoutes.login}>Login</NavLink>
        </StText>
        {registerError && <StCommonError>{getRegisterError()}</StCommonError>}
        <StepperControls activeStep={activeStep} setActiveStep={setActiveStep} stepsLength={steps.length} />
      </StForm>
    </>
  );
};

export default RegisterForm;
