export const getDisease = async id => {
  const url =  `https://nfectionary.herokuapp.com/api/v1/diseases/${id}`;
  try {
    const response = await fetch(url);
    const disease = await response.json();
    return disease;
  } catch (err) {
    throw new Error(`Error fetching disease information: ${err.message}`);
  }
};
