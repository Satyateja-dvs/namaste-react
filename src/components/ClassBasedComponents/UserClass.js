import React from 'react';
import CompanyProfileClass from './CompanyProfileClass';

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    console.log("this.props from parent", this);
  }
  render() {
    return (
      <div className="user-card">
        Name: {this.props.name}
        <br />{this.props.prof}
        <br /> {this.props.functionType}
        <br />
        <CompanyProfileClass companyName={"Trika Technologies"}/>
      </div>
    )
  }
}

export default UserClass;