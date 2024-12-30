const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.json('Sto funzionando!');
});

app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});
