
import { createApp } from 'vue'
import App from './App.vue'
// import router from './router'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

import "./assets/styles/tailwind.css"
import "./style.scss"

library.add(faUserSecret);
const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);
// app.use(router);
app.use(Antd);
app.mount('#app');
