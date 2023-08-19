import styles from "./Countries.module.css";
import Loading from "../../../Components/Loading/Loading";

function Countries({ data, isLoading }) {
  const uniqueCountries = data.reduce((acc, curr) => {
    if (!acc.map((places) => places.country).includes(curr.country)) {
      return [...acc, curr];
    } else return acc;
  }, []);
  return (
    <section className={styles.countries}>
      {isLoading && <Loading />}
      {uniqueCountries.map((places) => (
        <div className={styles.specificCountry} key={places.id}>
          <div className={styles.flag}>{places.emoji}</div>
          <div className={styles.countryName}>{places.country}</div>
        </div>
      ))}
    </section>
  );
}

export default Countries;
