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

- Intermediate Selector, 6. Descendant Selector - include all descendant of elem although h2 is in `div>p>h2` steel selected.
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

  8. Adjacent Sibling Selector -

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

  11. Pseudo-element Selector -

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