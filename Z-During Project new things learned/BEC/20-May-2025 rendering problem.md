## Rendering Problem

- There is a rendering problem so i got solution

```js
useEffect(() => {
  if (
    customerAssignVouchers?.voucher_assign &&
    Array.isArray(customerAssignVouchers.voucher_assign) &&
    defaultVoucher
  ) {
    const updatedVoucher = updateVouchers();

    // Only dispatch if the data is actually different
    const isDifferent =
      JSON.stringify(customerAssignVouchers.voucher_assign) !==
      JSON.stringify(updatedVoucher);

    if (isDifferent) {
      dispatch(
        updateCustomerAssignVouchers({
          ...customerAssignVouchers,
          voucher_assign: updatedVoucher,
        })
      );
    }
  }
}, [dispatch, defaultVoucher, customerAssignVouchers]);
```
