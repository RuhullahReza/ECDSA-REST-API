import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Pages/Login'
import Register from "./Pages/Register";
import Home from "./Pages/Home";

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route index element={<Home/>} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
