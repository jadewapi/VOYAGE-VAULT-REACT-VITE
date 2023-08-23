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
  name: "jade",
  email: "jadewapi@gmail.com",
  password: "1111",
  avatar: "https://i.pravatar.cc/300",
};

function AthenticationProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );
  function login(email, password) {
    if (email === USER.email && password === USER.password) {
      dispatch({ type: "login", payload: USER });
    }
  }
  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthenticationContext.Provider
      value={(user, isAuthenticated, login, logout)}
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