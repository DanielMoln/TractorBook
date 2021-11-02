const Express = require('express')
const BodyParser = require('body-parser')
const PathController = require('./controllers/PathController')
const Path = require('path')
require('dotenv').config()

const app = Express()
const port = process.env.PORT || 5000

const jsonParser = BodyParser.json()

app.use(BodyParser.urlencoded({extended: false}))
app.use(Express.static(Path.join(__dirname, 'public')))

PathController(app, jsonParser)

app.listen(port, () => {
  console.log(`Server started on ${port}.`)
})