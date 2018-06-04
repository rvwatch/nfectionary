export const getGraphCounts = async (id) => {
  try {
    const response = await fetch(`https://nfectionary.herokuapp.com/api/v1/specific-disease/${id}`);
    
    const diseases = await response.json();
    
    const diseaseCount = diseases.map(disease => ({ 
      count: disease.case_count, 
      id: disease.diseases_id, 
      state: disease.states_id
    }));
    return diseaseCount
  } catch(err) {
    throw new Error(`Error fetching graph counts: ${err.message}`);
  }
};