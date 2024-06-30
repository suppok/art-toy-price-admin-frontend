import axiosInstance from './AxiosInstance';

export const fetchResellers = async () => {
  try {
    const response = await axiosInstance.get(`/resellers`);
    return response;
  } catch (error) {
    console.error(`Error fetching resellers: ${error}`);
    throw error;
  }
};

export const fetchReseller = async (id) => {
  try {
    const response = await axiosInstance.get(`/resellers/${id}`);
    return response;
  } catch (error) {
    console.error(`Error fetching reseller: ${error}`);
    throw error;
  }
};

export const deleteReseller = async (id) => {
  try {
    const response = await axiosInstance.delete(`/resellers/${id}`);
    return response;
  } catch (error) {
    console.error(`Error deleting reseller: ${error}`);
    throw error;
  }
};

export const createReseller = async (resellerData) => {
  try {
    const response = await axiosInstance.post('/resellers', resellerData);
    return response;
  } catch (error) {
    console.error(`Error creating reseller: ${error}`);
    throw error;
  }
};

export const updateReseller = async (id, resellerData) => {
  try {
    const response = await axiosInstance.put(`/resellers/${id}`, resellerData);
    return response;
  } catch (error) {
    console.error(`Error updating reseller: ${error}`);
    throw error;
  }
};
