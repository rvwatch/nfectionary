export const getDiseaseNames = async () => {
  const url = 'https://nfectionary.herokuapp.com/api/v1/diseases';
  try {
    const response = await global.fetch(url);
    const diseases = await response.json();
    
    const diseaseNames = diseases.map(disease => ({
      name: disease.name,
      id: disease.id
    }));
    return diseaseNames;
  } catch (err) {
    throw new Error(`Error fetching disease names: ${err.message}`);
  }
};