[Documentation](../README.md) | [Guides](./README.md) | Create custom tests

# Create custom tests

A test is just a function accepting the parsed value as the first argument and any additional arguments.

- [Examples](#examples)
  - [Querying an API](#querying-an-api)
  - [Compare two fields](#compare-two-fields)

## Examples

### Querying an API

```js
isEmailAvailable = email => fetchApi('/verify-email-availability', email);
```

> To know how asynchronous tests are handled [see "Asynchronous TestRule"](asynchronous-test-rule.md).

### Compare two fields

```js
isValidConfirmation = (value, password) => value === password;
```

> To know how to use another value as a test argument [see "Using context"](using-context.md).
