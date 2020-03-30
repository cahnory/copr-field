[Documentation](../README.md) | [Guides](./README.md) | Asynchronous test

# Asynchronous test

To be asynchronous, the `test` method of a [TestRule](../api/object-copr-test.md) has to return a `Promise`. The `validate` method then returns a [`Result`](../api/object-result.md) synchronously as normal but with the `isPending` property set to `true`.

## Observe [`Result`](../api/object-result.md) updates

When you validate a [`Copr`](../api/object-copr.md) with asynchronous [TestRules](../api/object-copr-test.md) in it, you need to observe the [`Result`](../api/object-result.md) updates. To do so you have to define an observer in the `validate` method options:

```js
copr.validate('some value', {
  observer: {
    next: newResult => {
      /* result has been updated */
    },
    complete: () => {
      /* all tests have been completed */
    },
  },
});
```

Each time an asynchronous test resolves, `observer.next` is called with a new updated [`Result`](../api/object-result.md). When there's no more tests pending, `observer.complete` is called.

None of the observer's methods are required.
