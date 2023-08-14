import "./style.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  Outlet,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainApp />} />
        <Route path="/" element={<MainApp />}>
          <Route path="application" element={<Application />}>
            <Route path=":cities" element={<Cities />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Cities() {
  return <div>List of cities</div>;
}

function Application() {
  return (
    <>
      <p>Application</p>
      <button>
        <NavLink to={"8739287398"}>City</NavLink>
      </button>
      <button>
        <NavLink>Countries</NavLink>
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

export default App;
