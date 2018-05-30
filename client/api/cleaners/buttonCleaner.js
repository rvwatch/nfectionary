export const buttonCleaner = (names, count) => {
  const buttonData = names.reduce((accu, name) => {
    const newButton = count.filter(num => {
      let newObject = {};
      if (num.id === name.id) {
        newObject['name'] = name.name;
        newObject['count'] = num.count;
      }
      if (newObject.name) {
        return accu.push(newObject);
      }
    });
    return accu;
  }, []);
  return buttonData
};
