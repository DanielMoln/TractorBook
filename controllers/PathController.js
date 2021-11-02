const fs = require('fs')

const slideShow = require('../models/slideShowData.json')
const tractors = require('../models/tractors.json')
const combines = require('../models/combines.json')
const trailers = require('../models/trailers.json')
const loaders = require('../models/loaders.json')

const readFileAsync = async (file_path, options, cb) => {
  fs.readFile(
    file_path,
    options,
    (err, data) => {
      if (err) console.error('Hiba lépett fel a beolvasáskor! '  + err)
      
      cb(data)
    }
  );
}

module.exports = (app, jsonParser) => {
  app.use (jsonParser)

  app.get('/', (req, res, next) => {}, (req, res) => {
    readFileAsync(
      '../public/index.html',
      { encoding: 'utf-8' },
      (data) => {
        res.setHeader('Content-Type', 'text/html')
        res.status(200).end(data);
      }
  )
  })

  app.get('/data/slideshow', (req, res, next) => { next() }, (req, res) => {
    res.setHeader('content-type', 'application/json')
    res.status(200)
      .send(JSON.stringify(slideShow));
  })
  app.get('/data/tractors', (req, res, next) => { next() }, (req, res) => {
    res.setHeader('content-type', 'application/json')
    res.status(200)
      .send(JSON.stringify(tractors));
  })
  app.get('/data/combines', (req, res, next) => { next() }, (req, res) => {
    res.setHeader('content-type', 'application/json')
    res.status(200)
      .send(JSON.stringify(combines));
  })
  app.get('/data/trailers', (req, res, next) => { next() }, (req, res) => {
    res.setHeader('content-type', 'application/json')
    res.status(200)
      .send(JSON.stringify(trailers));
  })
  app.get('/data/loaders', (req, res, next) => { next() }, (req, res) => {
    res.setHeader('content-type', 'application/json')
    res.status(200)
      .send(JSON.stringify(loaders));
  })
}