import React, { FC } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import TextField from "../../../../UI/TextField";

interface IProps {
  error?: FieldError;
  register: UseFormRegisterReturn<"password">;
}

const PasswordStep: FC<IProps> = ({ register, error }) => {
  return (
    <TextField
      placeholder="Password"
      type="password"
      label="Password"
      register={register}
      error={error?.message}
    />
  );
};

export default PasswordStep;
