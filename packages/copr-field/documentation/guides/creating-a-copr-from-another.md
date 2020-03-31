[Documentation](../README.md) | [Guides](./README.md) | Creating a Copr from another

# Creating a [`Copr`](../api/object-copr.md) from another

To create a new [`Copr`](../api/object-copr.md) based on an existing one you need to merge [`Coprs`](../api/object-copr.md) properties and call the appropriate create function.

To create a [`FieldCopr`](../api/object-cop-field.md):

```js
const field = createField({
  type: StringType,
});

const nullableField = createField({
  ...field,
  allowEmpty: true,
});
```

To create a [`SetCopr`](../api/object-copr-set.md):

```js
const signin = createSet({
  login: createField({ type: StringType }),
  password: createField({ type: StringType }),
});

const signup = createSet({
  ...signin,
  confirmation: createField({ type: StringType }),
});
```
