import { translate } from "@/languages/i18n";
import { faProductHunt } from "@fortawesome/free-brands-svg-icons";
import { faChartColumn, faChartLine, faChartPie, faChartSimple, faDatabase, faInfo, faUsers, faWarehouse } from "@fortawesome/free-solid-svg-icons";
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
                icon: () => h(FontAwesomeIcon, { icon: faChartLine }),
            },
            {
                key: 'PRODUCTSREPORT',
                label: translate("ProductReport"),
                icon: () => h(FontAwesomeIcon, { icon: faChartColumn }),
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
        key: 'WAREHOSE',
        label: translate("Warehouse"),
        icon: () => h(FontAwesomeIcon, { icon: faWarehouse }),
    },
    {
        key: 'PRODUCTS',
        label: translate("Products"),
        icon: () => h(FontAwesomeIcon, { icon: faProductHunt }),
        children: [
            {
                key: 'PRODUCTCATEGORY',
                label: translate("ProductCategory"),
                icon: () => h(FontAwesomeIcon, { icon: faDatabase }),
            },
            {
                key: 'PRODUCTINFORMATION',
                label: translate("ProductInformation"),
                icon: () => h(FontAwesomeIcon, { icon: faInfo }),
            }
        ]
    },
];



export { menuAdmin };