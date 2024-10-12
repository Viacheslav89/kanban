// import './assets/main.scss'
import { createRouter, createWebHistory } from 'vue-router';
import { createApp } from 'vue'

import App from './App.vue'


const router = createRouter({
    history: createWebHistory(),
    routes: [
     {
        name: 'Kanban',
        path: '/kanban/',
        component: () => import ('./components/AppBoard.vue'),
    },
    {
        name: 'Weather',
        path: '/kanban/weather/',
        component: import ('./components/AppWeather.vue'),
    }
]
}) 




createApp(App)
.use(router)
.mount('#app')

