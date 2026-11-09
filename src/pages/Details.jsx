import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Details() {
  // 1. Luetaan jäähallin ID suoraan URL-osoitteesta
  const { id } = useParams();
  
  // 2. Tilat datalle ja latauksen seurannalle
  const [paikka, setPaikka] = useState(null);
  const [ladataan, setLadataan] = useState(true);

  // 3. useEffect suorittaa tämän koodin automaattisesti heti, kun sivu avataan
  useEffect(() => {
    const haeYksittainenPaikka = async () => {
      try {
        // Haetaan yksittäisen paikan tiedot. Huomaa /api/sports-places/id -rakenne!
        const response = await fetch(`/api/sports-places/${id}`);
        const data = await response.json();
        
        console.log("Yksittäisen paikan data:", data);
        setPaikka(data);
      } catch (error) {
        console.error("Virhe tiedonhaussa:", error);
      } finally {
        setLadataan(false); // Lataus on valmis, oli tulos mikä vain
      }
    };

    haeYksittainenPaikka();
  }, [id]); // Päivitetään haku, jos id sattuisi muuttumaan

  // 4. Mitä näytetään, kun dataa haetaan vielä verkosta
  if (ladataan) {
    return <div>Ladataan jäähallin tietoja...</div>;
  }

  // 5. Mitä näytetään, jos API ei jostain syystä palauttanutkaan dataa
  if (!paikka) {
    return <div>Tietoja ei löytynyt.</div>;
  }

  // 6. Varsinaisen sivun piirtäminen, kun data on valmiina
  return (
    <div>
      <h2>{paikka.name}</h2>
      
      <div style={{ marginTop: '20px' }}>
        <h3>Sijainti</h3>
        <p>{paikka.location?.address}</p>
        <p>{paikka.location?.postalCode} {paikka.location?.city?.name}</p>
        
        <h3>Lisätiedot</h3>
        <ul>
          <li><strong>Omistaja:</strong> {paikka.owner || 'Ei tiedossa'}</li>
          <li><strong>Rakennusvuosi:</strong> {paikka.constructionYear || 'Ei tiedossa'}</li>
          <li><strong>Puhelin:</strong> {paikka.phoneNumber || 'Ei ilmoitettu'}</li>
        </ul>
        
        {/* Näytetään linkki vain, jos paikalla on verkkosivu */}
        {paikka.www && (
          <p style={{ marginTop: '20px' }}>
            <a href={paikka.www} target="_blank" rel="noreferrer">
              Siirry kohteen verkkosivuille
            </a>
          </p>
        )}
      </div>
    </div>
  );
}