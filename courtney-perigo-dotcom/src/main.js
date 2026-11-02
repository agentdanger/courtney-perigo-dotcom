import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueApexCharts from 'vue3-apexcharts'

import './styles/tokens.css'
import './styles/base.css'
import './styles/components.css'

const app = createApp(App)

app.use(router)
// Global registration keeps the Lab pages working until step 5 moves
// apexcharts into per-page lazy imports.
app.use(VueApexCharts)

app.mount('#app')
