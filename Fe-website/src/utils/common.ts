export const STR_UPPER_CASE = (str: string) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const FLATTEN_OBJ = (obj: any) => {
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

export const removeNullObjects = (obj: any) => {
  return Object.entries(obj).reduce((a, [k, v]) => (v === undefined || v === null || v === "" || (Array.isArray(v) && !v?.length) ? a : ((a[k] = v), a)), {});
};

export const checkDeleteItem = (item: any) => {
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

export const getArrayRandColor = (numOfColor: number) => {
  var colors = [];

  for (var j = 0; j < numOfColor; j++) {
    var red = Math.floor(Math.random() * 150) + 100; // Giới hạn đỏ từ 100 đến 250
    var green = Math.floor(Math.random() * 150) + 100; // Giới hạn xanh lá cây từ 100 đến 250
    var blue = Math.floor(Math.random() * 150) + 100; // Giới hạn xanh lam từ 100 đến 250

    var color = "rgb(" + red + "," + green + "," + blue + ")";
    colors.push(color);
  }

  return colors;
};

export const toUpperFirstLetter = (str) => str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();

export const formatIdProduct = (str: string) => {
  const strSpkit = str.split(" | ");
  return {
    id: strSpkit[0],
    code: strSpkit[1],
  };
};

export const setColor = (value: number) => {
  if (value < 40) {
    return "#dc3545";
  } else if (value >= 40 && value < 80) {
    return "#FAAD14";
  } else {
    return "#52C41B"
  }
}
