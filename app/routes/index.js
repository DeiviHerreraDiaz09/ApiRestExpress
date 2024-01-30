const productRouter = require('./products');
const userRouter = require('./users');

function routes(app) {
  app.use('/products', productRouter);
  app.use('/users', userRouter);
}

module.exports = routes;
