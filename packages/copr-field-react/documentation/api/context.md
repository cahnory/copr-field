[Documentation](../README.md) | [API](README.md) | Context

# Context

Holds current context [`Copr`](../../../copr-field/documentation/api/object-copr.md) and [`Result`](../../../copr-field/documentation/api/object-result.md). It also includes other handful properties and function.

## Properties

### copr: [`Copr`](../../../copr-field/documentation/api/object-copr.md)

### form: `Context`

The `Context` of the nearest [`CopForm`](component-copr-form.md) parent.

### result

The validation [`Result`](../../../copr-field/documentation/api/object-result.md) of the [`Copr`](../../../copr-field/documentation/api/object-copr.md) used by the current `Context`.

### path: string[]

The names pointing to the current field or set from the nearest [`CoprForm`](component-copr-form.md) parent.

### value: input

The unparsed value of the current field or set.

## Methods

### setValue(value)

The **setValue()** method updates the value of the current field or set in the form `Context` created by the nearest [`CoprForm`](component-copr-form.md) parent. The validation is redone and its result updated.

#### Arguments

- `value`: _`any`_ – The new value.

#### Returns

_`undefined`_: Returns `undefined`.
