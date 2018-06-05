export const getStates = async () => {
  const url = 'https://nfectionary.herokuapp.com/api/v1/states';
  try {
    const response = await fetch(url);
    const states = await response.json();

    return states.map(state => state.name).sort();
  } catch (err) {
    throw new Error(err.message);
  }
};
