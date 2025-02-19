# CSS

- Cascading Style Sheet
- There are multiple web site type like `Bootstrap`, `Materialize` CSS, `Tailwind` CSS library, `Shadcn` library, `Acenternity`, `Magic UI`, `Daisy UI`, `MUI`, `Flowbite`, `Ant Design`.

- To start CSS there are 3 thing to improve and notice,
  1. Font
  2. Images
  3. Looks of button, card, List.

## Inline CSS

- Impliment CSS using `style` Attribute.

## Internal CSS

- Impliment CSS using `style` tag at `head`.

## External CSS

- Impliment CSS through `link` tag with href, and rel attributes.

### Selector

- selector is an accessor that select Element using multiple ways.
- There are total 12 Types of Selector
- Simple way is selecting Element is `classes`.

- Basic Selectors,

  1. Universal Selector - `* {...}`
  2. Type Selector - elem name Ex: `p{...}`
  3. Class Selector - `.className {...}`
  4. ID Selector - `#idName {...}`
  5. Attribute Selector - Ex: `input[type="text"] {...}`

- Intermediate Selector,

  6. Descendant Selector - include all descendant of elem although h2 is in `div>p>h2` steel selected.
     `CSS
    div h2 {
        color: #fff
    }
`

  7. Child Selector - select all child (not grand-child).

  ```CSS
      div > h2 {
          color: #ddd;
      }
  ```

  8. Adjacent Sibling Selector - select the `<form>` element that comes right after an `<h2>` element.

  ```CSS
      h2 + form {
          border: 2px solid gray;
      }
  ```

  9. General Sibling Selector - select all siblings of selector.

  ```CSS
      h2 ~ p{
          color: #860303;
      }
  ```

  10. Pseudo-class Selector - properties and Elem they have a behaviour.

  ```CSS
      h2:hover{
          color: #000;
      }
  ```

  11. Pseudo-element Selector - target specific part of an element. like `first-letter` element.

  ```CSS
      p::first-letter{
          font-size: 30px
      }
  ```

  12. Grouping Selector -

  ```CSS
      h1, h2, h3 {
          color: orange;
      }
  ```

## Box Model

- How much space an Elem consume on website/web page, is called Box Model
- There are 2 type of Box Model
  1. `Content-box` - only content part included
  2. `Border-box` - content, padding & border included

### Display

- `display` property specify the behaviour of an element.
- There are Many types of display properties like `block`, `inline`, `inline-block`, `none`, `flex`, `grid`, etc.
- If `display:inline` property ignore `margin`, `padding` from top, also we can't set `width`, `height` of element. to solve that do `display:inline-block`.

### `Note`

- `visibility:hidden` work like `display:none`. Just difference is that visibility not remove their space of element where display none remove element, space that ocupied.

### Inline & Block Elements

- `Inline Element` - They take only content height & width. they ignore explicite Width & height.
  - If element is inline
- `Block Element` - they take whole width
- We can change their behaviour using `display: block/inline`

### Z-index

- Z-index Property specify the stack order of an element.
- There is a catch Position Should be anything except `static`.
- Syntax:- `z-index: auto/number/initial/inherit`
  - `auto`: Set stack in default order.
  - `number`: Set stack based pm num. Nagative indexing possible
  - `initial`: Set this property to its default value.
  - `inherit`: Inherit this property from parent element.

### Positioning Elements

- CSS `position` help place element on the Page.

  1. `static`: default value of element.

     - Can't assign top, bottom, left, right values
     - Syntax :- `position: static;`

  2. `Relative`:

     - Relative to Parent Element.
     - Syntax:- `position: relative`

  3. `Absolute`:

     - Find nearest Positioned Ansistor that should not static. then element relative to that Ansistor
     - e.g. If Parent Component is static then element say good bye i will not follow you and follow nearest Ansistor Which is positioned. Go up to HTML tag because abore there there is not any tag.
     - Syntax :- `position: absolute`

  4. `Fixed`:

     - Fix element to screen, will not scrolled after scrolling.
     - Syntax :- `position: Fixed`

  5. `Sticky`:
     - It behave like static untill we will scroll out of that element then become sticky.
     - e.g. Inside VS-Code do in their editor field such as heading (positioning Elements, etc).
     - Syntax:- `position: sticky`

### `Note`

- There are `Transform`, `filter`, `perspective` Properties can also make an element positioned, which is Weird.
  - e.g. `transform: translate(0);`, `filter: invert(0);`, `perspective: 0em;` in parent elem, make parent positioned.

# Pseudo-Elements

- `::` create a new pseudo-element that not exist before, using `content`
  ```Css
      .exciting-text::after{
          content: "<- Exciting!";
          color: green;
      }
  ```
- Ex:- `::after`, `::before`

## linear-gradient(deg, color, color)

- this is used at `background` property.
- Take 3 Properties `deg`, `color`, `color`.

# Transition

- This give time to take Transition from one to another.

# box-shadow

- There are many ways to use it
- One of them is `box-shadow: inset 5em 1em gold`
- there are 4 values `inset`, `length`, `length`, `color`

- another one way is `box-shadow: 0 4px 6px rgba(0, 0, 0, 0.9)`.
- there are 4 values `length`, `length`, `length`, `color`.

## Remember

- there are svg generator like `getwaves.com` generate waves as svg.

# Flex Box

- Flex box is One-Dimention Layout.
- Syntax: `display: flex;`
- It try to set all childs in single line, it is default behaviour.
- This Property is `container level` Property

- There are total `9` types of flex box

  - Default Flex (row) left-right
  - Column: `flex-direction: column;`
  - Justify Content: (Left-Right / Top-Bottom) `justify-content: space-between;`
  - Align Items: (Top-Bottom / Left-Right) `algin-items: center;`
  - Flex Wrap: (set childs as they can possible in one line) `flex-wrap: wrap;`
  - Align Content: (take all childs as one content) `align-content: space-around;`
  - Order Property: (This use at perticular child) `order: num;`
  - Align Self: (This also use at perticular child) (Top-Bottom) `align-self: flex-end`

- There also one property `gap`, `row-gap`, `column-gap`.

- There are also `Item-level` Property

  - Order:

    - If order value of element is near to 0 then it comes first but after non-order elements.
    - If there are same order values then first assigned order comes first.
    - Syntax:- `order: number`

  - Flex Grow: (This use at perticular child)

    - Means element take that num part from full width.
    - Syntax:- `flex-grow: num;`

  - Flex shrink:

    - Means element will small in num speed. `e.g.` if num = 2, then element shrink in `double speed`.
    - Syntax:- `flex-shrink: num;`

  - Align-self:

    - Means perticular element algin.

### `Note`

- `justify-content` and `align-items` will change acoording to `flex-direction`.
- If There are Multiple line of children and we want all children use `align-content` not use [align-items].
- There is no [justify-items].

# Grid

- Grid is <strong>Two-Dimention Layout</strong>.
- Syntax: `display: grid;`
- `fr` frection - we can take fr as part of 100%. means `1fr`- 1 part, `2fr`- 2 part, `3fr` - 3 part,... of 100%.
- We can modify grid through multiple Property

  - `grid-template-columns` - control width of each columns.
  - `grid-template-row` - control height of each rows.
  - `grid-template-areas` - control `grid-area` that given to each child.
  - `gap` - gap b/w each elements. Their siblings like `row-gap`, `column-gap`.
  - `grid-auto-rows`:
  - `grid-auto-columns`:

- Also we can use more property to Customize each child
  - `Grid Column`: give columns span Ex:- `grid-column: 1/4`, means start from 1st column and go untill 4 not include 4th column. Also take grid lines acoording to that line 1 to line 3.
  - `Grid Row`: give rows span Ex:- `grid-row: 1/3`, means start from 1st row and go untill 3 not include 3rd row. Also take grid lines acoording to that line 1 to line 3.
  - `Grid Area`: Define just like id, that what i access.

### `Note`

- There are some keyword that help to understand grid.
  - `Grid Line` - line between 2 columns, 2 row. grid line start from `1,2,...` or `-1,-2,...` from reverse. Also we can `Provide name` to perticular line.
  - `Grid Cell` - one type of cell. e.g. `ms excel`.
  - `Grid Track` - space between 2 parallal `grid line`.
  - `Grid Area` - space between 2 row grid line and 2 column grid line.
- There are one Property `place-content` means `justify-content` and `align-content`

# Design for Mobile, Tablet and web

- Whenever we also work with mobile responsive design we provide some `media query` (Anotated Symbols) start with `@...`.

- Syntax:-

  ```css
    @media not|only mediatype and (expressions) {
      CSS-Code;
    }
  ```

  - `Mediatype`: there are multiple mediatypes such as `screen`, `speach`, `all`, `print`.

  ```css
  @media (max-width: 600px) and (min-width: 200px) {
    body {
      align-items: start;
    }
    .responsive-div {
      background-color: chocolate;
    }
  }
  ```

- Tailwind Provide px what not requeired to

# BootStrap

- There are CDN Links that Provide CSS, JS.

  - CDN CSS link:

    ```html
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
      crossorigin="anonymous"
    />
    ```

  - CDN CSS Link:
    ```html
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
      crossorigin="anonymous"
    ></script>
    ```

- we just need to link using `<link>`

# Tailwind CSS

- Tailwind CSS is CSS Framework.

- There are many ways:

  1. CDN way:- for HTML files.
     ```html
     <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
     ```

- Try adding some custom CSS

  ```html

  ```
