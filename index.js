const express = require('express');
const routes = require('./app/routes/index');
const app = express();
const port = 3000

app.use(express.json())
routes(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
