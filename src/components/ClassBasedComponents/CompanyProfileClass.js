import React from "react";

class CompanyProfileClass extends React.Component {
  constructor(props) {
    super(props)
    // console.log("this.props from child", this);
  }
  render() {
    return (
      <div>
        <div>{this.props.companyName}</div> 
      </div>
    )
  }
}

export default CompanyProfileClass;