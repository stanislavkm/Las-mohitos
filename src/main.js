import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {store} from './vuex/store'
import Axios from 'axios'
// import { ValidationProvider, extend} from 'vee-validate';


// createApp(App).use(router).use(store).mount('#app')
// App.provide('http', Axios)

// App.config.globalProperties.$isModalActive = false;
const app = createApp(App).use(router).use(store);
// app.component('ValidationProvider', ValidationProvider);
app.config.globalProperties.$http = Axios;


const token = localStorage.getItem('token')
if (token) {
    app.config.globalProperties.$http.defaults.headers.common['Authorization'] = token
}
app.mount("#app")


