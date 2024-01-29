const express = require('express')
const port = 3000
app = express()

app.get("/", (req, res) =>{
  res.send("Soy la ruta de productos")
})

