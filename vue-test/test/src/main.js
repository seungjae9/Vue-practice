import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// eslint-disable-next-line no-undef
Vue.use(BootstrapVue)
// eslint-disable-next-line no-undef
Vue.use(IconsPlugin)


Vue.config.productionTip = false
new Vue({
    router, 
    render: h => h(App),
}).$mont('#app')

