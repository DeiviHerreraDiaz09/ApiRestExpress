const express = require('express')
const port = 3000
const router = express.Router("/users")

app.get("/", (req, res) =>{
  res.send("Soy la ruta de usuarios")
})

