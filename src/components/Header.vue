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
      <div class="nav-item">
        <ul>
          <li class="active"><a href="/applications">我的应用</a></li>
          <li><a href="">文档</a></li>
          <li><a href="">其他</a></li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
  .w100{
    padding: 0;margin: 0;width: 100%;
  }
  .w90{
    width: 90%;
  }
  .panel{padding: 0;margin: 0;}
  .header-nav{
      width: 100%;
      margin: 0 !important;
      background: #004b50;
      height: 71px;
    .nav-item{
      width: 90%;height:100%;margin: 0 auto;
      ul{
        height: 100%;
        padding: 0;
        li{
          float: left;
          width: 100px;
          height: 100%;
          list-style: none;
          display: inline-block;
          padding: 27px 0;
          text-align: center;
          color: white;
          -webkit-transition: background-color 0.2s;
          transition: background-color 0.2s;
          cursor: pointer;
          line-height: 1rem;
          margin: 0;
          background-color: #004b50;
          &:hover {
             background-color: #ffb900;
            a{
              color: #000000;
              font-size: 14px;
              line-height: 1;
              text-decoration: none;
          }
          }
          a{color: #ffffff;}

        }
        li.active{
          background-color: #ffb900;
        }
      }
    }
  }
</style>
