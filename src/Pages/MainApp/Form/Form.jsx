import { useNavigate } from "react-router-dom";
import styles from "./Form.module.css";
import { useParamUrl } from "../../../hooks/useParamUrl";
import { useEffect, useState } from "react";
import BackButton from "../../../Components/BackButton/BackButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { nanoid } from "nanoid";
import { usePlaces } from "../../../Contexts/PlacesProvider";

function Form() {
  const navigate = useNavigate();
  const [lat, lng] = useParamUrl();
  const [isLoading, setIsLoading] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [flag, setFlag] = useState("");
  const [error, setError] = useState("");
  const { createCity } = usePlaces();

  function getCountryFlagEmoji(countryCode) {
    if (!countryCode) {
      return "";
    }

    const base = 127397;
    const countryLetters = countryCode.toUpperCase().split("");
    const flagEmoji = countryLetters
      .map((letter) => String.fromCodePoint(base + letter.charCodeAt(0)))
      .join("");

    return flagEmoji;
  }

  function removeParentheses(str) {
    return str.replace(/\([^)]*\)/g, "").trim();
  }

  useEffect(
    function () {
      if (!lat && !lng) {
        setError("Start by clicking the map");
        return;
      }
      async function fetchData() {
        try {
          setError("");
          setIsLoading(true);
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
          );
          if (!res.ok) {
            throw new Error("Something is wrong with fetching the data.");
          }
          const data = await res.json();
          if (!data.countryCode) {
            throw new Error("Place not found.");
          }
          setCountry(removeParentheses(data.countryName));
          setCity(data.city);
          setFlag(getCountryFlagEmoji(data.countryCode));
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      fetchData();
    },
    [lat, lng]
  );

  function handleSubmit(e) {
    const uniqueId = nanoid();
    e.preventDefault();
    if (!city || !date) return;
    const newObject = {
      cityName: city,
      country: country,
      emoji: flag,
      date: date,
      notes: notes,
      position: {
        lat: lat,
        lng: lng,
      },
      id: uniqueId,
    };
    createCity(newObject);
    navigate("/mainApp/cities");
  }

  return (
    <div className={styles.formContainer}>
      {isLoading && <p>Loading</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && (
        <>
          <p>
            {flag} {country}
          </p>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor="city">City name:</label>
            <input
              id="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <label htmlFor="date">When did you go to {city}?</label>
            <DatePicker
              id="date"
              onChange={(date) => setDate(date)}
              selected={date}
              dateFormat="MM/dd/yyyy"
            />
            <label htmlFor="notes">Notes about {city}</label>
            <textarea
              id="notes"
              className={styles.textArea}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={`Write your experience(s) in ${city}`}
            ></textarea>
            <label>Wikipedia Link:</label>
            <a href={`https://en.wikipedia.org/wiki/${city}`} target="blank">
              Click link!
            </a>
            <div className={styles.buttons}>
              <button type="button" onClick={(e) => handleSubmit(e)}>
                Add
              </button>
              <BackButton />
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default Form;
