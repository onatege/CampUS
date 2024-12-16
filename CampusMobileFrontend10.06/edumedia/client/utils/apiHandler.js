import axios from 'axios';


const userInstance = axios.create({
  baseURL: '', // API'nin temel kullanıcı URL'si
});

// Genel GET isteği
export const get = async (url, params = {}) => {

  try {
    const response = await userInstance.get(url, { params });
    return response.data;
  } catch (error) {
    if (error.isAxiosError) {
      // Handle Axios network error here
      console.error("Network Error:", error.message);
      

      // Display a user-friendly error message to the user
    } else {
      // Handle other non-network related errors
      console.error("Error:", error.message);
      

    }
    throw error;
  }

};



// Genel POST isteği
export const post = async (url, data = {}) => {
  try {
    const response = await userInstance.post(url, data);
    return response.data;
  } catch (error) {
    if (error.isAxiosError) {
      // Handle Axios network error here
      console.error("Network Error:", error.message);
      

      // Display a user-friendly error message to the user
    } else {
      // Handle other non-network related errors
      console.error("Error:", error.message);
      

    }
    throw error;
  }
};

// Genel PUT isteği
export const put = async (url, data = {}) => {
  try {
    const response = await userInstance.put(url, data);
    return response.data;
  } catch (error) {
    if (error.isAxiosError) {
      // Handle Axios network error here
      console.error("Network Error:", error.message);
      

      // Display a user-friendly error message to the user
    } else {
      // Handle other non-network related errors
      console.error("Error:", error.message);
      

    }
    throw error;
  }
};

// Genel DELETE isteği
export const del = async (url) => {
  try {
    const response = await userInstance.delete(url);
    return response.data;
  } catch (error) {
    if (error.isAxiosError) {
      // Handle Axios network error here
      console.error("Network Error:", error.message);
      

      // Display a user-friendly error message to the user
    } else {
      // Handle other non-network related errors
      console.error("Error:", error.message);
      

    }
    throw error;
  }
};
