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
- `componentDidMount()`: Called after the component is rendered; often used for fetching data by calling API's or setting up subscriptions.

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

---

## 6. React Lifecycle Diagram
![alt text](assets/images/react-lifecycle-diagram.png)

### Render Phase vs Commit Phase

**Render Phase:**
- This is when React calls the lifecycle methods and renders the JSX to create a virtual DOM.
- It is a "pure" phase: no side effects should occur here.
- Methods called: `constructor`, `getDerivedStateFromProps`, `render`, and `shouldComponentUpdate`.
- Can be paused, aborted, or restarted by React.

**Commit Phase:**
- This is when React applies changes to the actual DOM.
- Side effects are allowed here.
- Methods called: `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`, and `getSnapshotBeforeUpdate`.
- This phase cannot be interrupted.

---

## 7. Code Example

```jsx
import React from "react";

class User extends React.Component {
    constructor(props) {
        super(props);
        console.log("User Constructor Method Called");
        // 1. It calls the contructer and
        // 2. It renders the dummy data on the DOM by rendering HTML.
        // 3. Then, the componentDidMount will be called.
    }

    componentDidMount() {
        console.log("User componentDidMount is Called");
        // 1. This method is used to call APIs.
        // 2. Once the data is received from the API, update the content using this.setState.
        // 3. This triggers a re-render of the component with the new data.
        // 4. Then, componentDidUpdate will be called.
    }

    componentDidUpdate() {
        console.log("User componentDidUpdate is Called");
    }

    componentWillUnmount() {
        // This will be called when we navigate away and the component is removed from the DOM.
        console.log("User componentWillUnmount is Called");
    }

    render() {
        console.log("User Render Method Called");

        return (
            <div>
                Name: Satya Teja DVS
            </div>
        );
    }
}
```

### Output in Developer Console Screen
When the component mounts:
```
User Constructor Method Called
User Render Method Called
User componentDidMount is Called
```

If the state or props update:
```
User Render Method Called
User componentDidUpdate is Called
```

When the component unmounts:
```
User componentWillUnmount is Called
```

---

## 8. Explanation of `componentWillUnmount` in Class-Based Components

If we define a `setInterval` inside `componentDidMount` in a class-based component, it will continuously call `console.log` even after navigating away from the component. This happens because the interval is not cleared when the component unmounts in a Single Page Application (SPA).

### ❌ Bad Practice

```jsx
componentDidMount() {
    setInterval(() => {
        console.log("Calling setInterval");
    }, 1000);
}
```
In the example above, console.log will continue to run even after navigating to a different page, because the interval remains active after the component has been unmounted.(If you are creating the mess, you should clear the mess)

### ✅ Good Practice
``` jsx
componentDidMount() {
    this.timer = setInterval(() => {
        console.log("Calling setInterval");
    }, 1000);
}

componentWillUnmount() {
    clearInterval(this.timer);
}
```
> Note: We stored setInterval in a variable using this.timer. "this" is available throught the class and we can create and access any variable using this.

---

## 9. Explanation of Component Unmounting in Functional Components

Similar to class-based components, when using functional components, any intervals or subscriptions created should be cleared when the component unmounts.

React is a Single Page Application (SPA), meaning components are mounted and unmounted dynamically as you navigate between pages. If intervals aren't properly cleared, they will continue to run even after the component is removed from the DOM.

Below is the bad code and it will call the console even when we change to the differnt method.

### ❌ Bad Practice

``` jsx
useEffect(() => {
    setInterval(() => {
        console.log("Calling setInterval");
    }, 1000);
}, []);
```
This code creates an interval that will continue to run indefinitely, even after the component is unmounted.

### ✅ Good Practice

``` jsx
useEffect(() => {
    const timer = setInterval(() => {
        console.log("Calling setInterval");
    }, 1000);

    return () => {
        clearInterval(timer);
    };
}, []);
```
> Note: The return statement in useEffect is used to clean up side effects, such as intervals or subscriptions, when the component is unmounted.

## 10. Single Responsibility Pricinciple

If we have defined the logic of fetching the restaurant data from an API inside the RestaurantMenu Component, the component is not maintaining the single resposibility princilple and the JOB of the the component is just to render the list of menus and it should worry of how to fetch the data.

So, we can extract the fetching API code to the seperate logic by creating the custom hook.

> ⚠️ Note: Hooks are nothing but the normal utility functions.

So, lets create a custom hook and the name of the hook should start with "use" for react to understand that it is a hook. The hook is just like a normal function where we can use useState and useEffect in it.

Below is the code for reference

### Main Component

```jsx
import useRestroData from "../utils/useRestroData";

const RestroDetailPage = () => {
  const {id} = useParams();

  // This is a custom hook that follows the Single Responsibility Principle (SRP)
  const restroData = useRestroData(id);

  if (restroData === null) {
    return <Shimmer />
  }

  return (
    // Return the JSX with the restroData on to the DOM
  )
}
```
### Custom Hook

> File Path: src/utils/useRestroData.js

```jsx
import { useEffect, useState } from "react";
import { RESTRO_DETAIL_PAGE_URL } from "./constants";

const useRestroData = (id) => {
  const [restroData, setRestroData] = useState(null);

  useEffect(() => {
    getRestaurantData();
  }, [])

  async function getRestaurantData() {
    const data = await fetch(`${RESTRO_DETAIL_PAGE_URL}&restaurantId=${id}`)
    const response = await data.json();
    setRestroData(response.data)
  }
  
  return restroData;
}
```
