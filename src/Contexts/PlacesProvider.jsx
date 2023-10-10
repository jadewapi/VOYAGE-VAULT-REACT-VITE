import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const LOCAL_API = "https://voyage-api.onrender.com";

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

const initialState = {
  data: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "data/loaded":
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
        data: [action.payload, ...state.data],
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        data: state.data.filter((obj) => obj.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown Action Type");
  }
}

function PlacesProvider({ children }) {
  const [{ data, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const [mapPosition, setMapPosition] = useState([40, 0]);

  useEffect(function () {
    async function fetchData() {
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`${LOCAL_API}/cities`);
        const data = await res.json();
        dispatch({ type: "data/loaded", payload: data });
        console.log(data);
      } catch (err) {
        dispatch({
          type: "rejected",
          action: "No cities found...",
        });
      }
    }
    fetchData();
  }, []);

  async function getCity(id) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${LOCAL_API}/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (err) {
      dispatch({ type: "rejected", payload: "No place found..." });
    }
  }

  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${LOCAL_API}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "Problem with creating the city...",
      });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      await fetch(`${LOCAL_API}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "Problem with deleting a place...",
      });
    }
  }

  const contextValues = {
    data,
    isLoading,
    formatDate,
    getCity,
    currentCity,
    createCity,
    deleteCity,
    mapPosition,
    setMapPosition,
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
