const express = require('express');
const { faker } = require('@faker-js/faker');
const app = express();
const port = 3000;

app.get('/products', (req, res) => {
  const products = [];

  const { size } = req.query;

  const limit = size || 10;

  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.internet.userName(),
    });
  }
  res.json(products);
});

// PRUEBA CON QUERYS

app.get("/prueba", (req, res) =>{
  res.send("Yo soy un filter ")
})


app.get('/productos/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id: id,
    name: 'Arroz',
    price: 1500,
  });
});

// PRÁCTICA PARAMETROS NORMALES

app.get('/categories/:id', (req, res) => {
  const id = req.params.id;

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
