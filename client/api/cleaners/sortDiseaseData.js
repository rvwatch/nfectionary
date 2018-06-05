/* eslint-disable id-length */
export const diseaseSort = (a, b) => {
  if (a.id < b.id){
    return -1;
  }
  if (a.id > b.id){
    return 1;
  }
};