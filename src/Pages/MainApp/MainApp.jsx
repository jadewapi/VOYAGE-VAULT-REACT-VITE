import styles from "./MainApp.module.css";
import Logo from "../../Components/Logo/Logo";
import { Link, NavLink, Outlet } from "react-router-dom";
import Map from "./Map";

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
      <Map />
    </section>
  );
}

export default MainApp;
