## offsetParent, offsetLeft/Top

- The `offsetParent` is the nearest ancestor that the browser uses for calculating coordinates during rendering.
- Properties `offsetLeft/offsetTop` provide x/y coordinates relative to offsetParent upper-left corner.

```html
<main style="position: relative" id="main">
  <article>
    <div id="example" style="position: absolute; left: 180px; top: 180px">
      ...
    </div>
  </article>
</main>
<script>
  alert(example.offsetParent.id); // main
  alert(example.offsetLeft); // 180 (note: a number, not a string "180px")
  alert(example.offsetTop); // 180
</script>
```

## offsetWidth/Height

- They provide the “outer” width/height of the element. Or, in other words, its full size including borders.
- Example:
  - `offsetWidth = 390` – the outer width, can be calculated as inner CSS-width (300px) plus paddings (2 _ 20px) and borders (2 _ 25px).
  - `offsetHeight = 290` – the outer height.

## clientWidth/Height

- These properties provide the size of the area inside the element borders.
- They include the content width together with paddings, but without the scrollbar:
- If there are no paddings, then clientWidth/Height is exactly the content area, inside the borders and the scrollbar (if any).

## scrollWidth/Height

- These properties are like clientWidth/clientHeight, but they also include the scrolled out (hidden) parts:

  ![ScrollWidth/Height](./scrollWidth-height.png)

- On the picture above:
  - `scrollHeight = 723` – is the full inner height of the content area including the scrolled out parts.
  - `scrollWidth = 324` – is the full inner width, here we have no horizontal scroll, so it equals clientWidth.
