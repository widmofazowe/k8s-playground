const express = require('express')
const app = express()
const port = 3000

app.get('/whoami', (req, res) => {
  res.send("I'm arroyo")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})