import styles from "./MainApp.module.css";
import Logo from "../../Components/Logo/Logo";
import { Link, NavLink, Outlet } from "react-router-dom";

function MainApp() {
  return (
    <section className={styles.container}>
      <div className={styles.menu}>
        <div className={styles.logo}>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className={styles.navigation}>
          <NavLink to="cities">
            <p>Cities</p>
          </NavLink>
          <NavLink to="countries">
            <p>Countries</p>
          </NavLink>
        </div>
        <div className={styles.listContainer}>
          <Outlet />
        </div>
      </div>
      <div id="map"></div>
    </section>
  );
}

export default MainApp;
