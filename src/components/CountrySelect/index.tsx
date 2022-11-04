import React, { FC, useMemo } from "react";
import countryList from "react-select-country-list";
import styled from "styled-components";
import CustomSelect from "../UI/CustomSelect";

const StOption = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const StFlag = styled.img`
  width: 18px;
`;

const StCountryName = styled.span``;

interface IProps {
  onCountryChange: (option: any) => void;
}

const CountrySelect: FC<IProps> = ({ onCountryChange }) => {
  const countries = useMemo(() => countryList().getData(), []);

  const formatOptionLabel = ({ value, label }: { value: string; label: string }) => (
    <StOption>
      <StFlag src={`https://flagcdn.com/${value.toLowerCase()}.svg`} />
      <StCountryName>{label}</StCountryName>
    </StOption>
  );

  return (
    <CustomSelect
      options={countries as any}
      onChange={onCountryChange}
      placeholder="Your country..."
      formatOptionLabel={formatOptionLabel}
    />
  );
};

export default CountrySelect;
