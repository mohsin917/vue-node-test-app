import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'
// import DocsExample from '@/components/DocsExample'
import VueBasicAlert from 'vue-basic-alert';

const app = createApp(App)
console.log(router)
app.use(store)
app.use(router)
app.use(CoreuiVue)
app.provide('icons', icons)
app.component('CIcon', CIcon)
app.component('VueBasicAlert', VueBasicAlert)
// app.component('DocsExample', DocsExample)

app.mount('#app')
