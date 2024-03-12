import { translate } from "@/languages/i18n";
import { faProductHunt } from "@fortawesome/free-brands-svg-icons";
import { faAddressBook, faChartColumn, faChartLine, faChartPie, faChartSimple, faDatabase, faDownload, faGear, faGears, faIndustry, faInfo, faRightToBracket, faUpload, faUsers, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { h } from "vue";

const menuAdmin = [
    {
        key: 'DASHBOARD',
        label: translate("Dashboard"),
        icon: () => h(FontAwesomeIcon, { icon: faChartSimple }),
    },
    {
        key: 'REPORT',
        label: translate("StatisticsReports"),
        icon: () => h(FontAwesomeIcon, { icon: faChartPie }),
        children: [
            {
                key: 'CUSTOMERREPORT',
                label: translate("CustomerReport"),
                icon: () => h(FontAwesomeIcon, { icon: faAddressBook }),
            },
            {
                key: 'PRODUCTSREPORT',
                label: translate("ProductReport"),
                icon: () => h(FontAwesomeIcon, { icon: faChartLine }),
            },
            {
                key: 'SALESREPORT',
                label: translate("SalesReport"),
                icon: () => h(FontAwesomeIcon, { icon: faChartColumn }),

            }
        ]
    },
    {
        key: 'PERSONNEL',
        label: translate("Personnel"),
        icon: () => h(FontAwesomeIcon, { icon: faUsers }),
    },
    {
        key: 'WAREHOUSE',
        label: translate("Warehouse"),
        icon: () => h(FontAwesomeIcon, { icon: faWarehouse }),
        children: [
            {
                key: "WAREHOUSECONFIGURATION",
                label: translate("WarehouseConfiguration"),
                icon: () => h(FontAwesomeIcon, { icon: faGears }),
            },
            {
                key: "ENTERWAREHOUSE",
                label: translate("EnterWarehouse"),
                icon: () => h(FontAwesomeIcon, { icon: faDownload }),
            },
            {
                key: "EXPORTWAREHOUSE",
                label: translate("ExportWarehouse"),
                icon: () => h(FontAwesomeIcon, { icon: faUpload }),
            }
        ]
    },
    {
        key: 'PRODUCTS',
        label: translate("Products"),
        icon: () => h(FontAwesomeIcon, { icon: faProductHunt }),
        children: [
            {
                key: 'PRODUCTPRODUCER',
                label: translate('Producer'),
                icon: () => h(FontAwesomeIcon, {icon: faIndustry })
            },
            {
                key: 'PRODUCTCATEGORY',
                label: translate("ProductCategory"),
                icon: () => h(FontAwesomeIcon, { icon: faDatabase }),
            },
            {
                key: 'PRODUCTCLASSIFY',
                label: translate('ProductClassify'),
                icon: () => h(FontAwesomeIcon, { icon: faInfo }),
            },
            {
                key: 'PRODUCTINFORMATION',
                label: translate("ProductInformation"),
                icon: () => h(FontAwesomeIcon, { icon: faInfo }),
            },
        ]
    },
];

export { menuAdmin };