import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import { Home, ComponentDemo, Cart, Login, Signup } from "./pages";

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/components" element={<ComponentDemo />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
