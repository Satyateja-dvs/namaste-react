1. Functional Component: A functional component is a component that returns the piece of JSX code (react element) and accepts props as an arguments
2. Class Based Component: A class based component is a component that extends the React.Component which has the render() menthod that returns the piece of JSX.
3.  When a class is created in the class based component by extending the React.Component, it is always needed to write the super(props) in the constructor to aquire all the constructer logic from the parent component(ie., React.Component in our case or any parent component if the current component is a child component)
    - If forget to use super(props), below is the error for the same.
    - ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
4. Like useState hook in functional component, we have this.state in class based component to store the data local to that component.