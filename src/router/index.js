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
      redirect: '/applications',
      name: '/',
      component: Applications
    },
    {
      path: '/applications',
      name: '模型列表',
      component: Applications
    },
    {
      path: '/overview',
      name: '意图列表',
      component: OverView
    },
    {
      path: '/trainTest',
      name: '培训测试',
      component: TrainTest
    },
  ]
})
