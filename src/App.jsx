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
  const [places, setPlaces] = useState([]);
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
        setPlaces(data);
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
            element={<MainAppCities place={places} isLoading={isLoading} />}
          />
          <Route
            path="cities"
            element={<MainAppCities places={places} isLoading={isLoading} />}
          />
          <Route path="cities/:id" element={<ClickedCity />}></Route>
          <Route
            path="countries"
            element={
              <MainAppCountryList places={places} isLoading={isLoading} />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function ClickedCity() {
  return <p>A city is clicked</p>;
}

function MainAppCities({ places, isLoading }) {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isLoading && places) {
    return places.map((item) => (
      <Link key={item.id} to={item.id}>
        <p>{item.cityName}</p>
      </Link>
    ));
  }
  <ClickedCity />;
}

function MainAppCountryList({ places, isLoading }) {
  const countries = places.reduce((arr, curr) => {
    if (!arr.map((obj) => obj.country).includes(curr.country)) {
      return [...arr, curr];
    } else return arr;
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!isLoading && places) {
    return countries.map((item) => (
      <Link key={item.id} to={item.id}>
        <p>{item.country}</p>
      </Link>
    ));
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

export default App;
