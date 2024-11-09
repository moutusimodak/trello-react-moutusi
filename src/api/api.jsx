
import axios from "axios";

export const getData = async (endpoint) => {
  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};



export const postData = async (endpoint, payload) => {
    try {
      const response = await axios.post(endpoint, payload);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

