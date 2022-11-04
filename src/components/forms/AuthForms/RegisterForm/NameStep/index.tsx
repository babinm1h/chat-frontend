import React, { FC } from "react";
import { FieldErrorsImpl, UseFormRegisterReturn } from "react-hook-form";
import styled from "styled-components";
import { TGender } from "../../../../../types/entities";
import RadioButton from "../../../../UI/RadioButton";
import TextField from "../../../../UI/TextField";
import { StDoubleFields } from "../../styles";

const StGenders = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 20px 0;
`;

interface IProps {
  errors: FieldErrorsImpl<{ email: string; password: string; name1: string; name2: string }>;
  firstNameRegister: UseFormRegisterReturn<"name1">;
  lastNameRegister: UseFormRegisterReturn<"name2">;
  onGenderChange: (gender: TGender) => void;
}

const NameStep: FC<IProps> = ({ errors, firstNameRegister, lastNameRegister, onGenderChange }) => {
  return (
    <>
      <StDoubleFields>
        <TextField
          type="text"
          placeholder="First Name"
          label="First Name"
          register={firstNameRegister}
          error={errors.name1?.message}
        />
        <TextField
          type="text"
          placeholder="Last Name"
          label="Last Name"
          register={lastNameRegister}
          error={errors.name2?.message}
        />
      </StDoubleFields>

      <StGenders>
        <RadioButton
          name="gender"
          label="Male"
          value="male"
          onChange={(e) => onGenderChange(e.target.value as TGender)}
        />
        <RadioButton
          name="gender"
          label="Female"
          value="female"
          onChange={(e) => onGenderChange(e.target.value as TGender)}
        />
      </StGenders>
    </>
  );
};

export default NameStep;
