/* eslint-disable no-unreachable */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable max-len */
// As the last step of your lab, hook this up to index.html

function getRandomIntInclusive(min, max) {
  newMin = Math.ceil(min);
  newMax = Math.floor(max);
  return Math.floor(Math.random() * (newMax - newMin + 1) + newMin);
}
function restoArrayMaker(dataArray) {
  // console.log('fired restoArrayMaker');
  const range = [...Array(15).keys()];
  const listItems = range.map((item, index) => {
    const restNum = getRandomIntInclusive(0, dataArray.length - 1);
    return dataArray[restNum];
  });
  return listItems;
}
function createHtmlList(collection) {
  // console.log('fired createHtmlList');
  console.log(collection);
  const targetList = document.querySelector('.resto-list');
  targetList.innerHTML = '';
  collection.forEach((item) => {
    const {name} = item;
    const displayName = name.toLowerCase();
    const injectThis = `<li>${displayName}</li>`;
    targetList.innerHTML += injectThis;
  });
}

function initMap (targetID) {
  const latLong = [38.784, -76.872];
  const map = L.map(targetID).setView(latLong, 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
  }).addTo(map);
  return map;
}
function addMapMarkers(map, collection) {
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      layer.remove();
    }
  });

  collection.forEach((item) => {
    const point = item.geocoded_column_1?.coordinates;
    console.log(item.geocoded_column_1?.coordinates);
    L.marker([point[1], point[0]]).addTo(map);
  });
}

async function mainEvent() { // the async keyword means we can make API requests
  console.log('script loaded');
  const form = document.querySelector('.main_form');
  const submit = document.querySelector('.submit_button');

  const resto = document.querySelector('#rname');
  const zipcode = document.querySelector('#zipcode');
  const map = initMap('map');

  submit.style.display = 'none';
  // const results = await fetch('/api/foodServicesPG'); // This accesses some data from our API
  // const arrayFromJson = await results.json(); // This changes it into data we can use - an object
  // const arrayFromJson = {data: []}; // TODO : remove debug tool
  // localStorage.setItem('restaurants' , JSON.stringify(arrayFromJson));
  if (localStorage.getItem('restaurants') === undefined) {
    const results = await fetch('/api/foodServicesPG'); // This accesses some data from our API
    const arrayFromJson = await results.json(); // This changes it into data we can use - an object
    localStorage.setItem('restaurants', JSON.stringify(arrayFromJson.data));
  }

  const storedData = localStorage.getItem('restaurants');
  const storedDataArray = JSON.parse(storedData);
  console.log(storedDataArray);

  if (storedDataArray.data.length > 0) { // no race statement
    submit.style.display = 'block';
    let currentArray = [];

    resto.addEventListener('input', async(event) => {
      if (currentArray.length < 1) { return; }
      console.log(event.target.value);
      const selectResto = currentArray.filter((item) => {
        const lowerName = item.name.toLowerCase();
        const lowerValue = event.target.value.toLowerCase();
        return lowerName.includes(lowerValue);
      });
      createHtmlList(selectResto);
      addMapMarkers(map, selectResto);
      // console.log(selectResto);
    });
    zipcode.addEventListener('input', async(event) => {
      if (currentArray.length < 1) { return; }
      console.log(event.target.value);
      const selectResto = currentArray.filter((item) => {
        const lowerZip = item.zip;
        const lowerValue = event.target.value;
        return lowerZip.includes(lowerValue);
      });
      createHtmlList(selectResto);
      addMapMarkers(map, selectResto);
      // console.log(selectResto);
    });

    form.addEventListener('submit', async (submitEvent) => { // async has to be declared all the way to get an await
      submitEvent.preventDefault(); // This prevents your page from refreshing!
      // console.log('form submission'); // this is substituting for a "breakpoint"
      // console.table(arrayFromJson.data); // this is called "dot notation"
      // arrayFromJson.data - we're accessing a key called 'data' on the returned object
      // it contains all 1,000 records we need
      currentArray = restoArrayMaker(storedDataArray.data);
      createHtmlList(currentArray);
      addMapMarkers(map, currentArray);
    });
  }
}

// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests