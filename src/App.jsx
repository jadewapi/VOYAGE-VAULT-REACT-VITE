import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
  Outlet,
} from "react-router-dom";
import "./style.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="mainApp" element={<MainApp />}>
          <Route index element={<MainAppCities />} />
          <Route path="cities" element={<MainAppCities />} />
          <Route path="countries" element={<MainAppList />} />
        </Route>
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
      <div style={{ backgroundColor: "red" }}>
        <p>Login</p>
        <Link to="/mainApp">Login</Link>
      </div>
    </>
  );
}

function MainAppNav() {
  return (
    <>
      <NavLink to="/mainApp/cities">Cities</NavLink>
      <NavLink to="/mainApp/countries">Countries</NavLink>
    </>
  );
}

function MainApp() {
  return (
    <>
      <div>
        <Link to="/homepage">Homepage</Link>
        <p>App</p>
        <MainAppNav />
        <Outlet />
      </div>
    </>
  );
}

function MainAppCities() {
  return (
    <>
      <div>Cities</div>
    </>
  );
}

function MainAppList() {
  return (
    <>
      <div>List</div>
    </>
  );
}

export default App;
