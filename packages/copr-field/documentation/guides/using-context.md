[Documentation](../README.md) | [Guides](./README.md) | Using context

# Using context

To set context, define the `context` property in the `options` object passed to the `validate` method options of any [`Copr`](../api/object-copr.md). It could be anything.

The `getArgs` methods of each test of the Copr will be called with it.

## Example

Let's check if `passwordConfirmation` matches `password`:

```js
const fieldset = createSet({
  password: createField({
    type: StringType,
  }),
  passwordConfirmation: createField({
    type: StringType,
    rules: [
      {
        test: (value, password) => value === password,
        // set the first additional arguments from the context
        args: context => [context.password],
      },
    ],
  }),
});

// set parsed values as context
const onChange = newValues =>
  fieldset.validate(newValues, { context: fieldset.getValues(newValues) });
```
