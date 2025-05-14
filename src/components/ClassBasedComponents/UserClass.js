import React from 'react';
import CompanyProfileClass from './CompanyProfileClass';

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    console.log("this.props from parent", this);
  }
  render() {
    const {name, prof, functionType} = this.props;
    return (
      <div className="user-card">
        Name: {name}
        <br />{prof}
        <br /> {functionType}
        <br />
        <CompanyProfileClass companyName={"Trika Technologies"}/>
      </div>
    )
  }
}

export default UserClass;