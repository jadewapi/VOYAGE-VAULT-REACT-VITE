import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../../Contexts/Authentication";
import styles from "./UserLogged.module.css";
import { useEffect } from "react";

function UserLogged() {
  const navigate = useNavigate();
  const { logout, isAuthenticated, user } = useAuthentication();
  useEffect(
    function () {
      if (!isAuthenticated) {
        navigate("/login");
      }
    },
    [isAuthenticated]
  );
  const hour = new Date().getHours();
  function getTimeOfDay(hour) {
    if (hour >= 0 && hour < 12) {
      return "Good morning";
    }
    if (hour >= 12 && hour < 18) {
      return "Good afternoon";
    }
    if (hour >= 18 && hour < 24) {
      return "Good evening";
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <img src="https://i.pravatar.cc/300" alt="" />
        <div>
          <p>{getTimeOfDay(hour)}</p>
          <p>{user && user.name}</p>
        </div>
      </div>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}

export default UserLogged;
