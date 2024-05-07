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

// Injection of services
const userservice = new UserService();

router.get('/', (req, res, next) => {
  try {
    const user_db = userservice.findUsers();
    const { id } = req.query;

    if (id) {
      const validation = user_by_id_schema_optional.validate(req.query);
      if (validation.error !== undefined) {
        return res.status(400).json({
          msg: validation.error.message,
        });
      }
      const user = userservice.findOne(id);
      return res.json(user);
    }

    if (user_db.length === 0) {
      return res.status(404).json({ msg: 'Users not found' });
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

router.post('/', validator(post_user_schema, 'body'), (req, res, next) => {
  try {
    const { id, name, lastname, email } = req.body;
    const created = userservice.create({ id, name, lastname, email });
    res.status(201).json({
      created,
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', validator(user_by_id_schema, 'params'), (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, lastname, email } = req.body;

    if (!id) {
      return res.status(400).json({ msg: 'User ID not provided' });
    }
    const userIndex = userservice.findIndexUser(id);

    const update = userservice.update({ id, name, lastname, email }, userIndex);
    res.status(200).json({
      update,
    });
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/:id',
  validator(user_by_id_schema, 'params'),
  (req, res, next) => {
    try {
      const { name, lastname, email } = req.body;
      if (!req.params.id) {
        res.status(400).json({ msg: 'User ID not provided' });
      }
      const userIndex = userservice.findIndexUser(req.params.id);
      const validacion = update_user_schema.validate(req.body);
      if (validacion.error !== undefined) {
        res.status(404).json({ msg: validacion.error });
      }
      const updateUser = userservice.updatePath(
        { name, lastname, email },
        userIndex,
      );
      res.status(200).json({
        updateUser,
      });
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validator(user_by_id_schema, 'params'),
  (req, res, next) => {
    try {
      const { id } = req.params;
      const userIndex = userservice.findIndexUser(id);
      const deleteUser = userservice.delete(userIndex);
      if(deleteUser){
        res.status(200).json({ msg: 'User deleted' });
      }
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
