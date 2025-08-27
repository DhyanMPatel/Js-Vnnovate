# VS Code Custom Snippets Guide

This guide explains how to create your own **custom shortcuts (snippets)** in Visual Studio Code, so you can type short prefixes like `clw` and expand them into full code such as `console.warn()`.

---

## 📌 What Are Snippets?

Snippets are user-defined shortcuts that expand into commonly used code.  
For example:

- Typing `clg` → expands to `console.log()`
- Typing `clw` → expands to `console.warn()`

---

## 🛠️ How to Add a Custom Snippet

### Step 1: Open Snippet Settings
1. Open **Command Palette**  
   ```
   Ctrl + Shift + P
   ```
2. Search for:  
   ```
   Snippets: Configure Snippets
   ```
3. Choose a language file:  
   - `javascript.json` → for `.js` files  
   - `javascriptreact.json` → for `.jsx` or `.tsx` files  

---

### Step 2: Add Your Snippet
Inside the JSON file, add your custom snippet.  
Example for `console.warn()`:

```json
{
  "Console Warn": {
    "prefix": "clw",
    "body": [
      "console.warn($1);"
    ],
    "description": "Log warning to console"
  }
}
```

---

### Step 3: Save and Test
1. Save the snippet file  
2. Restart VS Code (if needed)  
3. Open a `.jsx` or `.js` file  
4. Type your shortcut (`clw`) and press `Tab`  
5. It expands into:  
   ```js
   console.warn();
   ```

---

## 🚀 Example Snippet Pack

Here’s a ready-to-use snippet pack for logging in JavaScript/React:

```json
{
  "Console Log": {
    "prefix": "clg",
    "body": [
      "console.log($1);"
    ],
    "description": "Log output to console"
  },
  "Console Warn": {
    "prefix": "clw",
    "body": [
      "console.warn($1);"
    ],
    "description": "Log warning to console"
  },
  "Console Error": {
    "prefix": "cle",
    "body": [
      "console.error($1);"
    ],
    "description": "Log error to console"
  },
  "Console Table": {
    "prefix": "clt",
    "body": [
      "console.table($1);"
    ],
    "description": "Log table to console"
  }
}
```

---

## 🧩 Notes

- Use `$1`, `$2`, etc. for **tab stops** (cursor positions).  
- Use `"prefix"` to define the shortcut.  
- Snippets are **language-specific** (JavaScript, React, TypeScript, etc.).  

---

## ✅ Summary

Now you can:
- Create custom shortcuts (`clg`, `clw`, etc.)
- Save time while coding
- Customize them for your workflow

Happy coding! 🚀
