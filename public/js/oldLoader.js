const section = document.getElementById('content')
let traktorokJson = null

async function render()
{
  traktorokJson = await fetch('/traktorok/osszes')
  const traktorok = await traktorokJson.json()
  console.log(traktorok);
  try
  {
    for (let gep of traktorok.gepek)
    {
      for (let model of gep.models)
      {
        section.innerHTML += `
          <div class="card" style="width: 18rem">
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
        `
      }
    }
  } catch (e) {
    console.error('Hiba lépett fel a traktorok renderelésével!')
  }
}

window.onload = () => render()

document.getElementById('filter_form').onsubmit = (e) => {
  e.preventDefault()
  const form = e.target.elements
  search(form)
}

async function search(form)
{
  const modell = form.modell.value
  const evjarat = form.evjarat.value
  const vontathatosag = form.vontathatosag.value
  const hengerek = form.hengerek.value
  const kobcenti = form.kobcenti.value
  const teljesitmeny = form.teljesitmeny.value
  const uzemora = form.uzemora.value
  const body = {
    modell: modell,
    evjarat: evjarat,
    vontathatosag: vontathatosag,
    hengere: hengerek,
    kobcenti: kobcenti,
    teljesitmeny: teljesitmeny,
    uzemora: uzemora
  }

  const talalatok = await fetch('/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body),
    })
  const adatok = await talalatok.json()

  try
  {
    if (adatok.length === 0)
    {
      section.innerHTML = `
          <div class="error">
              <p>Ilyen modell nem található az adatbázisunkban.</p>
          </div
        `
      return
    }

    /* section tartalom törlése */
    section.innerHTML = ``

    for (let traktor of adatok)
    {
      section.innerHTML += `
        <div class="card" style="width: 18rem">
          <img src="${traktor.kep}" class="card-img-top" alt="${traktor.model}" title="${traktor.model}">
          <div class="card-body">
            <h5 class="card-title">${traktor.model}</h5>
            <br/>
            <p class="card-text">Évjárat: ${traktor.evjarat}</p>
            <p class="card-text">Üzemóra: ${traktor.uzemora} h</p>
            <p class="card-text">Teljesítmény: ${traktor.teljesitmeny} LE</p>
            <p class="card-text">Köbcenti: ${traktor.kobcenti} cm<sup>3</sup></p>
            <p class="card-text">Hengerek: ${traktor.hengerek}</p>
            <p class="card-text">Sebesség: ${traktor.sebesseg} km/h</p>
            <p class="card-text">Önsúly: ${traktor.onsuly} kg</p>
            <p class="card-text">Vontathatósag: ${traktor.vontathatosag} kg</p>
            <p class="card-text">Üzemanyag tank: ${traktor.uzemanyag} l</p>
            <p class="card-text price">Ár: <span class="price">${( traktor.ar == undefined ? '32' : traktor.ar)}</span> millió Ft</p>
            <br/>
            <a href="#" class="btn btn-primary">Megnézem</a>
          </div>
        </div>
      `
    }
  } catch (e) {
    console.error('Hiba lépett fel a szűrési viszontválasz parsolásakor! ' + e)
  }
}