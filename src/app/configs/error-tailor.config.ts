export const errorMessages = {
  required: 'This field is required',
  minlength: ({
    requiredLength,
    actualLength,
  }: {
    requiredLength: number;
    actualLength: number;
  }) => `Expect ${requiredLength} but got ${actualLength}`,
  email: `Email address isn't valid`,
  invalidUrl: `URL isn't valid`,
};
