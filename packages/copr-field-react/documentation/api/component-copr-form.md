[Documentation](../README.md) | [API](README.md) | [Components](README.md#components) | CoprForm

# CoprForm

Create a new [`Context`](context.md) from a [`Copr`](../../../copr-field/documentation/api/object-copr.md)

> `CoprForm` is just a provider and does not create a form element.

## Properties

- `children`: _`ReactNode | Function`_ – if a function is used as child, it receives the [`Context`](context.md) as first argument.
- `context`: – used as context option for [`Copr.validate`](../../../copr-field/documentation/api/object-copr.md#shared-methods). By default, context is an object with a `value` property containing the parsed value. If context is an `Object` it is merged with the default context.
- `copr`: [_`Copr`_](../../../copr-field/documentation/api/object-copr.md) – usually a [_`SetCopr`_](../../../copr-field/documentation/api/object-copr.md).
- `defaultValue`: _`any`_ default value.
- `onChange`: _`Function`_ – called when a value changes. The first argumennt is an `Object` containing three properties:
  - `value`: _`any`_ – the parsed value.
  - `input`: _`string`_ – the raw value.
  - `result`: [_`Result`_](../../../copr-field/documentation/api/object-result.md) – the result of the validation
- `onUpdate`: _`Functon`_ – called when the validation result changes with the [_`Result`_](../../../copr-field/documentation/api/object-result.md) as first argument.
- `value`: _`any`_ – value making `CoprForm` a controlled component.
