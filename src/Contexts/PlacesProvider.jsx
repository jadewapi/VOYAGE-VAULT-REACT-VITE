import { createContext, useContext, useEffect, useState } from "react";

const LOCAL_API = "http://localhost:9000";

const PlacesContext = createContext();

function formatDate(dateString) {
  const parsedDate = new Date(dateString);

  const month = parsedDate.getMonth() + 1;
  const day = parsedDate.getDate();
  const year = parsedDate.getFullYear();

  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;

  const formattedDate = `${formattedMonth}/${formattedDay}/${year}`;
  return formattedDate;
}

function PlacesProvider({ children }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(`${LOCAL_API}/cities`);
        if (!res.ok) throw new Error("Fetching error...");
        const data = await res.json();
        setData(data);
        console.log(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:9000/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:9000/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      setCurrentCity(data);
      setData((prev) => [data, ...prev]);
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  const contextValues = {
    data,
    isLoading,
    formatDate,
    getCity,
    currentCity,
    setCurrentCity,
    createCity,
  };

  return (
    <PlacesContext.Provider value={contextValues}>
      {children}
    </PlacesContext.Provider>
  );
}

const usePlaces = () => {
  const context = useContext(PlacesContext);
  return context;
};

export { PlacesProvider, usePlaces };
