<template>
  <div>
    <div class="homePageMain clearFloat">
      <sidebar :prop="sidebarData"></sidebar>
      <div v-if="routerGoNow" class="homePageChildPage clearFloat">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import sidebar from './sidebar';
import homeContent from './homeContent';
export default {
  data() {
    return {
      isShowList: false,
      sidebarData: [
        { title: '新三板挂牌企业新闻预警', path: '/newthreeboard/homePage/homeContent', isShowList: false, list: [] },
        {          title: '新三板', isShowList: false, list: [
            {              title: '新闻预警', isShowList: false, path: '/newthreeboard/homePage/NEEQ_NewsMonitoring', list: [
                { title: '新三板持仓股票舆情监控', path: '/newthreeboard/homePage/NEEQ_NewsMonitoring' },
                // {title: '新闻收藏夹', path: '/monitor/homePage/NEEQ_favorite'}
              ]            },
            {              title: '最新动态', isShowList: false, path: '/newthreeboard/homePage/NEEQ_announcement', list: [
                { title: '通知公告', path: '/newthreeboard/homePage/NEEQ_announcement' },
                { title: '股转动态', path: '/newthreeboard/homePage/NEEQ_dynamic' }
              ]            },
            {              title: '监管公开信息', isShowList: false, path: '/newthreeboard/homePage/NEEQ_selfMeasures', list: [
                { title: '自律监管措施', path: '/newthreeboard/homePage/NEEQ_selfMeasures' },
                { title: '纪律处分', path: '/newthreeboard/homePage/NEEQ_punishment' },
                { title: '问询函', path: '/newthreeboard/homePage/NEEQ_inquiryLetter' },
              ]            }
          ]        },
      ]
    }
  },
  computed: {
    routerGoNow() {
      return this.$store.state.routerGoNow;
    }
  },
  components: {
    sidebar,
    homeContent
  },
  methods: {
    showList() {
      this.isShowList = !this.isShowList;
    }
  }
}
</script>
<style lang="less" scoped>
.homePageMain {
  width: 1719px;
}
.homePageChildPage {
  float: left;
  width: 1180px;
  margin-left: 65px;
  margin-top: 10px;
}
</style>

