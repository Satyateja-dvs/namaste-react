import { createContext } from "react";

const UserContext = createContext({
  loggedInUser: "Dummy User",
})

export default UserContext;