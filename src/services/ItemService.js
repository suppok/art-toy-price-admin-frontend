import axiosInstance from './AxiosInstance';

export const deleteItem = async (id) => {
  try {
    const response = await axiosInstance.delete(`/items/${id}`);
    return response;
  } catch (error) {
    console.error(`Error deleting item: ${error}`);
    throw error;
  }
};

export const fetchItems = async () => {
  try {
    const response = await axiosInstance.get(`/items`);
    return response;
  } catch (error) {
    console.error(`Error fetching items: ${error}`);
    throw error;
  }
};

export const fetchItem = async (id) => {
  try {
    const response = await axiosInstance.get(`/items/${id}`);
    return response;
  } catch (error) {
    console.error(`Error fetching items: ${error}`);
    throw error;
  }
};

export const fetchItemsByCollection = async (id) => {
  try {
    const response = await axiosInstance.get(`/collections/${id}/items`);
    return response;
  } catch (error) {
    console.error(`Error fetching items: ${error}`);
    throw error;
  }
};

export const createItem = async (itemData) => {
  try {
    const response = await axiosInstance.post('/items', itemData);
    return response;
  } catch (error) {
    console.error(`Error creating item: ${error}`);
    throw error;
  }
};

export const updateItem = async (id, itemData) => {
  try {
    const response = await axiosInstance.put(`/items/${id}`, itemData);
    return response;
  } catch (error) {
    console.error(`Error updating item: ${error}`);
    throw error;
  }
};
