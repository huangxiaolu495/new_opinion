<template>
  <div class="app">
    <div class="hag">
      <router-link to="/">
        <h1>中泰风险
          <span class="war_c">预警</span>系统
        </h1>
      </router-link>
    </div>
    <div class="div">
      <div class="clearfix mt40">
        <div class="left">
          <date-picker :prop="startDatePicker" @startDateEvent="startDateEvent"></date-picker>
        </div>
        <div class="left mttg">
          <date-picker :prop="endDatePicker" @endDateEvent="endDateEvent"></date-picker>
        </div>
        <div class="left ml60">
          关键字：<input type="text" placeholder="请输入" class="input" v-model="inputtext">
        </div>
        <div class="left">
          <div @click="query" class="queryBtn">查询</div>
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
              <td>{{item.publish_datetime}}</td>
              <td class="tableTd">
                <a :href="item.url" target="_bank">{{item.title}}</a>
              </td>
              <!-- <td>{{item.content}}</td> -->
              <td class="data-content">
                {{item.content}}
                <span @click="details(item, index)"> {{item.details}}</span>
              </td>
              <td>{{item.author}}</td>
              <td>{{item.detail_source}}</td>
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

</template>

<script>
import pullDownList from "@/components/common/pullDownList";
import pagination from '@/components/common/pagination'
import commonMethods from '@/common/common.js'
import datePicker from "@/components/common/datePicker";

export default {
  data() {
    return {
      url: "http://10.25.24.51:10191/api/rest/nlp/risk/leverage?",
      isShowQueryResult: false,
      hasResultData: false,
      inputtext: "",
      queryCondition: {
        page: 1,
        page_size: 10,
        from_date: '',
        to_date: '',
        keyword: ''
      },
      startDatePicker: {
        title: "日期：",
        parentEvent: "startDateEvent"
        // defaultDate: new Date()
      },
      endDatePicker: {
        title: "至：",
        parentEvent: "endDateEvent"
        // defaultDate: new Date()
      },
      sendData: {},
      paginationData: {
        parentEvent: 'paginationSelect',
        page_Count: 0,
        total_Count: 0,
        current: 1
      },
      titleData: ['日期', '标题', '正文', '作者', '来源'],
      dataList: [],
    };
  },
  components: {
    pullDownList,
    datePicker,
    pagination
  },
  methods: {
    details(item, index) {
      if (item.details == '收起') {
        item.details = '...详情';
        item.content = item.content.slice(0, 25) + '...';
      } else {
        item.details = '收起';
        item.content = this.resultData[index].content;
      }
    },
    startDateEvent(...data) {
      this.queryCondition.from_date = data[0];
      console.log(this.queryCondition);
    },
    endDateEvent(...data) {
      this.queryCondition.to_date = data[0];
    },
    paginationSelect(pageNumber) {
      const sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.page = pageNumber;
      console.log('sendData', sendData)
      this.$_axios.get(this.url, {
        params: sendData
      }).then(response => {
        this.dataList = JSON.parse(JSON.stringify(response.data.result.Announce_List));
        this.resultData = response.data.result.Announce_List;
        this.dataList.forEach(item => {
          item.title = item.title;
          // item.publish_datetime = item.publish_datetime ? commonMethods.formatDateTime(new Date(item.publish_datetime)) : '';
          item.author = item.author;
          item.detail_source = item.detail_source;
          if (item.content && item.content.length > 25) {
            item.content = item.content.slice(0, 25) + '...';
            item.details = '...详情';
          }
        });
      })
        .catch(err => {
          console.log(err);
        });
    },
    query() {
      this.isShowQueryResult = true;
      this.hasResultData = false;
      this.queryCondition.keyword = this.inputtext;
      this.sendData = JSON.parse(JSON.stringify(this.queryCondition));
      for (let key in this.sendData) {
        if (this.sendData[key] === '') {
          delete this.sendData[key];
        }
      }
      console.log('this.sendData', this.sendData)
      this.$_axios.get(this.url, {
        params: this.sendData
      }).then(response => {
        // 显示查询结果
        this.hasResultData = true;
        this.dataList = JSON.parse(JSON.stringify(response.data.result.Announce_List));
        this.resultData = response.data.result.Announce_List;
        console.log(this.resultData)
        this.paginationData.page_Count = response.data.result.Page_Count;
        this.paginationData.total_Count = response.data.result.Total_Count;
        this.dataList.forEach(item => {
          item.title = item.title;
          if (item.content && item.content.length > 25) {
            item.content = item.content.slice(0, 25) + '...';
            item.details = '...详情';
          }
          // item.publish_datetime = item.publish_datetime ? commonMethods.formatDateTime(new Date(item.publish_datetime)) : '';
          item.author = item.author;
          item.detail_source = item.detail_source;
        });
      })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.app {
  height: 800px;
  overflow-x: hidden;
  overflow-y: auto;
}

body {
  font-size: 14px;
  font-family: "Arial";
  color: #000000;
}
h1 {
  display: block;
  width: 243px;
  height: 49px;
  font-size: 28px;
  line-height: 49px;
  // font-style: oblique;
  margin-top: 20px;
  margin-left: 150px;
  padding-left: 10px;
  color: #000000;
  // background-color: #99FFFF;
  span {
    color: #ff6633;
  }
}
.div {
  min-width: 100%;
  display: block;
  border-bottom: solid 1px #888;
  position: relative;
  width: 1180px;
}
.war_c {
  color: red;
}
.clearfix {
  width: 100%;
  display: inline-block;
  margin-left: 200px;
}
.mt40 {
  margin-top: 40px;
}
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
  zoom: 1;
}

.left {
  float: left;
  width: 220px;
  display: block;
}
.input {
  width: 130px;
  height: 25px;
  border: 1px solid #797979;
}
.ml60 {
  margin-left: 40px;
}
.queryBtn {
  width: 75px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
  border: 1px solid #797979;
  background-color: #fff;
  border-radius: 5px;
  margin-top: -3px;
}
.mt10 {
  margin-top: 10px !important;
}
.queryResult {
  table {
    width: 1180px;
    margin-top: 30px;
    margin-left: 160px;
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
      width: 200px;
    }
    .tableTh:nth-child(2) {
      width: 250px;
    }
    .tableTh:nth-child(3) {
      width: 400px;
    }
    .tableTh:nth-child(4) {
      width: 200px;
    }
    .tableTh:nth-child(5) {
      width: 120px;
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
  }
}

.hag {
  height: 50px;
  background-color: #f0f0f0;
}

.mttg {
  margin-left: -63px;
  margin-right: -90px;
}
</style>



