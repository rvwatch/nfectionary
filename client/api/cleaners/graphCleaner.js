export const graphCleaner = (rawData, shortNames) => {

  const graphData = shortNames.reduce((accu, state) => {

    rawData.filter(num => {
      
      let newObject = {};
      if (num.state === state.id) {
        let string = "No Cases Reported";
        let countNum = num.count !== string ? num.count : '0';
        newObject['state'] = state.state;
        newObject['count'] = parseInt(countNum);
      }
      if (newObject.state) {
        return accu.push(newObject);
      }
    });
    return accu;
  }, []);
  return graphData;
};


