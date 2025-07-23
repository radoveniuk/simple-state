# 📦 SimpleState

A lightweight and dependency-free TypeScript state manager with built-in reactivity, subscription system, and reset functionality. Works great in any JavaScript or TypeScript environment: React, Node.js, or vanilla.

---

## ✅ Features

- ✅ Reactive state via `Proxy`
- ✅ Subscribe to individual properties
- ✅ Track array mutations (`push`, `splice`, etc.)
- ✅ Reset to initial state
- ✅ Fully typed with TypeScript

---

## 📦 Installation

```bash
npm install @radoveniuk/simple-state
```

Or with yarn:

```bash
yarn add @radoveniuk/simple-state
```

> Replace `@radoveniuk/simple-state` with your actual package name.

---

## 🛠 Project Setup & Publishing Guide

### 1. Create project structure

```
my-state-manager/
├── src/
│   └── index.ts
├── package.json
├── tsconfig.json
├── README.md
```

Place your `SimpleState` class in `src/index.ts`.

---

### 2. Initialize `package.json`

Run:

```bash
npm init
```

Answer the questions (name, version, description, etc).

---

### 3. Setup TypeScript config

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "CommonJS",
    "declaration": true,
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src"]
}
```

---

### 4. Add build script

In `package.json`:

```json
"scripts": {
  "build": "tsc"
}
```

---

### 5. Build the project

```bash
npm run build
```

This compiles your code to the `dist/` folder.

---

### 6. Prepare `README.md`

You're reading it now 😄

---

### 7. Create an npm account (if you don't have one)

```bash
npm adduser
```

---

### 8. Set correct entry points in `package.json`

```json
"main": "dist/index.js",
"types": "dist/index.d.ts",
```

---

### 9. Publish your package

If your package name is unique:

```bash
npm publish
```

If using a scoped package (e.g. `@radoveniuk/simple-state`):

```bash
npm publish --access public
```

---

## 🚀 Usage Examples

### 1. Create an instance

```ts
import SimpleState from '@radoveniuk/simple-state';

const state = new SimpleState({
  count: 0,
  user: { name: 'Alice' },
});
```

---

### 2. Subscribe to state changes

```ts
state.subscribe('count', (newValue) => {
  console.log('Count changed to:', newValue);
});

state.state.count += 1;
// Logs: "Count changed to: 1"
```

---

### 3. Track array mutations

```ts
const todos = new SimpleState({
  items: ['task 1'],
});

todos.subscribe('items', (updatedList) => {
  console.log('Todo list updated:', updatedList);
});

todos.state.items.push('task 2');
// Logs: "Todo list updated: ['task 1', 'task 2']"
```

---

### 4. Reset state

```ts
state.reset();
// Resets state to its initial value and notifies subscribers
```

---

## 🧩 API

### `new SimpleState<T>(initialState: T)`

Creates a new state manager with initial state of type `T`.

---

### `state.state`

A reactive proxy of your state. You can read and update it directly:

```ts
state.state.count += 1;
```

---

### `state.subscribe(key, callback)`

Subscribes to changes of a specific property.

```ts
state.subscribe('name', (newName) => console.log(newName));
```

---

### `state.reset()`

Resets state back to its initial value and notifies all subscribers.

---

## 🛡 TypeScript Support

Fully typed with autocomplete and type safety:

```ts
const appState = new SimpleState({
  user: { name: 'Alice', age: 30 },
  isLoading: false,
});

appState.state.user.name;        // string
appState.state.isLoading = true; // boolean
```

---

## 📄 License

MIT © Your Name or Company

---

## 🧠 Author Notes

This package is intentionally minimal and easy to integrate into any project. It’s perfect when you need a reactive state without introducing full-blown frameworks or external libraries.