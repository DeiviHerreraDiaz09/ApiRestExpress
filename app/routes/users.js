const express = require('express');
const UserService = require('../services/userService');
const router = express.Router();
const port = 3000;

const userservice = new UserService();

// Apartado GET

router.get('/', (req, res) => {
  const user_db = userservice.findUsers();
  const { id } = req.query;
  if (id) {
    const user = userservice.findOne(id);
    if (user) {
      return res.status(200).json({ user });
    } else {
      return res.status(404).json({ msg: 'Usuario inexistente' });
    }
  }
  if (user_db.length === 0) {
    return res.status(404).json({ msg: 'Lista de usuarios vacia' });
  }
  res.status(200).json(user_db);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = userservice.findOne(id);
  if (!user) {
    res.status(200).json({ msg: 'Usuario inexistente' });
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
  const created = userservice.create(user_data);
  res.status(201).json({
    created,
  });
});

// Apartado PUT

router.put('/:id', (req, res) => {
  const { id } = req.params;
  if (id) {
    const userIndex = userservice.findIndexUser(id);
    if (userIndex !== -1) {
      const { name, lastname, email } = req.body;
      user_data = {
        id,
        name,
        lastname,
        email,
      };
      const update = userservice.update(user_data, userIndex);
      res.status(200).json({
        message: 'Usuario actualizado exitosamente',
        user_data,
      });
    } else {
      res.status(404).json({ msg: 'Usuario no encontrado para actualizar' });
    }
  } else {
    res.status(400).json({ msg: 'ID de usuario no proporcionado' });
  }
});

// Apartado PATH

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  if (id) {
    const userIndex = userservice.findIndexUser(id);
    if (userIndex !== -1) {
      const { name, lastname, email } = req.body;
      const updateUser = userservice.updatePath(name, lastname, email, userIndex,);
      res.status(200).json({
        user: updateUser,
        message: 'Usuario actualizado exitosamente',
      });
    } else {
      res.status(404).json({ msg: 'Usuario no encontrado para actualizar' });
    }
  } else {
    res.status(400).json({ msg: 'ID de usuario no proporcionado' });
  }
});

// Apartado DELETE

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const userIndex = userservice.findIndexUser(id);
  if (userIndex !== -1) {
    const deleteUser = userservice.delete(userIndex);
    res.status(204).json({ msg: 'Usuario eliminado' });
  } else {
    res.status(404).json({ msg: 'Usuario no encontrado' });
  }
});

module.exports = router;
