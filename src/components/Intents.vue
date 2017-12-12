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
            <p>在应用程序中列出意图。点击意图查看/编辑它的详细信息，或者添加一个新的意图。</p>
            <div class="btn-con">
              <el-button @click="intentName = ''"data-toggle="modal" data-target="#addIntentModal">添加意图</el-button>
              <!--<el-button>添加预构建域意图（无效）</el-button>-->
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
            <p>在这里你完全控制了这个意图;你可以管理它的话语，使用的实体和建议的话语。</p>
            <div class="utterances-list-con">
              <div class="row">
                <ul class="nav-tabs">
                  <li class="active"><span class="">话语</span><span>({{utterancesList.length}})</span></li>
                </ul>
                <div class="form-group">
                  <input v-model="newUtterance" @keydown="addUtterance($event)" type="text" class="form-control" id="newUtterance" placeholder="输入一个新的话语和按下回车。需要增加变量的成语用空格分开">
                </div>
                <div class="row tools-header">
                  <ul class="tools-list-ul">
                    <li class="Save" :class="{'disabled':utterancesLiDisabled}"><a @click="insertEntity"><i  class="fa fa-floppy-o"></i><span >保存</span></a></li>
                    <!--<li class="Delete" :class="{'disabled':utterancesLiDisabled}"><a><i class="fa fa-trash"></i><span >删除</span></a></li>-->
                    <li class="reassign-li" :class="{'disabled':utterancesLiDisabled}">
                      <a @click="reassign_ul=!reassign_ul"><span>重新分配</span><i class="fa fa-arrow-down" aria-hidden="true"></i></a>
                      <ul class="select-ul" v-if="reassign_ul">
                        <li v-for="(item,index) in intentList" @click="reassignModuleShow(item)" :id="item.id" :key="index">
                          <span>{{item.tagname}}</span><span></span>
                        </li>
                      </ul>
                    </li>
                    <li :class="{'disabled':utterancesLiDisabled}">
                      <el-dropdown trigger="click" :disabled="utterancesLiDisabled">
                        <span class="el-dropdown-link">
                          下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item v-for="(item,index) in intentList" @click="reassignModuleShow(item)">{{item.tagname}}</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </li>
                  </ul>
                </div>
                <div class="utterances-items">
                  <div class="utterances-item utterance-list-header clearfix">
                    <el-dropdown @command="handleCommand" :disabled="entitiesListDisabled">
                      <span class="el-dropdown-link">
                        请选择实体<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="item in entitiesList" :key="item.id" :command="item">{{item.name}}</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                  <el-table ref="multipleTable" :data="utterancesList" v-loading="listLoading" element-loading-text="加载中" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column label="话语">
                      <template slot-scope="scope">
                        <span class="paramspan" v-for="(t2,i2) in scope.row.intentnameArr"
                              @mouseover="handleMouseover(scope.row,$event,i2)"
                              @mouseout="handleMouseout(scope.row,$event)"
                              @click="handleClick(scope.row, scope.$index, t2, i2, $event)"
                              :key="i2">
                            {{ t2.eN }}
                          </span>
                      </template>
                    </el-table-column>
                  </el-table>
                  <ul class="selectParamspanList" :style="{left:ulStyle.left+'px', top:ulStyle.top+'px'}">
                    <li @click="handleSelectParamspan(item)" v-for="item in entitiesList" :key="item.id" :value="item.name">
                      {{item.name}}
                    </li>
                  </ul>
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
                    <p>确定重新分配 <span class="warn">{{multipleSelection.length}}</span> 个话语到<span class="warn">{{reassignItem.tagname}}</span> 意图?</p>
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
  name: 'Intents',
  data () {
    return {
      modelid: '',
      appInfo: {},
      intentList: [],
      intentListShow: true,
      intentNameNow: '',
      intentsNow: {},
      utterancesList: [],
      utterancesListCheckAll: false,
      newUtterance: '',
      intentName: '',
      utterancesLiDisabled: true,
      reassignList: [],
      reassignItem: {},
      reassign_ul: false,
      entitiesList: [],
      entitiesListDisabled: true,
      selectParamspan: '',
      ulStyle: {
        left: 530,
        top: 0
      },
      intentnameArrItem: {},
      paramSite: {
        id: null,
        entityarry: []
      },
      multipleSelection: [],
      insertEntityList: [],
      listLoading: true
    }
  },
  components: {
    'main-layout': MainLayout
  },
  created () {
    if (sessionStorage.getItem('appInfo')) {
      let appInfo = JSON.parse(sessionStorage.getItem('appInfo'))
      this.appInfo = appInfo
      this.modelid = appInfo.id
      this.getModeltagById(this.modelid)
    } else {
      this.$router.push({
        path: '/applications'
      })
    }
  },
  methods: {
    addTagName () {
      if (!this.intentName) {
        this.$message({message: '意图名称不能为空', type: 'warning'})
        return false
      }
      let addobj = {
        tagName: this.intentName,
        modelId: this.modelid
      }
      this.$http.post('/insertTag', addobj).then(response => {
        if (response.data === 1) {
          $('#addIntentModal').modal('hide')
          this.getModeltagById(this.modelid)
          this.$message({message: '成功', type: 'success'})
        }
      }, response => {
        $('#addIntentModal').modal('hide')
        this.$message.error(`错误信息：${response}`)
      })
      this.intentName = ''
    },
    delTagName (item) {
      let opt = {
        id: item.id
      }
      this.$confirm(`确定删除 ${item.tagname} 意图标签？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('/delTag', opt).then(response => {
          if (response.data.result === 1) {
            this.$message({message: '成功', type: 'success'})
            this.getModeltagById(this.modelid)
          }
        }, response => {
          $('#addIntentModal').modal('hide')
          this.$message.error(`错误信息：${response}`)
        })
      }).catch(() => {
        return false
      })
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
        if (response.data.result === 1) {
          $('#updataIntentModal').modal('hide')
          this.$options.methods.getModeltagById.bind(this)(this.modelid)
        }
      }, response => {
        alert.log('失败：' + response)
        $('#updataIntentModal').modal('hide')
      })
    },
    EmitsetIntentsListShow () {
      this.$options.methods.getModeltagById.bind(this)(this.modelid)
      this.intentListShow = true
      this.reassign_ul = false
      this.utterancesLiDisabled = true
    },
    utterancesListShow (item) {
      this.intentNameNow = item.tagname
      this.intentsNow = item
      this.intentListShow = false
      this.getTagintentById(item)
      this.findAllEntity(this.modelid)
    },
    addUtterance (event) {
      if (event.keyCode === 13) {
        if (!this.newUtterance || (this.newUtterance === undefined)) {
          this.$message({
            message: '请输入话语',
            type: 'warning'
          })
          return false
        }
        let addobj = {
          modelid: this.modelid,
          tagId: this.intentsNow.id,
          intentname: this.newUtterance
        }
        this.$http.post('/insertIntent', addobj).then(response => {
          if (response.data === 1) {
            addobj.newItem = true
            this.newUtterance = ''
            this.getTagintentById(this.intentsNow)
          }
        }, response => {
          $('#addIntentModal').modal('hide')
          this.$message.error(`错误信息：${response}`)
        })
      }
    },
    reassignModuleShow (item) {
      $('#reassignUtterancesModal').modal('show')
      this.reassignItem = item
    },
    reassignUtterances () {
      let idArr = this.multipleSelection.map((item) => {
        return item.id
      })
      if (idArr.length === 0) {
        this.$message({message: '请选择要重新分配的话语', type: 'warning'})
        return false
      }
      let opt = {
        id: idArr.join(','),
        tagId: this.reassignItem.id
      }
      this.$http.post('/updateIntentTag', opt).then(response => {
        this.$message({message: '保存成功', type: 'success'})
        $('#reassignUtterancesModal').modal('hide')
        this.reassign_ul = false
        this.getTagintentById(this.intentsNow)
      }, response => {
        this.reassign_ul = false
        $('#reassignUtterancesModal').modal('hide')
        this.$message.error(`错误信息：${response}`)
      })
    },
    getModeltagById (modelid) {
      this.$http.get('/modeltag?id=' + modelid).then(response => {
        this.intentList = response.data
      }, response => {
        console.log('获取信息失败,:' + response)
      })
    },
    getTagintentById (item) {
      this.entitiesListDisabled = true
      $('.paramspan').removeClass('active hover')
      this.$http.get('/tagintent?id=' + item.id).then(response => {
        this.listLoading = false
        if (response.data.length > 0) {
          this.utterancesList.splice(0, this.utterancesList.length)
          this.utterancesList = this.intentNameFormat(response.data)
        } else {
          this.utterancesList.splice(0, this.utterancesList.length)
        }
      }, response => {
        this.listLoading = false
        this.$message.error(`错误信息：${response}`)
      })
    },
    intentNameFormat (val) {
      for (const i in val) {
        const node = val[i]
        const intentname = node.intentname
        const intentnameArr = intentname.split(/\s+/g).map((item) => {
          return {
            eN: item,
            s: node.intentname.indexOf(item),
            e: node.intentname.indexOf(item) + item.length
          }
        })
        let array = node.array
        if (array && array.length > 0) {
          array.forEach((value, index, array) => {
            try {
              intentnameArr[index].eN = (value.eN === '$&' ? intentnameArr[index].eN : `[$${value.eN}]`)
            } catch (err) {
              console.error(`遍历设置intentnameArr值错误：${err}`, intentnameArr, index)
            }
          })
        } else {
          array = intentname.split(/\s+/g).map((item) => {
            return {
              eN: '$&',
              s: node.intentname.indexOf(item),
              e: node.intentname.indexOf(item) + item.length
            }
          })
        }
        node.array = array
        node.intentnameArr = intentnameArr
      }
      return val
    },
    handleMouseover (item, event) {
      const $this = $(event.target)
      $this.addClass('hover').siblings().removeClass('hover')
    },
    handleMouseout (item, event) {
      const $this = $(event.target)
      $this.removeClass('hover')
    },
    handleClick (item, index, t2, i2, $event) {
      // 当前父类item 父类索引item的索引 span索引
      const $this = $(event.target)
      $this.addClass('active').siblings().removeClass('active')
      this.intentnameArrItem = {item: item, index: index, i2: i2}
      this.paramSite.id = item.id
      this.paramSite.entityarry[i2] = t2
      this.entitiesListDisabled = false
    },
    handleCommand (command) {
      this.setIntentnameArr(command.name)
    },
    setIntentnameArr (command) {
      this.paramSite.id = undefined
      this.paramSite.entityarry = []
      const index = this.intentnameArrItem.index
      const i2 = this.intentnameArrItem.i2
      this.utterancesList[index].intentnameArr[i2].eN = `[ $${command} ]`
      if (this.utterancesList[index].array) {
        this.utterancesList[index].array[i2].eN = command
      } else {
        this.utterancesList[index].array = []
        this.utterancesList[index].array[i2] = this.utterancesList[index].intentnameArr[i2]
      }
      this.paramSite.entityarry = this.utterancesList[index].array
      this.insertEntityList.push(JSON.parse(JSON.stringify(this.paramSite)))
    },
    insertEntity () {
      const opt = {utterancesList: JSON.stringify(this.insertEntityList)}
      this.$http.post('/insertEntity', opt).then(response => {
        if (response.data === 1) {
          this.$message({showClose: true, message: '保存成功', type: 'success'})
          this.getTagintentById(this.intentsNow)
          this.insertEntityList = []
        }
      }, response => {
        this.$message.error(`错误信息：${response}`)
      })
    },
    handleSelectParamspan (item) {
      this.selectParamspan = item.name
    },
    findAllEntity (modelid) {
      this.$http.get('/findAllEntity?modelid=' + modelid).then(response => {
        this.listLoading = false
        const data = response.data
        this.entitiesList = data
      }, response => {
        this.listLoading = false
        this.$message.error(`错误信息：${response}`)
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  },
  watch: {
    multipleSelection () {
      const l = this.multipleSelection.length
      if (l > 0) {
        this.utterancesLiDisabled = false
      } else {
        this.utterancesLiDisabled = true
      }
      this.insertEntityList = this.multipleSelection.map((value, index) => {
        const $value = value
        let array = value.array
        if (array && array.length > 0) {
          array = array.map((val) => {
            val.eN = (val.eN === '$&' ? val.eN : val.eN.replace(/(\[\$)+\s*([^\]]+)\s*(\])+/g, '$2'))
            return val
          })
        } else {
          array = value.intentname.split(/\s+/g).map((item) => {
            return {
              eN: '$&',
              s: $value.intentname.indexOf(item),
              e: $value.intentname.indexOf(item) + item.length
            }
          })
        }
        return {
          id: $value.id,
          entityarry: array
        }
      })
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
        position: relative;
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
    .paramspan.hover{
      &:before{
        content: '[';
        font-weight: bold;
        padding-right: 4px;
        color: #656565;
      }
      &:after{
        content: ']';
        font-weight: bold;
        padding-left: 4px;
        color: #656565;
      }
    }
    .paramspan.active{
      &:before{
        content: '[';
        font-weight: bold;
        padding-right: 4px;
        color: red;
      }
      &:after{
        content: ']';
        font-weight: bold;
        padding-left: 4px;
        color: red;
      }
    }
    .selectParamspanList{
      display: none;
      position: absolute;z-index: 999;
      width: 200px;
      border: 1px solid #dfe4ed;
      border-radius: 4px;
      background-color: #fff;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      box-sizing: border-box;
      margin: 5px 0;
      li{
        line-height: 30px;height: 34px;
        box-sizing: border-box;
        cursor: pointer;
        color: #5a5e66;
        font-size: 14px;padding: 0 20px;
        &:hover{
          background-color: #f5f7fa;
        }
      }
    }
    .el-dropdown[disabled]{
      pointer-events: none;
      span{
        color: #acacac;
        opacity: 0.65;
      }
    }
    .el-dropdown-link{cursor:pointer;color:#409eff}
  }
</style>
