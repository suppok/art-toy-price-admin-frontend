import axiosInstance from './AxiosInstance';

export const fetchCollections = async () => {
  try {
    const response = await axiosInstance.get(`/collections`);
    return response;
  } catch (error) {
    console.error(`Error fetching collections: ${error}`);
    throw error;
  }
};

export const deleteCollection = async (id) => {
  try {
    const response = await axiosInstance.delete(`/collections/${id}`)
    return response;
  } catch (error) {
    console.error(`Error deleting collection: ${error}`);
    throw error;
  }
}