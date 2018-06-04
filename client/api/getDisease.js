export const getDisease = async id => {
  try {
    const response = await fetch(`https://nfectionary.herokuapp.com/api/v1/diseases/${id}`);
    const disease = await response.json();
    return disease;
  } catch (err) {
    throw new Error(`Error fetching disease information: ${err.message}`);
  }
};
