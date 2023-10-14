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
import { AthenticationProvider } from "./Contexts/Authentication";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <AthenticationProvider>
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
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: { duration: 10000 },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "white",
                color: "black",
                fontFamily: "sans-serif",
              },
            }}
          />
        </PlacesProvider>
      </AthenticationProvider>
    </>
  );
}
export default App;
