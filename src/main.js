import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2';
import VueSimpleContextMenu from 'vue-simple-context-menu'




Vue.component('vue-simple-context-menu', VueSimpleContextMenu)
Vue.use(VueSweetalert2);
Vue.use(BootstrapVue)


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/nprogress.css'
import 'jspdf-autotable'

Vue.config.productionTip = true

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
