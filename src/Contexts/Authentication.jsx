import { createContext, useContext, useReducer } from "react";

const AuthenticationContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return { ...state };
  }
}

const USER = {
  name: "Jade Pineda",
  userName: "jadewapi",
  password: "1111",
  avatar: "https://i.pravatar.cc/300",
};

function AthenticationProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );
  function login(userName, password) {
    if (userName === USER.userName && password === USER.password) {
      console.log("login");
      dispatch({ type: "login", payload: USER });
    } else alert("Wrong credentials");
  }
  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthenticationContext.Provider
      value={{ user, isAuthenticated, login, logout }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

function useAuthentication() {
  const context = useContext(AuthenticationContext);
  if (context === undefined) throw new Error("Authentication provider failed");
  return context;
}

export { useAuthentication, AthenticationProvider };
