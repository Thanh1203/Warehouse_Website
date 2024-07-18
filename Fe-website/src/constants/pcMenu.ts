import { translate } from "@/languages/i18n";
import { faAddressBook, faBoxesStacked, faChartLine, faChartSimple, faCoins, faDiagramProject, faDownload, faHome, faIndustry, faInfo, faServer, faShareNodes, faUpload, faUsers, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { h } from "vue";

const menuAdmin = [
    {
        key: 'DASHBOARD',
        label: translate("Dashboard"),
        icon: h(FontAwesomeIcon, {icon: faHome })
    },
    {
        label: translate("StatisticsReports"),
        type: "group",
        children: [
            {
                key: 'CUSTOMERREPORT',
                label: translate("reportCustomer.title"),
                icon: h(FontAwesomeIcon, {icon: faAddressBook })
            },
            {
                key: 'PRODUCTSREPORT',
                label: translate("reportProduct.title"),
                icon: h(FontAwesomeIcon, {icon: faChartSimple })
            },
            {
                key: 'SALESREPORT',
                label: translate("reportSale.title"),
                icon: h(FontAwesomeIcon, {icon: faChartLine })
            }
        ]
    },
    {        
        label: translate("Personnel"),
        type: "group",
        icon: null,
        children: [
            {
                key: 'PERSONNEL',
                label: translate("Personnel"),
                icon: h(FontAwesomeIcon, {icon: faUsers })
            },
        ]
    },
    {
        label: translate("warehouse.title"),
        type: "group",
        icon: null,
        children: [
            {
                key: "WAREHOUSE",
                icon: h(FontAwesomeIcon, { icon: faWarehouse }),
                children: [
                    {
                        key: 'WAREHOUSEINFO',
                        label: translate('warehouse.infor'),
                    },
                    {
                        key: "WAREHOUSEINVEN",
                        label: translate('warehouse.inventory'),
                    },
                    {
                        key: "WAREHOUSEIMPORT",
                        label: translate('warehouse.import'),
                    },
                    {
                        key: "WAREHOUSEEXPORT",
                        label: translate('warehouse.export'),
                    },
                    {
                        key: "WAREHOUSETRANS",
                        label: translate('warehouse.transfer'),
                    }
                ]
            },
        ]
    },
    {
        label: translate("product.title"),
        type: "group",
        icon: null,
        children: [
            {
                key: "PRODUCT",
                icon: h(FontAwesomeIcon, { icon: faBoxesStacked }),
                children: [
                    {
                        key: 'PRODUCTPRODUCER',
                        label: translate('Producer'),
                        icon: h(FontAwesomeIcon, {icon: faIndustry })
                    },
                    {
                        key: 'PRODUCTCATEGORY',
                        label: translate("ProductCategory"),
                        icon: h(FontAwesomeIcon, { icon: faDiagramProject }),
                    },
                    {
                        key: 'PRODUCTCLASSIFY',
                        label: translate('ProductClassify'),
                        icon: h(FontAwesomeIcon, { icon: faShareNodes }),
                    },
                    {
                        key: 'PRODUCTINFORMATION',
                        label: translate("ProductInformation"),
                        icon: h(FontAwesomeIcon, { icon: faInfo }),
                    },
                ]
            },
            {
                key: "PRICECONFIG",
                label: translate('PriceConfiguration'),
                icon: h(FontAwesomeIcon, { icon: faCoins }),
            },
        ]
    },
];

export { menuAdmin };