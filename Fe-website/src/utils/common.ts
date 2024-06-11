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

export const getArrayRandColor = (numOfColor) => {
  const availableColors = ['#C9CBCF', '#FFCD56', '#9966FF', '#FF9F40', '#4BC0C0', '#FF6384', '#36A2EB'];
  let colors = [];

  for (let i = 0; i < numOfColor; i++) {
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    const selectedColor = availableColors.splice(randomIndex, 1)[0]; // Lấy màu ngẫu nhiên và loại bỏ khỏi mảng
    colors.push(selectedColor);
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

export const setTextColor = (value: number) => {
  if (value <= 25) {
    return "tw-text-[#FF0000]";
  } else if (value > 25 && value <=50) {
    return "tw-text-[#FFA500]";
  } else if (value > 50 && value <= 75) {
    return "tw-text-[#FFFF00]";
  } else {
    return "tw-text-[#29fe1d]";
  }
}

export const setBgColorChart = (value: number) => {
  if (value <= 25) {
    return "tw-bg-[#FF0000]";
  } else if (value > 25 && value <=50) {
    return "tw-bg-[#FFA500]";
  } else if (value > 50 && value <= 75) {
    return "tw-bg-[#FFFF00]";
  } else {
    return "tw-bg-[#07e500]";
  }
}
