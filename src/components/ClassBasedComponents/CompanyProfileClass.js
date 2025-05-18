import React from "react";

class CompanyProfileClass extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props.companyName + "CompanyProfileClass Constructor called");
  }
  componentDidMount() {
    console.log(this.props.companyName + "CompanyProfileClass Component mounted");
  }
  render() {
    console.log(this.props.companyName + "CompanyProfileClass Render method called");
    return (
      <div>
        <div>{this.props.companyName}</div> 
      </div>
    )
  }
}

export default CompanyProfileClass;