import React from "react";
import Select, { GroupBase, Props } from "react-select";
import "./CustomSelect.scss";



function CustomSelect<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group>) {
  return (
    <>
      <Select {...props} theme={(theme) => ({ ...theme })} classNamePrefix={`select`} />
    </>
  );
}

export default CustomSelect;
