## Relations - Options

### Embedded(Nested) Documents
- When there are few documents with no much data duplication, use Embedded Document relation.

```json
// User Document
{
    userName: 'max',
    age:29,
    address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345'
    }
}
```
> Here we are embedding the address document inside the user document.

### Referenced Documents
- When there are many documents with much data duplication, use Referenced Document relation.
- But this method is slow compared to nested documents.

```json
// User Documents
{
    userName: 'max',
    favBooks: ['id1', 'id2']
}

// Book Documents
{
    id: 'id1',
    name: 'book1'
}
```

```json
// Instead of embedding the book documents just like below inside the user document, we are referencing the book documents inside the user document.
{
    userName: 'max',
    favBooks: [{...},{...}]
}
```

> Here we have no idea about the User document that how many books will be there.
