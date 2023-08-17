import styles from "./MainApp.module.css";
import Logo from "../../Components/Logo/Logo";

function MainApp() {
  return (
    <section className={styles.countainer}>
      <div className={styles.menu}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.navigation}>
          <p>Cities</p>
          <p>Countries</p>
        </div>
        <div className={styles.listContainer}>sdjfhf</div>
      </div>
      <div id="map"></div>
    </section>
  );
}

export default MainApp;
