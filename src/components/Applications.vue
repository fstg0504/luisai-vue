<template>
  <div class="main w90" id="main">
    <div class="row">
      <div class="col-lg-12">
        <h1 class="">我的应用</h1>
        <p>创建和管理您的路易斯应用程序。
          <a>更多</a>
        </p>
        <div class="btn-group">
          <button class="btn newbtn" data-toggle="modal" data-target="#addAPPModal">创建模型</button>
        </div>
      </div>
    </div>
    <div class="myapps">
      <table class="table table-striped">
        <thead>
        <tr>
          <th>应用名称</th>
          <th>创建时间</th>
          <th>描述</th>
        </tr>
        </thead>
        <tbody>
        <tr v-cloak v-for="(item,index) in applist" :key="index">
          <td>
            <router-link @click.native="setSessionStorage(item)" :class="{'active':item.active}" :to="{path:'/overview',query: {id: item.id}}" tag="a">{{item.modelname}}</router-link>
          </td>
          <td >{{ item.createtime }}</td>
          <td >{{ item.descrbe }}</td>
          <!--<td class="handle-td">
              <a class="handle-a"><i class="fa fa-pencil" aria-hidden="true"></i></a>
              <a class="handle-a"><i class="fa fa-cloud-download" aria-hidden="true"></i></a>
              <a class="handle-a"><i class="fa fa-code" aria-hidden="true"></i></a>
              <a class="handle-a"><i class="fa fa-trash" aria-hidden="true"></i></a>
          </td>-->
        </tr>
        </tbody>
      </table>
      <div class="modal fade" id="addAPPModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">创建一个新的应用程序</h4>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="addmodelName">名称 (必需)</label>
                  <input v-model="addmodelName" type="text" class="form-control" id="addmodelName" placeholder="APP名称">
                </div>
                <div class="form-group">
                  <label for="appDescrbe">描述</label>
                  <textarea v-model="descrbe" class="form-control" id="appDescrbe" placeholder="APP描述"></textarea>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
              <button type="button" class="btn btn-primary" @click="add()">保存</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Qs from 'qs'

export default {
  name: 'Applications',
  data () {
    return {
      applist: [],
      addmodelName: '',
      descrbe: ''
    }
  },
  created () {
    // 方法1 apply或者call
    //  方法2 this.$options.methods.findAllModel(this)
    this.$options.methods.findAllModel.bind(this)()
  },
  methods: {
    add () {
      let addobj = {
        modelName: this.addmodelName,
        descrbe: this.descrbe
      }
      this.$http({
        method: 'POST',
        url: '/insertModel',
        data: Qs.stringify(addobj)
      }).then(response => {
        this.$options.methods.findAllModel.bind(this)()
        $('#addAPPModal').modal('hide')
      }, response => {
        console.log('失败：' + response)
      })
    },
    findAllModel () {
      this.$http.get('/findAllModel').then(response => {
        this.applist = response.data
      }, response => {
        console.log('失败：' + response)
      })
    },
    setSessionStorage (item) {
      sessionStorage.setItem('appInfo', JSON.stringify(item))
    }
  }
}
</script>

<style lang="less" scoped>
  .main{
    margin: 0 auto;
    .row{
      .btn-group{
        .btn{
          min-width: 120px;height: 36px;
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
    }
    .myapps{
      table{
        thead{
          tr{
            th{

            }
          }
        }
        tbody{
          tr{
            td{

            }
            td.handle-td{
              .handle-a{
                display: inline-block;
                margin-right: 1rem;
                &:hover{
                  color: #999;
                  outline: 0;
                }
              }
            }
          }
          tr:nth-child(odd){background-color: #F2F2F2;}
        }
      }
    }
  }
</style>
