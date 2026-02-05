import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import { Home, ComponentDemo, Cart } from "./pages";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/components" element={<ComponentDemo />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
