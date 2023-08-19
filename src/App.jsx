import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Homepage from "./Pages/Hompage/Homepage";
import About from "./Pages/About/About";
import Login from "./Pages/Login/Login";
import MainApp from "./Pages/MainApp/MainApp";
import Cities from "./Pages/MainApp/Cities/Cities";
import Countries from "./Pages/MainApp/Countries/Countries";
import Form from "./Pages/MainApp/Form/Form";

const LOCAL_API = "http://localhost:9000";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/" element={<Homepage />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="mainApp" element={<MainApp />}>
            <Route index element={<Navigate to="cities" replace />} />
            <Route
              path="cities"
              element={
                <Cities
                  data={data}
                  isLoading={isLoading}
                  formatDate={formatDate}
                />
              }
            />
            <Route
              path="countries"
              formatDate={formatDate}
              element={<Countries data={data} isLoading={isLoading} />}
            />
            <Route path="form" element={<Form />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
