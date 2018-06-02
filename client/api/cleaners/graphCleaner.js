export const graphCleaner = (rawData) => {
  const graphData = rawData.reduce((accu, states) => {
    const newData = count.filter(num => {
      let newObject = {};
      if (num.id === name.id) {
        newObject['name'] = name.name;
        newObject['count'] = num.count;
        newObject['disease_id'] = num.id;
      }
      if (newObject.name) {
        return accu.push(newObject);
      }
    });
    return accu;
  }, []);
  return buttonData
};
