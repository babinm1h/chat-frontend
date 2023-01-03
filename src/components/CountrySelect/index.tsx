import React, { ComponentProps, FC, useMemo } from 'react';
import countryList from 'react-select-country-list';
import styled from 'styled-components';
import CustomSelect from '../UI/CustomSelect';

const StOption = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const StFlag = styled.img`
  width: 18px;
`;

const StCountryName = styled.span``;

interface IProps extends ComponentProps<typeof CustomSelect> {
  onCountryChange: (option: any) => void;
}

const CountrySelect: FC<IProps> = ({ onCountryChange, defaultValue, ...props }) => {
  const countries = useMemo(() => countryList().getData(), []);

  const formatOptionLabel = ({ value, label }: any) => (
    <StOption>
      <StFlag src={`https://flagcdn.com/${value.toLowerCase()}.svg`} />
      <StCountryName>{label}</StCountryName>
    </StOption>
  );

  const defValue = countries.find((c) => c.value === defaultValue);

  return (
    <CustomSelect
      {...props}
      options={countries as any}
      onChange={onCountryChange}
      placeholder="Your country..."
      formatOptionLabel={formatOptionLabel}
      defaultValue={defValue}
    />
  );
};

export default CountrySelect;
