## 3. Installation & Setup

### Requirements

- **Node.js 12.0.0+** (recommended for npm installation)
- **Any modern text editor** (VS Code, WebStorm, Sublime Text, etc.)
- **Basic CSS knowledge** (required)

### Installation Methods

#### Method 1: Global Installation (Recommended for beginners)

```bash
# Install SASS globally via npm
npm install -g sass

# Verify installation
sass --version
```

#### Method 2: Project-Specific Installation

```bash
# Install as dev dependency
npm install --save-dev sass

# Or with yarn
yarn add --dev sass
```

#### Method 3: CDN (For quick testing)

```html
<!-- Use in browser (not recommended for production) -->
<script src="https://cdn.jsdelivr.net/npm/sass"></script>
```

### Basic Usage

#### Command Line

```bash
# Compile single file
sass input.scss output.css

# Watch for changes (auto-compile on save)
sass --watch input.scss:output.css

# Watch entire directory
sass --watch scss:css

# Compile with sourcemaps
sass --watch --source-map scss:css

# Minified output
sass --style compressed input.scss output.css
```

#### Package.json Scripts

```json
{
  "scripts": {
    "sass:build": "sass scss/main.scss css/main.css --style compressed",
    "sass:watch": "sass --watch scss:css --source-map",
    "sass:dev": "sass --watch scss:css --style expanded"
  }
}
```

### VS Code Setup

#### Recommended Extensions

```json
// .vscode/extensions.json
{
  "recommendations": [
    "syler.sass-indented",           // SASS syntax highlighting
    "ritwickdey.liveserver",         // Live server for testing
    "bradlc.vscode-tailwindcss",     // If using with Tailwind
    "stylelint.vscode-stylelint"     // SASS linting
  ]
}
```

#### VS Code Settings

```json
// .vscode/settings.json
{
  "liveSassCompile.settings.formats": [
    {
      "format": "expanded",
      "extensionName": ".css",
      "savePath": "/css"
    },
    {
      "format": "compressed",
      "extensionName": ".min.css",
      "savePath": "/css"
    }
  ],
  "liveSassCompile.settings.generateMap": true,
  "liveSassCompile.settings.autoprefix": [
    "> 1%",
    "last 2 versions"
  ]
}
```

### Project Structure Setup

#### Basic Project Structure

```
my-project/
├── scss/
│   ├── main.scss           # Main entry point
│   ├── _variables.scss     # SASS variables
│   ├── _mixins.scss        # SASS mixins
│   └── components/         # Component styles
│       ├── _buttons.scss
│       └── _cards.scss
├── css/
│   ├── main.css           # Compiled CSS
│   └── main.min.css       # Minified CSS
├── index.html
├── package.json
└── README.md
```

#### Main SCSS File

```scss
// scss/main.scss
// Abstracts
@import 'variables';
@import 'mixins';

// Components
@import 'components/buttons';
@import 'components/cards';

// Base styles
body {
  font-family: $font-family-base;
  color: $text-color;
}
```

### Build Tool Integration

#### Webpack Setup

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',      // Creates style nodes from JS strings
          'css-loader',        // Translates CSS into CommonJS
          'sass-loader'        // Compiles SASS to CSS
        ]
      }
    ]
  }
};
```

#### Vite Setup

```javascript
// vite.config.js
export default {
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variables.scss";`
      }
    }
  }
};
```

#### Gulp Setup

```javascript
// gulpfile.js
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');

function compileSass() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'));
}

function minifyCSS() {
  return gulp.src('dist/css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
}

exports.build = gulp.series(compileSass, minifyCSS);
exports.watch = () => {
  gulp.watch('src/scss/**/*.scss', compileSass);
};
```

### Configuration Options

#### SASS Options

```javascript
// Custom compiler options
const sass = require('sass');

const result = sass.compile('style.scss', {
  style: 'compressed',        // nested, expanded, compact, compressed
  sourceMap: true,           // Generate sourcemaps
  loadPaths: ['node_modules'], // Import paths
  charset: true,             // Include @charset
  quietDeps: true            // Silence deprecation warnings
});
```

#### Environment Variables

```bash
# .env
SASS_PATH=./src/scss
NODE_ENV=development
```

```javascript
// Use in build process
const isProduction = process.env.NODE_ENV === 'production';
const outputStyle = isProduction ? 'compressed' : 'expanded';
```

### Troubleshooting

#### Common Issues

**Issue:** "Cannot find module 'sass'"
```bash
# Solution: Reinstall sass
npm uninstall sass
npm install sass
```

**Issue:** Import paths not working
```scss
// Use relative paths or configure loadPaths
@import '../../variables';
// or configure in build tool
```

**Issue:** Compilation errors not showing
```bash
# Use verbose mode
sass --watch --verbose scss:css
```

#### Debug Mode

```bash
# Enable debug logging
DEBUG=sass:* sass --watch scss:css
```

### Next Steps

1. **[Syntax Comparison](04_syntax_comparison.md)** - Choose between SCSS and indented SASS
2. **[Project Structure](05_project_structure.md)** - Learn the 7-1 architecture pattern
3. **[Examples](08_examples/basic-setup/)** - See a complete working example

### Performance Tips

- Use `--style compressed` for production builds
- Enable sourcemaps only in development
- Use `--watch` for development, not production
- Consider using Dart SASS for better performance
- Cache compiled CSS in CI/CD pipelines

---

**Ready to start using SASS?** Move on to learn about syntax differences and project structure! 🚀
