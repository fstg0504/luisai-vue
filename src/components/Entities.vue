<template>
  <div class="main w90" id="main">
    <div class="row" id="main-layout">
      <div class="col-lg-2">
        <main-layout  :appInfo="appInfo"></main-layout>
      </div>
      <div class="col-lg-10">
        <div class="right-con">
          <h2>实体</h2>
          <p>管理应用程序中的实体列表，并跟踪和控制它们在表达中的实例</p>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="实体列表" name="first">
               <div class="btn-con">
                 <el-button @click="handleCreate()">添加自定义实体</el-button>
                 <el-button>添加预先构建的实体</el-button>
                 <el-button>添加预构建域实体</el-button>
               </div>
              <div class="table-con">
                <el-table :data="entitiesList" style="width: 100%">
                  <el-table-column prop="id" label="ID"></el-table-column>
                  <el-table-column prop="name" label="实体名称"></el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <!--<el-tab-pane label="话语标记" name="second">话语标记</el-tab-pane>-->
            <!--<el-tab-pane label="角色管理" name="third">建议话语</el-tab-pane>-->
          </el-tabs>
        </div>
        <el-dialog title="添加实体" :visible.sync="dialogFormVisible">
          <el-form class="small-space" :model="Entity" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
            <el-form-item label="实体名称">
              <el-input v-model="Entity.name" @keyup.enter.native="insertEntityName"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="insertEntityName">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  import MainLayout from '@/components/MainLayout'

  export default {
    name: 'Entities',
    data () {
      return {
        appInfo: '',
        modelid: '',
        activeName: 'first',
        entitiesList: [],
        dialogFormVisible: false,
        Entity: {
          name: ''
        }
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
      } else {
        this.$router.push({
          path: '/'
        })
      }
    },
    mounted () {
      this.findAllEntity()
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
      },
      handleDelete (row) {
        console.log(row)
        this.delEntityName(row)
      },
      handleCreate () {
        this.resetEntity()
        this.dialogFormVisible = true
      },
      resetEntity () {
        this.Entity = {
          name: ''
        }
      },
      contrastEntity () {
//        arr.map(item => item.a).includes(1)
        const newEntityName = this.Entity.name
        let result = false
        const resultArr = this.entitiesList.map((itm) => {
          return itm.name === newEntityName
        })
        if (resultArr.indexOf(true) > -1) {
          result = true
        } else {
          result = false
        }
        return result
      },
      insertEntityName () {
        if (!this.Entity.name) {
          return this.$message({
            showClose: true,
            message: `实体名称不能为空`,
            type: 'warning'
          })
        }
        if (this.contrastEntity()) {
          this.$message({
            showClose: true,
            message: `实体名称“${this.Entity.name}”已存在，不能重复添加`,
            type: 'warning'
          })
        }
        const opt = {
          name: this.Entity.name.trim(),
          modelid: this.modelid
        }
        this.$http.post('/insertEntityName', opt).then(response => {
          if (response.data === 1) {
            this.$message({showClose: true, message: '添加成功', type: 'success'})
            this.dialogFormVisible = false
            this.findAllEntity()
          }
        }, response => {
          this.$message({
            showClose: true,
            message: response,
            type: 'error'
          })
        })
      },
      findAllEntity () {
        const modelid = this.modelid
        this.$http.get('/findAllEntity?modelid=' + modelid).then(response => {
          const data = response.data
          this.entitiesList = data
        }, response => {
          console.log('获取信息失败,response:' + response)
        })
      },
      delEntityName (item) {
        const opt = {
          id: item.id,
          modelid: this.modelid
        }
        this.$confirm(`确定删除？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/delEntityName', opt).then(response => {
            if (response.data.result === 1) {
              this.findAllEntity()
              this.$message({showClose: true, message: '删除成功', type: 'success'})
            } else {
              this.$message({showClose: true, message: '删除失败，重新试试', type: 'error'})
            }
          }, response => {
            this.$message({showClose: true, message: response, type: 'error'})
          })
        }).catch(() => {
          return false
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .main{
    width: 90%;margin: 0 auto;
    padding-bottom: 30px;
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
  }
</style>
