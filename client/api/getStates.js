export const getStates = async () => {
  try {
    const response = await fetch('https://nfectionary.herokuapp.com/api/v1/states');
    const states = await response.json();

    return states.map(state => state.name).sort();
  } catch (err) {
    throw new Error(err.message);
  }
};
