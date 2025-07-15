# RxJS Basics

- RxJS (`Reactive Extensions for JavaScript`) is a **library** for reactive programming using Observables.

##  RxJS Core Concepts Must Know First

### 1. **Observable** : 
- A data stream (like a promise, but more powerful)
- It’s like a `Promise`, but:
    - A promise gives you one value, once
    - An observable can `give you multiple values over time`
- **YouTube Live**: A new message comes in the live chat. That's like an observable emitting a new value.

### 2. **Observer** : 
- An Observer `subscribes to the Observable` to receive the data.
- It has three methods:
    - `next(value)`: Called when a new value is emitted
    - `error(err)`: Called if an error occurs
    - `complete()`: Called when the Observable completes (The stream ends)

### 3. **Subscription** : 
- When an **Observer subscribes** to an Observable, it gets a **Subscription object**.
- Controls the stream (start/stop)
- Why unsubscribe?
    - To `avoid memory leaks` — especially in Angular when components are destroyed.
- Example: When you leave a YouTube video, you stop receiving new chat messages.

### 4. **Operators** : 
Operators are **functions** that `modify observables`.
- Transform data (`map`)
- Filter data (`filter`)
- Delay data (`debounceTime`)
- Combine multiple streams (`merge`, `combineLatest`)
- Handle errors (`catchError`, `retry`)

### 5. **Subjects** : 
- Special type of Observable that can emit data manually (share data between multiple components manually).

## Observable lifecycle

- `Creation`: Observable is created
- `Subscription`: Observer subscribes to Observable
- `Emission`: Observable emits values
- `Completion`: Observable completes (emits no more values)
- `Unsubscription`: Observer unsubscribes

## RxJS use Cases

- HTTP requests
- User input (like typing in a search box)
- Click and scroll events
- Timers
- WebSockets
- Complex event-based logic