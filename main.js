import Vue from 'vue'
import App from './App'
import dicts from './libs/dict.js'
import utils from './libs/util.js'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

Vue.use(dicts)
Vue.use(utils)