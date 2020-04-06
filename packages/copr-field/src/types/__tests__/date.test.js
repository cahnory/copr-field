import DateType, {
  isAfter,
  isBefore,
  isEqual,
  isSameDay,
  isSameDayOfMonth,
  isSameDayOfWeek,
  isSameMonth,
  isSameMonthOfYear,
  isSameYear,
} from '../date';
import { typeParse, typeValidate } from '../../type';

describe('DateType.validate', () => {
  it('handles dates expressed as number', () => {
    expect(typeValidate(DateType, -1)).toBe(true);
    expect(typeValidate(DateType, 0)).toBe(true);
    expect(typeValidate(DateType, 1)).toBe(true);
    expect(typeValidate(DateType, null)).toBe(false);
    expect(typeValidate(DateType, undefined)).toBe(false);
  });
  it('handles dates expressed as number string', () => {
    expect(typeValidate(DateType, '-1')).toBe(true);
    expect(typeValidate(DateType, '0')).toBe(true);
    expect(typeValidate(DateType, '1')).toBe(true);
  });
  it('handles dates expressed as string', () => {
    expect(typeValidate(DateType, 'Tue Feb 12 1985 01:00:00 GMT+0100')).toBe(
      true,
    );
    expect(typeValidate(DateType, 'Tue Feb 32 1985 01:00:00 GMT+0100')).toBe(
      false,
    );
    expect(typeValidate(DateType, 'Tue, 12 Feb 1985 00:00:00 GMT')).toBe(true);
    expect(typeValidate(DateType, 'Tue, 32 Feb 1985 00:00:00 GMT')).toBe(false);
    expect(typeValidate(DateType, '1985-02-12T00:00:00.000Z')).toBe(true);
    expect(typeValidate(DateType, '1985-02-32T00:00:00.000Z')).toBe(false);
  });
  it('handles dates expressed as Date', () => {
    expect(typeValidate(DateType, new Date())).toBe(true);
    expect(typeValidate(DateType, new Date('1985-02-32T00:00:00.000Z'))).toBe(
      false,
    );
  });
  it('rejects non date inputs', () => {
    expect(typeValidate(DateType, 'abc')).toBe(false);
    expect(typeValidate(DateType, '')).toBe(false);
    expect(typeValidate(DateType, NaN)).toBe(false);
    expect(typeValidate(DateType, null)).toBe(false);
    expect(typeValidate(DateType, undefined)).toBe(false);
    expect(typeValidate(DateType, true)).toBe(false);
    expect(typeValidate(DateType, false)).toBe(false);
  });
});

describe('DateType.parse', () => {
  const expectValid = (input, time) => {
    const result = typeParse(DateType, input);
    expect(result).toBeInstanceOf(Date);
    expect(result.getTime()).toEqual(time);
  };
  const expectInvalid = input => {
    expect(typeParse(DateType, input)).toEqual(undefined);
  };

  it('handles dates expressed as number', () => {
    expectValid(-1, -1);
    expectValid(0, 0);
    expectValid(1, 1);
  });
  it('handles dates expressed as number string', () => {
    expectValid('-1', -1);
    expectValid('0', 0);
    expectValid('1', 1);
  });
  it('handles dates expressed as string', () => {
    expectValid('Tue Feb 12 1985 01:00:00 GMT+0100', 477014400000);
    expectValid('Tue, 12 Feb 1985 00:00:00 GMT', 477014400000);
    expectValid('1985-02-12T00:00:00.000Z', 477014400000);
    expectInvalid('Tue Feb 32 1985 01:00:00 GMT+0100');
    expectInvalid('Tue, 32 Feb 1985 00:00:00 GMT');
    expectInvalid('1985-02-32T00:00:00.000Z');
  });
  it('handles dates expressed as Date', () => {
    expectValid(new Date('1985-02-12T00:00:00.000Z'), 477014400000);
    expectInvalid(new Date('1985-02-32T00:00:00.000Z'));
  });
  it('rejects non date inputs', () => {
    expectInvalid('abc');
    expectInvalid('');
    expectInvalid(NaN);
    expectInvalid(null);
    expectInvalid(undefined);
    expectInvalid(true);
    expectInvalid(false);
  });
});

describe('number rule', () => {
  it('isAfter', () => {
    expect(isAfter(new Date(2), new Date(1))).toBe(true);
    expect(isAfter(new Date(1), new Date(2))).toBe(false);
    expect(isAfter(new Date(1), new Date(1))).toBe(false);
  });
  it('isBefore', () => {
    expect(isBefore(new Date(1), new Date(2))).toBe(true);
    expect(isBefore(new Date(2), new Date(1))).toBe(false);
    expect(isBefore(new Date(1), new Date(1))).toBe(false);
  });
  it('isEqual', () => {
    expect(isEqual(new Date(1), new Date(1))).toBe(true);
    expect(isEqual(new Date(1), new Date(2))).toBe(false);
  });
  it('isSameDay', () => {
    expect(
      isSameDay(
        new Date('1985-02-12T00:00:00.000Z'),
        new Date('1985-02-12T12:00:00.000Z'),
      ),
    ).toBe(true);
    expect(
      isSameDay(
        new Date('1985-02-12T00:00:00.000Z'),
        new Date('1985-01-12T00:00:00.000Z'),
      ),
    ).toBe(false);
    expect(
      isSameDay(
        new Date('1985-02-12T00:00:00.000Z'),
        new Date('1984-02-12T00:00:00.000Z'),
      ),
    ).toBe(false);
  });
  it('isSameDayOfMonth', () => {
    expect(
      isSameDayOfMonth(
        new Date('1985-02-12T00:00:00.000Z'),
        new Date('1984-01-12T12:00:00.000Z'),
      ),
    ).toBe(true);
    expect(
      isSameDayOfMonth(
        new Date('1985-02-12T00:00:00.000Z'),
        new Date('1984-02-13T00:00:00.000Z'),
      ),
    ).toBe(false);
  });
  it('isSameDayOfWeek', () => {
    expect(
      isSameDayOfWeek(
        new Date('1985-02-12T00:00:00.000Z'),
        new Date('1985-02-19T12:00:00.000Z'),
      ),
    ).toBe(true);
    expect(
      isSameDayOfWeek(
        new Date('1985-02-12T00:00:00.000Z'),
        new Date('1985-02-20T00:00:00.000Z'),
      ),
    ).toBe(false);
  });
  it('isSameMonth', () => {
    expect(
      isSameMonth(
        new Date('1985-02-12T00:00:00.000Z'),
        new Date('1985-02-13T12:00:00.000Z'),
      ),
    ).toBe(true);
    expect(
      isSameMonth(
        new Date('1985-02-12T00:00:00.000Z'),
        new Date('1984-02-12T00:00:00.000Z'),
      ),
    ).toBe(false);
  });
  it('isSameMonthOfYear', () => {
    expect(
      isSameMonthOfYear(
        new Date('1985-02-12T00:00:00.000Z'),
        new Date('1985-02-13T12:00:00.000Z'),
      ),
    ).toBe(true);
    expect(
      isSameMonthOfYear(
        new Date('1985-02-12T00:00:00.000Z'),
        new Date('1984-02-13T12:00:00.000Z'),
      ),
    ).toBe(true);
    expect(
      isSameMonthOfYear(
        new Date('1985-02-12T00:00:00.000Z'),
        new Date('1985-01-12T00:00:00.000Z'),
      ),
    ).toBe(false);
  });
  it('isSameYear', () => {
    expect(
      isSameYear(
        new Date('1985-02-12T00:00:00.000Z'),
        new Date('1985-01-13T12:00:00.000Z'),
      ),
    ).toBe(true);
    expect(
      isSameYear(
        new Date('1985-02-12T00:00:00.000Z'),
        new Date('1984-02-12T00:00:00.000Z'),
      ),
    ).toBe(false);
  });
});
