const express = require('express');
const productRouter = require('./products');
const userRouter = require('./users');
const categorieRouter = require('./categories');
const router = express.Router();

function routes(app) {
  app.use('/api/v1', router);
  router.use('/products', productRouter);
  router.use('/users', userRouter);
  router.use('/categories', categorieRouter);
}

module.exports = routes;
