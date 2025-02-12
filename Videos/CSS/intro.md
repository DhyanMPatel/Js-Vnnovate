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

### Inline & Block Elements

- `Inline Element` - They take only content height & width. they ignore explicite Width & height.
- `Block Element` - they take whole width
- We can change their behaviour using `display: block/inline`

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

# Flex Blox

- Syntax: `display: flex;`
- It try to set all childs in single line, it is default behaviour.
- This Property is `container level` Property

- There are total `9` types of flex box
  - Default Flex (row) left-right
  - Column: `flex-direction: column;`
  - Justify Content: (Left-Right) `justify-content: space-between;`
  - Align Items: (Top-Bottom) `algin-items: center;`
  - Flex Wrap: (set childs as they can possible in one line) `flex-wrap: wrap;`
  - Align Content: (take all childs as one content) `align-content: space-around;`
  - Order Property: (This use at perticular child) `order: num;`
  - Flex Grow: (This use at perticular child) `flex-grow: num;`
  - Align Self: (This also use at perticular child) (Top-Bottom) `align-self: flex-end`

# Grid

- Syntax: `display: grid;`
- `fr` frection - we can take fr as part of 100%. means `1fr`- 1 part, `2fr`- 2 part, `3fr` - 3 part,... of 100%.
- We can modify grid through multiple Property

  - `grid-template-columns` - control width of each columns.
  - `grid-template-row` - control height of each rows.
  - `grid-template-areas` - control `grid-area` that given to each child.
  - `gap` - gap b/w each elements.
  - `grid-auto-rows`:
  - `grid-auto-columns`:

- Also we can use more property to Customize each child
  - `Grid Column`: give columns span Ex:- `grid-column: 1/4`, means start from 1st column and go untill 4 not include 4th column.
  - `Grid Row`: give rows span Ex:- `grid-row: 1/3`, means start from 1st row and go untill 3 not include 3rd row.
  - `Grid Area`: Define just like id, that what i access.

# Design for Mobile, Tablet and web

- Whenever we work with mobile responsive design we provide some media query (Anotated Symbols) start with `@...`.

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
