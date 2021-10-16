const fs = require('fs')
const traktorok = require('../public/traktorok/traktorok.json')

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
  app.use( jsonParser )

  app.get('/', (req,res,next) => {
      // middleware 
      next();
    }, 
    (req,res) =>{
      readFileAsync(
        '../public/index.html',
        { encoding: 'utf-8' },
        (data) => {
          res.setHeader('Content-Type', 'text/html')
          res.status(200).end(data);
        }
    )
  })

  app.get('/traktorok/osszes', (req,res) => {
    res.status(200).setHeader('content-type', 'application/json')
          .send(JSON.stringify(traktorok))
  });
  
  app.post('/', jsonParser, (req,res) => {
    try
    {
      const body = req.body;
      const talalatok = [];
      
      for (let gep of traktorok.gepek)
      {
        for (let model of gep.models)
        {
          let type = gep.type.toString().toLowerCase();
          type = type.split(' ').join('');

          if (type.toLowerCase().includes( body.modell ))
          {
            talalatok.push(
              {
                model: gep.type + ' ' + model.model,
                kep: model.kep,
                evjarat: model.evjarat,
                vontathatosag: model.muszaki_adatok.vontathatosag,
                hengerek: model.muszaki_adatok.hengerek,
                kobcenti: model.muszaki_adatok.kobcenti,
                teljesitmeny: model.muszaki_adatok.teljesitmeny,
                uzemora: model.muszaki_adatok.uzemora,
                onsuly: model.muszaki_adatok.onsuly,
                uzemanyag: model.muszaki_adatok.uzemanyag
              }
            );
          }
        }
      }

      /* end of file reading */
      res.status(200).setHeader('Content-Type', 'application/json')
        .end(JSON.stringify(talalatok));

    } catch (e) {
      console.error('Hiba lépett fel a traktorok parsolásakor! ' + e.message)
    }
  })
}