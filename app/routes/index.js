const express = require('express');
const userRouter = require('./users');
const router = express.Router();

function routes(app) {
  app.use('/api/v1', router);
  router.use('/users', userRouter);
}

module.exports = routes;
