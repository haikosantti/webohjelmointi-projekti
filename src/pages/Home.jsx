import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [hakusana, setHakusana] = useState('');
  const [hallit, setHallit] = useState([]);
  const [valittuTyyppi, setValittuTyyppi] = useState('kaikki');

  const etsiHallit = async () => {
    try {
      // Oletus: Haetaan harjoitushallit (2510), kilpahallit (2520), tekojäät (1510) ja luonnonjäät (1520)
      let typeParams = 'typeCodes=2510&typeCodes=2520&typeCodes=1510&typeCodes=1520';
      
      if (valittuTyyppi === 'halli') {
        // Vain jäähallit
        typeParams = 'typeCodes=2510&typeCodes=2520';
      } else if (valittuTyyppi === 'ulkojaat') {
        // Vain tekojäät ja luonnonjäät (ulkojäät)
        typeParams = 'typeCodes=1510&typeCodes=1520';
      }

      // Lisätty &pageSize=100 (Lipaksen sallima maksimi), jotta tuloksia ei rajata kymmeneen!
      const response = await fetch(`/api/sports-places?searchString=${hakusana}&${typeParams}&fields=name,location&pageSize=100`);
      const data = await response.json();
      setHallit(data);
    } catch (error) {
      console.error("Virhe tiedonhaussa:", error);
    }
  };
  
  useEffect(() => {
    // Tehdään haku vain, jos hakusana on jo kirjoitettu
    if (hakusana.trim() !== '') {
      etsiHallit();
    }
  }, [valittuTyyppi]);

  return (
    <div className="mt-4">
      <h2 className="mb-4">Hae jäähalleja ja ulkojäitä</h2>

      <div className="btn-group mb-3" role="group">
      <input type="radio" className="btn-check" name="tyyppi" id="btnradio1" autoComplete="off" 
        checked={valittuTyyppi === 'kaikki'} 
        onChange={() => setValittuTyyppi('kaikki')} />
      <label className="btn btn-outline-primary" htmlFor="btnradio1">Kaikki</label>

      <input type="radio" className="btn-check" name="tyyppi" id="btnradio2" autoComplete="off" 
        checked={valittuTyyppi === 'halli'} 
        onChange={() => setValittuTyyppi('halli')} />
      <label className="btn btn-outline-primary" htmlFor="btnradio2">Vain jäähallit</label>

      <input type="radio" className="btn-check" name="tyyppi" id="btnradio3" autoComplete="off" 
        checked={valittuTyyppi === 'ulkojaat'} 
        onChange={() => setValittuTyyppi('ulkojaat')} />
      <label className="btn btn-outline-primary" htmlFor="btnradio3">Vain tekojäät</label>
    </div>

      {/* Bootstrapin tyylikäs hakurivi (d-flex laittaa osat vierekkäin) */}
      <div className="d-flex gap-2 mb-4" style={{ maxWidth: '500px' }}>
        <input 
          type="text" 
          className="form-control" 
          placeholder="Etsi kaupungilla (esim. Joensuu)" 
          value={hakusana} 
          onChange={(e) => setHakusana(e.target.value)} 
        />
        <button className="btn btn-primary" onClick={etsiHallit}>
          Hae
        </button>
      </div>

      {/* Moderni klikattava lista hakutuloksille */}
      <div className="list-group" style={{ maxWidth: '600px' }}>
        {Array.isArray(hallit) && hallit.map((halli) => (
          <Link 
            key={halli.sportsPlaceId}
            to={`/paikka/${halli.sportsPlaceId}`}
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
          >
            <span><strong>{halli.name}</strong></span>
            <span className="badge bg-secondary rounded-pill">
              {halli.location?.city?.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}