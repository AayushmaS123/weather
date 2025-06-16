export const saveLocation = (location) => {
  localStorage.setItem('weatherLocation', location);
};

export const getSavedLocation = () => {
  return localStorage.getItem('weatherLocation');
};