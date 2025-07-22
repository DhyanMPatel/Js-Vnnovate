# Here i Create Easy Filter operation

```js
//  Apply filters from manageInventory to items from Redux
const filteredItems = items.filter((item) => {
  console.log(manageInventory, ": Manage Inventory");
  const matchesSearch =
    (item.name &&
      item.name
        .toLowerCase()
        .includes(manageInventory?.filters?.searchQuery?.toLowerCase())) ||
    (item.service_code &&
      item.service_code
        .toLowerCase()
        .includes(manageInventory.filters.searchQuery.toLowerCase()));
        
  const matchesLowStock =
    !manageInventory?.filters?.showLowStock ||
    (parseInt(item?.opening_stock) < 10 && parseInt(item?.opening_stock) >= 0);

  const matchesCategory =
    manageInventory?.filters?.category?.id === "__all__" ||
    item.category?.id === manageInventory?.filters?.category?.id;

  return matchesSearch && matchesLowStock && matchesCategory;
});
```
