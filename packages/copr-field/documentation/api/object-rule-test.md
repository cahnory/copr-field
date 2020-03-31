[Documentation](../README.md) | [API](./README.md) | [Objects](./README.md#objects) | TestRule object

# TestRule object

The `TestRule` object allows the testing of a value.

- [Methods](#methods)
  - [getArgs(options)](#getargsoptions)
  - [test(value, ...arguments)](#testvalue-arguments)
  - [validate(value, options, observer)](#validatevalue-options-observer)
- [Properties](#properties)
  - [meta](#meta-object)

## Methods

### getArgs(options)

The **getArgs()** method is used by the `TestRule` to get the argument to pass to the `test()` method.

#### Arguments

- `options`: _`any`_ – Any contextual data required to return the arguments `Array`.

##### Options

- `context`: _`any`_ – The context passed to [`Copr.validate()`](object-copr.md#methods) options.
- `field`: [_`FieldCopr`_](object-copr-field.md) – The field being validated.
- `fieldPath`: _`string []`_ – The path leading to the `field` from the `root`.
- `root`: [_`Copr`_](object-copr.md) – The [_`Copr`_](object-copr.md) that initiates the validation.
- `rule`: [_`Rule`_](object-rule.md) – The rule being validate.
- `rulePath`: _`number []`_ – The path leading to the `rule` from the `field`.

#### Returns

_`Array`_: Returns an array of arguments to pass to the `test()` method alongside the value.

### test(value, ...arguments)

The **test()** method performs a test on the value and returns `true` if it succeeds.

#### Arguments

- `value`: _`any`_ – The value to test.

#### Returns

_`boolean`_: Returns `true` if the test succeeds, `false` if it fails.

### validate(value, options, observer)

The **validate()** method gets the result of `getArgs()` to call `test()` and return its result.

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

[_`Result`_](object-result.md): Returns the validation result.

## Properties

The `TestRule` properties must not be modified.

### meta: _`Object`_

`Object` containing additional data that are not used by "copr-field" but can be useful to increase its functionality.
