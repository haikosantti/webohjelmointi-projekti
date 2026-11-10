import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import MapView from "./pages/MapView";
import Details from "./pages/Details";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        {/* Bootstrapin tumma navigointipalkki */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 shadow">
          <div className="container">
            <Link className="navbar-brand fw-bold text-primary" to="/">
              🏒 Jäähallitutka
            </Link>
            <div className="navbar-nav flex-row gap-3">
              <Link className="nav-link" to="/">Haku</Link>
              <Link className="nav-link" to="/kartta">Kartta</Link>
            </div>
          </div>
        </nav>

        {/* container keskittää sisällön ja jättää siistit reunukset */}
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/kartta" element={<MapView />} />
            <Route path="/paikka/:id" element={<Details />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}