<template>
  <div class="left-con">
    <h3>{{appInfo.modelname}}</h3>
    <!--<h5>Version:  {{appinfo.version}}</h5>-->
    <hr class="spacer-32-bottom">
    <ul class="path-items">
      <li class="path-li" v-for="item in pathList" @click="handleLink(item)">
        <router-link :class="{'active':item.active}" :to="item.url" tag="a">{{item.text}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MainLayout',
  props: {
    appInfo: {
      type: Object,
      default () {
        return {
          modelname: '默认appname',
          version: '默认版本0.1'
        }
      }
    }
  },
  data () {
    return {
      appname: '',
      version: '0.01',
      pathList: [
        {
          url: '/overview',
          text: '意图',
          active: false
        },
        {
          url: '/entities',
          text: '实体',
          active: false
        },
        {
          url: '/trainTest',
          text: '训练和测试',
          active: false
        }
      ]
    }
  },
  created () {
    let pathname = location.pathname
    for (let i in this.pathList) {
      let node = this.pathList[i]
      if (pathname.indexOf(node.url) > -1) {
        node.active = true
      } else {
        node.active = false
      }
    }
  },
  methods: {
    handleLink (item) {
      let pathname = location.pathname
      if (pathname.indexOf('/overview')) {
        this.$emit('handleLink')
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .left-con{
    .path-items{
      li{
        margin-top: 16px;
        a{
          cursor: pointer;
          color: #656565;
          &:hover{
            color: #000;
          }
        }
        a.active{
          color: #000;
          font-weight: 600;
        }
      }
    }
  }
</style>
