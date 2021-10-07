const express = require('express');
const http = require('https');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const jsonParser = bodyParser.json();

app.get('/', (req,res,next) => {
  // middleware
  next();
}, 
(req,res) =>{
    fs.readFile(path.join(__dirname, './public/index.html'),
      {encoding: 'utf-8'},
      (err, data) => {
        if (err) console.error('Hiba lépett fel a beolvasáskor!')

        res.setHeader('content-type', 'text/html');
        res.status(200).end(data);
      }
    );
})

app.post('/', jsonParser, (req,res) => {

  fs.readFile(path.join(__dirname, 'public/traktorok/traktorok.json'),
    {encoding: 'utf-8'},
    (err, data) => {
      if (err)
      {
        console.error('Hiba lépett fel a traktorok fájl beolvasásakor!');
        return;
      }

          try
          {
            const traktorok = (data !== undefined ? JSON.parse(data) : []);
            const body = req.body;
            const talalatok = [];

            for (let i = 0; i < traktorok.gepek.length; i++)
            {
              let gep = traktorok.gepek[i];
              for (let j = 0; j < gep.models.length; j++)
              {
                let model = gep.models[j];

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
            console.error('Hiba lépett fel a traktorok parsolásakor! ' + e)
          }
    });
});

app.get('/traktorok/osszes', (req,res) => {
  fs.readFile(path.join(__dirname, 'public/traktorok/traktorok.json'),
    { encoding: 'utf-8' },
  (err, data) => {
    if (err) 
    {
      console.error('Hiba lépett fel a beolvasáskor!');
      return;
    }

    res.setHeader('content-type', 'application/json; charset=utf-8');
    res.status(200).end(data);
  }
  )
});

app.use( jsonParser );
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server started on ${port}.`);
})