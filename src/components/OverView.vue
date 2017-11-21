<template>
  <div class="main w90" id="main">
    <div class="row">
      <div class="col-lg-2">
        <main-layout v-on:handleLink="EmitsetIntentsListShow" :appInfo="appInfo"></main-layout>
      </div>
      <div class="col-lg-10">
        <div class="right-con">
          <template v-if="intentListShow">
            <h2>意图</h2>
            <p>在应用程序中列出意图。点击意图查看/编辑它的详细信息，或者添加一个新的意图。<a >更多（无效）</a></p>
            <div class="btn-con">
              <button class="btn addIntent" data-toggle="modal" data-target="#addIntentModal">添加意图</button>
              <button class="btn addPrebuilt">添加预构建域意图（无效）</button>
            </div>
            <div class="intents-list-con">
              <table class="table table-striped">
                <thead>
                <tr>
                  <th>意图名称</th>
                  <th>话语</th>
                  <th>删除修改</th>
                </tr>
                </thead>
                <tbody>
                <tr v-cloak v-for="(item,index) in intentList" :key="index">
                  <td ><a :id="item.id" @click="utterancesListShow(item)">{{ item.tagname }}</a></td>
                  <td >暂无</td>
                  <td class="handle-td">
                    <a class="handle-a" @click="updateTagHandle(item)" data-toggle="modal" data-target="#updataIntentModal"><i class="fa fa-pencil" aria-hidden="true"></i></a>
                    <a class="handle-a" @click="delTagName(item)"><i class="fa fa-trash" aria-hidden="true"></i></a>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="modal fade" id="addIntentModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">添加意图</h4>
                  </div>
                  <div class="modal-body">
                    <div class="form-group">
                      <label for="intentName">意图名称(必需)</label>
                      <input v-model="intentName" type="text" class="form-control" id="intentName" placeholder="输入意图名称">
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary" @click="addTagName()">保存</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal fade" id="updataIntentModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">修改意图</h4>
                  </div>
                  <div class="modal-body">
                    <div class="form-group">
                      <label for="intentName">意图名称(必需)</label>
                      <input v-model="intentName" type="text" class="form-control" id="intentName-updata" placeholder="输入意图名称">
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary" @click="updateTag()">保存</button>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <h2><span class="intent-span">当前意图标签:</span>{{intentNameNow}}</h2>
            <p>在这里你完全控制了这个意图;你可以管理它的话语，使用的实体和建议的话语。<a >更多（无效）</a></p>
            <div class="utterances-list-con">
              <div class="row">
                <ul class="nav-tabs">
                  <li class="active"><span class="">话语</span><span class="num">(1)</span></li>
                  <li class=""><span class="">实体在使用</span></li>
                  <li class=""><span class="">建议话语</span></li>
                </ul>
                <div class="form-group">
                  <input v-model="newUtterance" @keydown="addUtterance($event)" type="text" class="form-control" id="newUtterance" placeholder="输入一个新的话语和按下回车。">
                </div>
                <div class="row tools-header">
                  <ul class="tools-list-ul">
                    <li class="Save" :class="{'disabled':utterancesLiDisabled1}"><a><i  class="fa fa-floppy-o"></i><span >保存</span></a></li>
                    <li class="Discard" :class="{'disabled':utterancesLiDisabled1}"><a><i  class="fa fa-times"></i><span >Discard</span></a></li>
                    <li class="Delete"  :class="{'disabled':utterancesLiDisabled2}"><a><i  class="fa fa-trash"></i><span >删除</span></a></li>
                    <li class="reassign-li" :class="{'disabled':utterancesLiDisabled2}">
                      <a @click="reassign_ul=!reassign_ul"><span>Reassign Intent</span><i class="fa fa-arrow-down" aria-hidden="true"></i></a>
                      <ul class="select-ul" v-if="reassign_ul">
                        <li v-for="(item,index) in intentList" @click="reassignModuleShow(item)" :id="item.id" :key="index">
                          <span>{{item.tagname}}</span><span></span>
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
                      <label><input type="checkbox" :value="item.id" v-model="utterancesListCheckList[index]" @click="selectItem(item)">{{item.intentname}}</label>
                    </div>
                    <div class="item-d pull-right">
                      <div class="precision">0.81</div>
                      <div class="intentName">未知</div>
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
                    <h4 class="modal-title">重新分配话语?</h4>
                  </div>
                  <div class="modal-body">
                    <p>确定重新分配 <span class="warn">{{reassignNum}}</span> 个话语到<span class="warn">{{reassignItem.tagname}}</span> 意图?</p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
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

export default {
  name: 'OverView',
  data () {
    return {
      moduleId: '',
      appInfo: {},
      intentList: [],
      intentListShow: true,
      intentNameNow: '',
      intentsNow: {},
      utterancesList: [],
      utterancesListCheckList: [],
      utterancesListCheckAll: false,
      newUtterance: '',
      intentName: '',
      utterancesLiDisabled1: true,
      utterancesLiDisabled2: true,
      reassignList: [],
      reassignItem: {},
      reassignNum: 0,
      reassignName: '',
      reassign_ul: false
    }
  },
  components: {
    'main-layout': MainLayout
  },
  created () {
    let appInfo = JSON.parse(sessionStorage.getItem('appInfo'))
    if (appInfo) {
      this.appInfo = appInfo
      this.moduleId = appInfo.id
//      this.$options.methods.getModeltagById.bind(this)(this.moduleId)
      this.getModeltagById(this.moduleId)
    } else {
      this.$router.push({
        path: '/applications'
      })
    }
  },
  methods: {
    addTagName () {
      if (!this.intentName) {
        alert('意图名称不能为空')
        return false
      }
      let addobj = {
        tagName: this.intentName,
        modelId: this.moduleId
      }
      this.$http.post('/insertTag', addobj).then(response => {
        if (response.data == 1) {
          $('#addIntentModal').modal('hide')
//          this.$options.methods.getModeltagById.bind(this)(this.moduleId)
          this.getModeltagById(this.moduleId)
        }
      }, response => {
        $('#addIntentModal').modal('hide')
        console.log('失败：' + response)
      })
      this.intentName = ''
    },
    delTagName (item) {
      let opt = {
        id: item.id
      }
      let result = confirm('确定删除这个意图标签？')
      if (result) {
        this.$http.post('/delTag', opt).then(response => {
          if (response.data.result == 1) {
            this.$options.methods.getModeltagById.bind(this)(this.moduleId)
          }
        }, response => {
          $('#addIntentModal').modal('hide')
          console.log('失败：' + response)
        })
      } else {
        return false
      }
    },
    updateTagHandle (item) {
      this.intentsNow = item
      this.intentName = item.tagname
    },
    updateTag () {
      let opt = {
        tagName: this.intentName,
        tagId: this.intentsNow.id
      }
      this.$http.post('/updateTag', opt).then(response => {
        if (response.data.result == 1) {
          $('#updataIntentModal').modal('hide')
          this.$options.methods.getModeltagById.bind(this)(this.moduleId)
        }
      }, response => {
        alert.log('失败：' + response)
        $('#updataIntentModal').modal('hide')
      })
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
        this.$set(this.utterancesListCheckList, i, this.utterancesListCheckAll)
      }
    },
    selectItem (item) {
    },
    EmitsetIntentsListShow () {
      console.log('mainlayoput,/overview点击了....')
      this.$options.methods.getModeltagById.bind(this)(this.moduleId)
      this.intentListShow = true
      this.reassign_ul = false
      this.utterancesLiDisabled2 = true
      console.log(this)
    },
    utterancesListShow (item) {
      this.intentNameNow = item.tagname
      this.intentsNow = item
      this.intentListShow = false
      this.$options.methods.getTagintentById.bind(this)(item)
    },
    addUtterance (event) {
      if (event.keyCode == '13') {
        if (!this.newUtterance || (this.newUtterance == undefined)) {
          alert('请输入话语')
          return false
        }
        let addobj = {
          tagId: this.intentsNow.id,
          intentname: this.newUtterance
        }
        this.$http.post('/insertIntent', addobj).then(response => {
          if (response.data == 1) {
            addobj.newItem = true
            this.newUtterance = ''
            this.$options.methods.getTagintentById.bind(this)(this.intentsNow)
          }
        }, response => {
          $('#addIntentModal').modal('hide')
          console.log('失败：' + response)
        })
      }
    },
    reassignModuleShow (item) {
      $('#reassignUtterancesModal').modal('show')
      this.reassignItem = item
    },
    reassignUtterances () {
      let idArr = []
      for (let i in this.utterancesListCheckList) {
        let node = this.utterancesListCheckList[i]
        if (node) {
          idArr.push(this.utterancesList[i].id)
        }
      }
      if (idArr.length == 0) {
        alert('请选择要重新分配的话语')
        return false
      }
      let opt = {
        id: idArr.join(','),
        tagId: this.reassignItem.id
      }
      this.$http.post('/updateIntentTag', opt).then(response => {
        alert('reassignUtterancesModal保存成功')
        $('#reassignUtterancesModal').modal('hide')
        this.reassign_ul = false
        this.$options.methods.getTagintentById.bind(this)(this.intentsNow)
      }, response => {
        this.reassign_ul = false
        $('#reassignUtterancesModal').modal('hide')
        console.log('失败：' + response)
      })
    },
    getModeltagById (moduleId) {
      this.$http.get('/modeltag?id=' + moduleId).then(response => {
        this.intentList = response.data
      }, response => {
        console.log('获取信息失败,response:' + response)
      })
    },
    getTagintentById (item) {
      this.$http.get('/tagintent?id=' + item.id).then(response => {
        if (response.data) {
          this.utterancesList = response.data
        }
      }, response => {
        console.log('失败：' + response)
      })
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
      this.utterancesLiDisabled2 = true
    },
    utterancesListCheckList: function () {
      console.log(this.utterancesListCheckList)
      if (this.utterancesListCheckList.includes(true) && this.utterancesListCheckList.includes(false)) {
        // 混合值
        this.utterancesLiDisabled2 = false
        this.utterancesListCheckAll = false
        let countedNames = this.utterancesListCheckList.reduce(function (allNames, name) {
          if (name in allNames) {
            allNames[name]++
          } else {
            allNames[name] = 1
          }
          return allNames
        }, {})
        this.reassignNum = countedNames['true']
      } else { // 单一值
        if (this.utterancesListCheckList.includes(true) && (!this.utterancesListCheckList.includes(false))) {
          // 全选
          this.utterancesLiDisabled2 = false
          this.reassignNum = this.utterancesListCheckList.length
        }
        if (this.utterancesListCheckList.includes(false) && (!this.utterancesListCheckList.includes(true))) {
          // 全不选
          this.utterancesLiDisabled2 = true
          this.reassign_ul = false
          this.utterancesListCheckAll = false
          this.reassignNum = 0
        }
      }
    }
  }
}
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
    h2{
      .intent-span{
        font-size: 14px;
      }
    }
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
