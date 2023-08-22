import { useNavigate } from "react-router-dom";
import styles from "./Form.module.css";
import { useParamUrl } from "../../../hooks/useParamUrl";
import { useEffect, useState } from "react";

function Form() {
  const [lat, lng] = useParamUrl();
  const [isLoading, setIsLoading] = useState(false);
  const [currentCountry, setCurrentCountry] = useState({
    country: "dsfsdf",
    city: "sdflkhsdjfkh",
    emoji: "dsfsdfsdf",
  });

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

  useEffect(
    function () {
      async function fetchData() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
          );
          if (!res.ok) {
            throw new Error("Something is wrong with fetching the data.");
          }
          const data = await res.json();
          console.log(data);
        } catch (err) {
          console.log(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      fetchData();
    },
    [lat, lng]
  );
  return (
    <div className={styles.formContainer}>
      <p>🇵🇭 Philippines</p>
      <form className={styles.form}>
        <label>City name:</label>
        <input type="text" value="sevila" />
        <label>When did you go to Sevilla</label>
        <input type="text" value="sevila" />
        <label>Notes about Sevilla</label>
        <textarea className={styles.textArea}>sdf</textarea>
        <div className={styles.buttons}>
          <Button>Add</Button>
          <Button>Back</Button>
        </div>
      </form>
    </div>
  );
}

function Button({ children }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      {children}
    </button>
  );
}

export default Form;
