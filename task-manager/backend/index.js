const connectToMongo = require('./db.cjs')
connectToMongo();
const express = require('express')
const app = express()
const port = 4000

app.get('/', (req, res) => {
  res.send('Hail MoonFace')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})