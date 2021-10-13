const section = document.getElementById('content');
let traktorokJson = null;

async function render()
{
  traktorokJson = await fetch('/traktorok/osszes');
  const traktorok = await traktorokJson.json();
  
  try
  {
    for (let i = 0; i < traktorok.gepek.length; i++)
    {
      let gep = traktorok.gepek[i];
      for (let j = 0; j < gep.models.length; j++)
      {
        let model = gep.models[j];
        section.innerHTML += `
          <div class="card" style="width: 18rem;">
            <img src="${model.kep}" class="card-img-top" alt="${gep.type + ' ' +model.model}">
            <div class="card-body">
              <h5 class="card-title">${gep.type+' '+model.model}</h5>
              <br/>
              <p class="card-text">Évjárat: ${model.evjarat}</p>
              <p class="card-text">Üzemóra: ${model.muszaki_adatok.uzemora} h</p>
              <p class="card-text">Teljesítmény: ${model.muszaki_adatok.teljesitmeny} LE</p>
              <p class="card-text">Köbcenti: ${model.muszaki_adatok.kobcenti} cm<sup>3</sup></p>
              <p class="card-text">Hengerek: ${model.muszaki_adatok.hengerek}</p>
              <p class="card-text">Sebesség: ${model.muszaki_adatok.sebesseg} km/h</p>
              <p class="card-text">Önsúly: ${model.muszaki_adatok.onsuly} kg</p>
              <p class="card-text">Vontathatósag: ${model.muszaki_adatok.vontathatosag} kg</p>
              <p class="card-text">Üzemanyag tank: ${model.muszaki_adatok.uzemanyag} l</p>
              <p class="card-text price">Ár: <span class="price">${( model.ar == undefined ? '32' : model.ar)}</span> millió Ft</p>
              <br/>
              <a href="#" class="btn btn-primary">Megnézem</a>
            </div>
          </div>
        `;
      }
    }
  } catch (e) {
    new Error('Hiba lépett fel parsoláskor!');
  }
}

window.onload = () => render();

document.getElementById('filter_form').onsubmit = (e) => {
  e.preventDefault();
  const form = e.target.elements;
}

async function search(form)
{
  const modell = form.modell.value;
  const evjarat = form.evjarat.value;
  const vontathatosag = form.vontathatosag.value;
  const hengerek = form.hengerek.value;
  const kobcenti = form.kobcenti.value;
  const teljesitmeny = form.teljesitmeny.value;
  const uzemora = form.uzemora.value;
  const body = {
    modell: modell,
    evjarat: evjarat,
    vontathatosag: vontathatosag,
    hengere: hengerek,
    kobcenti: kobcenti,
    teljesitmeny: teljesitmeny,
    uzemora: uzemora
  };

  const talalatok = await fetch('/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body),
    });
  const adatok = await talalatok.json();

  try
  {
      /*
        response sample:
        {
          model: 'John Deere 8370R ILS',
          kep: '...',
          evjarat: 2016,
          vontathatosag: 33500,
          hengerek: 6,
          kobcenti: 9000,
          teljesitmeny: 370,
          uzemora: 3356
        }
      */

    console.log(adatok);

    if (adatok.length === 0)
    {
      section.innerHTML = `
          <div class="error">
              <p>Ilyen modell nem található az adatbázisunkban.</p>
          </div
        `;
      return;
    }

    /* remove cahced 'Nincs ilyen modell...' */
    section.innerHTML = ``;

    for (let i = 0; i < adatok.length; i++)
    {
      section.innerHTML += `
        <div class="card" style="width: 18rem;">
          <img src="${adatok[i].kep}" class="card-img-top" alt="${adatok[i].model}" title="${adatok[i].model}">
          <div class="card-body">
            <h5 class="card-title">${adatok[i].model}</h5>
            <br/>
            <p class="card-text">Évjárat: ${adatok[i].evjarat}</p>
            <p class="card-text">Üzemóra: ${adatok[i].uzemora} h</p>
            <p class="card-text">Teljesítmény: ${adatok[i].teljesitmeny} LE</p>
            <p class="card-text">Köbcenti: ${adatok[i].kobcenti} cm<sup>3</sup></p>
            <p class="card-text">Hengerek: ${adatok[i].hengerek}</p>
            <p class="card-text">Sebesség: ${adatok[i].sebesseg} km/h</p>
            <p class="card-text">Önsúly: ${adatok[i].onsuly} kg</p>
            <p class="card-text">Vontathatósag: ${adatok[i].vontathatosag} kg</p>
            <p class="card-text">Üzemanyag tank: ${adatok[i].uzemanyag} l</p>
            <p class="card-text price">Ár: <span class="price">${( adatok[i].ar == undefined ? '32' : adatok[i].ar)}</span> millió Ft</p>
            <br/>
            <a href="#" class="btn btn-primary">Megnézem</a>
          </div>
        </div>
      `;
    }
  } catch (e) {
    console.error('Hiba lépett fel a szűrési viszontválasz parsolásakor! ' + e);
  }
}