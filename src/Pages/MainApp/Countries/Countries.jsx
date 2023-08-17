import styles from "./Countries.module.css";

function Countries() {
  return (
    <section className={styles.countries}>
      <div className={styles.specificCountry}>
        <div className={styles.flag}>🇵🇭</div>
        <div className={styles.countryName}>Philippines</div>
      </div>
    </section>
  );
}

export default Countries;
