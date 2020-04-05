import createLogicRule from './rules/logic';
import { allOperator, notOperator, oneOfOperator } from './operators';

export const all = allRule =>
  createLogicRule({
    ...allRule,
    operator: allOperator,
  });

export const not = notRule =>
  createLogicRule({
    ...notRule,
    operator: notOperator,
  });

export const oneOf = oneOfRule =>
  createLogicRule({
    ...oneOfRule,
    operator: oneOfOperator,
  });
