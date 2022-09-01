import axios from "axios";

const instance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

const api = {
  post: async (path, data) => {
    return instance
      .post(path, data)
      .then(async function (response) {
        return response;
      })
      .catch(async function (error) {
        return error.response;
      });
  },
  get: async (path) => {
    return instance
      .get(path)
      .then(async function (response) {
        return response;
      })
      .catch(async function (error) {
        return error.response;
      });
  },
};

export default api;
