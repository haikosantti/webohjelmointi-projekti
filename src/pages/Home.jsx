import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  // Tila (State): Reactin "muisti". Tänne tallennetaan hakusana, haetut hallit ja lataustila.
  const [hakusana, setHakusana] = useState('');
  const [hallit, setHallit] = useState([]);
  const [ladataan, setLadataan] = useState(false);

  // Funktio, joka hakee datan Lipas API:sta
  const haeHallit = async (e) => {
    e.preventDefault(); // Estää sivua latautumasta uudelleen
    setLadataan(true);

    try {
      // 2510 = Jäähalli, 2520 = Tekojääkenttä
      const response = await fetch(`/api/sports-places?searchString=${hakusana}&typeCodes=2510&typeCodes=2520&fields=name,location,city`);
      const data = await response.json();

      console.log("Mitä Lipas palautti:", data); 
      setHallit(data);

    } catch (error) {
      console.error("Virhe tiedonhaussa:", error);
    }

    setLadataan(false);
  };

  return (
    <div>
      <h2>Hae jäähalleja ja ulkojäitä</h2>
      
      {/* Hakulomake */}
      <form onSubmit={haeHallit} style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Etsi kaupungilla (esim. Joensuu)"
          value={hakusana}
          onChange={(e) => setHakusana(e.target.value)}
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <button type="submit" disabled={ladataan}>
          {ladataan ? 'Haetaan...' : 'Hae'}
        </button>
      </form>

      {/* Hakutulosten listaus */}
      <ul>
        {hallit.map((halli) => (
          <li key={halli.sportsPlaceId} style={{ margin: '10px 0' }}>
            <strong>
              <Link to={`/paikka/${halli.sportsPlaceId}`}>
                {halli.name}
              </Link>
            </strong> ({halli.location?.city?.name})
          </li>
        ))}
      </ul>
    </div>
  );
}