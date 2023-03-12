import Vue from 'vue'
import App from './App.vue';
import ElementUI from 'element-ui';
import router from './router';
import 'element-ui/lib/theme-chalk/index.css';
import * as echarts from 'echarts'

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
Vue.use(ElementUI);
let vue = new Vue({
    router,
    render:h => h(App)
}).$mount('#app')

export default vue;
