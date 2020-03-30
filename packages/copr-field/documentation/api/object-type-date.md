[Documentation](../README.md) | [API](./README.md) | [Objects](./README.md#objects) | DateType object

# DateType object

The `DateType` object is used to parse value into `Date`.

- [Accepted values](#accepted-values)
  - [Example of valid values](#example-of-valid-values)
- [Built-in tests](#built-in-tests)
  - [isAfter](#isafter)
  - [isBefore](#isbefore)
  - [isEqual](#isequal)
  - [isSameDay](#issameday)
  - [isSameDayOfMonth](#issamedayofmonth)
  - [isSameDayOfWeek](#issamedayofweek)
  - [isSameMonth](#issamemonth)
  - [isSameMonthOfYear](#issamemonthofyear)
  - [isSameYear](#issameyear)

## Accepted values

The `DateType` parses numbers expressed as `Date`, `number` or `string`.

### Example of valid values

| Values | Results | | ------------------------------------- | ------------------------------------- | | `477030600000` | `Date<Tue, 12 Feb 1985 04:30:00 GMT>` | | `'Tue Feb 12 1985 05:30:00 GMT+0100'` | `Date<Tue, 12 Feb 1985 04:30:00 GMT>` | | `'1985-02-12T04:30:00.000Z'` | `Date<Tue, 12 Feb 1985 04:30:00 GMT>` | | `new Date(477030600000)` | `Date<Tue, 12 Feb 1985 04:30:00 GMT>` |

## Built-in tests

### isAfter

#### Arguments

- `inf`: _`Date`_

#### Returns

_`boolean`_: Returns `true` if the value is after `inf`.

### isBefore

#### Arguments

- `sup`: _`Date`_

#### Returns

_`boolean`_: Returns `true` if the value is before `sup`.

### isEqual

#### Arguments

- `other`: _`Date`_

#### Returns

_`boolean`_: Returns `true` if the value is equal to `other`

### isSameDay

#### Arguments

- `other`: _`Date`_

#### Returns

_`boolean`_: Returns `true` if the value is on the same day (e.g. 1985-02-12) as `other`.

### isSameDayOfMonth

#### Arguments

- `other`: _`Date`_

#### Returns

_`boolean`_: Returns `true` if the value is on the same day of the month (e.g. 12) as `other`.

### isSameDayOfWeek

#### Arguments

- `other`: _`Date`_

#### Returns

_`boolean`_: Returns `true` if the value is on the same day of the week (e.g. 2) as `other`.

### isSameMonth

#### Arguments

- `other`: _`Date`_

#### Returns

_`boolean`_: Returns `true` if the value is on the same month (e.g. 1985-02) as `other`.

### isSameMonthOfYear

#### Arguments

- `other`: _`Date`_

#### Returns

_`boolean`_: Returns `true` if the value is on the same month of year (e.g. 2) as `other`.

### isSameYear

#### Arguments

- `other`: _`Date`_

#### Returns

_`boolean`_: Returns `true` if the value is on the same year (e.g. 1985) as `other`.
