import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "./style.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

function Navbar() {
  return (
    <nav style={{ backgroundColor: "green" }}>
      <ul>
        <li>
          <NavLink to="/homepage">Homepage</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
    </nav>
  );
}

function Homepage() {
  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: "blue", color: "white" }}>Homepage</div>
    </>
  );
}

function Pricing() {
  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: "orange" }}>Pricing</div>
    </>
  );
}

function Login() {
  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: "red" }}>Login</div>
    </>
  );
}

export default App;
