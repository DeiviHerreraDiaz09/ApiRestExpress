const express = require('express');
const router = express.Router();
const port = 3000;

// BASE DE DATOS PROVISIONAL

const user_db = [];

// Apartado GET

router.get('/', (req, res) => {
  const { id } = req.query;

  if (id) {
    const user = user_db.find((user) => user.id == id);

    if (user) {
      return res.json({ user });
    } else {
      return res.send('Usuario inexistente (QUERYS DINAMICAS)');
    }
  }

  if (user_db.length === 0) {
    return res.send('Array de usuarios vacío');
  }

  res.json(user_db);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  const user = user_db.find((user) => user.id == id);

  if (!user) {
    res.send('Usuario inexistente (PARAMETROS)');
  }
  res.json({
    user,
  });
});

// Apartado POST

router.post('/', (req, res) => {
  const { id, name, lastname, email } = req.body;

  const user_data = {
    id,
    name,
    lastname,
    email,
  };

  user_db.push(user_data);

  res.json({
    user_db,
  });
});

// Apartado PUT

router.put('/:id', (req, res) => {
  const { id } = req.params;

  if (id) {
    const userIndex = user_db.findIndex((user) => user.id === id);

    if (userIndex !== -1) {
      const { name, lastname, email } = req.body;

      user_db[userIndex] = {
        id,
        name,
        lastname,
        email,
      };

      res.json({
        user: user_db[userIndex],
        message: 'Usuario actualizado exitosamente',
      });
    } else {
      res.status(404).send('Usuario no encontrado para actualizar');
    }
  } else {
    res.status(400).send('ID de usuario no proporcionado');
  }
});

// Apartado PATH

router.patch('/:id', (req, res) => {
  const { id } = req.params;

  if (id) {
    const userIndex = user_db.findIndex((user) => user.id == id);

    if (userIndex !== -1) {
      const { name, lastname, email } = req.body;

      // Actualizar solo los campos proporcionados
      if (name) user_db[userIndex].name = name;
      if (lastname) user_db[userIndex].lastname = lastname;
      if (email) user_db[userIndex].email = email;

      res.json({
        user: user_db[userIndex],
        message: 'Usuario actualizado exitosamente',
      });
    } else {
      res.status(404).send('Usuario no encontrado para actualizar');
    }
  } else {
    res.status(400).send('ID de usuario no proporcionado');
  }
});

// Apartado DELETE

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const userIndex = user_db.findIndex((user) => user.id == id);

  if (userIndex !== -1) {
    user_db.splice(userIndex);
    res.send('Usuario eliminado');
  } else {
    res.status(404).send('Usuario no encontrado');
  }
});

module.exports = router;
