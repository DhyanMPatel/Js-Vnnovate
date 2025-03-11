# React Folder Structure

- Folder Structure to manage the project in more concise way

## Component Folder

- A Component is one of the core building blocks of React.
- A UI is broken down into **multiple individual pieces** called components.
- You can work on components independently and then merge them all into a parent component which will be your final UI.

## Context Folder

- This directory contains files related to managing global state using the `React Context API`.
- Contexts are used to **share state across multiple components without having to pass props manually** through each level of the component tree.

## Hooks Folder

- Hooks provide `access to states` for functional components while creating a React application.
- Placing them in a dedicated directory allows for easy access and reuse across components throughout your application.

## Service Folder

- In this directory, you'll find files responsible for `handling API calls` and other services.

## Utils Folder

- Utility functions, such as `date formatting` or `string manipulation`, are stored in this directory.
- These functions are typically used **across multiple components or modules and `serve to centralize commonly used logic`**.

## Assets Folder

- Static assets like **images**, **icons**, **fonts**, and other media files are stored in the assets folder.

## Config Folder

- This folder contains of a **configuration file** where we store environment variables in config.js.
- We will use this file to set up multi-environment configurations in your application.
- Ex- `Environment Configuration`, `WebPack Configuration`, `Babel Configuration`, etc.

## Styles Folder

- This directory contains **CSS** or other styling files used to define the visual appearance of your application.
- In this folder styles of different components are stored here.
