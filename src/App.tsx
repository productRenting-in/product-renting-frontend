import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import { Home, ComponentDemo, Login, Signup, CheckoutPage } from "./pages";

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div>
      {!hideNavbar && <Navbar />}
      <div className={!hideNavbar ? "pt-14 md:pt-16" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/components" element={<ComponentDemo />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
