import { translate } from "@/languages/i18n";
import { faAddressBook, faBoxesStacked, faChartColumn, faChartLine, faCoins, faDiagramProject, faDownload, faHome, faIndustry, faInfo, faServer, faShareNodes, faUpload, faUsers, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { h } from "vue";
import iconHome from "@/components/icon-menu/iconHome.vue";
import iconCustomer from "@/components/icon-menu/iconReport/iconCustomer.vue";
import iconProduct from "@/components/icon-menu/iconReport/iconProduct.vue";
import iconRevenue from "@/components/icon-menu/iconReport/iconRevenue.vue";
import iconUsers from "@/components/icon-menu/iconUsers.vue";
import iconWarehouse from "@/components/icon-menu/iconWarehouse.vue";
import iconProductCtn from "@/components/icon-menu/iconProduct/iconProductCtn.vue";
import iconCoin from "@/components/icon-menu/iconProduct/iconCoin.vue";
import iconLogistics from "@/components/icon-menu/iconLogistics/iconLogisticsCtn.vue";

const menuAdmin = [
    {
        key: 'DASHBOARD',
        label: translate("Dashboard"),
        icon: h(iconHome),
    },
    {
        label: translate("StatisticsReports"),
        type: "group",
        children: [
            {
                key: 'CUSTOMERREPORT',
                label: translate("CustomerReport"),
                icon: h(iconCustomer),
            },
            {
                key: 'PRODUCTSREPORT',
                label: translate("ProductReport"),
                icon: h(iconProduct),
            },
            {
                key: 'SALESREPORT',
                label: translate("SalesReport"),
                icon: h(iconRevenue),

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
                icon: h(iconUsers),
            },
        ]
    },
    {
        label: translate("Warehouse"),
        type: "group",
        icon: null,
        children: [
            {
                key: "WAREHOUSECONFIG",
                label: translate("WarehouseConfig"),
                icon: h(iconWarehouse),

            },
        ]
    },
    {
        label: translate("Products"),
        type: "group",
        icon: null,
        children: [
            {
                key: "PRODUCT",
                icon: h(iconProductCtn),
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
                icon: h(iconCoin),
            },
        ]
    },
    {
        label: translate("ImportAndExport"),
        type: "group",
        icon: null,
        children: [
            {
                key: 'LOGISTICS',
                icon: h(iconLogistics),
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