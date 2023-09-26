const express = require('express');
const { Pool } = require('pg');
const fs = require('fs');

const app = express();
const port = 3001;

// Configuration de la piscine de connexions (pool)
const pool = new Pool({
  user: 'eod.wekiwi',
  host: 'eod.haugazel.fr',
  database: 'eod_wekiwi_Client',
  password: 'boars79:omicrons',
  port: 2007,
  ssl: true,
});

// Middleware pour analyser le JSON
app.use(express.json());

// Endpoint pour récupérer tous les contrats
app.get('/contracts', async (req, res) => {
  try {

    // Récupérez une connexion à partir du pool
    const client = await pool.connect();

    const result = client.query('SELECT * FROM contract WHERE status IN (', waiting-prepay-el, ', ', waiting-prepay-NG, ', ', accepted, ')');

    const contracts = result.rows;
    
    // Libérez la connexion lorsque vous avez terminé
    client.release();
    
    res.json(contracts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération des contrats' });
  }
});

// Écoute du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
