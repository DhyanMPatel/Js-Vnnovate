# Pug Template Engine

- Use of Pug Template Engine
- It **simplifies** the process of writing HTML by reducing traditional `HTML syntax`.

## Key Features:

- **Simplified HTML Creation**: Pug is used to make it `easier to write` and `maintain` HTML code. It uses indentation to represent the structure of HTML tags, making the code more concise and readable.
- **Reduced Boilerplate**: With Pug, you write less `boilerplate code`. You `don't need to worry about closing tags` or `excessive brackets`, which can make your templates more compact.
- **Dynamic Content**: Pug allows you to **embed dynamic content** using `variables` and `control structures`. This is particularly useful when working with server-side rendering in NodeJS applications.
- **Cleaner and Readable Code**: The syntax of Pug is `designed to be clean` and `readable`, which can lead to more maintainable code. The indentation-based structure often results in templates that are visually simpler than equivalent HTML.
- **Expressive Templates**: Pug provides a `concise` and `expressive` **way to define your HTML structure**. This can be beneficial when working on projects that involve a lot of templating and view rendering.

## How to install Pug

- **Installing Pug**:

```bash
npm install --save pug

#  OR

npm install pug
```

## **Writing Pug Template**:

### 1. Doctype, Tags Syntax:

- Pug uses a simplified syntax for defining the document type and HTML tags.

```pug
//- Home.pug
doctype html
html
head
    title My Pug Page
body
    h1 Welcome to Pug
    p This is a Pug template.
```

### 2. Class, IDs, and Attributes:

- Pug provides a short way to define `classes`, `IDs`, and `attributes`:
  - `Classes` : Define classes using a dot (`.`) followed by the class name.
  - `IDs` : Define IDs using a hash (`#`) followed by the ID name.
  - `Attributes` : Define attributes using square brackets (`[]`).

```pug
div.container#main-content
p.text-info Welcome to Pug!
img(src='image.jpg', alt='Pug Image')
```

- In this syntax, div has the class **container** and the ID **main-content**. paragraph has the class **text-info** and the image has a `source` and `alt` attribute.

### 3. Plain text and text blocks:

- But if you want to write plain text, you can use the text() function.

```pug
//Plain Text
p This is plain text in a paragraph.
//Text Block
p.
  This is a multiline
  text block in a paragraph.
```

### 4. Comments:

- Pug also supports comments, which are denoted by a double hyphen (`//-`).

```pug
// This is a single-line comment
//- This is another single-line comment
/*
  This is a
  multi-line comment
*/
p This is a paragraph.
```

## Using JavaScript in Pug HTML:

- Pug **allows to embed JavaScript code directly into the template**. You can include `variables`, `expressions`, and `control structures` within your Pug code.

### 1. Buffer vs Unbuffered Code:

- `Buffered` code outputs its **result directly into the HTML**, while `unbuffered` code does **not**. `Buffered` code is denoted by **placing an equals sign (=)** before the code, while `unbuffered` code is denoted by **placing a hyphen (-)** before the code.

```pug
- let name = 'John'
p Hello #{name}! //- Unbuffered Code
p= "John" //- Buffered Code
```

### 2. Interpolation:

- `Interpolation` is the **process of embedding variables** or **expressions within the template**. You can use `#{...}` for interpolation.

```pug
- let user = {name: "John", age: 30}
p Hello #{user.name}! You are #{user.age} years old.
```

### 3. Iteration:

- `Iteration` is the **process of repeating a block of code** for each element in a collection. You can use `each` for iteration.

```pug
- let users = [{name: "John", age: 30}, {name: "Jane", age: 25}]
ul
    each user in users
        li #{user.name} is #{user.age} years old.
```

### 4. Conditionals:

- `Conditionals` is the **process of conditionally rendering a block of code** based on a condition. You can use `if` for conditionals.

```pug
- let user = {name: "John", age: 30}
p= user.name
if user.age >= 18
    p You are an adult.
else
    p You are a minor.
```

## Example:

- Below is an example of using Pug.

```js
//File path: /index.js (root)
// Import required modules
const express = require("express");
const path = require("path");

// Create an Express application
const app = express();

// Define the port for the server to listen on
const port = 3000;
const rootDir = path.dirname(require.main.filename);

// Set Pug as the view engine
app.set("view engine", "pug");

// Set the views directory to 'views' in the current directory
app.set("views", path.join(rootDir, "views"));

// Define a route to render the Pug template when the root path is accessed
app.get("/", (req, res) => {
  // Data to be sent to the Pug template
  const data = {
    message: "Hello from GeeksForGeeks!",
    courses: ["Web Development", "DSA", "Java"],
  };

  // Render the Pug template named 'index' and pass the data
  res.render("index", data);
});

// Start the server and listen on the specified port
app.listen(port, () => {
  // Display a message when the server starts successfully
  console.log(`Server is running at http://localhost:${port}`);
});
```

```pug
//File path: views/index.pug
// Pug template
html
  head
    // Set the title of the HTML page
    title Pug Example

    // Internal CSS styles for the page
    style.
      h1 {
        color: green;
      }

  body
    // Display the main heading of the page
    h1 GeeksForGeeks | Pug Example

    // Display a subheading
    h4 This data is coming from Server:

    // Display data received from Express server
    p The server sent the following data: #[strong #{message}]

    // Display the list of courses using the each loop
    ul
      each course in courses
        // Display each course as a list item
        li= course
```

## Note :

- Go Next Topic is MVC (Models, Views, Controllers)

[MVC to maintain Proper structure of app](../MVC/intro.md)
