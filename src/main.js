// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'
import VueResource from 'vue-resource'

//npm install material-design-icons-iconfont -D
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import ActivityIdea from '@/components/ActivityIdea' 

//import ActivityIdea from '@/components/ActivityIdea'

Vue.use(VueAxios, axios, VueResource)
Vue.use(Vuetify)
Vue.use(ActivityIdea)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { ActivityIdea },
  template: '<ActivityIdea/>'
})
