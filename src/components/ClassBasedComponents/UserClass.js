import React from 'react';
import CompanyProfileClass from './CompanyProfileClass';

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
    console.log("UserClass Constructor called");
  }
  componentDidMount() {
    console.log("UserClassComponent mounted");
  }

  // componentDidUpdate() {
  //   console.log("Component updated");
  // }
  render() {
    console.log("UserClass Render method called");
    const {name, prof, functionType} = this.props;
    const {count} = this.state;
    return (
      <div className="user-card">
        <button onClick={() => {
          this.setState((prevState) => this.setState({count: prevState.count + 1}));
        }}>
          Click Me
        </button>
        {count}
        <br />
        Name: {name}
        <br />{prof}
        <br /> {functionType}
        <br />
        <CompanyProfileClass companyName={"Trika Technologies"}/>
        <CompanyProfileClass companyName={"Google"}/>
      </div>
    )
  }
}

export default UserClass;

// UserClass Constructor called
// UserClass Render method called
// CompanyProfileClass Constructor called
// CompanyProfileClass Render method called
// CompanyProfileClass Component mounted
// UserClassComponent mounted