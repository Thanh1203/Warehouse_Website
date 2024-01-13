
import { createApp } from 'vue';
import App from './App.vue';
// import router from './router'

// ant design
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
// icon font awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
// style
import "./assets/styles/tailwind.css";
import "./style.scss";
// languages
import { i18n } from './languages/i18n';
import { useI18n } from 'vue-i18n';
// day week month
import dayjs from 'dayjs';


library.add(faUserSecret);
// createApp
const app = createApp(App, {
    setup() {
      const { t } = useI18n();
      return { t };
    },
  });

app.component('font-awesome-icon', FontAwesomeIcon);
// use
// app.use(router);
app.use(Antd);
app.use(i18n);
//mount
app.mount('#app');