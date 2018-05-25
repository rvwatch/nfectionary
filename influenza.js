const Nightmare = require('nightmare');
const nightmare = Nightmare({show: true});
const fs = require('fs');

nightmare
  .goto('https://www.cdc.gov/widgets/diseaseandconditions/data-maps.html')
  // .select('select#map-selector', 'Haemophilus_Influenza')
  .wait('cdc-map-rawDataTable-11111 td')
  .exists('cdc-map-rawDataTable-11111 td')
  // .evaluate(() => {
  //   let states = [...document.querySelectorAll('tbody td.sorting_1')].map(element => element.innerText);
    
  //   return states;
  // })
  .end()
  .then(result => {
    console.log('results', result);
    // let states = JSON.stringify({states: result});

    // fs.writeFile('./influenza-data.json', states, 'utf8', err => {
    //   if (err) {
    //     return console.log(err);
    //   }
    // })
    // console.log('Data saved to file.');
  })
  .catch(err => {
    console.log(err);
  });