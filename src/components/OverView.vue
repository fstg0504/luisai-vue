<template>
  <div class="main w90" id="main">
    <div class="row">
      <div class="col-lg-2">
        <main-layout :appinfo="appinfo"></main-layout>
      </div>
      <div class="col-lg-10">
        <div class="right-con">
          <template v-if="intentListShow">
            <h2>Intents</h2>
            <p>A listing of intents in the application. Click an intent to view/edit its details, or add a new intent ... <a >Learn more</a></p>
            <div class="btn-con">
              <button class="btn addIntent" data-toggle="modal" data-target="#addIntentModal">Add Intent</button>
              <button class="btn addPrebuilt">Add prebuilt domain intents</button>
            </div>
            <div class="intents-list-con">
              <table class="table table-striped">
                <thead>
                <tr>
                  <th>Intent Name</th>
                  <th>Utterances</th>
                  <th>删除修改</th>
                </tr>
                </thead>
                <tbody>
                <tr v-cloak v-for="(item,index) in intentList" :key="index">
                  <td ><a :id="item.id" @click="utterancesListShow(item)">{{ item.name }}</a></td>
                  <td >{{ item.utterances }}</td>
                  <td class="handle-td">
                    <a class="handle-a"><i class="fa fa-pencil" aria-hidden="true"></i></a>
                    <a class="handle-a"><i class="fa fa-trash" aria-hidden="true"></i></a>
                  </td>
                </tr>
                </tbody>
              </table>
              <div class="modal fade" id="addIntentModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      <h4 class="modal-title">Add Intent</h4>
                    </div>
                    <div class="modal-body">
                      <div class="form-group">
                        <label for="intentName">Intent name (REQUIRED)</label>
                        <input v-model="intentName" type="text" class="form-control" id="intentName" placeholder="Type intent name ...">
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary" @click="add()">保存</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <h2>{{intentNameNow}}</h2>
            <p>Here you are in full control of this intent; you can manage its utterances, used entities and suggested utterances ...<a >Learn more</a></p>
            <div class="utterances-list-con">
              <div class="row">
                <ul class="nav-tabs">
                  <li class="active"><span class="">Utterances</span><span class="num">(1)</span></li>
                  <li class=""><span class="">Entities in use</span></li>
                  <li class=""><span class="">Suggested utterances</span></li>
                </ul>
                <div class="form-group">
                  <input v-model="newUtterance" @keydown="addUtterance($event)" type="text" class="form-control" id="newUtterance" placeholder="输入一个新的话语和按下回车。">
                </div>
                <div class="row tools-header">
                  <ul class="tools-list-ul">
                    <li class="Save" :class="{'disabled':utterancesLiDisabled1}"><a><i  class="fa fa-floppy-o"></i><span >Save</span></a></li>
                    <li class="Discard" :class="{'disabled':utterancesLiDisabled1}"><a><i  class="fa fa-times"></i><span >Discard</span></a></li>
                    <li class="Delete"  :class="{'disabled':utterancesLiDisabled2}"><a><i  class="fa fa-trash"></i><span >Delete</span></a></li>
                    <li class="reassign-li" :class="{'disabled':utterancesLiDisabled2}">
                      <a @click="reassign_ul=!reassign_ul"><span>Reassign Intent</span><i class="fa fa-arrow-down" aria-hidden="true"></i></a>
                      <ul class="select-ul" v-if="reassign_ul">
                        <li v-for="(item,index) in reassignList" @click="reassignModuleShow(item)" :id="item.id" :key="index">
                          <span>{{item.name}}</span><span>{{'('+item.precision+')'}}</span>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div class="utterances-items">
                  <div class="utterances-item utterance-list-header clearfix">
                    <div class="item-d checkbox checkbox-con pull-left">
                      <label><input type="checkbox" v-model="utterancesListCheckAll" @click="switcCheckListAll()">全选</label>
                    </div>
                    <div class="item-d pull-right">Predicted Intent</div>
                  </div>
                  <div class="utterances-item clearfix" v-for="(item,index) in utterancesList" :key="index">
                    <div class="item-d checkbox pull-left">
                      <label><input type="checkbox" :value="item.id" v-model="utterancesListCheckList[index]" @click="selectItem(item.id)">{{item.utterance}}</label>
                    </div>
                    <div class="item-d pull-right">
                      <div class="precision">{{item.precision}}</div>
                      <div class="intentName">{{item.intentName}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal fade" id="reassignUtterancesModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Reassign utterance(s)?</h4>
                  </div>
                  <div class="modal-body">
                    <p>Are you sure you want to reassign <span class="warn">1</span> utterance(s) to the <span class="warn">{{reassignItem.name}}</span> intent?</p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="reassignUtterances(reassignItem.id)">保存</button>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import MainLayout from '@/components/MainLayout'

let intentList = [
  {
    id:'1',
    name:'问候语',
    utterances:'对答问候语模型',
    precision:0.01,
  },
  {
    id:'2',
    name:'查询天气',
    utterances:'对答问题查询天气',
    precision:0.01,
  },
  {
    id:'3',
    name:'寻找歌单',
    utterances:'查找歌曲作者',
    precision:0.01,
  }
]
let utterancesList = [
  {
    id: '1',
    utterance: 'hello world',
    intentName: '问候语',
    precision: '0.8',
  },
  {
    id: '2',
    utterance: '吃饭了吗',
    intentName: '问候语',
    precision: '0.8',
  },
  {
    id: '3',
    utterance: '周末打算去哪里玩',
    intentName: '问候语',
    precision: '0.2',
  },
  {
    id: '4',
    utterance: '小明是谁',
    intentName: '问候语',
    precision: '0.1',
  },

]
export default {
  name:  'OverView',
  data () {
    return {
      appinfo: {
        appname: 'OverView-appname',
        version: 'OverView-version',
      },
      intentList: [],
      intentListShow: true,
      intentNameNow: '',
      utterancesList: [],
      utterancesListCheckList: [],
      utterancesListCheckAll: false,
      newUtterance: '',
      intentName: '',
      utterancesLiDisabled1: true,
      utterancesLiDisabled2: true,
      reassignList: [],
      reassignItem: {},
      reassignNum: '',
      reassignName: '',
      reassign_ul: false
    }
  },
  components: {
    'main-layout': MainLayout
  },
  created () {
    this.intentList = intentList
    this.utterancesList = utterancesList
    this.reassignList = intentList
  },
  methods: {
    add () {
      let addobj = {
        name: this.intentName,
        id: this.intentList.length + 1,
        utterances: '本地添加测试'
      }
      this.intentList.push(addobj)
      $('#addIntentModal').modal('hide')
    },
    switcCheckListAll () {
      this.utterancesListCheckAll = !this.utterancesListCheckAll
      if (this.utterancesListCheckAll) {
        this.utterancesLiDisabled2 = false
      } else {
        this.utterancesLiDisabled2 = true
        this.reassign_ul = false
      }
      for (let i in this.utterancesListCheckList) {
        this.utterancesListCheckList[i] = this.utterancesListCheckAll
      }
    },
    selectItem (id) {
    },
    selectAll () {
    },
    utterancesListShow (item) {
      this.intentNameNow = item.name
      this.intentListShow = false
    },
    addUtterance (event) {
      if (event.keyCode == "13") {
        let addobj = {
          id: (this.utterancesList.length) + 1,
          intentName: this.intentNameNow,
          precision: 0.01,
          utterance: this.newUtterance,
          newItem: true
        }
        this.utterancesList.unshift(addobj)
        this.newUtterance = ''
      }
    },
    reassignModuleShow (item) {
      $('#reassignUtterancesModal').modal('show')
      this.reassignItem = item
    },
    reassignUtterances () {
      alert('reassignUtterancesModal保存成功')
      $('#reassignUtterancesModal').modal('hide')
    }
  },
  watch: {
    utterancesList () {
      this.utterancesListCheckList.splice(0, this.utterancesListCheckList.length)
      for (let i in this.utterancesList) {
        let node = this.utterancesList[i]
        if (node.newItem) {
          this.utterancesListCheckList.push(true)
        } else {
          this.utterancesListCheckList.push(false)
        }
      }
      this.utterancesLiDisabled2 = false
    },
    utterancesListCheckList: function () {
      if (this.utterancesListCheckList.includes(true) && this.utterancesListCheckList.includes(false)) {
        // 混合值
        this.utterancesLiDisabled2 = false
        this.utterancesListCheckAll = false
      } else { // 单一值
        if (this.utterancesListCheckList.includes(true) && (!this.utterancesListCheckList.includes(false))) {
          // 全选
          this.utterancesLiDisabled2 = false
        }
        if (this.utterancesListCheckList.includes(false) && (!this.utterancesListCheckList.includes(true))) {
          // 全不选
          this.utterancesLiDisabled2 = true
          this.reassign_ul = false
          this.utterancesListCheckAll = false
        }
      }
    }
  }
}

// $('.path-items .intents').on('click',function () {
//   VMmain.intentListShow = true
// })
</script>

<style lang="less" scoped>
  .main{
    width: 90%;margin: 0 auto;
  }
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
    .utterances-list-con{
      .nav-tabs{
        li{
          float: left;
          margin:0 10px 20px 0;
          color: rgba(0,0,0,0.6);
          font-size: 20px;
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
        .full-left{float: left;}
        .full-right{float: right;}
      }
      .tools-header{
        padding: 15px 15px;
        background-color: #f2f2f2;
        border: 1px solid #d2d2d2;
        border-bottom: 0;
        .tools-list-ul{
          >li{
            float: left;
            margin-right: 20px;
            position: relative;
            padding:0.5rem;
            a{cursor: pointer;}
            .select-ul{
              max-height: 250px;
              overflow-y: auto;
              border: 1px solid #505050;
              width: 280px;
              position: absolute;
              left: 0;
              top: 100%;
              z-index: 10;
              background-color: white;
              text-align: left;
              li{
                padding: 10px;
                padding-left: 1rem;
                margin: 0;
                cursor: pointer;
                color: rgba(0,0,0,1);
                span.not-traing{
                  color: rgba(0,0,0,.6)!important;
                }
                &:hover{
                  color: #00b294;
                  background-color: #f2f2f2;
                }
              }
            }
          }
          >li.disabled{
            cursor: not-allowed;
            a{
              pointer-events:none;
              cursor: not-allowed;
              filter: alpha(opacity=65);
              -webkit-box-shadow: none;
              box-shadow: none;
              opacity: .65;
              text-decoration: none;
              color: #acacac;
            }
          }
        }
      }
      .utterances-items{
        max-height: 400px;
        overflow-y: scroll;
        margin-bottom: 20px;
        border-left: 1px solid #d2d2d2;
        border-right: 1px solid #d2d2d2;
        .utterance-list-header{}
        .utterances-item{
          padding: 5px 20px;
          border-bottom: 1px solid #d2d2d2;
          .full-left{float: left;}
          .full-right{float: right;}
          .item-d{
            .precision{font-weight: 600;font-size: 18px;text-align: right;}
            .intentName{
              font-size: 12px;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
    #reassignUtterancesModal{
      .warn{
        color: #f0ad4e;
      }
    }
  }
</style>
