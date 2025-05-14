
const User = ({name, prof, functionType}) => {
  return (
    <div className="user-card">
      Name: {name}
      <br />{prof}
      <br /> {functionType}
    </div>
  )
}

export default User;