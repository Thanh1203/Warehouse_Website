const STR_UPPER_CASE = (str: string) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const FLATTEN_OBJ = (obj: any) => {
  let result = {};
  for (const i in obj) {
    if (typeof obj[i] === "object" && !Array.isArray(obj[i])) {
      const temp = FLATTEN_OBJ(obj[i]);
      for (const j in temp) {
        // Store temp in result
        result[j] = temp[j];
      }
    } else {
      result[i] = obj[i];
    }
  }
  return result;
};

const removeNullObjects = (obj: any) => {
  return Object.entries(obj).reduce((a, [k, v]) => (v === undefined || v === null || v === "" || (Array.isArray(v) && !v?.length) ? a : ((a[k] = v), a)), {});
};

const checkDeleteItem = (item: any) => {
  if (item.length > 0) {
    if (!item.find((x: any) => x?.allowDelete === false)) {
      return true;
    } else {
      return false;
    }
  } else {
    if (item.allowDelete) {
      return true;
    } else return false;
  }
};

export { STR_UPPER_CASE, FLATTEN_OBJ, removeNullObjects, checkDeleteItem };
