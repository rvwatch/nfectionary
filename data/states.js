/* eslint-disable no-console */
const Nightmare = require('nightmare');
const nightmare = Nightmare({
  show: true,
  webPreferences: {
    webSecurity: false
  }
});
require('nightmare-iframe-manager')(Nightmare);
const fs = require('fs');

nightmare
  .goto('https://www.cdc.gov/widgets/diseaseandconditions/data-maps.html')
  .enterIFrame('#DataMaps1')
  .select('select#map-selector', 'Salmonellosis')
  .wait('tbody td.sorting_1')
  .evaluate(() => {
    let states = [...document.querySelectorAll('tbody td.sorting_1')]
      .map(element => element.innerText);

    const stateData = states.map(state => {
      return {
        name: state
      };
    });
    return stateData;
  })
  .end()
  .then(result => {
    let data = JSON.stringify(result, null, 2);

    fs.writeFile('./state-data.json', data, 'utf8', err => {
      if (err) {
        return console.log(err);
      }
    });
    console.log('Data saved to file.');
  })
  .catch(err => {
    console.log(err);
  });