export const allOperator = ({ isPending, failures }) => ({
  isPending,
  isValid: !failures,
});

export const notOperator = ({ isPending, failures }) => ({
  isPending,
  isValid: !!failures,
});

export const oneOfOperator = ({ isPending, passes }) => ({
  isPending: !!passes || isPending,
  isValid: !!passes,
});
