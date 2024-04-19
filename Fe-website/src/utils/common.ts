const STR_UPPER_CASE = (str: string) => {
    return str.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
};

const FLATTEN_OBJ = (obj: any) => {
    let result = {};
    for (const i in obj) {
        if ((typeof obj[i]) === 'object' && !Array.isArray(obj[i])) {
            const temp = FLATTEN_OBJ(obj[i]);
            for (const j in temp) {
 
                // Store temp in result
                result[j] = temp[j];
            }
        }
 
        else {
            result[i] = obj[i];
        }
    }
    return result;
}

export { STR_UPPER_CASE, FLATTEN_OBJ };