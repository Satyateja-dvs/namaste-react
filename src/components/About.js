import User from './User';
import UserClass from './ClassBasedComponents/UserClass';

const About = () => {
  return (
    <div>
      <h1>About</h1>
      <p>This is a food delivery app</p>
      <User name={"Satya Teja DVS"} prof={"Senior Software Engineer"} functionType={"Functional Component"}/>
      <br />
      <UserClass name={"Satya Teja DVS"} prof={"Senior Software Engineer"} functionType={"Class Based Component"}/>
    </div>
  )
}

export default About;