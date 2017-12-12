import Vue from 'vue'
import Router from 'vue-router'
import Applications from '@/components/Applications'
import Intents from '@/components/Intents'
import TrainTest from '@/components/TrainTest'
import Entities from '@/components/Entities'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: '/ssm/', // 服务器的虚拟目录
  routes: [
    {
      path: '/',
      redirect: '/applications',
      name: '模型列表',
      component: Applications
    },
    {
      path: '/applications',
      name: '模型列表',
      component: Applications
    },
    {
      path: '/intents',
      name: '意图列表',
      component: Intents
    },
    {
      path: '/entities',
      name: '实体列表',
      component: Entities
    },
    {
      path: '/trainTest',
      name: '培训测试',
      component: TrainTest
    },
    { path: '*', redirect: '/' }
  ]
})
