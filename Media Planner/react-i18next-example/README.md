# React-i18next Localization Example

## Overview

This repository contains a sample project demonstrating the use of `react-i18next` for internationalization (i18n) in React applications. It provides a simple setup to manage translations and switch between multiple languages seamlessly.

## Project Structure

```bash
.
├── LICENSE
├── package.json
├── package-lock.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── README.md
├── src
│   ├── App.tsx
│   ├── components
│   │   ├── LanguageToggle.tsx
│   │   └── ThemeToggle.tsx
│   ├── hooks
│   │   ├── useLanguage.tsx
│   │   └── useTheme.tsx
│   ├── i18n
│   │   ├── config.ts
│   │   └── locales
│   │       ├── cn
│   │       │   └── common.ts
│   │       ├── en
│   │       │   └── common.ts
│   │       ├── index.ts
│   │       └── tw
│   │           └── common.ts
│   ├── index.css
│   ├── index.tsx
│   └── react-app-env.d.ts
├── tsconfig.json
└── yarn.lock
```

## Features

- Easy integration of `react-i18next` for localization.
- Support for multiple languages (e.g., English, Traditional Chinese, Simplified Chinese).
- Dynamic language switching.
- Example translation files for demonstration.

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm or yarn or pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/KunYi/react-i18next-example.git
   ```

2. Navigate to the project directory:

   ```bash
   cd react-i18next-example
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

   or

   ```bash
   pnpm install
   ```

### Running the Application

To start the development server, run:

```bash
npm start
```

or

```bash
yarn start
```

or

```bash
pnpm start
```

Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Usage

- The application demonstrates how to set up `react-i18next` for handling translations.
- You can switch between languages using the provided language toggle component.

### Adding New Languages

To add a new language:

1. Create a new translation file in the `i18n/locales` directory (e.g., `i18n/locales/[language_code]/common.ts`).
2. Add the translations in the appropriate format.
3. Update the i18next initialization in `i18n/locales/index.ts` to include the new language.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bugs.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [i18next](https://www.i18next.com/) - The internationalization framework used.
- [react-i18next](https://react.i18next.com/) - React bindings for i18next.
