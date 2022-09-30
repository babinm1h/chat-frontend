export const validate = (min: number, max: number) => ({
  required: { value: true, message: "Field required" },
  minLength: { value: min, message: `Minimal length is ${min} characters` },
  maxLength: { value: max, message: `Max length is ${max} characters` },
});
