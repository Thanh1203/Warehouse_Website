import { translate } from "@/languages/i18n";
import { faAddressBook, faBoxesStacked, faChartColumn, faChartLine, faCoins, faDiagramProject, faDownload, faHome, faIndustry, faInfo, faServer, faShareNodes, faUpload, faUsers, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { h } from "vue";

const menuAdmin = [
    {
        key: 'DASHBOARD',
        label: translate("Dashboard"),
        icon: () => h(FontAwesomeIcon, { icon: faHome }),
    },
    {
        key: 'REPORT',
        label: translate("StatisticsReports"),
        type: "group",
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
        key: 'PERSONNELCTN',
        label: translate("Personnel"),
        type: "group",
        icon: null,
        children: [
            {
                key: 'PERSONNEL',
                label: translate("Personnel"),
                icon: () => h(FontAwesomeIcon, { icon: faUsers }),
            },
        ]
    },
    {
        key: 'WAREHOUSE',
        label: translate("Warehouse"),
        type: "group",
        icon: null,
        children: [
            {
                key: "WAREHOUSECONFIGURATION",
                label: translate("WarehouseConfiguration"),
                icon: () => h(FontAwesomeIcon, { icon: faWarehouse }),

            },
        ]
    },
    {
        key: 'PRODUCTS',
        label: translate("Products"),
        type: "group",
        icon: null,
        children: [
            {
                key: 'PRODUCTSCTN',
                label: translate("Products"),
                icon: () => h(FontAwesomeIcon, { icon: faBoxesStacked }),
                children: [
                    {
                        key: 'PRODUCTPRODUCER',
                        label: translate('Producer'),
                        icon: () => h(FontAwesomeIcon, {icon: faIndustry })
                    },
                    {
                        key: 'PRODUCTCATEGORY',
                        label: translate("ProductCategory"),
                        icon: () => h(FontAwesomeIcon, { icon: faDiagramProject }),
                    },
                    {
                        key: 'PRODUCTCLASSIFY',
                        label: translate('ProductClassify'),
                        icon: () => h(FontAwesomeIcon, { icon: faShareNodes }),
                    },
                    {
                        key: 'PRODUCTINFORMATION',
                        label: translate("ProductInformation"),
                        icon: () => h(FontAwesomeIcon, { icon: faInfo }),
                    },
                ]
            },
            {
                key: "PRICECONFIG",
                label: translate('PriceConfiguration'),
                icon: () => h(FontAwesomeIcon, { icon: faCoins}),
            },
        ]
    },
    {
        key: 'LOGISTICS',
        label: translate("ImportAndExport"),
        type: "group",
        icon: null,
        children: [
            {
                key: 'IMPORTEXPORT',
                label: translate(''),
                icon: () => h(FontAwesomeIcon, { icon: faServer }),
                children: [
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
        ]
    }

];

export { menuAdmin };