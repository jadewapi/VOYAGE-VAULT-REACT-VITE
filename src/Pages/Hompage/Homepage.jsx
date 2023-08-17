import styles from "./Homepage.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import homePageImage from "../../Assets/homepage.png";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <>
      <Navbar />
      <section className={styles["container--homepage"]}>
        <div className={styles["image--homepage"]}>
          <img src={homePageImage} alt="" />
        </div>
        <div className={styles["textContainer--homepage"]}>
          <h1>Keep track of all your travels.</h1>
          <p>
            cross can be used as a voyage vault for all of your past travels and
            your experiences.
          </p>
          <Link to="mainApp">
            <p>Go to the app now.</p>
          </Link>
        </div>
      </section>
    </>
  );
}

export default Homepage;
