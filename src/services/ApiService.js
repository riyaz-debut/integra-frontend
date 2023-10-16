import Axios from "./Axios";
import config from "config";
//const baseURL = 'https://jsonplaceholder.typicode.com'

const backendURL = config.baseURL;

export const get = (path, data = null) => {
  return Axios.get(`${backendURL()}/${path}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

/*
  Description 
  @params
  path: Api end point 
  data: pass data in object form like 
    {
      name: 'Fred',
      email: 'Flintstone@gmail.com'
    }
*/
export const post = (path, data = null, headers) => {
  return Axios.post(`${backendURL()}/${path}`, data, {
    headers: headers,
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const putRequest = (path, data = null) => {
  try {
    return Axios.put(`${backendURL()}/${path}`, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    throw error;
  }
};

export const deleteRequest = (path, ids = null) => {
  return Axios.delete(`${backendURL()}/${path}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const patch = (path, data = null) => {
  return Axios.patch(`${backendURL()}/${path}`, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
