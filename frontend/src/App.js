import { RequireAuth } from "react-auth-kit";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div style={{ minHeight: "84vh" }}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;