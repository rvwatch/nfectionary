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
  .select('select#map-selector', 'Campylobacteriosis')
  .wait('tbody td.sorting_1')
  .evaluate(() => {
    let case_counts = [
      ...document.querySelectorAll('tbody td.cdcmap-textcenter')
    ].map(element => element.innerText);
    let stateId = 1;

    const ecoliData = case_counts.map(count => {
      return {
        state_id: stateId++,
        case_count: count,
        disease_id: 3
      };
    });

    return ecoliData;
  })
  .end()
  .then(result => {
    let data = JSON.stringify(result, null, 2);

    fs.writeFile('./campylobacter-data.json', data, 'utf8', err => {
      if (err) {
        return console.log(err);
      }
    });
    console.log('Data saved to file.');
  })
  .catch(err => {
    console.log(err);
  });
