export const allOperator = ({ isPending, failures }) => ({
  isPending,
  isValid: !failures && !isPending,
});

export const notOperator = ({ isPending, passes }) => ({
  isPending,
  isValid: !passes && !isPending,
});

export const oneOfOperator = ({ isPending, passes }) => ({
  isPending,
  isValid: !!passes,
});
