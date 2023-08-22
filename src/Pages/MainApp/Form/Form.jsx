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
    wikiId: "sdjfhjsdhf",
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

  function getWikipediaLink(wikiId) {
    return `https://en.wikipedia.org/wiki/Special:EntityPage/${wikiId}
    `;
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
          setCurrentCountry((prev) => {
            const newCountry = { ...prev };
            const removeThe = data.countryName
              .split(" ")
              .map((word) => {
                if (word.includes("the")) {
                  return;
                } else return word;
              })
              .join(" ");
            // const getWikiId = data.localityInfo.administrative.find(
            //   (obj) => obj.name === data.city
            // ).wikidataId;
            newCountry.country = removeThe;
            newCountry.city = data.city;
            newCountry.emoji = getCountryFlagEmoji(data.countryCode);
            // newCountry.wikiId = getWikipediaLink(getWikiId);
            return newCountry;
          });
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
      <p>
        {currentCountry.emoji} {currentCountry.country}
      </p>
      <form className={styles.form}>
        <label>City name:</label>
        <input type="text" value={currentCountry.country} />
        <label>When did you go to {currentCountry.city}?</label>
        <input type="text" />
        <label>Notes about {currentCountry.city}</label>
        <textarea className={styles.textArea}>sdf</textarea>
        <label>Wikipedia Link:</label>
        <a>Click link!</a>
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
        navigate("/mainApp/cities");
      }}
    >
      {children}
    </button>
  );
}

export default Form;
