import { FC } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import styled from "styled-components";
import CountrySelect from "../../../../CountrySelect";
import TextField from "../../../../UI/TextField";

interface IProps {
  error?: FieldError;
  register: UseFormRegisterReturn<"email">;
  onCountryChange: (option: any) => void;
}

const StCountry = styled.div`
  margin-top: 20px;
`;

const EmailStep: FC<IProps> = ({ error, register, onCountryChange }) => {
  return (
    <>
      <TextField
        placeholder="Your email"
        register={register}
        label="Email"
        error={error?.message}
        type="email"
      />

      <StCountry>
        <CountrySelect onCountryChange={onCountryChange} />
      </StCountry>
    </>
  );
};

export default EmailStep;
