import styles from "./MainApp.module.css";
import Logo from "../../Components/Logo/Logo";
import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

function MainApp() {
  const navigate = useNavigate();
  const [param, set] = useSearchParams();
  const lat = param.get("lat");
  const lng = param.get("lng");
  return (
    <section className={styles.container}>
      <div className={styles.menu}>
        <div className={styles.logo}>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className={styles.navigation}>
          <NavLink to="cities" className="navigation">
            <p>Cities</p>
          </NavLink>
          <NavLink to="countries" className="navigation">
            <p>Countries</p>
          </NavLink>
        </div>
        <div className={styles.listContainer}>
          <Outlet />
        </div>
      </div>
      <div id="map" onClick={() => navigate("form")}>
        <p>{lat}</p>
        <p>{lng}</p>
      </div>
    </section>
  );
}

export default MainApp;
