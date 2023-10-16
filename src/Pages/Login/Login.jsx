import styles from "./Login.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import { useAuthentication } from "../../Contexts/Authentication";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuthentication();
  const [userName, setEmail] = useState("");
  const [pass, setPass] = useState("");
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
  useEffect(function () {
    toast.success("username: jadewapi, password: 1111");
  }, []);
  return (
    <>
      <Navbar />
      <section className={styles.container}>
        <form onSubmit={(e) => handleLogin(e)}>
          <input
            type="text"
            placeholder=">>>username"
            value={userName}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder=">>>password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <button>Login</button>
        </form>
      </section>
    </>
  );
}

export default Login;
