import axios from 'axios';
import config from '../config';

const axiosInstance = axios.create({
  baseURL: config.api.baseURL
});

export default axiosInstance;