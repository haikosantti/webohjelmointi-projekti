import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import MapView from './pages/MapView';
import Details from './pages/Details';

function App() {
  return (
    <BrowserRouter>
      {/* Tämä navigaatio näkyy jokaisella sivulla */}
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <h1>Jäähallitutka</h1>
        <Link to="/" style={{ marginRight: '10px' }}>Haku</Link>
        <Link to="/kartta">Karttakuvake</Link>
      </nav>

      {/* Tämä alue vaihtuu sen mukaan, mitä linkkiä klikkaat */}
      <div style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kartta" element={<MapView />} />
          <Route path="/paikka/:id" element={<Details />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;