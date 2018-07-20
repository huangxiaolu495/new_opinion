<template>
  <div class="attentionPoolBox">
    <div>
      <div class="tab">
        <h4 @click="switchTab(1)" :class="{active: nowTab == '1'}">我的关注池</h4>
        <h4 @click="switchTab(2)" class="marginLeft15" :class="{active: nowTab == '2'}">查找发行人</h4>
        <h4 @click="switchTab(3)" class="marginLeft15" :class="{active: nowTab == '3'}">发行人证券信息</h4>
        <span @click="closeAttentionPool" class="close marginLeft85">×</span>
      </div>
      <div v-show="nowTab == '1'">
        <div class="poolList">
          <ul class="clearFloat">
            <li v-for="(item, index) of poolList" :key="index" @click="poolCheck(item, index)" class="checkBox floatLeft marginLeft20">
              <span class="iconBox">
                <i v-show="item.check" class="dot"></i>
              </span>
              <span class="marginLeft20">{{item.title}}</span>
            </li>
          </ul>
        </div>
        <div class="poolBtnBox">
          <span @click="deleteList">删除</span>
          <span @click="clearList">清空</span>
        </div>
      </div>
      <div v-show="nowTab == '3'" class="queryBox">
        <div class="clearFloat">
          <div class="top floatLeft">
            证券代码：<input @input="inputEventCheck" v-model="queryIssuer.seccode" type="text" class="marginTop20">
            证券简称：<input @input="inputEventCheck" v-model="queryIssuer.secname" type="text">
            <span @click="queryIssuerEvent" class="queryBtn marginLeft10">查询发行人</span>
          </div>
          <div class="top floatLeft">
            发行人：<input @input="inputEventCheck" v-model="querySecurities.issue" type="text" class="marginTop20 marginLeft20">
            <span @click="querySecuritiesEvent" class="queryBtn marginLeft20">查询证券信息</span>
          </div>
        </div>
        <div v-if="isShowQueryResult">
          <div v-if="isShowIssuer && !isShowSecurities">
            <table>
              <tbody>
                <tr>
                    <th>证券代码</th>
                    <th>证券简称</th>
                </tr>
                <tr v-for="(item, index) of nowSecuritiesList" :key="index">
                  <td>{{item.sec_code}}</td>
                  <td>{{item.sec_name}}</td>
                </tr>
              </tbody>
            </table>
          <pagination :prop="paginationData" @paginationSelect="paginationSelect"></pagination>
          </div>
          <div v-if="isShowSecurities && !isShowIssuer" class="queryIssuerDataList">
            <EasyScrollbar>
              <div style="height:540px;width:1000px">
                <div>
                  <div>
                    <table>
                      <tbody>
                        <tr>
                            <th>证券代码</th>
                            <th>证券简称</th>
                            <th>发行人</th>
                        </tr>
                        <tr v-for="(item, index) of queryIssuerData" :key="index">
                          <td>{{item.seccode}}</td>
                          <td>{{item.secname}}</td>
                          <td>{{item.issue}}</td>
                        </tr>
                      </tbody>
                    </table>
                    <!-- <ul class="clearFloat">
                      <li v-for="(item, index) of queryIssuerData" :key="index" class="floatLeft">{{item}}</li>
                    </ul> -->
                  </div>
                </div>
              </div>
            </EasyScrollbar>
          </div>
        </div>
      </div>
      <div v-show="nowTab == '2'" class="addListBox">
        <div class="otherBox">
          <div class="clearFloat">
            <div class="floatLeft">
              <pull-down-list :prop="typeList" @typeListEvent='typeListEvent'></pull-down-list>
            </div>
            <div class="floatLeft marginLeft20">
              关键字：<input @input="inputEventCheck" v-model="queryAddList.keyword" type="text">
            </div>
            <div class="floatLeft marginLeft20 marginTop3">
              <span @click="addListQuery" class="queryBtn">搜索</span>
            </div>
            <div class="floatLeft marginLeft20 marginTop3">
              <span @click="addToList" class="queryBtn">添加到关注池</span>
            </div>
          </div>
          <div v-if="isShowAddListQuery" class="addListQueryBox">
            <div v-if="hasResultDataAddList">
              <ul class="clearFloat">
                <li v-for="(item,index) of nowAddListQueryData" 
                    :key="index" 
                    @click="addToListCheck(item, index)"
                    :class="{active: item.check}" class="floatLeft">{{item.title}}</li>
              </ul>
              <div v-if="isShowAddListPage">
                <pagination :prop="paginationData_list" @paginationSelectList="paginationSelectList"></pagination>
              </div>
            </div>
            <div v-else>
              <div class="loadEffect">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commonMethods from '@/common/common.js'
import pagination from '@/components/common/pagination'
import pullDownList from '@/components/common/pullDownList'
export default {
  data(){
    return {
      nowTab: true,
      isAddList: false,
      isShowQueryResult: false,
      isShowIssuer: false,
      isShowSecurities: false,
      isShowAddListQuery:false,
      hasResultDataAddList: false,
      isShowAddListPage: false,
      nowSecuritiesPage: 1,
      nowAddListPage: 1,
      queryIssuerData: '',
      poolList: [],
      queryIssuer:{
        seccode: '',
        secname: ''
      },
      querySecurities:{
        issue: ''
      },
      queryAddList:{
        companytype: 'S',
        keyword: '',
      },
      addListSendData: {},
      securitiesList: null,
      nowSecuritiesList: [],
      addListQueryData: null,
      nowAddListQueryData: [],
      paginationData: {
        parentEvent: 'paginationSelect',
        page_Count: 0,
        total_Count: 0,
        current: 1
      },
      paginationData_list: {
        parentEvent: 'paginationSelectList',
        page_Count: 0,
        total_Count: 0,
        current: 1
      },
      typeList: {
        title: '类型：',
        parentEvent: 'typeListEvent',
        default: '股票发行人',
        listWidth: 138,
        nowSelectWidth: 140,
        nowSelectHeight: 25,
        nowSelectFontSize: 13,
        list: [
          '股票发行人',
          '债券发行人',
          '基金管理人',
          '新三板发行人',
        ]
      }
    }
  },
  components:{
    pagination,
    pullDownList
  },
  methods:{
    switchTab(flag){
      this.nowTab = flag;
      this.isAddList = false;
      this.isShowSecurities = false;
      this.isShowQueryResult = false;
      if(flag == '1'){
        const url = 'http://10.25.24.51:10193/api/risk/attention_pool_set';
        const sendData = {
          userid: 'zhangxx',
          action: 'query'
        }
        this.$_axios.get(url, {
          params: sendData
        }).then(response => {
          // 显示查询结果
          const resultData = response.data.result.attention_list;
          console.log(resultData)
          this.poolList = resultData.map(item => {
            return {
              title: item,
              check: false
            }
          });
        }).catch(err => {
          console.log(err);
        });
      }
    },
    closeAttentionPool(){
      this.$store.state.isAttentionPool = false;
    },
    poolCheck(item, index){
      item.check = !item.check;
    },
    inputEventCheck(){
      this.queryIssuer.seccode = commonMethods.checkName(this.queryIssuer.seccode.trim());
      this.queryIssuer.secname = commonMethods.checkName(this.queryIssuer.secname.trim());
      this.querySecurities.issue = commonMethods.checkName(this.querySecurities.issue.trim());
      this.queryAddList.keyword = commonMethods.checkName(this.queryAddList.keyword.trim());
    },
    addToList(){
      const tempArr = [];
      const url = 'http://10.25.24.51:10193/api/risk/attention_pool_set'
      const sendData = {
        userid: 'zhangxx',
        action: 'insert',
        companytype: this.addListSendData.companytype,
        companylist: '',
      }
      this.nowAddListQueryData.forEach(item => {
        if(item.check){
          tempArr.push(item.title);
        }
      });
      sendData.companylist = tempArr.join(',');
      console.log(sendData)
      this.$_axios.get(url, {
        params: sendData
      }).then(response => {
        // 显示查询结果
        const resultData = response.data;
        console.log(resultData)
        if(resultData.code == '0'){
          alert('添加成功');
        } else if(resultData.code == '1') {
          alert('添加失败');
        } else {
          alert('无需添加');
        }
      }).catch(err => {
        console.log(err);
      });
    },
    addToListCheck(item, index){
      item.check = !item.check;
    },
    addListQuery(){
      this.isShowAddListQuery = false;
      this.isShowAddListPage = false;
      this.hasResultDataAddList = false;
      const url = 'http://10.25.24.51:10193/api/risk/attention_base_query';
      this.addListSendData = {
        companytype: this.queryAddList.companytype,
        keyword: this.queryAddList.keyword,
      }
      console.log('sendData',this.addListSendData)
      this.$_axios.get(url, {
        params: this.addListSendData
      }).then(response => {
        // 显示查询结果
        this.hasResultDataAddList = true;
        this.isShowAddListQuery = true;
        const resultData = response.data.result.result;
        this.addListQueryData = resultData.map(item => {
          return {
            check: false,
            title: item
          }
        });
        if(this.addListQueryData.length > 60){
          this.paginationData_list.page_Count = Math.floor(this.addListQueryData.length / 60)
          this.paginationData_list.total_Count = this.addListQueryData.length;
          this.nowAddListQueryData = this.addListQueryData.slice(0, 60);
          this.isShowAddListPage = true;
        } else {
          this.nowAddListQueryData = JSON.parse(JSON.stringify(this.addListQueryData));
          this.paginationData_list.page_Count = Math.floor(this.addListQueryData.length / 60)
          this.paginationData_list.total_Count = this.addListQueryData.length;
          this.isShowAddListPage = true;
        }
        console.log(resultData)
      }).catch(err => {
        console.log(err);
      });
    },
    clearList(){
      // http://localhost:10193/api/risk/attention_pool_set?userid=zhangxx &action=drop
      const sendData = {
        userid: 'zhangxx',
        action: 'drop'
      }
      this.$_axios.get('http://10.25.24.51:10193/api/risk/attention_pool_set', {
        params: sendData
      }).then(response => {
        // 显示查询结果
        console.log(response)
        if(response.status == 200 && response.data.msg === 'drop success'){
          this.poolList.forEach((item, index) => {
            this.poolList.splice(index);
          });
        }
      }).catch(err => {
        console.log(err);
      });
    },
    deleteList(){
      const url = 'http://10.25.24.51:10193/api/risk/attention_pool_set';
      const tempArr = [];
      const indexArr = [];
      const sendData = {
        userid: 'zhangxx',
        companylist: '',
        action: 'delete'
      }
      this.poolList.forEach((item, index) => {
        if(item.check){
          tempArr.push(item.title);
          indexArr.push(index);
        }
      });
      sendData.companylist = tempArr.join(',');
      if(sendData.companylist === '') return;
      console.log('sendData',sendData)
      this.$_axios.get(url, {
        params: sendData
      }).then(response => {
        // 显示查询结果
        console.log(response)
        if(response.status == 200 && response.data.msg === 'delete success'){
          const tempArr = JSON.parse(JSON.stringify(this.poolList));
          const tempArr2 = [];
          this.poolList.forEach((item,index) => {
            if(item.check){
              delete tempArr[index];
            }
          });
          tempArr.forEach(item => {
            if(item){
              tempArr2.push(item);
            }
          });
          this.poolList = JSON.parse(JSON.stringify(tempArr2));
        }
      }).catch(err => {
        console.log(err);
      });
    },
    queryIssuerEvent(){
      this.isShowSecurities = false;
      this.isShowQueryResult = false;
      this.isShowIssuer = false;
      const url = 'http://10.25.24.51:10193/api/risk/seccode_issue_mapper';
      const sendData = {
        seccode: this.queryIssuer.seccode,
        secname: this.queryIssuer.secname
      }
      if(!sendData.seccode && !sendData.secname){
        alert('请输入证券代码或简称');
        return;
      }
      console.log( 'sendData',sendData)
      this.$_axios.get( url, {
        params: sendData
      }).then(response => {
        // 显示查询结果
        console.log(response.data)
        const resultData =  response.data;
        if(resultData.msg === 'query success'){
          this.isShowSecurities = true;
          this.isShowQueryResult = true;
          console.log('',resultData.result.issue)
          if(!resultData.result.issue.length){
            this.queryIssuerData = [{issue: '无匹配', seccode: '无匹配', secname: '无匹配'}]
          } else {
            this.queryIssuerData = JSON.parse(JSON.stringify(resultData.result.issue));
            this.queryIssuerData = resultData.result.issue.map(item => {
              const issue = item.issue ? item.issue : '无匹配';
              const seccode = item.seccode ? item.seccode : '无匹配';
              const secname = item.secname ? item.secname : '无匹配';
              return {
                issue,
                seccode,
                secname
              }
              // return item = '发行人：' + issue + '； ' + '证券代码：' + seccode + '； ' + '证券简称：' + secname + '； '
            });
          }
        }else{
          this.isShowSecurities = true;
          this.isShowQueryResult = true;
          this.queryIssuerData = [{issue: '无匹配', seccode: '无匹配', secname: '无匹配'}]
        }
      }).catch(err => {
        this.isShowSecurities = true;
        this.isShowQueryResult = true;
        this.queryIssuerData = [{issue: '无匹配', seccode: '无匹配', secname: '无匹配'}]
      });
    },
    // 查询证券信息
    querySecuritiesEvent(){
      this.isShowQueryResult = false;
      const url = 'http://10.25.24.51:10193/api/risk/issue_seccode_mapper';
      const sendData = {
        issue: this.querySecurities.issue
      }
      console.log( 'sendData',sendData)
      this.$_axios.get( url, {
        params: sendData
      }).then(response => {
        // 显示查询结果
        this.isShowQueryResult = true;
        this.isShowIssuer = true;
        this.isShowSecurities = false;
        const resultData = response.data.result.seccodes_names;
        console.log(resultData)
        this.securitiesList = JSON.parse(JSON.stringify(resultData));
        this.paginationData.page_Count = Math.floor(this.securitiesList.length / 30)
        this.paginationData.total_Count = this.securitiesList.length;
        this.nowSecuritiesList = this.securitiesList.slice(0, 30);
      }).catch(err => {
        console.log(err);
      });
    },
    typeListEvent(...data){
      switch (data[0]) {
        case '股票发行人':
          this.queryAddList.companytype = 'S';
          break;
        case '债券发行人':
          this.queryAddList.companytype = 'B';
          break;
        case '基金管理人':
          this.queryAddList.companytype = 'F';
          break;
        case '新三板发行人':
          this.queryAddList.companytype = 'N';
          break;
      }
    },
    paginationSelect(number){
      this.nowSecuritiesPage = number;
      this.nowSecuritiesList = this.securitiesList.slice(this.nowSecuritiesPage * 30, (Number(this.nowSecuritiesPage) + 1) * 30);
    },
    paginationSelectList(number){
      this.nowAddListPage = number;
      this.nowAddListQueryData = this.addListQueryData.slice(this.nowAddListPage * 60, (Number(this.nowAddListPage) + 1) * 60);
    }
  },
  mounted(){
    const url = 'http://10.25.24.51:10193/api/risk/attention_pool_set';
    const sendData = {
      userid: 'zhangxx',
      action: 'query'
    }
    this.$_axios.get(url, {
      params: sendData
    }).then(response => {
      // 显示查询结果
      const resultData = response.data.result.attention_list;
      this.poolList = resultData.map(item => {
        return {
          title: item,
          check: false
        }
      });
    }).catch(err => {
      console.log(err);
    });
  }
}
</script>

<style lang="less" scoped>
.attentionPoolBox{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 3;
  >div{
    width: 100%;
    height: 100%;
    padding-top: 10px;
    padding-left: 100px;
    background: linear-gradient(#ffffff, #d7d7d7);;
  }
  .poolList{
    width: 700px;
    .checkBox{
      position: relative;
      cursor: pointer;
      .iconBox{
        position: absolute;
        display: inline-block;
        top: 5px;
        width: 12px;
        height: 12px;
        border-radius: 6px;
        border: 1px solid #797979;
        .dot{
          position: absolute;
          top: 1px;
          left: 1px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #797979;
        }
      }
    }
  }
  .poolBtnBox{
    margin-top: 20px;
    span{
      cursor: pointer;
      padding: 6px;
      margin-left: 20px;
      border: 1px solid #797979;
      border-radius: 5px;
    }
  }
  .queryBox{
    .top{
      width: 500px;
      height: 70px;
      border: 1px solid #797979;
    }
    input{
      width: 120px;
      height: 25px;
      line-height: 25px;
    }
    .queryBtn{
      padding: 5px;
      cursor: pointer;
      border: 1px solid #797979;
      border-radius: 5px;
      background-color: #f3f3f3;
    }
    .queryIssuerDataList{
      width: 1000px;
      height: 540px;
      th:nth-child(1){
        width: 100px;
      }
      th:nth-child(2){
        width: 400px;
      }
      th:nth-child(3){
        width: 300px;
      }
      li{
        float: left;
        margin-left: 30px;
        // width: 236px;
      }
    }
  }
  .addListBox{
    background-color: #fff;
    .addListQueryBox{
      width: 1000px;
      margin-top: 50px;
      li{
        width: 200px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
        border: 1px solid #797979;
        background-color: #fff;
      }
      li.active{
        background-color: rgba(0, 114, 255, 0.3);
      }
    }
  }
  .otherBox{
    input{
      width: 120px;
      height: 25px;
      line-height: 25px;
      border: 1px solid #797979;
    }
    .queryBtn{
      padding: 5px 15px;
      cursor: pointer;
      border: 1px solid #797979;
      border-radius: 5px;
      background-color: #f3f3f3;
    }
  }
}
.tab{
  line-height: 50px;
  h4{
    float: left;
    width: 200px;
    font-size: 24px;
    text-align: center;
    cursor: pointer;
    color: #fff;
    background: linear-gradient(#fc0000, #030000);
  }
  h4.active{
    background-color: rgba(0, 114, 255, 0.5);
  }
  .close{
    font-size: 40px;
    cursor: pointer;
    font-weight: 500;
  }
}
table {
  margin-top: 20px;
  border: 1px solid #797979;
  border-collapse: collapse;
  word-wrap: break-word;
  word-break: break-all;
  th {
    height: 40px;
    line-height: 40px;
    border: 1px solid #797979;
    background-color: #f0f5f9;
  }
  tr {
    overflow: hidden;
    border: 1px solid #797979;
  }
  td {
    text-align: center;
    vertical-align: middle;
    border: 1px solid #797979;
  }
  th:nth-child(1){
    width: 100px;
  }
  th:nth-child(2){
    width: 600px;
  }
}
</style>
