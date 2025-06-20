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

## 11. Lazy Loading the components

We've many names for this as some developers say
 1. Chuncking
 2. Code Splitting
 3. Lazy Loading

At the end all the components are compressed in a single js file which is heavy in case of large applications. So, we can divide the js files/chunck the js files by lazy loading the components.

### Normal Import

```jsx
import Career from './components/Career';
```

### Lazy Import

```jsx
const Career = lazy(() => import ('./components/Career'));
```

### File Size Before
![alt text](assets/images/import-file-size.png)

### File Size After
![alt text](assets/images/import-file-size-after.png)

### Notes and Conclusion

1. Using lazy loading (code splitting) can significantly improve the performance of large applications by reducing the initial JavaScript bundle size.
2. Even if the reduction in file size seems small (e.g., 1KB), the impact is much greater in large-scale projects with many components, leading to faster load times and a better user experience.
3. Lazy loading ensures that only the code required for the current view is loaded, deferring the loading of other components until they are actually needed.
4. This technique helps optimize resource usage, improves perceived performance, and is considered a best practice for scalable React applications.

## Suspense
Now that your component’s code loads on demand, you also need to specify what should be displayed while it is loading. You can do this by wrapping the lazy component or any of its parents into a <Suspense> boundary:

```jsx
<Suspense fallback={<h1>Loading....</h1>}>
  <h2>Preview</h2>
  <Career />
</Suspense>
```

## 12. CSS Libraries

There are many CSS Libraries available. Some of them are mentioned below. They have their own way of defining the styles. Choose on your own

## Some popular CSS frameworks
1. [Styled Components](https://styled-components.com/)
2. [Material UI](https://mui.com/material-ui/)
3. [Chakra UI](https://chakra-ui.com/)
4. [Ant Design](https://ant.design/)

## Most Recommended and Trending Library/Framework
🔊[Tailwind CSS](https://tailwindcss.com/)

### Criteria for Choosing CSS Frameworks
1. Project Requirement
2. Eases the learning process.
3. Minimizes compatibility issues.
4. Provides community support.
5. Ensures scalability & long-term viability.

## 13. Using Tailwind Framework
The Tailwind internally using POST CSS(which is a tool that uses JavaScript plugins to transform CSS code). Our Parcel understands the Tailwind CSS with the help of PostCSS tool.

✅ Please follow the Installation Guide to install using Parcel: https://tailwindcss.com/docs/installation/framework-guides/parcel

### Pros and Cons of Tailwind

| Pros | Cons |
|:-----|:-----|
| You can write all your styles directly in your component, so you don’t need to switch between CSS and JS files. This can make you more productive. Tailwind is easy to learn. | If you need a lot of styles, your className can get very long and messy, which can make your code harder to read. |
| Before all the classes will load at a time from the single CSS file and now, Our Bundler will only include the classes that are absolutely required for the component, making your website faster | |
|Tailwind will never ship unused CSS which improves the SEO Performance||
|Tailwind supports and has the classes for Dark and Light theme along with many other features||


## 14. Higher Order Functions
1. The higher order functions are the functions that takes the function/component as an input and returns the enhanced component/function as an output.
2. These higher order functions are the pure functions in which the function/component code will not be modified but it enhances the component while returning.
3. HOC is an advanced technique in React for reusing component logic

```jsx
const withLogger = (WrappedComponent) => {
  return (props) => {
    console.log("Component rendered:", WrappedComponent.name);
    return <WrappedComponent {...props} />;
  };
};

const MyComponent = (props) => {
  return <div>My Component</div>;
};

const EnhancedComponent = withLogger(MyComponent);
```

## 15. Props Drilling

1. React is a One Directional Data flow system, where the data will be passed from parent to its children and children to its children. This is called Props Drilling.
2. Props drilling in React refers to the process of passing data (props) down through multiple layers of components, even if some of those components don't actually need the data.
3. The Props Drilling from parent to children is essential if the childrens are less(one or two levels). States and Props are much needed for React. Without these React does not exist

### Problem of Props Drilling
1. Think of very big nesting, passing the data from parent to its 10th children, no other children needed the data but only the 10th children needs the data.
2. So, we need a global level for storing the data for the 10th children to access the data. React gives that super power to access the data globally. That Super Power💥 is called "React Context"


## 16. React Context
1. We can avoid props drilling using React Context. Its foolish to pass the data 10 levels deep using Props Drilling and its not a good way.
2. With the React Context, we can access the data from anywhere. Some useful/important scenarios where we need the Global Context.
  i. Logged-in User Info in Header 
  ii. Theme(Dark theme/Light theme) - We need to know user enabled which theme and depending on that our components can be updated to use dark theme (Ex., ```className="text-black dark:text-white"```)

### 16.1 Creating & Using Context

#### Creating Context
We can create the context using createContext function available from react

> File Path: src/utils/UserContext.js
```jsx
import { createContext } from "react"

const UserContext = createContext({
  loggedInUser: "Dummy"
})

export default UserContext;
```

#### Using Context in Functional Component
We can use the context using useContext from react which is a standard way now.

```jsx
import {useContext} from "react";
import UserContext from "./UserContext";

const {loggedInUser} = useContext(UserContext)
```

#### Using Context in Class Based Component

```jsx
import UserContext from ".UserContext";

class AboutClass extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <UserContext.Consumer>
        {({loggedInUser}) => console.log(loggedInUser)}
      </UserContext.Consumer>
    )
  }
}
```

### 16.2 Updating the Context
For updating the context, we use provider available from context.
1. Lets say, I got the data from the API, and updating the context.

> File Path: src/App.js

```jsx
import UserContext from "react";

const App = () => {
  return (
    <UserContext.Provider value={{loggedInUser: "Hello! Satya"}}>
      <Header />
    </UserContext.Provider>
  )
}
```
> 🔊 In the above code, the context will update only for Header Component and other parts of the component still use other ```Dummy``` value given by ```loggedInUser```

We can multiple contexts for multiple components. This Context is very much performant. React takes care of all the performance.

We can write multiple User Contexts aswell. There is no issue and the below is the perfectly valid code.

```jsx
import UserContext from "./UserContext";

const App = () => {
  return (
    <UserContext.Provider value={{loggedInUser: "Hello! Satya"}}>
      <Header />
      
      <UserContext.Provider value={{loggedInUser: "Hello! John"}}>
        <Body />
      </UserContext.Provider>
    </UserContext.Provider>
  )
}
```
The above code is perfectly valid code. ```Hello! Satya``` will be available for Header Component and ```Hello! John``` will be available only for Body Component. 💥 This is amazing in react.

🔊 We can also pass the useState updating hooks to the provider to update it anywhere. See the code below.

```jsx
import UserContext from "./UserContext";
import { useState } from "react";

const App = () => {
  const [user, setUser] = useState();
  return (
    <UserContext.Provider value={{loggedInUser: "Hello! Satya", setUser}}>
      <Header />
      
      <UserContext.Provider value={{loggedInUser: "Hello! John"}}>
        <Body />
      </UserContext.Provider>
    </UserContext.Provider>
  )
}
```

> In Header Component or Any Where on the App, we can update the userName simply,

```jsx
import {useContext} from "react";
import UserContext from "./UserContext";


const {setUser} = useContext(UserContext);

useEffect(() => {
  setUser("Another Name")
}, [])
```
💥Now wherever the user useState hook is used it will update the value there

### Notes:
1. When building small and mid level applications this context is very much helpful without using the Data Management Libraries/State Management Libraries like Redux. For small and mid is context is very much scalable.
2. We can also build very large applcations using Context also but Redux is scalable and trending external library. Lot of people using Redux now a days.

## 17. Is Redux and Context are same?

Redux is the external library which is not in react. We have to do ``` npm install ``` to get into our store. Both are used the manage the state of the application but Context comes with React and Redux is the external state management library.

## 18. Redux (💥Redux is not mandatory and use it when it is required)

> ℹ️ Redux and React are separate not the same. Redux is the seperate library which we install in React

1. There is no need to use Redux when building an app. There are lot of companies use Redux starting with project without any further thought, we need to undestand whether Redux is needed or not.
2. 🔔 Redux is not mandatory. When Building small and medium scale applications we dont have to use Redux, instead we can use context.
3. If we are building large scale applications(lot of data transfers between the components) where data is heavily used, we need data management libraries like React.

> 🔊 Zustand is another libray for state management and gaining popularity now a days and lot of companies are using it.

### Why to use Redux

1. When using Redux application becomes easy to debug
2. Redux provides lot of solutions for large scale applications.

### 18.1 REDUX
1. Redux is the big Javascript object kept in a centralised area where all the components will have access to it.
2. With Redux, we can write the data and read the data.
3. **Is it Okay to store all the data in Redux?** - YES, its absolutely fine keeping all the data in Redux by making use of Slices to keep data seperate.
4. Example for Slice - If we want to store cart data in redux, then we will create seperate slice for cart slice. Similarly, for login/user we can create a login/user slice.

#### Cart Slice - Adding the Cart Item to Cart Slice in Redux (Dispatch Action - Writing data to Redux)
5. What Redux says is "you cannot directly add the cart item to cart slice in Redux". When we click on the cart add button it dispatches an action. After the dispatch action, it calls a function and this function modifies the cart.
  - And that function is known as the **"Reducer"**
6. In simple, when we click on the Add button of any item, which dispatches an **Action** which calls the Reducer function to modify the cart slice of "Redux" store 

#### Reading data from Redux
7. For reading the data, we use something known as **Selector**, and the selector will update the react component to read the data wherever we want.
8. > NOTE: So, lets say the header component have the cart item which has cart count, so it is reading the data from the Redux by selector. The Selector in other words called **Subscribing**. So, the cart count is Subscribed to the Redux Store.
9. Subscribe in the sense, it is in sync with Redux store. If item is added to the Redux store, the cart count updates immediately and it is in sync with the store by subscribing.
10. How do we subscribe is using the **Selector**


#### 18.2 Installing Redux
To install redux we need to have two libraries installed
1. **react-redux**: This will help components to read the data from the redux store and dispatches the actions to the redux store to update the state.
  ``npm install react-redux``

```jsx
import {Provider} from "react-redux"
import {appStore} from './utils/appStore';


<Provider store={appStore}>
  // Component logic goes here...
</Provider>
```

2. **@reduxjs/toolkit**: This will help to build the Redux store and save the application data
  ``npm install @reduxjs/toolkit``

```jsx
import {configureStore} from "@reduxjs/toolkit"

const appStore = configureStore({

})

export default appStore
```

3. To Build the Cart Slice
- Each Slice use the reducer and export the actions and reduer

```jsx
import {createSlice} from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: []
  },
  reducers: {
    //actions
    addItem: (state, action) => {
      state.items.push(action.paylod);
    }
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    clearCart: (state) => {
      state.items = []
    }
    // actions are addItem, removeItem, clearCart
  }
})

const {addItem, removeItem, clearCart} = cartSlice.actions;
export default cartSlice.reducer;
```

3. Use the slice/import the slice into the main store reducer.
 
- The cartSlice needs to be merged to the reducer of main store 

```jsx
import {configureStore} from "@reduxjs/toolkit"
import cartReducer from "./cartSlice"

const appStore = configureStore({
  reducer: {
    cart: cartReducer,
    // Similarly all the other slices will be imported here...
  }
})

export default appStore;
```

#### 18.3 For reading the data: 
 - Use the ***useSelector()*** provide by react-redux to the data from the slices

```jsx
import {useSelector} from "react-redux"

// we are actually subscribing to the store by useSelector() hook
const cartItems = useSelector((store) => store.cart.items)

console.log(cartItems.count)
```
#### 18.4 For adding the item to the cart:
 - Use ***useDispatch()*** for adding the items to cart and updating the redux store accordingly

```jsx
import {useDispatch} from "react-redux"
import { addItem } from "../utils/cartSlice";

const handleAddItem = () => {
  // call an action
  useDispatch(addItem("pizza"))
  // here action.payload is "pizza" which will add to the state.items array
}
```
#### 18.5 For removing the item from the cart:
 - Use ***useDispatch()*** for removing the item from the cart and updating the redux store accordingly

```jsx
import {useDispatch} from "react-redux"
import { removeItem } from "../utils/cartSlice";

const handleAddItem = () => {
  // call an action
  useDispatch(removeItem("pizza"))
  // here action.payload is "pizza" which will add to the state.items array
}
```
#### 18.6 For clearing all cart items:
 - Use ***useDispatch()*** for removing the item from the cart and updating the redux store accordingly

```jsx
import {useDispatch} from "react-redux"
import { clearCart } from "../utils/cartSlice";

const handleAddItem = () => {
  // call an action
  useDispatch(clearCart())
  // here action.payload is "pizza" which will add to the state.items array
}
```

> NOTES: 
> Subscribing to the right store is very important otherwise it will be a performance loss if we get access to all the stores in the react component.

✅ Good Practice
```jsx
  import {useSelector} from "react-redux"

  const cartItems = useSelector((store) => store.cart.items)
```

❌ Bad Practice
```jsx
  import {useSelector} from "react-redux"

  const store = useSelector((store) => store) // Here we unnecessarly fetching all the store information, the store will have multiple slices which will reduce the performance. Its foolish to subscribe to all the store information and our component will get affected by any updates made to the store by different slices
  const cartItems = store.cart.items

```

#### 18.7 With Vinnela(Older) Redux we shouldn't mutate the state

```jsx
import {createSlice} from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: []
  },
  reducers: {
    //actions
    addItem: (state, action) => {
      // With Vinnela (Older) Redux => DON'T MUTATE STATE
      // const newState = [...state]
      // newState.items.push(action.payload)
      // return newState

      // With REDUX ToolKit
      // We have to mutate the state
      state.items.push(action.paylod);
    }
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    clearCart: (state) => {
      state.items = []
    }
    // actions are addItem, removeItem, clearCart
  }
})
```
> ## Important Notes 🔊
> 1. With Redux **WE HAVE TO MUTATE THE STATE**, in background react does something like vennila redux does(as mentioned in the above code comment). 
> 2. Redux uses [immer library](https://immerjs.github.io/immer/) internally to simplify state management. This means you can write code that looks like you're directly modifying the state(ex., state.items.push() Here state is directly modifying), but Immer ensures that the changes are applied in a safe and immutable way
> 3. Install [Redux DevTools](https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) for powerful debugging. It will show all the logs whenever we dispatch any events. It helps if any dispatch is unnecessarly triggering and many more.
> 4. Earlier for saving the API response we use Redux thunk and middlewares and now, we have **RTK Query** a data fetching and caching too

#### 18.8 RTK Query
 - [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) is a powerful data fetching and caching tool. It is designed to simplify common cases for loading data in a web application, eliminating the need to hand-write data fetching & caching logic yourself.

