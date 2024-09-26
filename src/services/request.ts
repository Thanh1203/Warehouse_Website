import axios from "axios";

const httpClient = axios.create({
    baseURL: "https://localhost:7281",
    headers: {
        "Content-Type": "application/json",
    }

})

httpClient.interceptors.response.use((response) => response.data);
class DataService {
    static callApi(api: any, data?: any, params?: any, headers?: any) {
        return httpClient({
            method: api.method,
            url: api.url,
            data,
            params,
            headers,
        })
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

export {DataService}