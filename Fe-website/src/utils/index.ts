import { TOKEN } from "@/constants";

export const setLanguage = (data: string) => {
    return window.localStorage.setItem("language", data || "vi");
};
  
export const getLanguage = () => {
    return window.localStorage.getItem("language") || "vi";
};
  
export const getToken = () => {
    const token = window.sessionStorage.getItem("token");
    if (!token) {
        clearStorage();
        return undefined;
    }
    return token
};

export const clearStorage = async () => {
    (Object.keys(window.sessionStorage) || []).forEach((key) => {
        window.localStorage.removeItem(key);
    });
};

export const setAdminSession = (data: any) => {
    window.sessionStorage.setItem("token", data?.token);
    const dataAdmin = {
        companyId: data?.companyId,
        name: data?.name,
        email: data?.email,
        phoneNumber: data?.phoneNumber,
    };
    const dataAdminJson = JSON.stringify(dataAdmin);
    window.sessionStorage.setItem("adminInfo", dataAdminJson);
};