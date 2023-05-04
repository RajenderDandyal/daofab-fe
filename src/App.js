import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import "./App.css";
import Transaction from "./pages/Transaction";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transaction/:id" element={<Transaction />} />
      </Routes>
    </Router>
  );
}

export default App;
