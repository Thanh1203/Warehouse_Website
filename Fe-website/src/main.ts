
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'
// antd
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

// icon font awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faR } from "@fortawesome/free-solid-svg-icons";
// style
import "./assets/styles/tailwind.css";
import "./style.scss";
// languages
import { i18n } from './languages/i18n';
import { useI18n } from 'vue-i18n';
// day week month
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localeData from "dayjs/plugin/localeData";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { far } from '@fortawesome/free-regular-svg-icons';

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("en");
dayjs.locale("vi");

library.add(faUserSecret);
library.add(fas);
library.add(far);
// createApp
const app = createApp(App, {
    setup() {
      const { t } = useI18n();
      return { t };
    },
  });

app.component('font-awesome-icon', FontAwesomeIcon);
// use
app.use(router);
app.use(i18n);
app.use(Antd);
//mount
app.mount('#app');