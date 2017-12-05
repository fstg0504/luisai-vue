<template>
  <div class="main w90" id="main">
    <div class="row" id="main-layout">
      <div class="col-lg-2">
        <main-layout  :appInfo="appInfo"></main-layout>
      </div>
      <div class="col-lg-10">
        <div class="right-con">
          <h2>测试应用程序</h2>
          <p>使用这个工具来测试您的应用程序的当前和发布版本，以检查您是否在正确的轨道上前进。<a >了解更多</a></p>
          <div class="train-list-con">
            <p><button type="button" class="btn btn-primary" @click="trainModel()" :disabled="btnDisabled">测试当前模型</button></p>
            <div class="row">
              <ul class="nav-tabs">
                <li class="active"><span class="">交互式测试</span></li>
                <li class=""><span class="">批量测试（无效）</span></li>
              </ul>
            </div>
            <div class="row filter-con clearfix">
              <div class="form-group checkbox pull-left">
                <label><input type="checkbox" class="form-control" disabled>使出版模式</label>
              </div>
              <div class="form-group pull-right">
                <label>
                  <span class="form-control-static">标签视图</span>
                  <select class="form-control">
                    <option v-for="item in tagViews">{{item}}</option>
                  </select>
                </label>
              </div>
            </div>
            <div class="row clearfix">
              <div class="train-txt-con train-txt-left pull-left">
                <div class="from-group">
                  <input v-model="inputChat" type="text" class="form-control">
                  <i @click="addChat()" class="fa fa-arrow-right" aria-hidden="true"></i>
                </div>
                <div class="chat-items-wrapper">
                  <div v-for="(item,index) in chatList" class="chat-item-wrapper" :class="{'selected':index==0}" v-cloak>
                    <span class="token-word" :id="item.id" @click="resultsShowById(item)">{{item.sentence}}</span>
                  </div>
                </div>
              </div>
              <div class="train-txt-con train-txt-right pull-right">
                <div class="results-wrapper" :class="{'active':resultsShow}">
                  <div class="results-response-wrapper">
                    <template v-if="resultsLoading">
                      <div class="loading-con">
                        <p class="loading-img"></p>
                      </div>
                    </template>
                    <template v-if="resultsShow">
                      <h4 class="">当前版本的结果</h4>
                      <div class="main-intent">
                        <h5 class="">得分最高的意图</h5>
                        <h4><span class="intent-name">None </span><span >(0.73)</span></h4>
                      </div>
                      <div class="">
                        <h5 class="win-color-fg-secondary">其他的意图</h5>
                        <ul class="other-intent-list">
                          <li >询问火车票 (0)</li><li >寻找歌单 (0)</li>
                        </ul>
                      </div>
                      <hr class="solid-hr">
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainLayout from '@/components/MainLayout'

export default {
  name: 'TrainTest',
  data () {
    return {
      appInfo: {},
      modelId: null,
      tagViews: ['测试1', '测试2', '测试2'],
      chatList: [],
      inputChat: '',
      resultsShow: false,
      resultsLoading: false,
      results: {},
      btnDisabled: false
    }
  },
  created: function () {
    let appInfo = JSON.parse(sessionStorage.getItem('appInfo'))
    this.appInfo = appInfo
    this.modelId = appInfo.id
  },
  mounted: function () {
  },
  components: {
    'main-layout': MainLayout
  },
  methods: {
    addChat () {
      if (this.inputChat === '' || this.inputChat === undefined) {
        return false
      }
      this.resultsLoading = true
      this.resultsShow = false
      let addobj = {
        modelId: this.modelId,
        sentence: this.inputChat
      }
      this.inputChat = ''
      this.$http.post('/predictModel', addobj).then(response => {
        if (response.data.result === '1') {
          this.resultsLoading = false
          this.resultsShow = true
        } else {
          this.resultsLoading = false
          alert(response.data.result)
        }
      }, response => {
        console.log('失败：' + response)
      })
      addobj.id = new Date().getTime()
      this.chatList.unshift(addobj)
    },
    trainModel () {
      const opt = {
        modelId: this.modelId
      }
      this.$http.post('/trainModel', opt).then(response => {
        console.log(response)
        if (response.data.result === '1') {
          this.btnDisabled = true
        } else {
          this.btnDisabled = false
        }
      }, response => {
        console.log('失败：' + response)
      })
    },
    resultsShowById (item) {

    }
  },
  watch: {
    chatList (value) {
      value[0].newItem = true
    }
  }
}
</script>

<style lang = "less" scoped>
  .main{
    width: 90%;margin: 0 auto;
    padding-bottom: 30px;
  }
  .right-con{
    width: 90%;margin: 0 auto 0 0;
    .row{
      padding: 0; margin: 0;
    }
    .btn-con{
      .btn{
        margin-right: 10px;
        padding: 0 10px;
        height: 36px;
        background-color: #ffb900;
        text-align: center;
        border-style: solid;
        border-width: 1px;
        border-color: transparent;
        &:hover{
          border-color:#004b50;
        }
      }
    }
    .train-list-con{
      .nav-tabs{
        li{
          float: left;
          margin:0 10px 20px 0;
          color: rgba(0,0,0,0.6);
          font-size:20px;
          line-height: 48px;
          font-weight: 300;
          span{cursor: pointer;}
        }
        li.active{color: rgba(0,0,0,1);}
        li.active span {
          color: #000;
        }
      }
      .filter-con{
        .checkbox{
          margin: 0;
          .form-control{width: auto;height: auto;}
        }
      }
      .train-txt-con{

      }
      .train-txt-con{
        padding: 0;margin: 0;
        width: 49%;
        height: 400px;
      }
      .train-txt-left{
        border: 1px solid #d2d2d2;
        .from-group{
          position: relative;
          height: 40px;
          input{
            border: 0;
            border-radius: 0;
            border-top:transparent;
            border-bottom: 1px solid #d2d2d2;
          }
          i{
            font-size: 20px;cursor: pointer;
            position: absolute;right: 10px;top: 7px;
            &:hover{color: #006cd8;}
          }
        }
        .chat-items-wrapper{
          .chat-item-wrapper{
            width: 96%;margin: 0 auto;
            position: relative;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 0.125rem;
            margin-bottom: 0.4rem;
            background-color: #f2f2f2;
            &:hover{
              background-color: #d2d2d2;
            }
          }
          .chat-item-wrapper.selected{
            background-color: #d2d2d2;
            :after{
              content: ' ';
              position: absolute;
              top: 0.7rem;
              right: -0.7rem;
              width: 0;
              height: 0;
              border: 0.4rem solid;
              border-color: transparent;
              border-left-color: #ffb900;
              box-sizing: border-box;
            }
          }
        }
      }
      .train-txt-right{
        padding-left: 0.25rem;
        .results-wrapper{
          display: table;
          width: 100%;
          height: 400px;
          padding: 1rem 2rem;
          border: 1px solid #d2d2d2;
          border-left: 0;
          background-color: #f2f2f2;
          position:relative;
          .results-response-wrapper{
            .loading-con{
              width: 100%;text-align: center;position: relative;
              .loading-img{
                width: 32px;height: 32px;
                margin: 50px auto 0;
                background:url("/src/assets/images/loading_pre.gif") no-repeat center;
                background-size: 100%;
              }
            }
            .solid-hr{
              border-top: 1px solid black;
            }
          }
        }
        .results-wrapper:before{
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 8px;
          background-color: #d2d2d2;
        }
        .results-wrapper.active:before{
          background-color: #ffb900;
        }

      }
    }
  }
  @keyframes circulation-rotate {
    from {
      -webkit-transform:rotate(0deg);
      transform:rotate(0deg);
    }
    to {
      -webkit-transform:rotate(360deg);
      transform:rotate(360deg);
    }
  }
  @-webkit-keyframes circulation-rotate {
    from {
      -webkit-transform:rotate(0deg);
      transform:rotate(0deg);
    }
    to {
      -webkit-transform:rotate(360deg);
      transform:rotate(360deg);
    }
  }
</style>
