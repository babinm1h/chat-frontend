export const validate = (min: number, max: number, required?: boolean) => {
  required = required !== undefined ? true : !!required;

  return {
    required: { value: required, message: 'Field required' },
    minLength: { value: min, message: `Minimal length is ${min} characters` },
    maxLength: { value: max, message: `Max length is ${max} characters` },
  };
};
