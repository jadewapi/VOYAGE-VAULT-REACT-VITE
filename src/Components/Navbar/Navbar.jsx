import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Logo />
        </li>
        <li>
          <NavLink to="/">
            <p>Homepage</p>
          </NavLink>
          <NavLink to="/about">
            <p>About</p>
          </NavLink>
          <NavLink to="/login">
            <p>Login</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
