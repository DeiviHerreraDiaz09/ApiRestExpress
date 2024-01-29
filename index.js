const express = require('express');
const app = express();
const port = 3000;

app.get('/users', (req, res) => {
  res.json([
    {
      name: 'Deivi',
      lastName: 'Herrera',
    },
    {
      name: 'Dayana',
      lastName: 'Vargas',
    },
  ]);
});

app.get('/productos/:id', (req, res) => {
  const { id } = req.params.id;
  res.json({
    id: id,
    name: 'Arroz',
    price: 1500,
  });
});

// PRÁCTICA PARAMETROS NORMALES

app.get('/categories/:id', (req, res) => {
  const { id } = req.params;

  if (id === '1') {
    res.json({
      name: 'Enlatados',
      status: 'Nueva',
    });
  } else if (id === '2') {
    res.json({
      name: 'Carne',
      status: 'Vieja',
    });
  } else {
    res.status(404).json({ error: 'Categoría no encontrada' });
  }
});

// PRÁCTICA PARAMETROS QUERY

app.get('/users', (req, res) => {
  const { limit, offset } = req.query;

  if (limit && offset) {
    res.json({
      limit,
      offset,
    });
  } else {
    res.send('No hay parametros');
  }
});

app.listen(port, () => {
  console.log('Servidor en ejecución');
});
