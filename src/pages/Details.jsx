import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function Details() {
  const { id } = useParams();
  const [paikka, setPaikka] = useState(null);

  useEffect(() => {
    const haePaikanTiedot = async () => {
      try {
        const kohdeUrl = `https://lipas.fi/api/sports-places/${id}`;
        const response = await fetch(`https://api.codetabs.com/v1/proxy?quest=${kohdeUrl}`);
        const data = await response.json();
        setPaikka(data);
      } catch (error) {
        console.error("Virhe yksittäisen paikan haussa:", error);
      }
    };

    haePaikanTiedot();
  }, [id]);

  // Näytetään Bootstrapin lataus-spinneri, kunnes data on saapunut
  if (!paikka) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Ladataan...</span>
        </div>
        <p className="mt-3">Haetaan paikan tietoja...</p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      {/* Tyylikäs takaisin-nappi */}
      <Link to="/" className="btn btn-outline-secondary mb-4">
        &larr; Takaisin hakuun
      </Link>

      {/* Bootstrapin kortti-komponentti luo siistin raamin tiedoille */}
      <div className="card bg-dark border-secondary shadow-sm">
        <div className="card-body p-4">
          <h2 className="card-title fw-bold mb-3">{paikka.name}</h2>
          
          <div className="mb-4">
            <span className="badge bg-primary me-2 fs-6">
              {paikka.type?.name || 'Urheilupaikka'}
            </span>
            <span className="badge bg-secondary fs-6">
              {paikka.location?.city?.name || 'Tuntematon kaupunki'}
            </span>
          </div>

          <hr className="border-secondary" />

          {/* Grid-järjestelmä jakaa tiedot kahteen sarakkeeseen isommilla ruuduilla */}
          <div className="row mt-4">
            <div className="col-md-6 mb-3">
              <h5 className="fw-bold text-info">Sijainti ja yhteystiedot</h5>
              <ul className="list-unstyled mt-3">
                <li className="mb-2"><strong>Osoite:</strong> {paikka.location?.address || 'Ei ilmoitettu'}</li>
                <li className="mb-2">
                  <strong>Postitoimipaikka:</strong> {paikka.location?.postalCode} {paikka.location?.postalOffice}
                </li>
                {paikka.www && (
                  <li className="mt-3">
                    <a href={paikka.www} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">
                      Siirry verkkosivuille
                    </a>
                  </li>
                )}
              </ul>
            </div>
            
            <div className="col-md-6">
              <h5 className="fw-bold text-info">Lisätiedot</h5>
              <ul className="list-unstyled mt-3">
                <li className="mb-2"><strong>Omistaja:</strong> {paikka.owner || 'Ei ilmoitettu'}</li>
                <li className="mb-2"><strong>Ylläpitäjä:</strong> {paikka.admin || 'Ei ilmoitettu'}</li>
                <li className="mb-2"><strong>Valmistumisvuosi:</strong> {paikka.constructionYear || 'Ei tiedossa'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}