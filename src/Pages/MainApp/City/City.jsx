import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useEffect, useState } from "react";

function City() {
  const { id } = useParams();
  const [currentCity, setCurrentCity] = useState({});
  useEffect(
    function () {
      async function fetchData() {
        const res = await fetch(`http://localhost:9000/cities/${id}`);
        const data = await res.json();
        setCurrentCity(data);
      }
    },
    [id]
  );
  return (
    <div className={styles.container}>
      <div>
        {currentCity.emoji} {currentCity.country}
      </div>
      <div>
        <p>city name:</p>
        <p>{currentCity.cityName}</p>
      </div>
      <div>
        <p>you went to lisbon on:</p>
        <p>{id}</p>
      </div>
      <div>
        <p>notes:</p>
        <p>awesome experience!</p>
      </div>
      <div>
        <p>learn more:</p>
        <p>wikipedia link</p>
      </div>
      <button>Back</button>
    </div>
  );
}

export default City;
