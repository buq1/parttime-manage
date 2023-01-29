import Vue, { createApp } from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';

Vue.config.productionTip = false

new Vue({
    el:'#app',
    router,
    render:h => h(App)
}).$mount('#app')
