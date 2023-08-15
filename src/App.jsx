import { useEffect, useState } from "react";
import "./style.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  Outlet,
  useParams,
  useSearchParams,
} from "react-router-dom";

const BASE_URL = "http://localhost:9000/cities";

function App() {
  const [places, setPlaces] = useState([]);
  const [loading, setIsLoading] = useState(false);
  useEffect(function () {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}`);
        if (!res.ok) {
          throw new Error("fetched not successful");
        }
        const data = await res.json();
        setPlaces(data);
        console.log(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainApp />} />
        <Route path="/" element={<MainApp />}>
          <Route path="application" element={<Application />}>
            <Route
              path="cities"
              element={<Cities places={places} loading={loading} />}
            >
              <Route path=":id" element={<City places={places} />} />
            </Route>
            <Route
              path="countries"
              element={<Countries places={places} />}
            ></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function City({ places }) {
  const [placeParams, setPlaceParams] = useSearchParams();
  const lat = placeParams.get("lat");
  const lng = placeParams.get("lng");
  const { id } = useParams();
  return (
    <p>
      {lat} {lng} {id}
    </p>
  );
}

function Cities({ places, loading }) {
  return (
    <>
      {loading && <Loading />}
      {!loading &&
        places &&
        places.map((obj) => (
          <NavLink
            key={obj.id}
            to={`${obj.id}?lat=${obj.position.lat}&lng=${obj.position.lng}`}
          >
            <p>{obj.cityName}</p>
          </NavLink>
        ))}
      <Outlet></Outlet>
    </>
  );
}

function Countries({ places }) {
  return <p>List of countries:</p>;
}

function Application() {
  return (
    <>
      <p>Application</p>
      <button>
        <NavLink to="cities">Cities</NavLink>
      </button>
      <button>
        <NavLink to="countries">Countries</NavLink>
      </button>
      <Outlet />
    </>
  );
}

function MainApp() {
  return (
    <>
      <div>Main app</div>
      <button>
        <Link to="application">Login</Link>
      </button>
      <Outlet />
    </>
  );
}

function Loading() {
  return <p>Loading</p>;
}

export default App;
