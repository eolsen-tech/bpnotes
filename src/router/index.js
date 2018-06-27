import Vue from 'vue'
import Router from 'vue-router'
import ActivityIdea from '@/components/ActivityIdea'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ActivityIdea',
      component: ActivityIdea
    }
  ]
})
