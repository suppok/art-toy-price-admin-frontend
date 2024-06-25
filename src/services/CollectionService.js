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

export const fetchCollection = async (id) => {
  try {
    const response = await axiosInstance.get(`/collections/${id}`);
    return response;
  } catch (error) {
    console.error(`Error fetching collection: ${error}`);
    throw error;
  }
};

export const createCollection = async (collectionData) => {
  try {
    const response = await axiosInstance.post('/collections', collectionData);
    return response;
  } catch (error) {
    console.error(`Error creating collection: ${error}`);
    throw error;
  }
};

export const deleteCollection = async (id) => {
  try {
    const response = await axiosInstance.delete(`/collections/${id}`);
    return response;
  } catch (error) {
    console.error(`Error deleting collection: ${error}`);
    throw error;
  }
};

export const fetchCollectionsBySeries = async (id) => {
  try {
    const response = await axiosInstance.get(`/series/${id}/collections`);
    return response;
  } catch (error) {
    console.error(`Error fetching collections: ${error}`);
    throw error;
  }
};

export const updateCollection = async (id, collectionData) => {
  try {
    const response = await axiosInstance.put(`/collections/${id}`, collectionData);
    return response;
  } catch (error) {
    console.error(`Error updating collection: ${error}`);
    throw error;
  }
};
