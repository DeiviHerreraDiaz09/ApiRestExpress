const express = require('express');
const routes = require('./app/routes/index');
const { logErrors, logErrorsTwo, BoomlogErrorsTwo } = require("./app/middlewares/error.js")
const app = express();
const port = 3000;

app.use(express.json());

// ROUTING
routes(app);

// MIDDLEWARE
app.use(BoomlogErrorsTwo); // Se ejecuta primero
// app.use(logErrorsTwo);
// app.use(logErrors);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
