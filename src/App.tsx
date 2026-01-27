import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import { ComponentDemo } from "./pages";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/components" element={<ComponentDemo />} />
      </Routes>
    </div>
  );
}

export default App;
