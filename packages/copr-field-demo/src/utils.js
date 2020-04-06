// eslint-disable-next-line import/prefer-default-export
export const css = (...classNames) =>
  classNames.filter(className => className).join(' ');
