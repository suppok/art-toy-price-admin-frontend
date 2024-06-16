import axiosInstance from './AxiosInstance';

export const fetchArtists = async () => {
  try {
    const response = await axiosInstance.get(`/artists`);
    return response;
  } catch (error) {
    console.error(`Error fetching artists: ${error}`);
    throw error;
  }
};

export const fetchArtist = async (id) => {
  try {
    const response = await axiosInstance.get(`/artists/${id}`);
    return response;
  } catch (error) {
    console.error(`Error fetching artist: ${error}`);
    throw error;
  }
};

export const deleteArtist = async (id) => {
  try {
    const response = await axiosInstance.delete(`/artists/${id}`)
    return response;
  } catch (error) {
    console.error(`Error deleting artist: ${error}`);
    throw error;
  }
}

export const createArtist = async (artistData) => {
  try {
    const response = await axiosInstance.post('/artists', artistData);
    return response;
  } catch (error) {
    console.error(`Error creating artist: ${error}`);
    throw error;
  }
};

export const updateArtist = async (id, artistData) => {
  try {
    const response = await axiosInstance.put(`/artists/${id}`, artistData);
    return response;
  } catch (error) {
    console.error(`Error updating artist: ${error}`);
    throw error;
  }
}