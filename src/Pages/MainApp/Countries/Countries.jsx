import styles from "./Countries.module.css";
import Loading from "../../../Components/Loading/Loading";
import { usePlaces } from "../../../Contexts/PlacesProvider";
import { useParams } from "react-router-dom";

function Countries() {
  const [locationParam, setLocationParam] = useParams();
  const lat = locationParam.get("lat");
  const lng = locationParam.get("lng");
  const { data, isLoading } = usePlaces();
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
