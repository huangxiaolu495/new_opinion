<template>
  <div class="attentionPoolBox">
    <div>
      <div class="tab">
        <h4 @click="switchTab(1)" :class="{active: nowTab == '1'}">我的关注池</h4>
        <h4 @click="switchTab(2)" class="marginLeft15" :class="{active: nowTab == '2'}">查找发行人</h4>
        <h4 @click="switchTab(3)" class="marginLeft15" :class="{active: nowTab == '3'}">发行人证券信息</h4>
        <!-- <span @click="closeAttentionPool" class="close marginLeft85">×</span> -->
        <span onclick="window.history.go(-1)" class="close marginLeft85">×</span>
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
        <!-- 右侧表单添加内容 -->
        <div class="my_content">
            <span class="news_content">相关新闻</span>
            <button @click="morenews">更多筛选>></button>
              <div v-show="ismorechoose" class="content_more">
                <div class="content_more_first">
                  <span>发行人:</span>
                  <div class="content_more_second">
                    <label for="quanbu"><input type="checkbox" id='quanbu' v-model="checked"  @click="checkedAll">全部</label><br>
                    <ul>
                      <!-- 复选框渲染 -->
                      <li v-for="(item , index) of sencondResult" :key="index"><label for="faxingren"><input type="checkbox" @click='btnCheck(item.value)' id="faxingren" v-model="checkboxModel" :value='item.id' >{{item.value}}</label></li>
                                                                                                                       <!-- @click='btnCheck(item,index)' -->
                    </ul>
                  </div>
                </div>
                <div>
                  <div class="floatLeft">
                    <date-picker :prop="startDatePicker" @startDateEvent="startDateEvent" ></date-picker>
                  </div>
                              <!-- 结束时间 -->
                  <div class="floatLeft">
                    <date-picker :prop="endDatePicker" @endDateEvent="endDateEvent"></date-picker>
                  </div>
                </div>
                          <!-- 查询按钮 -->
                <div class="queryBtn">
                  <span @click="query" class="btnquery">查询</span>
                </div>
            </div>
            <ul class="newUl">
              <li><span class="content_time_top">发布时间</span><span class="content_between_top">标题</span><span class="content_news_top">新闻来源</span></li>
              <li v-for="(item , index) of dataList" :key="index"><span class="content_time">{{item.showtime}}</span><span class="content_between"><a :href="item.purl">{{item.title}}</a></span><span class="content_news">{{item.source}}</span></li>
            </ul>
            <!-- <pagination :prop="paginationData" @paginationSelect="paginationSelect"></pagination> -->
             <pagination :prop="paginationData" @paginationSelect="paginationSelect"></pagination>
        </div>
       <!-- ------------------------------------------------------------------------------------------ -->
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
          <!-- <pagination :prop="paginationData" @paginationSelect="paginationSelect"></pagination> -->
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
import datePicker from '@/components/common/datePicker'
export default {
  data(){
       const now = new Date();
       const week = now.getTime() - 604800000;
    return {


      startDatePicker: {
        title: '日期：',
        parentEvent: 'startDateEvent',
        defaultDate: new Date(week)
      },
      endDatePicker: {
        title: '至：',
        parentEvent: 'endDateEvent',
        defaultDate: new Date()
      },
      ismorechoose:false,
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
      resultData:[],
      queryAddList:{
        companytype: 'S',
        keyword: '',
      },
      queryCondition:{
        start_date:'',
        end_date:''
      },
      //全选反选数据
      sencondResult:[],
      checkboxModel:[],
      // 全选反选数据
      checked:true,

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
      peopleDate:{
        companylist:[],
        userid: 'risk',
        start_date:'',
        end_date:'',
        pagesize: 10,
        page:0
      },
      sendData:{},
      dataList:[],
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
    pullDownList,
    datePicker
  },
  created(){
    const url = 'http://10.25.24.51:10193/api/risk/issue_news';
    const dateList = {
      userid: 'risk',
      start_date: '',
      end_date: '',
      companylist: ''
    }
    this.$_axios.get(url, {
          params: dateList
        }).then(response => {
          // 显示查询结果
          console.log(response);
          // this.resultData = response.data.result.result;
          // console.log(this.resultData)
                  // 显示查询结果
            this.hasResultData = true;
            this.dataList = JSON.parse(JSON.stringify(response.data.result.result))
            const resultData = response.data.result;
            console.log(resultData.total_count)
            console.log(this.dataList);
            // if (resultData.total_count) {
            //   this.paginationData.page_Count = Math.ceil(resultData.total_count / 10);
            // } else {
            //   this.paginationData.page_Count = 0;
            // }
            
            this.paginationData.page_Count = Math.ceil(resultData.total_count / 10);
            this.paginationData.total_Count = resultData.total_count;
            console.log("pc"+this.paginationData.page_Count);
          // this.poolList = resultData.map(item => {
          //   return {
          //     title: item,
          //     check: false
          //   }
          // });
        })
        // .catch(err => {
    //     //   console.log(err);
    //     // });
    // const newUrl = 'http://10.25.24.51:10193/api/risk/attention_pool_set';
    // const newDateList = {
    //       userid: 'risk',
    //       action: 'query'
    // }
    // this.$_axios.get(newUrl,{
    //   params: newDateList
    // }).then(response=>{
    //   //显示结果
    //   console.log(response)
    //   this.sencondResult = response.data.result.attention_list;
    //   this.sencondResult.unshift("全部")
    //   console.log(this.sencondResult);
    // })

  },
  watch: {//深度 watcher
  'checkboxModel': {
    handler: function (val, oldVal) { 
      if (this.checkboxModel.length === this.sencondResult.length) {
        this.checked=true;
      }else{
        this.checked=false;
      }
    },
    deep: true
  }
},
  methods:{
    //全选反选功能
      checkedAll() {
          var _this = this;
          console.log(this.checkboxModel);
          console.log(this.sencondResult)
          if (this.checked) {//实现反选
            _this.checkboxModel = [];
          }else{//实现全选
          console.log(_this.sencondResult)
          console.log(_this.checkboxModel);
            _this.checkboxModel = [];
            _this.sencondResult.forEach((v,i)=> {
              _this.checkboxModel.push(v.id);
            });
          }
          this.companylist = '';
       },




    btnCheck(item){
      console.log(item)
        this.peopleDate.companylist.push(item)
        // this.peopleDate.companylist = this.peopleDate.companylist.join(',')
      // this.peopleDate.companylist = this.peopleDate.companylist.join()
      console.log(this.peopleDate)
    },
    //点击更多显示
    morenews(){
      this.ismorechoose = !this.ismorechoose
              //   console.log(err);
        // });
        const newUrl = 'http://10.25.24.51:10193/api/risk/attention_pool_set';
        const newDateList = {
              userid: 'risk',
              action: 'query'
        }
        this.$_axios.get(newUrl,{
          params: newDateList
        }).then(response=>{
          //显示结果
          console.log(response)
          this.sencondResult = response.data.result.attention_list;

          let len = this.sencondResult.length
          
          for(let i = 1 ; i <= len ; i++ ){
            this.checkboxModel.push(i)
          }
          console.log(this.checkboxModel)
          // this.sencondResult.unshift("全部")
          this.sencondResult = this.sencondResult.map((v,i)=>{
            return {
              id: i + 1,
              value: v
            }
          })

          console.log(this.sencondResult);

        })
    },

    switchTab(flag){
      this.nowTab = flag;
      this.isAddList = false;
      this.isShowSecurities = false;
      this.isShowQueryResult = false;
      if(flag == '1'){
        const url = 'http://10.25.24.51:10193/api/risk/attention_pool_set';
        const sendData = {
          userid: 'risk',
          action: 'query'
        }
        this.$_axios.get(url, {
          params: sendData
        }).then(response => {
          // 显示查询结果
          console.log(response);
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
    query() {
      // const _year = 31536000000;
      // const _startDate = new Date(this.peopleDate.start_date).getTime()
      // const _endDate = new Date(this.peopleDate.end_date).getTime();
     
      // if (!this.peopleDate.start_date || !this.peopleDate.end_date) {
      //   alert('请输入日期时间段');
      //   return;
      // }
      // this.isShowQueryResult = true;
      // this.hasResultData = false;
      // this.sendData = this.selectList.parentEvent;
      // for (let key in this.peopleDate) {
      //   if (this.peopleDate[key] === '') {
      //     delete this.peopleDate[key];
      //   }
      // }
      // console.log(''===[])
      console.log(this.peopleDate)
      if(this.peopleDate.companylist){
          this.peopleDate.companylist = this.peopleDate.companylist.join(',')
      }
      
      console.log(this.peopleDate)
      // console.log(boolean([]))
       const searchUrl = 'http://10.25.24.51:10193/api/risk/issue_news'
     

      // this.sendData = JSON.parse(JSON.stringify(this.queryCondition));

      // console.log(this.sendData)
      // console.log(this.sendData);
      //  securiycode: 基金代码

        //  start_date:  公告开始日期

        // end_date: 公告结束日期

        // page: 第几页（从0开始），默认为0

        // pagesize:每页条数，默认为10条

        // notice_type: 公告类型
      this.$_axios.get(searchUrl, {
        params: this.peopleDate
      }).then(res => {
        console.log(res);
        this.resultData = res.data.result.result
        // console.log(res.data.result.result)

    //将数据companylist的字符串变成数组
        this.peopleDate.companylist = [];
        
        
        
        // console.log('基金 > 基本公告', res.data.result.result)
        // 显示查询结果
        // this.hasResultData = true;
        // this.dataList = JSON.parse(JSON.stringify(res.data.result.result))
        // console.log(this.dataList);

        // if (this.resultData.total_count) {
        //   this.paginationData.page_Count = Math.ceil(this.resultData.total_count / 10);
        // } else {
        //   this.paginationData.page_Count = 0;
        // }

        
      })


      // if (!this.queryCondition.start_date || !this.queryCondition.end_date) {
      //   alert('请输入日期时间段');
      //   return;
      // }
      // this.isShowQueryResult = true;
      // this.hasResultData = false;
      // this.sendData = this.selectList.parentEvent;
      // for (let key in this.sendData) {
      //   if (this.sendData[key] === '') {
      //     delete this.sendData[key];
      //   }
      // }
      // console.log('sendData', this.sendData)
      // this.$_axios.get(this.url, {
      //   params: this.sendData
      // }).then(response => {
        // 显示查询结果
        // this.hasResultData = true;
        // console.log('股票 > 股价异动预警', response.data.result);
        // this.dataList = JSON.parse(JSON.stringify(response.data.result.result));
        // this.resultData = response.data.result;
        // if (this.resultData.total_count) {
        //   this.paginationData.page_Count = Math.ceil(this.resultData.total_count / 10);
        // } else {
        //   this.paginationData.page_Count = 0;
        // }
        // this.paginationData.total_Count = this.resultData.total_count;
        
      // })
      //   .catch(err => {
      //     console.log(err);
      //   });
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
        userid: 'risk',
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
    paginationSelect(pageNumber) {
      const url = 'http://10.25.24.51:10193/api/risk/issue_news';
      const dateList = {
      userid: 'risk',
      start_date: '',
      end_date: '',
      companylist: ''
    }
      const sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.page = pageNumber - 1;
      console.log('sendData', sendData)
      this.$_axios.get(url, {
        params: dateList
      }).then(response => {
        console.log('股票 > 股价异动预警', response.data.result);
        this.dataList = JSON.parse(JSON.stringify(response.data.result.result));
        this.resultData = response.data.result;
      })
        .catch(err => {
          console.log(err);
        });
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
        userid: 'risk',
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
        userid: 'risk',
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

    startDateEvent(...data) {
      this.peopleDate.start_date = data[0];
    },
    endDateEvent(...data) {
      this.peopleDate.end_date = data[0];
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
        console.log(response.data )
        if(response.data.code == 0 && response.data.msg == 'query success'){
          const resultData = response.data.result.seccodes_names;
          this.securitiesList = JSON.parse(JSON.stringify(resultData));
          this.paginationData.page_Count = Math.floor(this.securitiesList.length / 30)
          this.paginationData.total_Count = this.securitiesList.length;
          this.nowSecuritiesList = this.securitiesList.slice(0, 30);
        } else {
          this.paginationData.page_Count = 0;
          this.paginationData.total_Count = 0;
          this.nowSecuritiesList = [];
        }
        
      }).catch(err => {
        console.log(err);
        this.isShowQueryResult = true;
        this.isShowIssuer = true;
        this.isShowSecurities = false;
        this.paginationData.page_Count = 0;
        this.paginationData.total_Count = 0;
        this.nowSecuritiesList = [];
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
      userid: 'risk',
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
    margin-top:100px;
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
  margin-left: 352px;
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
.my_content{
    // background-color:gray;
    // width: 524px;
    height: 584px;
    position: absolute;
    top: 84px;
    right: 60px;
}
.my_content ul span{
  display:inline-block;
  height: 50px;
  text-align: center

}
.content_time{
  width: 154px;
  height: 20px;
}
.content_between{
  height: 20px;
  width: 448px;
}
.content_news{
  height: 20px;
  width: 126px;
}
.content_time_top{
  width: 154px;
  height: 20px;
  line-height:50px;
  background-color: #F0F5F9;
}
.content_between_top{
  height: 20px;
  width: 448px;
  line-height:50px;
  background-color: #F0F5F9;
}
.content_news_top{
  height: 20px;
  width: 126px;
  line-height:50px;
  background-color: #F0F5F9;
}
.content_more{
  width: 510px;
  height:150px;
  border: 1px solid #000;
  margin-top:16px;
  padding-left: 26px;
  padding-top: 10px;

}
.content_more_second{
    margin-left: 60px;
    margin-top: -20px;
}
.content_more_second > ul{
  overflow: hidden;
}
.content_more_second > ul > li{
  margin-bottom:10px;
  float: left;
}
.content_more_second > ul >li.active{
  margin-right:20px;
}
.content_more_first{
  border-bottom:1px dashed #000;
  margin-bottom:10px;
}
.news_content{
  margin-right:376px;
}
.btnquery{
  border:1px solid #ccc;
  display:inline-block;
  border-radius: 5px;
  width:68px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  font-size:15px;
  margin-left:100px;
}
.newUl{
  margin-top:20px;
  height:1000px;
}

</style>
