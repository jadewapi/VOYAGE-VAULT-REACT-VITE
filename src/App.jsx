import { useEffect, useState } from "react";
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
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const BASE_URL = "http://localhost:8000";

  useEffect(function () {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error("error with fetching data.");
        }
        setCities(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="homepage" element={<Homepage />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="mainApp" element={<MainApp />}>
          <Route
            index
            element={<MainAppCities cities={cities} isLoading={isLoading} />}
          />
          <Route
            path="cities"
            element={<MainAppCities cities={cities} isLoading={isLoading} />}
          />
          <Route path="countries" element={<MainAppList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function MainAppCities({ cities, isLoading }) {
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!isLoading && cities) {
    return cities.map((item) => <p key={item.id}>{item.country}</p>);
  }
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
    <div>
      <NavLink to="/mainApp/cities">Cities</NavLink>
      <NavLink to="/mainApp/countries">Countries</NavLink>
    </div>
  );
}

function MainApp() {
  return (
    <>
      <div>
        <Link to="/homepage">Homepage</Link>
        <p>-------------</p>
        <p>App</p>
        <MainAppNav />
        <Outlet />
      </div>
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
