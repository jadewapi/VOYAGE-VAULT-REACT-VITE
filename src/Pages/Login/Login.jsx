import styles from "./Login.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import { useAuthentication } from "../../Contexts/Authentication";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuthentication();
  const userName = "jadewapi";
  const pass = "1111";
  function handleLogin(e) {
    e.preventDefault();
    login(userName, pass);
  }
  useEffect(
    function () {
      if (isAuthenticated) navigate("/mainApp", { replace: true });
    },
    [isAuthenticated, navigate]
  );
  return (
    <>
      <Navbar />
      <section className={styles.container}>
        <form onSubmit={(e) => handleLogin(e)}>
          <input type="text" placeholder=">>>username" value={userName} />
          <input type="text" placeholder=">>>password" value={pass} />
          <button>Login</button>
        </form>
      </section>
    </>
  );
}

export default Login;
