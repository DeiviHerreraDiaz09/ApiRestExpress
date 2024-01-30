const express = require('express');
const port = 3000;
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Soy la ruta de productos');
});

module.exports = router;
