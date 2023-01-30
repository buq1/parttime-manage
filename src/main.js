import Vue, { createApp } from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import router from './router';
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI);
let vue = new Vue({
    el:'#app',
    router,
    render:h => h(App)
}).$mount('#app')

export default vue;
