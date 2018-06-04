export const getStates = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/v1/states');
    const states = await response.json();

    return states.map(state => state.name).sort();
  } catch (err) {
    throw new Error(err.message);
  }
};
