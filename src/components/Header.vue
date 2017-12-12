<template>
  <header class="">
    <!--<div class="panel">-->
      <!--<div class="panel-body">-->
        <!--<a class="">link11</a>-->
        <!--<a class="">link22</a>-->
        <!--<a class="">link33</a>-->
      <!--</div>-->
    <!--</div>-->
    <div class="nav header-nav">
        <el-menu
          :default-active="activeIndex"
          class="el-menu"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1">
            <router-link to="/" tag="a">我的应用</router-link>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">文档</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-submenu>
          <el-menu-item index="3"><a>其他</a></el-menu-item>
        </el-menu>

    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      activeIndex: '1',
      router: true
    }
  },
  methods: {
    handleSelect (key, keyPath) {
    }
  }
}
</script>

<style lang="less" scoped>
</style>
