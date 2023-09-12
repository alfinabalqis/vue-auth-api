import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios'
import { createRouter, createWebHistory } from 'vue-router'
import DashboardPage from './components/pages/DashboardPage.vue'
import LoginPage from './components/pages/LoginPage.vue'
import RegisterPage from './components/pages/RegisterPage.vue'

axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.interceptors.request.use(function (config) {
  config.headers['X-Binarybox-Api-Key'] = process.env.VUE_APP_API_KEY;
  return config;
});

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: "/", component: LoginPage},
        {path: "/dashboard", component: DashboardPage},
        {path: "/register", component: RegisterPage}
    ]
})

createApp(App).use(router).mount('#app')
