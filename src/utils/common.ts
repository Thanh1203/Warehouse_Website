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
  const availableColors = ['#36A2EB', '#FF6384', '#4BC0C0', '#FF9F40', '#9966FF', '#FFCD56'];
  let colors = [];

  for (let i = 0; i < numOfColor; i++) {
    colors.push(availableColors[i % availableColors.length]);
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
    return "text-[#FF0000]";
  } else if (value > 25 && value <=50) {
    return "text-[#FFA500]";
  } else if (value > 50 && value <= 75) {
    return "text-[#FFFF00]";
  } else {
    return "text-[#29fe1d]";
  }
}

export const setBgColor = (value: number) => {
  if (value <= 25) {
    return "bg-[#FF0000]";
  } else if (value > 25 && value <= 50) {
    return "bg-[#FFA500]";
  } else if (value > 50 && value <= 75) {
    return "bg-[#FFFF00]";
  } else {
    return "bg-[#07e500]";
  }
}

export const setBgColorChart = (value: number) => {
  if (value <= 25) {
    return "#FF0000";
  } else if (value > 25 && value <=50) {
    return "#FFA500";
  } else if (value > 50 && value <= 75) {
    return "#FFFF00";
  } else {
    return "#07e500";
  }
}

export const setOrdinalNum = (val: number) => {
  const j = val % 10, k = val % 100;
  if (j == 1 && k != 11) {
    return val + "st";
  }
  if (j == 2 && k != 12) {
      return val + "nd";
  }
  if (j == 3 && k != 13) {
      return val + "rd";
  }
  return val + "th";
}

export const getEmptyProperties = (obj: object) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (
      value === null || 
      value === undefined || 
      value === '' || 
      value === 0 || 
      (Array.isArray(value) && value.length === 0)
    ) {
      acc.push(key);
    }
    return acc;
  }, []);
}