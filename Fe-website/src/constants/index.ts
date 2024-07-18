export const DEFAULT_MIN_LENGTH = 1;
export const DEFAULT_MAX_LENGTH = 256;
export const REGEX_TEL = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
export const REGEX_POSITIVE_INTERGER = /^[1-9]\d*$/;
export const TOKEN = "token";

export const PC_MENU = [
  {
    key: "DASHBOARD",
    path: "/",
  },
  {
    key: "CUSTOMERREPORT",
    path: "/customer-report",
  },
  {
    key: "PRODUCTSREPORT",
    path: "/product-report",
  },
  {
    key: "SALESREPORT",
    path: "/sale-report",
  },
  {
    key: "PERSONNEL",
    path: "/personnal",
  },
  {
    key: "PRODUCTCATEGORY",
    path: "/product-category",
  },
  {
    key: "PRODUCTINFORMATION",
    path: "/product-information",
  },
  {
    key: "WAREHOUSEINFO",
    path: "/warehouse-information",
  },
  {
    key: "WAREHOUSEIMPORT",
    path: "/warehouse-import",
  },
  {
    key: "WAREHOUSEEXPORT",
    path: "/warehouse-export",
  },
  {
    key: "PRODUCTCLASSIFY",
    path: "/product-classify",
  },
  {
    key: "PRODUCTPRODUCER",
    path: "/product-producer",
  },
  {
    key: "PRICECONFIG",
    path: "/price-configuration"
  },
  {
    key: "WAREHOUSEINVEN",
    path: "/warehouse-inventory"
  },
  {
    key: "WAREHOUSETRANS",
    path: "/warehouse-transfer"
  }
];

export const DEFAULT_PROPERTY = {
  Color: "Color", // màu sắc
  Material: "Material", // chất liệu
  Weight: "Weight", // trọng lượng
  Size: "Size", // kích thước
  Classify: "Classify", // phân loại
  ConnectionTypes: "ConnectionTypes", // kiểu kết nối
  Producer: "Producer", // hãng sản xuất
  Designs: "Designs", // Thiết kế
};

export const MONTH_IN_YEAR = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const PURCHASETIMES = ["OneTime", "TwoTime", "ThreeOrMore"];

export const DAY_IN_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];