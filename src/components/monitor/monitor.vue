<template>
  <div>
    <!-- 舆情监控 opinion monitor -->
    <div class="monitor_top clearFloat">
      <div class="floatLeft">
        <router-link to="/"><h1>中泰风险<span>预警</span>系统</h1></router-link>
      </div>
      <div class="floatRight userSystemBox">
        <span>我的账户 <i class="iconfont icon-icon_on_the_down"></i></span>
        <span class="pullDown">
          <p @click="enterUserSystem">系统管理</p>
          <p>我的收藏夹</p>
          <p @click="openAttentionPool">我的关注池</p>
          <p>注销</p>
        </span>
      </div>
    </div>
    <div class="homePageNav clearFloat">
      <div class="link-homePage">
        <router-link to="/monitor/homePage/homeContent">首页</router-link>
      </div>
      <div class="link-companyWarning">
        <router-link to="/monitor/companyWarning">关联公司预警</router-link>
      </div>
      <div class="link-subsidiryMonitoring">
        <router-link to="/monitor/subMonitoring">子公司舆情监控</router-link>
      </div>
      <div class="link-blackSwan">
        <router-link to="/monitor/blackSwan/delistingWarning">黑天鹅事件</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  data(){
    return {

    }
  },
  methods:{
    enterUserSystem(){
      this.$store.state.isShowUserSystem = true;
    },
    openAttentionPool(){
      this.$store.state.isAttentionPool = true;
    }
  },
  mounted(){
    const url = 'http://10.25.24.51:10193/api/risk/code_name_info';
    const sendData_N = {
      security_type: 'N'
    }
    const sendData_F = {
      security_type: 'F'
    }
    // 新三板-监管公开信息-自律监管措施
    for (let index = 0; index < 2; index++) {
      sendData_N.page = index;
      this.$_axios.get(url,{
        params:sendData_N
      }).then(response => {
        const resultData = response.data;
        if(resultData.msg === 'query success'){
          const dataList = JSON.parse(JSON.stringify(resultData.result.securitycodelist));
          this.$store.state.codeDataList_N.push(...dataList);
          console.log('自律监管措施',this.$store.state.codeDataList_N.length)
        }
      })
      .catch(err => {
        console.log(err);
      });
    }
    
    // 基金-公告预警
    for (let index = 0; index < 10; index++) {
      // this.$_axios.get(url,{
      //   params:sendData_F
      // }).then(response => {
      //   const resultData = response.data;
      //   if(resultData.msg === 'query success'){
      //     this.$store.state.codeDataList_F = JSON.parse(JSON.stringify(resultData.result.securitycodelist));
      //     console.log('公告预警',this.$store.state.codeDataList_F.length)
      //   }
      // })
      // .catch(err => {
      //   console.log(err);
      // });
    }
    this.$_axios.get(url,{
        params:sendData_F
      }).then(response => {
        const resultData = response.data;
        if(resultData.msg === 'query success'){
          this.$store.state.codeDataList_F = JSON.parse(JSON.stringify(resultData.result.securitycodelist));
          console.log('公告预警',this.$store.state.codeDataList_F.length)
        }
      })
      .catch(err => {
        console.log(err);
      });
    // 基金情况
    this.$_axios.get('http://10.25.24.51:10191/api/rest/nlp/query_stock_list?stock_type=F')
      .then(response => {
        if(response.data.msg === 'success'){
          this.$store.state.fundList = response.data.result.stock_list;
          console.log('基金情况',this.$store.state.fundList.length)
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}
</script>

<style lang="less" scoped>
.monitor_top{
  width: 1455px;
  h1{
    display: block;
    width: 243px;
    height: 49px;
    font-size: 28px;
    line-height: 49px;
    // font-style: oblique;
    margin-top: 20px;
    margin-left: 50px;
    padding-left: 10px;
    color: #000000;
    span{
        color: #FF6633
    }
  }
  .userSystemBox{
    position: relative;
    height: 25px;
    margin-top: 20px;
    margin-right: 30px;
    // background-color: #fff;
    span{
      display: inline-block;
      width: 100px;
      cursor: pointer;
    }
    .pullDown{
      display: none;
      position: absolute;
      top: 20px;
      left: -10px;
      text-align: center;
      background-color: #fff;
    }
  }
  .userSystemBox:hover{
    .pullDown{
      display: block;
    }
  }
}

.homePageNav{
    width: 1452px;
    height: 70px;
    font: 20px/70px Arial;
    color: #FFFFFF;
    margin-top: 10px;
    margin-left: 50px;
    padding-left: 233px;
    background-color: #B50229;
    border: 1px solid #797979;
    overflow: hidden;
    a{
        display: inline-block;
        width: 100%;
        height: 100%;
        padding: 0 20px;
        color: #FFFFFF;
        text-decoration:none;
    }
    a.router-link-active{
      // background-color: #6acdfd;
    }
    >div{
        float: left;
        width: 185px;
        height: 100%;
        text-align: center;
        cursor: pointer;
        border-left: 1px solid #797979;
    }
    >div:hover{
        background-color: #979797;
    }
    
    .link-homePage{
        // width: 140px;
    }
    .link-blackSwan{
        border-right: 1px solid #797979;
    }
}
</style>
