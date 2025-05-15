# React Component Types and Lifecycle

## 1. Functional Component
A **functional component** is a component that returns a piece of JSX code (a React element) and accepts `props` as arguments.

---

## 2. Class Based Component
A **class based component** is a component that extends `React.Component` and has a `render()` method that returns JSX.

---

## 3. Using `super(props)` in Class Components
When creating a class-based component by extending `React.Component`, you must call `super(props)` in the constructor to inherit the parent component's constructor logic.

**If you forget to use `super(props)`, you will get this error:**
> ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor

---

## 4. State Management
- In functional components, use the `useState` hook to store local data.
- In class-based components, use `this.state` to store local data.

---

## 5. React Component Lifecycle

React components go through a lifecycle with three main phases: **mounting**, **updating**, and **unmounting**. Each phase has associated lifecycle methods.

### Mounting
Occurs when a component is created and inserted into the DOM.

- `constructor()`: Initializes the component's state and binds methods.
- `static getDerivedStateFromProps()`: Updates state based on changes in props.
- `render()`: Returns the JSX to be rendered.
- `componentDidMount()`: Called after the component is rendered; often used for fetching data or setting up subscriptions.

### Updating
Occurs when a component's state or props change, leading to re-rendering.

- `static getDerivedStateFromProps()`: Updates state based on props changes.
- `shouldComponentUpdate()`: Determines if the component should re-render (used for performance optimization).
- `render()`: Renders the updated JSX.
- `getSnapshotBeforeUpdate()`: Captures information from the DOM before it is updated.
- `componentDidUpdate()`: Called after the component is re-rendered; useful for performing actions based on updated state or props.

### Unmounting
Occurs when a component is removed from the DOM.

- `componentWillUnmount()`: Used for cleanup actions, such as clearing timers or canceling network requests.

### Error Handling
- `componentDidCatch()`: Called when there is an error during rendering, in a lifecycle method, or in the constructor of any child component. Used for logging errors and displaying fallback UI.