import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Hompage/Homepage";
import About from "./Pages/About/About";
import Login from "./Pages/Login/Login";
import MainApp from "./Pages/MainApp/MainApp";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/" element={<Homepage />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="mainApp" element={<MainApp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
