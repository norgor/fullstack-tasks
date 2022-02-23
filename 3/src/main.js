import { createApp } from 'vue'
import App from './App.vue'
import createRouter from './router'
import createStore from './store'

const store = createStore();

createApp(App)
    .use(store)
    .use(createRouter(store))
    .mount('#app')
