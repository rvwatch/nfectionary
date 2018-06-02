export const getDisease = async id => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/diseases/${id}`
    );
    const disease = await response.json();
    return disease;
  } catch (err) {
    throw new Error(`Error fetching disease information: ${err.message}`);
  }
};
