const STR_UPPER_CASE = (str: string) => {
    return str.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
};

export { STR_UPPER_CASE };