import styles from "./About.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import { Link } from "react-router-dom";

function About() {
  return (
    <>
      <Navbar />
      <section className={styles.container}>
        <div className={styles.left}>
          <h1>Welcome to our travel journal app</h1>
          <Link to="/mainApp">
            <p>Go to app now.</p>
          </Link>
        </div>
        <div className={styles.right}>
          <h2>* Capturing Moments, Sharing Stories</h2>
          <p>
            Embark on a journey of storytelling and adventure with our Travel
            Journal App. Whether you&apos;re an intrepid explorer, a leisurely
            wanderer, or someone seeking to capture the essence of your voyages,
            our app is designed to help you document your travel experiences in
            the most engaging and personal way.
          </p>
          <h2>* Capturing Moments, Sharing Stories</h2>
          <p>
            With our user-friendly interface, you can effortlessly record the
            beauty of each destination you visit. Describe the breathtaking
            landscapes, the cultural encounters, and the unexpected delights
            that make each journey unique. Our app empowers you to paint vivid
            pictures with words, reliving your travels as you share your stories
            with fellow wanderers.
          </p>
        </div>
      </section>
    </>
  );
}

export default About;
