/* ...Data file, JS objects */
let slideShowDatas = null
let tractorsDatas = null
let trailersDatas = null
let loadersDatas = null
let combinesDatas = null
let searchArray = []
let actualBodyContent = []
let actualBodyContent2 = [] // I use it for storing the default content

/* html objects */
/*
  When the window is loading I add all slides from slideShowData
  to slideShowContainer and When I will be done. I rewrite every element's
  dislay to none expect (1).
*/
const slideShowContainer = document.getElementById('slides')
const machinesBox = document.getElementById('machinesBox')
const searchMenu = document.getElementById('searchMenu')
const searchButton = document.getElementById('searching')
const selectorBox = document.getElementById('selectorBox')
const filterBar = document.getElementById('filterBar')
const sortBox = document.getElementById('sortBox')

const simpleRender = () => {
  // ...
}

/* callable methods */
const SearchMenuManager = (action) => 
{  
  if (action == 'open')
  {
    searchMenu.style.display = "initial";
  }
  else if (action == 'close')
  {
    searchMenu.style.display = "none";
    /* finally action */
    document.getElementById('combineIcon')
         .style.opacity = "0.3"
    document.getElementById('tractorIcon')
         .style.opacity = "0.3"
    document.getElementById('loaderIcon')
         .style.opacity = "0.3"
    document.getElementById('trailerIcon')
         .style.opacity = "0.3"

    searchArray = []
  }
}

const loadSlideShowData = async () => {
  if (slideShowDatas == null) 
  {
    try
    {
      let request = await fetch('/data/slideshow')
      slideShowDatas = await request.json()
    } catch (e) {
      console.error(e)
    }
  }
  
  if (slideShowDatas === {} || slideShowDatas === null || slideShowDatas === undefined)
    slideShowDatas = []
  
  let slide = slideShowDatas[0];

  /*
    The reason why I put = instead of += is
    the html page contains default slide
  */
  // "img": "<img src='./tractors/fendt/930.png'>"
  slideShowContainer.innerHTML = `
      <div class="slide">

          <div class="passage">
            <h1><strong>${slide.name}</strong></h1>
            <p>${slide.paragraph}</p>

          <!--<button>I will check</button>-->
          </div>

          <div class="slideImg">${slide.img}</div>

      </div>
  `
} 

function showSlide(n)
{
  n = n - 1

  if ( n > slideShowDatas.length)
    n = slideShowDatas.length - 1
  if ( n < 0)
    n = 0

  /* remove older one */
  slideShowContainer.innerHTML = ``
  /* button design */
  /* remove background from all button */
  let buttons = document.getElementsByClassName('slideBtn');
  for (let button of buttons)
      button.style.background = ""
  /* getting clicked item's data */
  let clickedBtn = buttons[n]
  clickedBtn.style.background = "rgba(102, 102, 102, 1)"

  /* render the new one */
  let slide = slideShowDatas[n];

  slideShowContainer.innerHTML = `
      <div class="slide">

          <div class="passage">
            <h1><strong>${slide.name}</strong></h1>
            <p>${slide.paragraph}</p>

          <!--<button>I will check</button>-->
          </div>

          <div class="slideImg">${slide.img}</div>

      </div>
  `
}

const loadMachines = async () => {
  /* loading tractors */
  if (tractorsDatas == null) 
  {
    try
    {
      let request = await fetch('/data/tractors')
      tractorsDatas = await request.json()
    } catch (e) {
      console.error(e)
    }
  }
  
  /* if is it empty */
  if (tractorsDatas === {} || tractorsDatas === null || tractorsDatas === undefined)
    tractorsDatas = []
  /*  ---- end of reading */

  /* loading combines */
  if (combinesDatas == null) 
  {
    try
    {
      let request = await fetch('/data/combines')
      combinesDatas = await request.json()
    } catch (e) {
      console.error(e)
    }
  }

  /* if is it empty */
  if (combinesDatas === {} || combinesDatas === null || combinesDatas === undefined)
  combinesDatas = []
  /*  ---- end of reading */

  /* loading loaders */
  if (loadersDatas == null) 
  {
    try
    {
      let request = await fetch('/data/loaders')
      loadersDatas = await request.json()
    } catch (e) {
      console.error(e)
    }
  }
  
  /* if is it empty */
  if (loadersDatas === {} || loadersDatas === null || loadersDatas === undefined)
    loadersDatas = []
  /*  ---- end of reading */
  
  /* if is it empty */
  if (combinesDatas === {} || combinesDatas === null || combinesDatas === undefined)
  combinesDatas = []
  /*  ---- end of reading */

  /* loading trailers */
  if (trailersDatas == null) 
  {
    try
    {
      let request = await fetch('/data/trailers')
      trailersDatas = await request.json()
    } catch (e) {
      console.error(e)
    }
  }
  
  /* if is it empty */
  if (trailersDatas === {} || trailersDatas === null || trailersDatas === undefined)
    trailersDatas = []
  /*  ---- end of reading */
  
  /* remove machineBox's contents */
  machinesBox.innerHTML = ``

  /*
    Loading order:
      - tractors
      - combines
      - loaders
      - trailers
  */
  /* loop through the array */

  // tractors
  for (let tractor of tractorsDatas)
  {
    /* every machine's json are same */
    insertMachine(tractor);
    actualBodyContent.push(tractor)
    actualBodyContent2.push(tractor)
  }

  // combines
  for (let combine of combinesDatas)
  {
    /* every machine's json are same */
    insertMachine(combine);
    actualBodyContent.push(combine)
    actualBodyContent2.push(combine)
  }

  // loaders
  for (let loader of loadersDatas)
  {
    /* every machine's json are same */
    insertMachine(loader);
    actualBodyContent.push(loader)
    actualBodyContent2.push(loader)
  }

  // trailers
  for (let trailer of trailersDatas)
  {
    /* every machine's json are same */
    insertMachine(trailer);
    actualBodyContent.push(trailer)
    actualBodyContent2.push(trailer)
  }
}

const insertMachine = (machine) => {
  if (machine.meta != 'tractors')
  {
    machinesBox.innerHTML += `
        <div class="machine">
          <div class="machineTop" style="flex-direction: row; text-align: center; justify-content: center;  align-items: center;">
            <!-- mt1 = machine top section 1 -->
            <div class="mts1">
              <h1>${machine.company}</h1>
              <h2>${machine.type}</h2>

              <ul>
                ${ machine.description.map(description => "<li>"+description+"</li>").join('') }
              </ul>
            </div>

            <div class="mts2">
              ${machine.img}
            </div>
          </div>

          <div class="machineBottom" style="flex-direction: row; text-align: center; justify-content: center;  align-items: center;">
            <!-- mbs1 = machine bottom section 1 -->
            <div class="mbs1">
              <!--<button type="button" data-bs-toggle="modal" data-bs-target="#readMoreBox" onclick="readMore('${machine.company}', '${machine.type}')">Read More...</button>-->
            </div>

            <div class="mbs2" style="display: none">
              <div class="statistic">
                <p><strong>Lóerő: <span style="color: #666;">${machine.informations.horsepower}</span></strong></p>
              </div>

              <div class="statistic">
                <p><strong>Köbcenti: <span style="color: #666;">${machine.informations.displacement} cm<sup>3</sup></span></strong></p>
              </div>

              <div class="statistic">
                <p><strong>Évjárat: <span style="color: #666;">${machine.informations.year}</span></strong></p>
              </div>
            </div>
          </div>
        </div>
    `
  }
  else
  {
    machinesBox.innerHTML += `
        <div class="machine">
          <div class="machineTop">
            <!-- mt1 = machine top section 1 -->
            <div class="mts1">
              <h1>${machine.company}</h1>
              <h2>${machine.type}</h2>

              <ul>
                ${ machine.description.map(description => "<li>"+description+"</li>").join('') }
              </ul>
            </div>

            <div class="mts2">
              ${machine.img}
            </div>
          </div>

          <div class="machineBottom">
            <!-- mbs1 = machine bottom section 1 -->
            <div class="mbs1">
              <!--<button type="button" data-bs-toggle="modal" data-bs-target="#readMoreBox" onclick="readMore('${machine.company}', '${machine.type}')">Read More...</button>-->
            </div>

            <div class="mbs2">
              <div class="statistic">
                <p><strong>Lóerő: <span style="color: #666;">${machine.informations.horsepower}</span></strong></p>
              </div>

              <div class="statistic">
                <p><strong>Köbcenti: <span style="color: #666;">${machine.informations.displacement} cm<sup>3</sup></span></strong></p>
              </div>

              <div class="statistic">
                <p><strong>Évjárat: <span style="color: #666;">${machine.informations.year}</span></strong></p>
              </div>
            </div>
          </div>
        </div>
    `
  }
}

const removeElement = (array, element) => {
  const index = array.indexOf(element)
  if (index > -1)
    // index = element pos, 1 = how many elements would you like to delete
    array.splice(index, 1)
}

const searchFilter = (filter, n) => {
  let pos = n - 1
  let buttons = document.getElementsByClassName('selectorButton')
  let clickedButton = buttons[pos]

  /* Pos |   0. combine 1. tractor 2. loader 3. trailer */
  switch ( pos )
  {
    case 0:
      /* first click */
      if (document.getElementById('combineIcon').style.opacity == "0.3" || document.getElementById('combineIcon').style.opacity == "")
      {
        document.getElementById('combineIcon')
          .style.opacity = "100"
        if(!searchArray.includes(filter)) searchArray.push(filter)
      }
      else
      {
        /* second click */
        document.getElementById('combineIcon')
          .style.opacity = "0.3"
        removeElement(searchArray, filter)
      }
      break;
    case 1:
      /* first click */
      if (document.getElementById('tractorIcon').style.opacity == "0.3" || document.getElementById('tractorIcon').style.opacity == "")
      {
        document.getElementById('tractorIcon')
          .style.opacity = "100"
        if(!searchArray.includes(filter)) searchArray.push(filter)
      }
      else
      {
        /* second click */
        document.getElementById('tractorIcon')
          .style.opacity = "0.3"
        removeElement(searchArray, filter)
      }
      break;
    case 2:
      /* first click */
      if (document.getElementById('loaderIcon').style.opacity == "0.3" || document.getElementById('loaderIcon').style.opacity == "")
      {
        document.getElementById('loaderIcon')
          .style.opacity = "100"
        if(!searchArray.includes(filter)) searchArray.push(filter)
      }
      else
      {
        /* second click */
        document.getElementById('loaderIcon')
          .style.opacity = "0.3"
        removeElement(searchArray, filter)
      }
      break;
    case 3:
      /* first click */
      if (document.getElementById('trailerIcon').style.opacity == "0.3" || document.getElementById('trailerIcon').style.opacity == "")
      {
        document.getElementById('trailerIcon')
          .style.opacity = "100"
        if(!searchArray.includes(filter)) searchArray.push(filter)
      }
      else
      {
        /* second click */
        document.getElementById('trailerIcon')
          .style.opacity = "0.3"
        removeElement(searchArray, filter)
      }
      break;
  }
}

const readMore = (company, type) => {
  let result = {}

  for (let tractor of tractorsDatas)
    if (tractor.company === company && tractor.type === type)
      result = tractor

  for (let combine of combinesDatas)
    if (combine.company === company && combine.type === type)
      result = combine

  for (let loader of loadersDatas)
    if (loader.company === company && loader.type === type)
      result = loader

  for (let trailer of trailersDatas)
    if (trailer.company === company && trailer.type === type)
      result = trailer

  setTimeout(() => {
      let modalTitle = document.getElementById('modalTitle')
      let modalBody = document.getElementById('modalBody')

      modalTitle.innerHTML = `${result.company + ' ' + result.type}`
      modalBody.innerHTML = `
          <p>${result.img}</p>
          ${result.description.map(description => "<li>"+description+"</li>").join('')}
      `
      }
      ,200
  )
}
let sortedArr = ''
const sorting = (name, type) => {
  if (name === 'default')
  {
    machinesBox.innerHTML = ``
    log(actualBodyContent2)
    for (let machine of actualBodyContent2)
    {
      insertMachine(machine)
    }
  }
  if(name === 'horsepower')
  {
    switch (type)
    {
      case 'asc':
          machinesBox.innerHTML = ``
          sortedArr = machineBubbleSort(actualBodyContent)
          for (let machine of sortedArr)
          {
            insertMachine(machine)
          }
        break;
      case 'desc': 
          machinesBox.innerHTML = ``
          sortedArr = machineBubbleSort(actualBodyContent)
          for (let i = sortedArr.length - 1 ; i > -1; i--)
          {
            insertMachine(sortedArr[i])
          }
        break;
    }
  }
}

const machineBubbleSort = (arr) => {
  for (let i = 0; i < arr.length; i++ )
  {
    for (let j = 0; j < arr.length - i - 1; j++)
    {
      // condition
      if (arr[j + 1].informations.horsepower < arr[j].informations.horsepower)
      {
        [arr[j + 1],arr[j]] = [arr[j],arr[j + 1]]
      }
    }
  };
  return arr
}

const bubbleSort = (arr) => {
  for (let i = 0; i < arr.length; i++ )
  {
    for (let j = 0; j < arr.length - i - 1; j++)
    {
      // condition
      if (arr[j + 1] < arr[j])
      {
        [arr[j + 1],arr[j]] = [arr[j],arr[j + 1]]
      }
    }
  };
  return arr
}

/* default methods (not callable) */
let counter = 1
sortBox.onclick = () => {
  switch (counter)
  {
    case 1: document.getElementById('sortOptns').style.display = 'initial'; counter += 1; break;
    case 2: document.getElementById('sortOptns').style.display = 'none'; counter = 1; break;
  }
  setTimeout(() => {
    document.getElementById('sortOptns').style.display = 'none'
  }, 7000)
}

searchButton.onclick = () => {
  /* check: are there any selected items */
  if (searchArray.length == 0)
  {
    alert('Search box is empty!')
    return
  }
  /* remove machineBox's contents */
  machinesBox.innerHTML = ``
  let results = []
  /*log(searchArray)*/

  for (let search of searchArray)
  {
    switch (search)
    {
      case 'combine':
        if (!(combinesDatas === null || combinesDatas.length == 0))
        {
          // combines
          for (let combine of combinesDatas)
          {
            /* every machine's json are same */
            results.push(combine);
          }
        }
        break;
      case 'trailer':
        if (!(trailersDatas === null || trailersDatas.length == 0))
        {
          // trailers
          for (let trailer of trailersDatas)
          {
            /* every machine's json are same */
            results.push(trailer);
          }
        }

        break;
      case 'tractor':
      if (!(tractorsDatas === null || tractorsDatas.length == 0))
        {
          // tractors
          for (let tractor of tractorsDatas)
          {
            /* every machine's json are same */
            results.push(tractor);

          }
        }
        break;
      case 'loader':
        if (!(loadersDatas === null || loadersDatas.length == 0))
        {
          // loaders
          for (let loader of loadersDatas)
          {
            /* every machine's json are same */
            results.push(loader);
          }
        }
        break;
    }
  }

  /*log(results)*/

  if (results.length === 0)
  {
    machinesBox.innerHTML = `
              <div class="machine">
                <h2>We did not find such content in our database.</h2>
              </div>
          `
  }
  else
  {
    for (let result of results)
    {
      insertMachine(result)
    }
  }

  /*close searchMenu*/
  SearchMenuManager('close')
  actualBodyContent = results
  actualBodyContent2 = results
  log(actualBodyContent)
}

/* render */
window.onload = () => 
{
  simpleRender()
  loadSlideShowData()
  loadMachines()
}

const log = (obj) => {
  console.log(obj);
}