<template>
  <div>
    <div>
      <div class="queryCondition-top">
        <div class="queryCondition-title">新三板挂牌企业新闻预警</div>
        <div class="middle clearFloat">
          <!-- 查询条件框 -->
          <div>
            <div class="floatLeft">
              <date-picker :prop="startDatePicker" @startDateEvent="startDateEvent"></date-picker>
            </div>
            <div class="floatLeft">
              <date-picker :prop="endDatePicker" @endDateEvent="endDateEvent"></date-picker>
            </div>
          </div>
          <!-- 查询按钮 -->
          <div class="queryBtn">
            <span @click="query">查询</span>
          </div>
        </div>
      </div>
      <!-- 查询结果 -->
      <div v-if="isShowQueryResult" class="queryResult">
        <div v-if="hasResultData">
          <table>
            <thead>
              <th v-for="(item, index) of titleData" :key="index">{{item}}</th>
            </thead>
            <tbody>
              <tr v-for="(item, index) of dataList" :key="index">
                <td class="tableTd">{{item.NOTICEDATE}}</td>
                <td class="tableTd">{{item.NOTICETITLE}}</td>
                <td class="tableTd data-content">{{item.INFOBODYCONTENT}}
                  <span @click="details(item, index)">{{item.details}}</span>
                </td>
                <td class="tableTd">
                  <a :href="item.SOURCEURL" target="_bank">查看</a>
                </td>
                <td class="tableTd">{{item.SOURCENAME}}</td>
              </tr>
            </tbody>
          </table>
          <pagination :prop="paginationData" @paginationSelect="paginationSelect"></pagination>
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
import datePicker from '@/components/common/datePicker'
import keyword from '@/components/common/keyword'
import commonMethods from '@/common/common.js'
export default {
  data() {
    const oneDayAfter = new Date().getTime() - 86400000;
    return {
      url: '',
      isShowQueryResult: false,
      hasResultData: false,
      queryCondition: {
        keyword: '',
        page: 1,
        page_size: 10
      },
      sendData: {},
      startDatePicker: {
        title: '日期：',
        parentEvent: 'startDateEvent',
        defaultDate: new Date(oneDayAfter)
      },
      endDatePicker: {
        title: '至：',
        parentEvent: 'endDateEvent',
        defaultDate: new Date()
      },
      paginationData: {
        parentEvent: 'paginationSelect',
        page_Count: 0,
        total_Count: 0,
        current: 1
      },
      titleData: ['标题', '发布时间', '链接', '新闻来源'],
      dataList: [],
    }
  },
  components: {
    pullDownList,
    pagination,
    datePicker,
    keyword
  },
  methods: {
    query() {
      this.isShowQueryResult = false;
      this.hasResultData = false;
      this.sendData = JSON.parse(JSON.stringify(this.queryCondition));
      for (let key in this.sendData) {
        if (this.sendData[key] === '') {
          delete this.sendData[key];
        }
      }
      console.log('sendData', this.sendData)
      this.$_axios.get(this.url, {
        params: this.sendData
      }).then(response => {
        this.isShowQueryResult = true;
        this.hasResultData = true;
        this.dataList = JSON.parse(JSON.stringify(response.data.result.Announce_List));
        this.resultData = response.data.result.Announce_List;
        this.paginationData.page_Count = response.data.result.Page_Count;
        this.paginationData.total_Count = response.data.result.Total_Count;
      })
        .catch(err => {
          console.log(err);
        });
    },
    paginationSelect(pageNumber) {
      const sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.page = pageNumber;
      this.$_axios.get(this.url, {
        params: sendData
      }).then(response => {
        this.isShowQueryResult = true;
        this.hasResultData = true;
        this.dataList = JSON.parse(JSON.stringify(response.data.result.Announce_List));
        this.resultData = response.data.result.Announce_List;
      })
        .catch(err => {
          console.log(err);
        });
    },
    inputEvent() {
      this.queryCondition.keyword = commonMethods.checkName(this.queryCondition.keyword);
    },
    startDateEvent(...data) {
      this.queryCondition.from_date = data[0];
    },
    endDateEvent(...data) {
      this.queryCondition.to_date = data[0];
    },
  },
  mounted() {
    this.queryCondition.from_date = commonMethods.formatDateTime2(this.startDatePicker.defaultDate);
    this.queryCondition.to_date = commonMethods.formatDateTime2(this.endDatePicker.defaultDate);
  }
}
</script>

<style lang="less" scoped>
.queryConditionBox {
  width: 100%;
  height: 70px;
  margin-top: 30px;
  border-bottom: 1px solid #797979;
  > div {
    float: left;
  }
  input {
    width: 110px;
    height: 25px;
    text-align: left;
    line-height: 25px;
  }
  .queryBtn {
    width: 75px;
    height: 30px;
    margin-left: 200px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    border: 1px solid #797979;
    background-color: #fff;
    border-radius: 5px;
  }
}
.queryResult {
  table {
    width: 1180px;
    margin-top: 20px;
    border: 1px solid #797979;
    border-collapse: collapse;
    th {
      height: 40px;
      line-height: 40px;
      border: 1px solid #797979;
      background-color: #f0f5f9;
    }
    tr {
      border: 1px solid #797979;
    }
    td {
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
    .tableTd:nth-child(1) {
      width: 100px;
    }
    .tableTd:nth-child(2) {
      width: 150px;
    }
    .tableTd:nth-child(4) {
      width: 50px;
    }
    .tableTd:nth-child(5) {
      width: 120px;
    }
  }
}
</style>
