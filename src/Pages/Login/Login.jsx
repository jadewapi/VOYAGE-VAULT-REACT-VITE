import styles from "./Login.module.css";
import Navbar from "../../Components/Navbar/Navbar";

function Login() {
  return (
    <>
      <Navbar />
      <section className={styles.container}>
        <form>
          <input type="text" placeholder=">>>username" />
          <input type="text" placeholder=">>>password" />
          <button>Login</button>
        </form>
      </section>
    </>
  );
}

export default Login;
