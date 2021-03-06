export const getDiseaseCount = async (id) => {
  const url = `https://nfectionary.herokuapp.com/api/v1/state-diseases/${id}`;
  try {
    const response = await fetch(url);
    const diseases = await response.json();
    const diseaseCount = diseases.map(disease => ({ 
      count: disease.case_count, 
      id: disease.diseases_id 
    }));
    return diseaseCount;
  } catch (err) {
    throw new Error(`Error fetching disease case count: ${err.message}`);
  }
};