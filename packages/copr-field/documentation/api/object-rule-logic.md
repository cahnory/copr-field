[Documentation](../README.md) | [API](./README.md) | [Objects](./README.md#objects) | LogicRule object

# LogicRule object

The `LogicRule` object allows the testing of a value against multiple rules.

- [Methods](#methods)
  - [operator(options)](#operatoroptions)
  - [validate(value, options, observer)](#validatevalue-options-observer)
- [Properties](#properties)
  - [meta](#meta-object)
  - [rules](#rules-object)

## Methods

### operator(options)

The **operator()** method is used by the `LogicRule` to determine if the validation succeeds or fails based on the results of all the `LogicRule` rules validations.

#### Arguments

- `options`: _`Object`_ – Informations about the rules.

##### Options

- `failures`: _`number`_ – Number of failing rules of the `LogicRule`.
- `passes`: _`number`_ – Number of succeeding rules of the `LogicRule`.
- `isPending`: _`boolean`_ – `true` if one or more rules of the `LogicRule` are pending.
- `content`: [_`Result`_](object-result.md)_`[]`_ – Results of all the rules of the `LogicRule`.

#### Returns

_`{ isPending: boolean, isValid: boolean }`_: Returns an `Object` with the pending and validation state of the `LogicRule`.

### validate(value, options, observer)

The **validate()** method gets the results of all the `LogicRule` rules, turns them into options to call `operator()` and return a [_`Result`_](object-result.md).

#### Arguments

- `value`: _`any`_ – The value to test.
- `observer`: _`Object`_ – An observer of the validation result. _[See "Async rules"](guides.md#async-rules)_.
- `options`: _`any`_ – Any contextual data required by `getArgs` to return the arguments `Array`.

##### Options

- `context`: _`any`_ – The context passed to [`Copr.validate()`](object-copr.md#methods) options.
- `field`: [_`FieldCopr`_](object-copr-field.md) – The field being validated.
- `fieldPath`: _`string []`_ – The path leading to the `field` from the `root`.
- `root`: [_`Copr`_](object-copr.md) – The [_`Copr`_](object-copr.md) that initiates the validation.

#### Returns

[_`Result`_](object-result.md): Returns the result.

## Properties

The `LogicRule` properties must not be modified.

### meta: _`Object`_

`Object` containing additional data that are not used by "copr-field" but can be useful to increase its functionality.

### rules: [_`Rule`_](object-rule.md)_`[]`_

`Array` containing all rules used by the `LogicRule`.
