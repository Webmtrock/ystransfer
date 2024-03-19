import axios from "axios";
import { toast } from "react-toastify";
import { ls } from "../utilitis/SecureLocalStorage";

const createAxios = (baseURL) => {
  const Axios = axios.create({ baseURL });
  Axios.interceptors.response.use(
    async (response) => {
      return response.data;
    },
    async (error) => {
      let originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        // if the error is 401 and hasent already been retried
        originalRequest._retry = true; // now it can be retried
        try {
          const token = ls.get("token");
          Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          return Axios(originalRequest);
        } catch (error) {
          if (error.response.status === 401) {
            // logout dispatch
            toast("Session Expired", {
              type: "info",
              className: "information",
            });
            ls.clear();
          }
        }
      }
      return error.response.data;
    }
  );

  Axios.interceptors.request.use(
    async (config) => {
      const token = ls.get("token");
      if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`,
        };
      }
      return config;
    },
    (error) => {
      return Promise.reject(error.response.data);
    }
  );
  return Axios;
};

const baseUrl = createAxios(process.env.REACT_APP_DB_BASE_URL); //Api Base URL

const http = {
  get: baseUrl.get,
  post: baseUrl.post,
  put: baseUrl.put,
  put: baseUrl.put,
  delete: baseUrl.delete,
};

export default http;


//This WebSite is Developed By Ashish Soni Software Engineer in YellowSquash My Github Account (Ashish8383) 
