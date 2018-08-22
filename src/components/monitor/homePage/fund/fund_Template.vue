<template>
  <div>
    <!-- 股票 > 股价异动预警 -->
    <div>
      <div class="queryCondition-top">
        <div class="queryCondition-title"></div>
        <div class="middle clearFloat">
          <!-- 自定义模块 -->
            <div class="floatLeft">
              <pull-down-list :prop="modulesNameList" @modulesNameEvent='modulesNameEvent'></pull-down-list>
            </div>
          <!-- <div>
            <div class="floatLeft marginLeft10">
                <pull-down-list :prop="legislation" @legislationEvent='legislationEvent'></pull-down-list>
            </div>
          </div>   -->
        <!-- 公告类型 -->
        <div>
            <div class="floatLeft">
              <pull-down-list :prop="legislationList" @legislationEvent2='legislationEvent2'></pull-down-list>
            </div>
          </div>
          <div>
              <!-- 开始时间 -->
            <div class="floatLeft">
              <date-picker :prop="startDatePicker" @startDateEvent="startDateEvent"></date-picker>
            </div>
            <!-- 结束时间 -->
            <div class="floatLeft">
              <date-picker :prop="endDatePicker" @endDateEvent="endDateEvent"></date-picker>
            </div>
          </div>
          <!-- 测试用 -->
          <!-- 查询按钮 -->
          <div class="queryBtn">
            <span @click="query(queryType)">查询</span>
          </div>
        </div>
      </div>
      <div v-if="isShowQueryResult" class="queryResult">
        <div v-if="hasResultData">
          <table>
            <tbody>
       
              <tr>
                <th v-for="(item, index) of titleData" :key="index" class="tableTh" width:100px>{{item}}</th>
              </tr>
              <tr v-for="(item, index) of dataList" :key="index">
                <td><a target="_blank" :href="item.sourceurl">{{item.noticetitle}}</a></td>
                <td>{{item.noticedate}}</td>
                <td><button><router-link  target='_blank' :to="'/monitor/homePage/fundDetail?id='+ item.infocode">详情>></router-link></button></td>
              </tr>
            </tbody>
          </table>
          <!-- <pagination :prop="paginationData" @paginationSelect="paginationSelect"></pagination> -->
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
</template>

<script>
import pullDownList from '@/components/common/pullDownList'
import pagination from '@/components/common/pagination'
import commonMethods from '@/common/common.js'
import datePicker from '@/components/common/datePicker'

export default {
  data() {
    const now = new Date();
    const week = now.getTime() - 604800000;
    return {
      //url地址
      url: 'http://10.25.24.51:10193/api/risk/fund_announce_sector',
      isShowQueryResult: false,
      hasResultData: false,
      resultData: null,
      queryType: '板块一',
      queryCondition: {
        userid: '',  
        sector: '',
        notice_type: '',
        start_date: '',
        end_date: '',
        page: 0,
        page_size: 10,
      },
      startDatePicker: {
        title: '公告日期：',
        parentEvent: 'startDateEvent',
        defaultDate: new Date(week)
      },
      endDatePicker: {
        title: '至：',
        parentEvent: 'endDateEvent',
        defaultDate: new Date()
      },
      sendData: {},
      paginationData: {
        parentEvent: 'paginationSelect',
        page_Count: 0,
        total_Count: 0,
        current: 1
      },
      modulesNameList: {
        title: '板块名：',
        parentEvent: 'modulesNameEvent',
        default: '请选择',
        listWidth: 143,
        nowSelectWidth: 145,
        nowSelectHeight: 25,
        nowSelectFontSize: 13,
        list: []
      },
      listtemp:[
          {
            code:"002",
            content:"基金",
          },
          {
            code:"002001",
            content:"基金招募及设立",
          },
          {
            code:"002002",
            content:"基金定期报告",
          },
          {
            code:"002002001",
            content:"年度报告",
          },
          {
            code:"002002002",
            content:"半年度报告",
          },
          {
            code:"002002004",
            content:"基金资产净值公告",
          },
          {
            code:"002002006",
            content:"其他报告",
          },
          {
            code:"002003",
            content:"基金当事人公告",
          },
          {
            code:"002003001",
            content:"基金管理人、基金托管人的重大人事变动",
          },
          {
            code:"002003002",
            content:"基金管理人股东及其出资比例发生变更",
          },
          {
            code:"002003003",
            content:"基金管理人、基金托管人或其高管人员受调查或处罚",
          },
          {
            code:"002003004",
            content:"重大诉讼、仲裁事项",
          },
          {
            code:"002003005",
            content:"基金管理人或基金托管人变更",
          },
          {
            code:"002003006",
            content:"基金管理人、基金托管人的法定名称、住所发生变更",
          },
          {
            code:"002003007",
            content:"基金改聘会计师事务所",
          },
          {
            code:"002003008",
            content:"代销机构变更",
          },
          {
            code:"002003009",
            content:"基金更换注册登记机构",
          },
          {
            code:"002003010",
            content:"重大关联交易事项",
          },
          {
            code:"002004",
            content:"基金运作公告",
          },
          {
            code:"002004001",
            content:"基金提前终止",
          },
          {
            code:"002004002",
            content:"延长基金合同期限",
          },
          {
            code:"002004004",
            content:"转换基金运作方式",
          },
          {
            code:"002004005",
            content:"基金高管变更",
          },
          {
            code:"002004006",
            content:"召开基金持有人大会的通知",
          },
          {
            code:"002004007",
            content:"基金份额持有人大会表决结果的公告",
          },
          {
            code:"002004008",
            content:"基金份额净值计价错误公告",
          },
          {
            code:"002004009",
            content:"基金费率",
          },
          {
            code:"002004012",
            content:"基金收益分配事项",
          },
          {
            code:"002004013",
            content:"申购及赎回事项",
          },
          {
            code:"002004014",
            content:"不定期折算",
          },
          {
            code:"002004015",
            content:"风险提示公告",
          },
          {
            code:"002005",
            content:"其他公告",
          },
          {
            code:"002005001",
            content:"澄清公告",
          },
          {
            code:"002005002",
            content:"基金其他公告",
          },
      ],
      titleData: ['公告标题','公告日期','详情'],
      dataList: [],
      legislationList: {
        title: '公告类型：',
        parentEvent: 'legislationEvent2',
        default: '全部',
        listWidth: 200,
        nowSelectWidth: 215,
        nowSelectHeight: 25,
        nowSelectFontSize: 13,
        list: [
          '基金',
          '基金招募及设立',
          '基金定期报告',
          '年度报告',
          '半年度报告',
          '基金资产净值公告',
          '其他报告',
          '基金当事人公告',
          '基金管理人、基金托管人的重大人事变动',
          '基金管理人股东及其出资比例发生变更',
          '基金管理人、基金托管人或其高管人员受调查或处罚',
          '重大诉讼、仲裁事项',
          '基金管理人或基金托管人变更',
          '基金管理人、基金托管人的法定名称、住所发生变更',
          '基金改聘会计师事务所',
          '代销机构变更',
          '基金更换注册登记机构',
          '重大关联交易事项',
          '基金运作公告',
          '基金提前终止',
          '基金参与非公开发行',
          '基金估值方法调整',
          '延长基金合同期限',
          '转换基金运作方式',
          '基金高管变更',
          '召开基金持有人大会的通知',
          '基金份额持有人大会表决结果的公告',
          '基金份额净值计价错误公告',
          '基金费率',
          '基金收益分配事项',
          '申购及赎回事项',
          '不定期折算',
          '风险提示公告',
          '其他公告',
          '澄清公告',
          '基金其他公告'
        ]
      },
     legislation: {
        title: '自定义模块：',
        parentEvent: 'legislationEvent',
        default: '板块一',
        listWidth: 100,
        nowSelectWidth: 115,
        nowSelectHeight: 25,
        nowSelectFontSize: 13,
        list: [
            '板块一',
            '版块二'
        ]
      }
    }
  },
  components: {
    pullDownList,
    pagination,
    datePicker
  },
    //获取板块名称 进入页面发送请求
  created(){
      const url = 'http://10.25.24.51:10189/api/risk/sector_set/query'
      const sendData = {
        userid: 'risk'
      };
      console.log(sendData)
      this.$_axios.get(url, {
        params: sendData
      }).then((response) => {
        if (!response.data) {
          this.modulesNameList.list = [];
          this.modulesNameList.default = '没有可选择板块';
          this.sector = '';
        } else {
          if (response.data.code == '0') {
            console.log(response.data.sectorlist)
            this.modulesNameList.list = JSON.parse(JSON.stringify(response.data.sectorlist));
            this.modulesNameList.default = response.data.sectorlist[0];
            this.sector = response.data.sectorlist[0];
          } else {
            this.modulesNameList.list = [];
            this.modulesNameList.default = '没有可选择板块';
            this.sector = '';
          }
        }
      }).catch((err) => {

      });
  

  },
  methods: {
    inputEvent() {
      const numberReg = /^[0-9]*$/;
      this.queryCondition.sec_code = commonMethods.checkName(this.queryCondition.sec_code.trim());
      let arr = this.queryCondition.sec_code.split('');
      let arr2 = [];
      // console.log(arr)
      arr.forEach(item => {
        if (numberReg.test(item)) {
          arr2.push(item)
        }
      });
      // console.log(arr)
      this.queryCondition.sec_code = arr2.join('');
    },
    //
    modulesNameEvent(...data) {
      this.sector = data[0];
      console.log(data[0])
      this.queryCondition.sector = data[0]
    },
    legislationEvent(data) {
        this.queryCondition.sector = data
    },
    legislationEvent2(data) {
      let code = this.listtemp.find(v => {
        return v.content === data;
      })
      console.log(code)
      this.queryCondition.notice_type = code.code;  
     
      
    },
    paginationSelect(pageNumber) {
      const sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.page = pageNumber - 1;
      // console.log('sendData', sendData)
      this.$_axios.get(this.url, {
        params: sendData
      }).then(response => {
        // console.log('股票 > 股价异动预警', response.data.result);
        this.dataList = JSON.parse(JSON.stringify(response.data.result.result));
        this.resultData = response.data.result;
      })
        .catch(err => {
          // console.log(err);
        });
    },
    query() {
      const _year = 31536000000;
      const _startDate = new Date(this.queryCondition.start_date).getTime()
      const _endDate = new Date(this.queryCondition.end_date).getTime()

      if (!this.queryCondition.start_date || !this.queryCondition.end_date) {
        alert('请输入日期时间段');
        return;
      }
      console.log(this.queryCondition.sector)
      if(!this.queryCondition.sector){
        alert('请选择模块名');
        return;
      }

      
      this.isShowQueryResult = true;
      this.hasResultData = false;
      // this.sendData = this.selectList.parentEvent;
      // console.log(this.queryCondition)
      this.sendData = JSON.parse(JSON.stringify(this.queryCondition));
      this.sendData.userid = 'risk';
      this.sendData.notice_type = '002'
      console.log(this.sendData)
      // for (let key in this.sendData) {
      //   if (this.sendData[key] === '') {
      //     delete this.sendData[key];
      //   }
      // }
      // console.log(this.url)
      // console.log('sendData', this.sendData)
      this.$_axios.get(this.url, {
        params: this.sendData
      }).then(response => {
        // 显示查询结果
        console.log(response)
        this.hasResultData = true;
        // console.log('基金', response.data.result);
        this.dataList = JSON.parse(JSON.stringify(response.data.result.result));
        // console.log(this.dataList);
        // console.log(this.dataList)
        this.resultData = response.data.result;
        // if (this.resultData.total_count) {
        //   this.paginationData.page_Count = Math.ceil(this.resultData.total_count / 10);
        // } else {
        //   this.paginationData.page_Count = 0;
        // }
        // this.paginationData.total_Count = this.resultData.total_count;
      })
        // .catch(err => {
        //   // console.log(err);
        // });
    },
    threshold() {
      let threshold = parseFloat(this.queryCondition.threshold);
      // console.log(threshold)
      if (threshold.toString() === 'NaN' || threshold.toString() === 'Infinity' || threshold > 999999) {
        this.queryCondition.threshold = 0;
      } else {
        this.queryCondition.threshold = threshold;
      }
    },
    startDateEvent(...data) {
      this.queryCondition.start_date = data[0];
    },
    endDateEvent(...data) {
      this.queryCondition.end_date = data[0];
    },
  },


  mounted() {
    this.queryCondition.start_date = commonMethods.formatDateTime2(this.startDatePicker.defaultDate);
    this.queryCondition.end_date = commonMethods.formatDateTime2(new Date());
  }
}
</script>

<style lang="less" scoped>
.queryResult {
  table {
    width: 1180px;
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
      height: 84px;
      text-align: center;
      vertical-align: middle;
      border: 1px solid #797979;
    }
    .data-content {
      position: relative;
      text-align: left;
      span {
        position: absolute;
        bottom: 0;
        right: 0;
        cursor: pointer;
        color: blue;
      }
    }
    .tableTh:nth-child(1) {
      width: 145px;
    }
    .tableTh:nth-child(2) {
      width: 80px;
    }
    .tableTh:nth-child(3) {
      width: 90px;
    }
    .tableTh:nth-child(4) {
      width: 90px;
    }
  }
}
.fallstop-left{
  margin-left: 20px;
  position: relative;
}
.dieting{
  position: absolute;
  top: 0px;
  right: -32px;
}
.queryDown{
    margin-left:150px;
}
</style>
