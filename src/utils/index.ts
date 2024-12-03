import { TOKEN } from "@/constants";

export const setLanguage = (data: string) => {
    return window.localStorage.setItem("language", data || "vi");
};
  
export const getLanguage = () => {
    return window.localStorage.getItem("language") || "vi";
};
  
export const getToken = () => {
    const token = JSON.parse(window.sessionStorage.getItem("userInformation"))?.access_token;
    if (!token) {
        clearStorage();
        return undefined;
    }
    return token
};

export const getRefreshToken = () => {
    return JSON.parse(window.sessionStorage.getItem("userInformation"))?.refresh_token;
};

export const clearStorage = async () => {
    (Object.keys(window.sessionStorage) || []).forEach((key) => {
        window.localStorage.removeItem(key);
    });
};

export const setUserInformation = (val: any) => {
    window.sessionStorage.setItem("userInformation", JSON.stringify(val?.data));
};