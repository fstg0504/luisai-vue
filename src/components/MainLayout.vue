<template>
  <div class="left-con">
    <h3>{{appinfo.appname}}</h3>
    <h5>Version:  {{appinfo.version}}</h5>
    <hr class="spacer-32-bottom">
    <ul class="path-items">
      <li class="path-li" v-for="item in pathList">
        <a :href="item.url" :class="{'active':item.active}">{{item.text}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MainLayout',
  props: {
    appinfo: {
      type: Object,
      default: {
        appname: '默认appname',
        version: '默认版本0.1',
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
          text: 'Intents',
          active: false,
        },
        {
          url: '',
          text: 'Entities',
          active: false,
        },
        {
          url: '/trainTest',
          text: 'Train & Test',
          active: false,
        }
      ]
    }
  },
  created () {
    let pathname = location.pathname
    for (let i in this.pathList) {
      let node = this.pathList[i]
      if (node.url == pathname) {
        node.active = true
      } else {
        node.active = false
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
