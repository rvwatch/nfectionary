export const getDiseaseNames = async () => {
  try {
    const response = await global.fetch('https://nfectionary.herokuapp.com/api/v1/diseases');
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