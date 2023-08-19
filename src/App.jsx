import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./Pages/Hompage/Homepage";
import About from "./Pages/About/About";
import Login from "./Pages/Login/Login";
import MainApp from "./Pages/MainApp/MainApp";
import Cities from "./Pages/MainApp/Cities/Cities";
import Countries from "./Pages/MainApp/Countries/Countries";
import Form from "./Pages/MainApp/Form/Form";
import { PlacesProvider } from "./Contexts/PlacesProvider";
import City from "./Pages/MainApp/City/City";

function App() {
  return (
    <>
      <PlacesProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="/" element={<Homepage />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="mainApp" element={<MainApp />}>
              <Route index element={<Navigate to="cities" replace />} />
              <Route path="cities" element={<Cities />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<Countries />} />
              <Route path="form" element={<Form />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PlacesProvider>
    </>
  );
}
export default App;
