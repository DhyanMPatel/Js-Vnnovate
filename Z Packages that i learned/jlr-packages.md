# Parts of Package.json

## dependencies

- These are packages your app **needs to run in production**.

- Installed when someone runs `npm install --production` (or just `npm install`).

## devDependencies

- These are tools used **only during development** and not needed in production.
- They include:
  - Linters (ESLint)
  - Formatters (Prettier)
  - Testing libraries (Jest, Cypress)
  - Build tools (Webpack, Vite, Babel)
  - TypeScript
  - Sass compilers, etc.

## Scripts

- The "scripts" section defines custom command-line shortcuts to automate tasks like building, testing, starting, or deploying your app.

You run these with **`npm run <script-name>`** (or `yarn <script-name>` in Yarn projects).

## browserList

- The `"browserslist"` field tells tools like Babel, Autoprefixer, and build tools which browsers you want to support.

## Resolution

- The "resolutions" field in package.json is used to force a specific version of a dependency (or sub-dependency) across your project — especially in projects using Yarn (though npm now supports similar features via overrides).

- Let's say your project depends on a library A, which uses lodash@4.17.15, but there's a known bug in that version and you want to use lodash@4.17.21 instead.

- You can’t directly change A’s package, but you can override it globally using resolutions.

## overrides

- overrides is a field in package.json that lets you override specific dependency versions, including transitive (nested) dependencies — similar to **resolutions** in Yarn.

- Let’s say you’re using a package (package-a) that depends on an outdated or vulnerable version of lodash, and you want to force all packages to use a newer version.

# Packages

## blueprintjs

- It provide pre-built complex components
- Provide Consistent Design System
- Support Customize with SCSS

## canvasjs

- It provide different charts like Pie, Line, Bar, Area, Doughnut, Stock charts, Combo charts, and more.

## casl

- `CASL` (stands for **Code Access Security Layer**) is a powerful and flexible authorization library for JavaScript

- `do` - name of the action
- `on` - checked subject
- `ability` - an instance of Ability which will be used to check permissions

## chakra-ui

- Works out of the box. Chakra UI contains a set of polished React components that work out of the box.

- Flexible & composable. Chakra UI components are built on top of a React UI Primitive for endless composability.

- Accessible. Chakra UI components follows the **WAI-ARIA** guidelines specifications.

- `WAI-ARIA` = Web Accessibility Initiative – Accessible Rich Internet Applications

- It’s a set of guidelines and attributes designed to make web apps more accessible, especially for people using assistive technologies like screen readers.
- Elements like modals, dropdowns, tabs often lack built-in accessibility, so screen readers can’t understand them properly. **WAI-ARIA helps fill that gap** by providing extra information.

## coreui

- `@coreui/react` is a React-based UI component library built on top of CoreUI, which is designed for creating admin dashboards and web apps with Bootstrap 5 styling.

- Think of it like a modern alternative to Bootstrap UI for React apps, optimized for dashboards, panels, and control centers.

- Provide pre-built Admin Components

## emotion

- Emotion is a library designed for writing css styles with JavaScript. It provides powerful and predictable style composition in addition to a great developer experience with features such as source maps, labels, and testing utilities. Both string and object styles are supported.

## esbuild-plugins/node-globals-polyfill \*

- It’s a plugin for ESBuild that polyfills Node.js global variables like process and Buffer when bundling for browser environments.

## Webpack \*

- Webpack is a module bundler for JavaScript applications.
- It takes all your project’s files — JavaScript, CSS, images, fonts, even HTML — and bundles them into optimized files that can be loaded by the browser efficiently.

## fortawesome/free-regular-svg-icons

- It’s a Font Awesome icon pack that contains all the free “regular” style SVG icons.
  This is one of the 3 main free Font Awesome icon styles: Solid, Regular, Brands.

## fullcalendar

- FullCalendar is a powerful, full-featured JavaScript calendar library that helps you create interactive and responsive calendar interfaces.

## hookform/resolvers

- `@hookform/resolvers` is a package that provides validation resolvers to integrate React Hook Form with external schema-based validation libraries

## juggle/resize-observer

- It immediately detects when an element resizes and provides accurate sizing information back to the handler.

## popperjs \*

- Given an element, such as a button, and a tooltips element describing it, **Popper will automatically put the tooltip** in the right place near the button.

## progress

## react-icons

## reduxjs

## testing-library

## alasql

## animate.css

## apexcharts

## axios

## babel

- Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments.

- Here some thing that babel can do:
  1. Transform syntax
  2. Source code transformations

## bs-stepper

- bs-stepper is a lightweight JavaScript stepper component that helps you build multi-step UIs like:

  - Step-by-step registration forms
  - Checkout processes
  - Setup/configuration wizards
  - Quiz/survey interfaces

It’s based on Bootstrap 5, but works without relying on jQuery.

## buffer

- In Node.js, a Buffer is a temporary memory storage used to handle raw binary data, especially when dealing with things like:

  - Files
  - Streams
  - TCP/UDP sockets
  - Images
  - Audio/video

## cleave.js

- Cleave.js has a simple purpose: to help you format input text content automatically.

- The idea is to provide an easy way to increase input field readability by formatting your typed data. By using this library, you won't need to write any mind-blowing regular expressions or mask patterns to format input text.

- However, this isn't meant to replace any validation or mask library, you should still sanitize and validate your data in backend.

## crypto-browserify, crypto-js

- `crypto-browserify`:- The goal of this module is to reimplement node's crypto module, in pure javascript so that it can run in the browser.

## draft-js

- Draft.js is a JavaScript rich `text editor framework`, built for React and backed by an immutable model.
  - Extensible and Customizable
  - Declarative Rich Text
  - Immutable Editor State

## events

## faker

- faker is a JavaScript library that generates fake data for you. It's perfect for:

  - Seeding databases
  - Creating mock APIs
  - Generating sample UI content (names, emails, addresses, etc.)
  - Testing front-end layouts or logic with random data

## file-saver

- file-saver is a JavaScript library that lets you trigger file downloads in the browser using just JavaScript.

- It’s especially handy when:

  - You want users to download generated files (like PDFs, CSVs, or Excel files)

  - You’re working with blobs (binary data)

  - You want to save content as a file directly from the browser (without backend)

## framer-motion

- It's the only **animation library** with a hybrid engine, combining the power of JavaScript animations with the performance of native browser APIs.

## i18next

- i18next is a framework for translating your application into multiple languages. It helps you:

  - Translate text dynamically
  - Detect and manage the user's language
  - Handle pluralization, date/number formatting, etc.
  - Load translations from files, APIs, or inline

## jquery

- jQuery is a fast, small, and feature-rich JavaScript library that makes things like:

  - DOM manipulation
  - Event handling
  - AJAX requests
  - Animations
  - Cross-browser compatibility

## jsonwebtoken

- jsonwebtoken (a.k.a. JWT) is a Node.js library used to sign, verify, and decode JSON Web Tokens.

JWTs are commonly used for:

    - User authentication (login systems)
    - Authorization (who can access what)
    - Session management (stateless tokens)

## moment, moment-timezone

- moment is a powerful library for parsing, formatting, manipulating, and displaying dates and times in JavaScript.
- moment-timezone extends moment to support time zones like America/New_York, Asia/Kolkata, etc.

## nouislider, nouislider-react

- noUiSlider is a lightweight, highly customizable JavaScript range slider. It supports:

  - Single or range handles
  - Custom tooltips
  - Vertical and horizontal sliders
  - Step intervals
  - Keyboard support, And more!

- `nouislider-react` is a **React wrapper** for noUiSlider, allowing you to use the same slider easily inside React components.

## postcss

- PostCSS is a tool for transforming your CSS using JavaScript plugins.

- You can:

  - Use future CSS features today 🌟
  - Automatically add vendor prefixes
  - Handle RTL (Right-to-Left) styles
  - Import files like Sass does
  - Use variables (custom properties)
  - Minify CSS

- Think of PostCSS like Babel but for CSS.

## prismjs

- prismjs is a lightweight, extensible syntax highlighter for code.
- It highlights programming languages like JavaScript, Python, HTML, CSS, etc., in the browser.

## qrcode

- The qrcode package is a JavaScript library that allows you to generate QR codes directly in the browser or Node.js environment.

- Perfect for:
  - Sharing URLs
  - Encoding payment info
  - Generating product IDs
  - Event tickets, logins, etc.

## rc-input-number

- Input number control in input field like toggle wheel/stringMode/keyboard/readOnly/Disabled etc.

## react-\*

- `React-ace`:- Great for embedding code editors in your app (like a mini VS Code)
- `React-apexcharts`:- Create responsive and beautiful charts: line, bar, pie, area, heatmaps, etc.
- `react-copy-to-clipboard`:- Copy coupon codes, API tokens, or links with a single click.
- `react-data-table-component`:- Display tabular data with pagination, sorting, filtering, expandable rows, etc.
- `react-draft-wysiwyg`:- Rich text editors like blog editors, CMS, form input areas.
- `react-dropzone`:- Upload profile pictures, documents, drag files into a form.
- `react-feather`:- Lightweight icon library with great looks and ease of use.
- `react-flatpickr`:- Date/time selection forms, range pickers, birthday selectors.
- `react-full-screen`:- Fullscreen video players, dashboards, presentations, image viewers.
- `react-helmet`:- Manage `<head>` of your document (title, meta tags, etc.) in React. SEO, dynamic page titles, social meta tags.
- `react-hook-form`:- Modern form validation and handling library. Lightweight, fast, and scalable form management.
- `react-hot-toast`:- Beautiful, fast toast notifications. Show success, error, or info messages.
- `react-icons`:- Include popular icon libraries (FontAwesome, Material, etc.) as React components.
- `react-image-gallery`:- Create responsive image carousels/galleries.
- `react-js-loader`:- Pre-made animated loaders/spinners. Show while data or components are loading.
- `react-json-to-csv`:- Convert JSON data to downloadable CSV format. Export table data or API responses.
- `react-loader-spinner`:- Collection of SVG spinners/loaders. Show loading indicators during async calls.
- `react-number-format`:- Format numbers in input fields (currency, phone, etc.). Show price inputs like $1,000.00, or format phone numbers as you type.
- `react-perfect-scrollbar`:- Smooth and customizable scrollbar. Replace native scroll with a better UI/UX.
- `react-rating`:- Star-based (or custom icon-based) rating component.
- `react-select`:- Highly customizable select dropdown with search and multi-select. Better alternative to `<select>` — tag selectors, user search, etc.
- `react-shepherd` \* :- A React wrapper for Shepherd.js (product tour library). Guide new users through app features with tooltips/steps.
- `react-slidedown`:- Slide-down animation component. Collapsible panels, toggles, FAQs with smooth sliding effects.
- `react-sortablejs`:- Drag-and-drop sortable list based on SortableJS. Reorder tasks, Kanban boards, list items by dragging.
- `react-table`:- Lightweight and flexible headless table library. Complex data tables with sorting, pagination, filters (custom UI control).
- `react-tabs`:- Organize content into tabbed interfaces (e.g., settings, profile views).
- `react-tippy`:- Show helpful tooltips on hover or focus.
- `recharts`:- Beautiful charts built with React + D3 under the hood.
- `redux-debounced`:- Avoid firing API calls too quickly in succession (like search inputs).
- `redux-thunk`:- Middleware to write async logic in Redux (e.g., API calls). Dispatch async actions like fetching data from an API.

## sortablejs

- Sortable is a JavaScript library for reorderable drag-and-drop lists.
  1. Supports touch devices and modern browsers (including IE9)
  2. Can drag from one list to another or within the same list
  3. CSS animation when moving items
  4. Supports drag handles and selectable text (better than voidberg's html5sortable)
  5. Smart auto-scrolling
  6. Advanced swap detection
  7. Smooth animations
  8. Multi-drag support

## Swiper

- Swiper - is the free and most **modern mobile touch slider** with hardware accelerated transitions and amazing native behavior. It is intended to be used in mobile websites, mobile web apps, and mobile native/hybrid apps.

## web-vitals

- Measure performance metrics of your app based on Google’s Core Web Vitals (like LCP, FID, CLS).
- Helps track real-user experience (UX) and optimize performance.

## webfontloader

- **Purpose**: Dynamically load web fonts from Google Fonts, Typekit, or custom URLs.
- **Use Case**: Control font loading (e.g., show fallback fonts until your web font is ready).

## wnumb

- **Purpose**: A tiny number formatting library.
- **Use Case**: Format prices, percentages, or decimal values (especially useful with noUiSlider).

## xlsx

- **Purpose**: Parse and write Excel (xlsx) files in browser or Node.js.
- **Use Case**: Export table data to Excel, or read uploaded Excel files.
