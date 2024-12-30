const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Utile per accettare richieste da domini diversi
app.use(express.json()); // Rende i dati disponibili tramite req.body

// Endpoint di base
app.get('/', (req, res) => {
  res.json('API dei Pokémon');
});

// Endpoint per ottenere informazioni su un Pokémon
app.get('/pokemon/:name', (req, res) => {
  const pokemonName = req.params.name; // Estrai il nome del Pokémon dai parametri
  console.log("Richiesta ricevuta per il Pokémon:", pokemonName); // Controllo della richiesta

  // Effettua la richiesta alla PokéAPI
  axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => {
      console.log("Pokémon trovato:", response.data.name); // Log del nome del Pokémon
      res.json(response.data); // Rispondi con i dati del Pokémon
    })
    .catch((err) => {
      console.error("Errore nella richiesta a PokéAPI:", err.message); // Log dell'errore
      res.status(404).json({ error: 'Pokémon non trovato' }); // Gestione dell'errore
    });
});

// Avvio del server
app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});
