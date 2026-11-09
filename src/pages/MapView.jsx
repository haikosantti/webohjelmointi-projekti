import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';

export default function MapView() {
  const aloitusPiste = [62.601, 29.763]; // Joensuu
  
  // Tila kartalle tuleville paikoille
  const [paikat, setPaikat] = useState([]);

  // Haetaan jäähallit ja tekojäät kun karttasivu ladataan
  useEffect(() => {
    const haePaikatKartalle = async () => {
      try {
        // Huom: emme käytä tässä searchString-hakusanaa, jotta saamme listan kaikista. 
        // Rajapinta palauttaa oletuksena ensimmäiset 100 osumaa.
        const response = await fetch('/api/sports-places?typeCodes=2510&typeCodes=2520&fields=name,location');
        const data = await response.json();
        
        console.log("Kartalle haettu data:", data);
        setPaikat(data);
      } catch (error) {
        console.error("Virhe karttatietojen haussa:", error);
      }
    };

    haePaikatKartalle();
  }, []);

  return (
    <div>
      <h2>Karttanäkymä</h2>
      <p>Löydät alta Lipas-rajapinnan palauttamat jäähallit ja tekojäät.</p>

      <MapContainer 
        center={aloitusPiste} 
        zoom={6} 
        style={{ height: '600px', width: '100%', marginTop: '20px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Käydään läpi haetut paikat ja luodaan jokaiselle oma Marker */}
        {Array.isArray(paikat) && paikat.map((paikka) => {
          const coords = paikka.location?.coordinates?.wgs84;
          
          if (!coords) return null;

          return (
            <Marker 
              key={paikka.sportsPlaceId} 
              position={[coords.lat, coords.lon]}
            >
              <Popup>
                <strong>{paikka.name}</strong><br />
                {paikka.location?.city?.name}<br />
                <br />
                <Link to={`/paikka/${paikka.sportsPlaceId}`}>
                  Katso tarkemmat tiedot
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}