import Vue from 'vue'
import Router from 'vue-router'
import Applications from '@/components/Applications'
import OverView from '@/components/OverView'
import TrainTest from '@/components/TrainTest'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/ssm/', // 服务器的虚拟目录
  routes: [
    {
      path: '/',
      name: 'Applications',
      component: Applications
    },
    {
      path: '/applications',
      name: 'Applications',
      component: Applications
    },
    {
      path: '/overview',
      name: 'Overview',
      component: OverView
    },
    {
      path: '/trainTest',
      name: 'TrainTest',
      component: TrainTest
    },
  ]
})
