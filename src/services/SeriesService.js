import axiosInstance from './AxiosInstance';

export const fetchSeriesList = async () => {
  try {
    const response = await axiosInstance.get(`/series`);
    return response;
  } catch (error) {
    console.error(`Error fetching series: ${error}`);
    throw error;
  }
};

export const fetchSeries = async (id) => {
  try {
    const response = await axiosInstance.get(`/series/${id}`);
    return response;
  } catch (error) {
    console.error(`Error fetching series: ${error}`);
    throw error;
  }
};

export const fetchSeriesByArtist = async (id) => {
  try {
    const response = await axiosInstance.get(`/artists/${id}/series`);
    return response;
  } catch (error) {
    console.error(`Error fetching series: ${error}`);
    throw error;
  }
};

export const createSeries = async (seriesData) => {
  try {
    const response = await axiosInstance.post('/series', seriesData);
    return response;
  } catch (error) {
    console.error(`Error creating series: ${error}`);
    throw error;
  }
};

export const deleteSeries = async (id) => {
  try {
    const response = await axiosInstance.delete(`/series/${id}`);
    return response;
  } catch (error) {
    console.error(`Error deleting series: ${error}`);
    throw error;
  }
};

export const updateSeries = async (id, seriesData) => {
  try {
    const response = await axiosInstance.put(`/series/${id}`, seriesData);
    return response;
  } catch (error) {
    console.error(`Error updating series: ${error}`);
    throw error;
  }
}
