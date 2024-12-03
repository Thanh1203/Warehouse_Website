import { getRefreshToken, getToken, setUserInformation } from "@/utils";
import axios from "axios";
import ConstantAPI from "./ConstantAPI";

const httpClient = axios.create({
  baseURL: "http://localhost:1203",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  },
});

httpClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return error;
  },
);

httpClient.interceptors.response.use(
  (response) => {
    // Trả về toàn bộ response để có thể truy cập status, headers và data
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await httpClient.post(`${ConstantAPI.login.REFRESH_TOKEN.url}`,{
          refresh_token: getRefreshToken()
        })
        // Update tokens in storage
        setUserInformation(response);
        originalRequest.headers.Authorization = `Bearer ${getToken()}`;
        // Retry original request
        return httpClient(originalRequest);
      } catch (error) {
        // If refresh token fails, logout user
        sessionStorage.clear();
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }
    return error.response;
  },
);

class DataService {
  static callApi(api: any, data?: any, params?: any, headers?: any) {
    return httpClient({
      method: api.method,
      url: api.url,
      data,
      params,
      headers,
    });
  }

  static get(path = "", params?: any, headers?: any) {
    return httpClient.get(path, { headers, params });
  }

  static post(path = "", data = {}, headers: any) {
    return httpClient.post(path, data, { headers });
  }

  static patch(path = "", data = {}, headers: any) {
    return httpClient.patch(path, data, { headers });
  }

  static delete(path = "", data: any, headers: any) {
    return httpClient.delete(path, { headers: headers, data: data });
  }

  static put(path = "", data = {}, headers: any) {
    return httpClient.put(path, data, { headers });
  }
}

export { DataService };
