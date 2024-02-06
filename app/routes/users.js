const express = require('express');
const router = express.Router();
const UserService = require('../services/userService');
const validator = require('../middlewares/validater.js');
const {
  post_user_schema,
  update_user_schema,
  user_by_id_schema,
  user_by_id_schema_optional,
} = require('../schemas/user.js');

// Inyección de los servicios
const userservice = new UserService();

// Apartado GET

router.get('/', (req, res, next) => {
  try {
    const user_db = userservice.findUsers();
    const { id } = req.query;

    const validacion = user_by_id_schema_optional.validate(req.query);

    console.log(validacion.error);

    if (validacion.error === undefined) {
      if (id) {
        const user = userservice.findOne(id);
        if (user) {
          return res.status(200).json({ user });
        } else {
          return res.status(404).json({ msg: 'Usuario inexistente' });
        }
      }
    } else {
      return res.json({
        msg: validacion.error,
      });
    }

    if (user_db.length === 0) {
      return res.status(404).json({ msg: 'Lista de usuarios vacia' });
    }
    res.status(200).json(user_db);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', validator(user_by_id_schema, 'params'), (req, res, next) => {
  try {
    const { id } = req.params;
    const user = userservice.findOne(id);
    res.json({
      user,
    });
  } catch (error) {
    next(error);
  }
});

// Apartado POST

router.post('/', validator(post_user_schema, 'body'), (req, res) => {
  try {
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
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || 'Error interno del servidor' });
  }
});

// Apartado PUT

router.put('/:id', validator(user_by_id_schema, 'params'), (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const userIndex = userservice.findIndexUser(id);
      if (userIndex !== -1) {
        const { name, lastname, email } = req.body;
        const user_data = {
          id,
          name,
          lastname,
          email,
        };
        const update = userservice.update(user_data, userIndex);
        res.status(200).json({
          user_data,
        });
      } else {
        res.status(404).json({ msg: 'Usuario no encontrado para actualizar' });
      }
    } else {
      res.status(400).json({ msg: 'ID de usuario no proporcionado' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || 'Error interno del servidor' });
  }
});

// Apartado PATH

router.patch('/:id', (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const userIndex = userservice.findIndexUser(id);
      if (userIndex !== -1) {
        const { name, lastname, email } = req.body;

        const validacion = update_user_schema.validate(req.body);

        if (validacion.error === undefined) {
          const updateUser = userservice.updatePath(
            name,
            lastname,
            email,
            userIndex,
          );
          res.status(200).json({
            user: updateUser,
          });
        } else {
          res.status(404).json({ msg: validacion.error });
        }
      } else {
        res.status(404).json({ msg: 'Usuario no encontrado para actualizar' });
      }
    } else {
      res.status(400).json({ msg: 'ID de usuario no proporcionado' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || 'Error interno del servidor' });
  }
});

// Apartado DELETE

router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const userIndex = userservice.findIndexUser(id);
    if (userIndex !== -1) {
      const deleteUser = userservice.delete(userIndex);
      res.status(204).json({ msg: 'Usuario eliminado' });
    } else {
      res.status(404).json({ msg: 'Usuario no encontrado' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || 'Error interno del servidor' });
  }
});

module.exports = router;
