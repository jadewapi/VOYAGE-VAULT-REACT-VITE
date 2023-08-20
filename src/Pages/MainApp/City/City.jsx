import { useNavigate, useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useEffect, useState } from "react";
import { usePlaces } from "../../../Contexts/PlacesProvider";
import Loading from "../../../Components/Loading/Loading";

function City() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { formatDate, getCity, currentCity, isLoading } = usePlaces();
  useEffect(
    function () {
      getCity(id);
    },
    [id]
  );
  return (
    <div className={styles.container}>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <div>
            {currentCity.emoji} {currentCity.country}
          </div>
          <div>
            <p>city name:</p>
            <p>{currentCity.cityName}</p>
          </div>
          <div>
            <p>you went to lisbon on:</p>
            <p>{formatDate(currentCity.date)}</p>
          </div>
          <div>
            <p>notes:</p>
            <p>{currentCity.notes}</p>
          </div>
          <div>
            <p>learn more:</p>
            <p>wikipedia link</p>
          </div>
          <button onClick={() => navigate(-1)}>Back</button>
        </>
      )}
    </div>
  );
}

export default City;
