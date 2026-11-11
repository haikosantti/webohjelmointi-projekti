
# Jäähallitutka - Web-ohjelmointi 1 Lopputyö

Jäähallitutka on Reactilla rakennettu verkkosovellus, jonka avulla käyttäjä voi etsiä Suomen jäähalleja, tekojäitä ja luonnonjääkenttiä. Sovellus hakee ajantasaista tietoa avoimesta Lipas-rajapinnasta (REST API).

## Julkaistu versio
Sovellus on julkaistu GitHub Pages -palvelussa:
(https://haikosantti.github.io/webohjelmointi-projekti)

## Käytetyt teknologiat
- **React & Vite** (Komponenttipohjainen UI ja nopea kehitysympäristö)
- **React Router** (Sivuston reititys: Haku, Kartta ja Tietosivu)
- **Bootstrap 5** (Käyttöliittymän tyylittely, dark mode ja responsiivisuus)
- **Leaflet & React-Leaflet** (Interaktiivinen karttanäkymä)
- **Lipas API** (Datan asynkroninen haku `fetch` ja `async/await` -menetelmillä)

## Ohjeet projektin suorittamiseen paikallisesti

Jos haluat ajaa projektia omalla koneellasi, seuraa näitä askeleita:

1. **Lataa ja asenna riippuvuudet**
   Avaa terminaali projektin kansiossa ja aja komento:
   ```bash
   npm install
