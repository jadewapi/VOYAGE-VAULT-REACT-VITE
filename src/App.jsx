import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Hompage/Homepage";
import About from "./Pages/About/About";
import Login from "./Pages/Login/Login";
import MainApp from "./Pages/MainApp/MainApp";
import Cities from "./Pages/MainApp/Cities/Cities";
import Countries from "./Pages/MainApp/Countries/Countries";
import Form from "./Pages/MainApp/Form/Form";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/" element={<Homepage />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="mainApp" element={<MainApp />}>
            <Route path="cities" element={<Cities />} />
            <Route path="countries" element={<Countries />} />
            <Route path="countries" element={<Form />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
