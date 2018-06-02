export const getStates = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/v1/states');
    const states = await response.json();

    return states.map(state => state.name).sort();
    // const names = states.map(state => {
    //   console.log(state);
      
    //   let newArray = [].sort((a, b) => a - b)
    //    newArray.push({state: state.name, id: state.id})
    //    return newArray
    // });
    // const ids = states.map(state => state.id);
  
    
    // console.log(names);
     
  } catch (err) {
    throw new Error(err.message);
  }
};
