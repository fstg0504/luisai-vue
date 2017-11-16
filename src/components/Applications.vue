<template>
  <div class="main w90" id="main">
    <div class="row">
      <div class="col-lg-12">
        <h1 class="">My apps</h1>
        <p>Create and manage your LUIS applications ...
          <a>Learn more</a>
        </p>
        <div class="btn-group">
          <button class="btn newbtn" data-toggle="modal" data-target="#addAPPModal">New App</button>
        </div>
      </div>
    </div>
    <div class="myapps">
      <table class="table table-striped">
        <thead>
        <tr>
          <th>Name</th>
          <th>Created date</th>
          <th>Description</th>
        </tr>
        </thead>
        <tbody>
        <tr v-cloak v-for="(item,index) in applist" :key="index">
          <td ><a :href="'/overview?appid='+item.id">{{ item.name }}</a></td>
          <td >{{ item.createdDate }}</td>
          <td >{{ item.description }}</td>
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
              <h4 class="modal-title">Create a new app</h4>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="exampleInputEmail1">Name (REQUIRED)</label>
                  <input v-model="addappName" type="text" class="form-control" id="appName" placeholder="APP名称">
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">描述</label>
                  <textarea v-model="addappDescription" class="form-control" id="appDescription" placeholder="APP描述"></textarea>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
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

let testDate = [
  {
    id: '1',
    name: 'appname1',
    culture: 'aaa',
    createdDate: 'Nov 9, 2017, 11:51:29 AM',
    description: '描述',
    controls: 'aaa'
  },
  {
    id: '2',
    name: 'appname2',
    culture: 'aaa',
    createdDate: 'Nov 9, 2017, 11:51:29 AM',
    description: '描述',
    controls: 'aa'
  },
  {
    id: '3',
    name: 'appname3',
    culture: 'aaa',
    createdDate: 'Nov 9, 2017, 11:51:29 AM',
    description: '描述',
    controls: 'aaa'
  }
]
export default {
  name: 'Applications',
  data () {
    return {
      applist: [],
      addappName: '',
      addappDescription: ''
    }
  },
  created () {
    this.applist = testDate
  },
  methods: {
    add () {
      $('#addAPPModal').modal('hide')
//      let addobj = {
//        appName: this.addappName,
//        addappDescription: this.addappDescription
//      }
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
