# Cageflix

A Netflix‑style React & TypeScript mock streaming UI with infinite scroll, fuzzy search and a Mirage.js mock API seeded from IMDb data. Deployed on AWS Amplify.

## Features

- **Responsive Grid**: Bootstrap‑powered layout adapts from mobile to desktop  
- **Infinite Scroll**: Auto‑loads additional pages as you scroll  
- **Fuzzy Search**: Typo‑tolerant filtering via `fuse.js`  
- **Mock API**: Mirage.js simulates `/api/movies` (paginated) and `/api/user`  
- **Data Pipeline**: Node script parses IMDb TSVs to generate a `cage-movies.json` with full cast  

## Tech

- *React • TypeScript • Mirage.js*  
- Bootstrap 5 & React‑Bootstrap  
- fuse.js for *fuzzy search*  
- Node.js (`csv-parse`, `zlib`) for data building  
- Hosted on *AWS Amplify*

## Quickstart

1. **Clone & install**  
   ```bash
   git clone https://github.com/shrutiirastogii/cageflix.git
   cd cageflix
   npm install
2. **(Optional)Generate data**
    Place IMDb TSVs in src/mirage/data/ and run:
    ```bash
    npx ts-node src/mirage/scripts/buildData.ts

3. **Run Locally**
    ```bash
    npm start

4. **Live Demo**
    Live at https://master.d3mxsd73pr8wjg.amplifyapp.com/

## Known Issues & Future Enhancements

- *Known Issues*
    - Placeholder posters repeat for movies without official images.
    - Issue with styling and Bootstrap for some components.

- *Future Enhancements*
    - Enhance UI.
    - Implement backend seperatly instead of using Mirage.js.
    - Integrate real image assests instead of placeholder posters.


