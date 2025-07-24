# 📦 SimpleState.js

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
npm install simple-state-js
```

Or with yarn:

```bash
yarn add simple-state-js
```
---

## 🚀 Usage Examples

### 1. Create an instance

```ts
import SimpleState from 'simple-state-js';

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

MIT © Bohdan Radoveniuk

---

## 🧠 Author Notes

This package is intentionally minimal and easy to integrate into any project. It’s perfect when you need a reactive state without introducing full-blown frameworks or external libraries.