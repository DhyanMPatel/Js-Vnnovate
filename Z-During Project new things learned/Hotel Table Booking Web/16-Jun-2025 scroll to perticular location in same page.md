## Scroll to perticular location in same page using `#` and `id`

- Using `id` and `#` we can scroll any page to their location in same page.

```jsx
// Id where we want to scroll
<h2 id="reviews">Customer Reviews</h2>
```

```jsx
// Through we can scroll to Customer Reviews
<a href="#reviews" className="reviews">
  Reviews
</a>
```

```css
/* If we want to give any padding or margin or any thing like normal tag */
#reviews {
  scroll-margin-top: 120px;
}
```
