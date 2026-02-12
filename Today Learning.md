# Alter (Modify Existing Table)

# Truncate (Delete records from table without affecting Structure)

# Group By (grouping data)

# Having (Filter grouping data)

# Constraints in MySQL

# Transactions in MySQL

# Indexing for Performance

- Indexes `speed up queries` by optimizing search operations.

# Stored Procedures & Triggers

## Stored Procedure (Reusable SQL Block)

## Trigger (Auto-executes before/after actions)

## Advance Topics

- `Views` → Virtual tables
- `Replication` → Copying databases
- `Partitioning` → Splitting large tables
- `Sharding` → Distributing database load

## Today should remind

- `React` and `React-DOM` should be in `peerDependencies`.
- `formik` in React. - to handle data in form
- `yup` in react. - for validation

# Redux

- What is `https://cdn.skypack.dev/redux`?



Write a FAANG-Level Technical Guide on SASS (SCSS)

- I want you to write a comprehensive, industry-level technical guide on SASS (Syntactically Awesome Stylesheets) similar to how advanced engineers explain technologies like Socket.IO, WebSocket, or Nodemailer.

- The explanation must be:
    - Clear enough for beginners (age 10+)
    - Deep enough for senior engineers (4–5 years experience)
    - Structured from basic → advanced → production-level concepts
    - Written in a professional, FAANG-level frontend engineering style
    - Concept-first, not just syntax-based
    - Focused on scalable frontend architecture

Required Structure
1. Introduction
    - What is SASS?
    - Why it was created
    - Problems it solves compared to plain CSS
    - Evolution from CSS → Preprocessors → Modern CSS
    - Real-world use cases:
        - Design systems
        - Large enterprise UI
        - SaaS dashboards
        - Multi-theme applications
    - Explain first using a simple analogy (like “CSS with superpowers”), then technical explanation.

2. Core Concepts (Fundamentals)
- Explain clearly:
    - Variables
    - Nesting
    - Partials
    - Import system
    - Mixins
    - Functions
    - Inheritance (@extend)
    - Operators
    - Control directives (@if, @for, @each, @while)
    - SCSS vs indented SASS syntax
- Explain simply first, then technically.

3. Architecture-Level Understanding
- How SASS fits into frontend architecture
- Component-based styling strategy
- SASS with:
    - React
    - Angular
    - Vue
    - Next.js
- Global styles vs modular styles
- 7-1 architecture pattern
- Design token management
- Theming systems
- Integration with CSS Modules
- Include text-based architecture diagram like:
- Components → SCSS Modules → Global Theme → Compiled CSS → Browser

4. Maintainability & Scalability
- What senior engineers must know:
    - Avoiding deep nesting
    - Managing large codebases
    - Naming conventions (BEM with SASS)
    - File organization strategies
    - Variable scoping
    - Preventing style leakage
    - Code splitting
    - Style reusability
- Explain common mistakes in enterprise applications.

5. Production-Level Best Practices
- For a 4–5 year experienced international developer:
    - Centralized theme variables
    - Dark/light theme implementation
    - Design system structure
    - Avoiding excessive @extend
    - Performance-aware mixins
    - Utility class generation
    - Responsive architecture with mixins
    - Using maps for dynamic styling
    - Linting & formatting (Stylelint)
    - Integration with build tools (Webpack, Vite)

6. Advanced Concepts
- Custom functions
- Dynamic theming
- CSS variable + SASS hybrid approach
- Generating utility frameworks
- Programmatic class generation
- Conditional styling systems
- Component library scaling
- Migrating from SASS to CSS-in-JS
- SASS in micro-frontend architecture

7. Performance & Optimization
- How SASS compiles to CSS
- Build-time vs runtime cost
- Minimizing output CSS
- Avoiding CSS bloat
- Tree-shaking unused styles
- Managing large design systems efficiently
- Explain performance trade-offs clearly.

8. Comparison Section
- Compare SASS with:
    - Plain CSS
    - LESS
    - Stylus
    - Tailwind CSS
    - CSS-in-JS (Styled Components, Emotion)
- Include:
    - Pros
    - Cons
    - Performance differences
    - Use-case recommendations
    - When not to use SASS

9. Code Examples
- Provide and explain clearly:
    - Basic variable example
    - Mixin example
    - Responsive mixin example
    - 7-1 architecture folder structure
    - Theming example
    - Utility class generator example
    - Enterprise-ready SASS setup
- Explain what each example demonstrates and why it matters.

10. Common Interview Questions
- Include:
    - Beginner Level
        - What is SASS?
        - Difference between SASS and SCSS?
        - What are mixins?
    - Mid-Level
        - How do you structure SASS in large projects?
        - How would you implement dark mode?
        - When should you use @extend vs mixins?
    - Senior-Level
        - How would you design scalable styling architecture?
        - How do you prevent CSS bloat?
        - How would you manage theming across micro-frontends?
    - System Design
        - Design styling architecture for a SaaS dashboard
        - Design scalable theming system
        - Design enterprise-level design system using SASS

11. Real-World Case Study
- Explain how a production SaaS application:
    - Manages global theme
    - Supports multi-brand theming
    - Handles responsive layouts
    - Maintains scalable component styles
    - Avoids CSS conflicts
    - Optimizes production build
- Explain design decisions and trade-offs.

12. Writing Guidelines
- Start with simple explanation, then go deep technically
- Avoid unnecessary jargon without explanation
- Use structured formatting
- Maintain clarity and precision
- No fluff
- Write like a senior frontend engineer explaining to another engineer
- Keep it readable for both technical and non-technical audiences