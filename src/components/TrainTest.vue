<template>
  <div class="main w90" id="main">
    <div class="row" id="main-layout">
      <div class="col-lg-2">
        <main-layout ></main-layout>
      </div>
      <div class="col-lg-10">
        <div class="right-con">
          <h2>Test your application</h2>
          <p>Use this tool to test the current and published versions of your application, to check if you are progressing on the right track ... <a >Learn more</a></p>
          <div class="train-list-con">
            <div class="row">
              <ul class="nav-tabs">
                <li class="active"><span class="">Interactive Testing</span></li>
                <li class=""><span class="">Batch Testing</span></li>
              </ul>
            </div>
            <div class="row filter-con clearfix">
              <div class="form-group checkbox pull-left">
                <label><input type="checkbox" class="form-control" disabled>Enable published model</label>
              </div>
              <div class="form-group pull-right">
                <label>
                  <span class=".form-control-static">Labels view (Ctrl+E)</span>
                  <select class="">
                    <option>111111</option>
                    <option>111111</option>
                    <option>111111</option>
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
                    <span class="token-word" :id="item.id">{{item.quiz}}</span>
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
                      <h4 class="">Current version results</h4>
                      <div class="main-intent">
                        <h5 class="">Top scoring intent</h5>
                        <h4><span class="intent-name">None </span><span >(0.73)</span></h4>
                      </div>
                      <div class="">
                        <h5 class="win-color-fg-secondary">Other intents</h5>
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
import $ from 'jquery'
import MainLayout from '@/components/MainLayout'

let chatList = [
  {
    id: '1',
    quiz: '提问1',
    answer: '回答1',
  },
  {
    id: '1',
    quiz: '提问1',
    answer: '回答1',
  },
  {
    id: '1',
    quiz: '提问1',
    answer: '回答1',
  },
]
export default {
  name: 'TrainTest',
  data () {
    return {
      chatList: [],
      inputChat: '',
      resultsShow: false,
      resultsLoading: false,
      results: {}
    }
  },
  created: function () {
    // this.chatList = chatList
  },
  mounted: function () {
  },
  components: {
    'main-layout': MainLayout
  },
  methods: {
    addChat () {
      if (this.inputChat == '' || this.inputChat == undefined) {
        return false
      }
      this.resultsLoading = true
      this.resultsShow = false
      let addobj = {
        id: this.chatList.length + 1,
        quiz: this.inputChat
      }
      this.chatList.unshift(addobj)
      this.inputChat = ''
      setTimeout(() => {
        this.resultsLoading = false
        this.resultsShow = true
      }, 1000)
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
