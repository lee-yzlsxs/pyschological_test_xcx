import Vue from 'vue'
import App from './App'
import dicts from './libs/dict.js'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

Vue.use(dicts)