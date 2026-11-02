import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './styles/tokens.css'
import './styles/base.css'
import './styles/components.css'

// apexcharts is imported by the Lab pages that use it, so it loads only there.
const app = createApp(App)

app.use(router)

app.mount('#app')
