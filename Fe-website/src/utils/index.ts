export const setLanguage = (data: string) => {
    return window.localStorage.setItem("language", data || "vi");
};
  
export const getLanguage = () => {
return window.localStorage.getItem("language") || "vi";
};
  