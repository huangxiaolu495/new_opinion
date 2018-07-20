<template>
  <div>
    <div class="sidebarBox">
      <ul>
        <li v-for="(item, index) of sidebarData" :key="index">
          <router-link @click.native="routerGoNow" :to="item.path">{{item.title}}</router-link>
        </li>
      </ul>
    </div>
    <!-- <div v-if="isRouterGoNow" class="content">
      <router-view></router-view>
    </div> -->
    <div class="queryCondition-top mr">
      <div class="queryCondition-title">子公司舆情监控</div>
      <div class="middle clearFloat">
        <div class="floatLeft mt20">
          <input type="text" class="input" v-model="queryCondition.fund_code" @input="inputCode" placeholder="请输入公司名称、人员、品牌名称等关键词">
        </div>
        <!-- 查询按钮 -->
        <div class="queryBtn">
          <span @click="query">查询</span>
        </div>
      </div>
       <div>数据筹备中，敬请期待！</div>
    </div>
  </div>
</template>

<script>
import pagination from '@/components/common/pagination'
import commonMethods from '@/common/common.js'

export default {
  data() {
    return {
      url: 'http://10.25.24.51:10192/api/rest/nlp/risk/funds_holding_stocks?',

      queryCondition: {
        page: 1,
        page_size: 10,
        is_negative: '',
      },
      sendData: {},
      paginationData: {
        parentEvent: 'paginationSelect',
        page_Count: 0,
        total_Count: 0,
        current: 1
      },
      sidebarData: [
        { title: '公司信息查询', path: '/monitor/subMonitoring' },
        { title: '我已关注的公司舆情', path: '/monitor/subconcerncompany' },
      ],
      dataList: [],
    }
  },
  components: {
    pagination
  },
  computed: {
  },
  methods: {
    paginationSelect(pageNumber) {
      const sendData = JSON.parse(JSON.stringify(this.sendData));
      const urlapi = "http://10.25.24.51:10192/api/rest/nlp/risk/funds_holding_stocks?";
      let url = urlapi
        + 'page=' + pageNumber + '&'
        + 'page_size=' + sendData.page_size + '&'
        + 'is_negative=' + sendData.is_negative + '&'
        + 'fund_code=' + sendData.fund_code;
      this.$_axios.get(url)
        .then(response => {
          this.dataList = JSON.parse(JSON.stringify(response.data.result.Announce_List));
          this.resultData = response.data.result.Announce_List;
          this.dataList.forEach(item => {
            item.SHOWTIME = item.SHOWTIME ? commonMethods.formatDateTime(new Date(item.SHOWTIME)) : '-';
            // item.CONTENT = item.CONTENT.replace("\\r\\n", "");
            if (item.CONTENT && item.CONTENT.length > 220) {
              item.CONTENT = `${item.CONTENT.slice(0, 220) + '...'}`;
              item.details = '...详情';
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    query() {
      if (this.queryCondition.fund_code == "" || this.queryCondition.fund_code == undefined) {
        // alert("请输入基金代码！");
      }
      else {
        this.isShowQueryResult = true;
        this.hasResultData = false;
        this.sendData = JSON.parse(JSON.stringify(this.queryCondition));
        const urlapi = "http://10.25.24.51:10192/api/rest/nlp/risk/funds_holding_stocks?";
        this.url = urlapi
          + 'page=' + this.sendData.page + '&'
          + 'page_size=' + this.sendData.page_size + '&'
          + 'is_negative=' + this.sendData.is_negative + '&'
          + 'fund_code=' + this.sendData.fund_code;
        this.$_axios.get(this.url)
          .then(response => {
            // 显示查询结果
            this.hasResultData = true;
            this.resultData = response.data.result.Announce_List;
            this.resultData.forEach(item => {
              item.CONTENT = item.CONTENT.toString().replace('[\u4e00-\u9fa5|0-9,-]+');
            });
            this.dataList = JSON.parse(JSON.stringify(this.resultData));
            this.paginationData.page_Count = response.data.result.Page_Count;
            this.paginationData.total_Count = response.data.result.Total_Count;
            this.dataList.forEach(item => {
              item.CONTENT = item.CONTENT.toString().replace('[\u4e00-\u9fa5|0-9,-]+');
              item.RELATECODE = item.RELATECODE;
              item.SOURCE = item.SOURCE;
              item.SHOWTIME = item.SHOWTIME ? commonMethods.formatDateTime(new Date(item.SHOWTIME)) : '-';
              if (item.CONTENT && item.CONTENT.length > 220) {
                item.CONTENT = `${item.CONTENT.slice(0, 220) + '...'}`
                item.details = '...详情';
              }
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    details(item, index) {
      if (item.details == '收起') {
        item.details = '...详情';
        item.CONTENT = item.CONTENT.slice(0, 220) + '...';
      } else {
        item.details = '收起';
        item.CONTENT = this.resultData[index].CONTENT;
      }
    },
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>
.mr {
  margin-left: 300px;
  margin-top: 20px;
  height: 110px;
}

.left {
  float: left;
  width: 220px;
  display: block;
}
.input {
  width: 300px !important;
  height: 30px;
  border: 1px solid #797979;
}

.mt20 {
  margin-top: 20px;
}

.mtl {
  margin-top: 20px;
  margin-left: 200px;
}

.sidebarBox {
  float: left;
  width: 235px;
  margin-top: 45px;
  margin-left: 50px;
  border: 1px solid #797979;
  li {
    width: 100%;
    height: 46px;
    line-height: 46px;
    text-align: center;
    border-bottom: 1px solid #797979;
    a {
      display: inline-block;
      width: 100%;
      height: 100%;
      color: #fff;
      text-decoration: none;
      background-color: #b50229;
    }
  }
  li:nth-last-child(1) {
    border-bottom: none;
  }
}

.content {
  float: left;
  width: 1180px;
  margin-top: 10px;
  margin-left: 25px;
}
</style>

