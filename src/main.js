import Vue from 'vue'
import App from './App.vue'
import VueCodeMirror from 'vue-codemirror'
import httpVueLoader from 'http-vue-loader'
import 'view-design/dist/styles/iview.css';
import 'codemirror/lib/codemirror.css'
Vue.use(VueCodeMirror)
Vue.use(httpVueLoader);
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')