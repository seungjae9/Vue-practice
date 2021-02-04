import { createApp } from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// eslint-disable-next-line no-undef
Vue.use(BootstrapVue)
// eslint-disable-next-line no-undef
Vue.use(IconsPlugin)


createApp(App).mount('#app')

