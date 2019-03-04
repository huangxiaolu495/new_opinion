<template>
 <div>
    <div class="detail_top">
        <!-- <span  @click="detailShow()"  :class="{active:0 ==categoryIndex}" >基本内容</span> -->
        <!-- <span  @click="messageShow"  :class="{active:1 ==categoryIndex}">关联信息</span> -->
        <!-- <span onclick="window.opener=null;window.close()" class="return_back">关闭</span> -->
    </div>
    <i onclick="window.opener=null;window.close()" class="return_back">×</i>
    <div class="messagelink">
        <div class="messageLink_one">
            <ul>
                <li>日期：</li>
                <li>{{dataList.publishdate}}</li>
                <li>来源：</li>
                <li>{{dataList.newssource}}</li>
                <li>作者：</li>
                <li>{{dataList.newsauthor}}</li>
            </ul>
        </div>
        <span>相关风险：</span>
        <div class="queryResult">
            <table class="wholeNetwork">
              <tbody>
                <tr>
                  <th v-for="(item, index) of titleData" :key="index" class="tableTh" width:100px>{{item}}</th>
                </tr>
                <tr v-for="(item, index) of dataList.relate_comp_risks" :key="index">
                  <td><a :href="dataList.newsurl" target="_blank">{{item.compname}}</a></td>
                  <td class="tableTd">{{item.indextypename}}</td>
                  <td class="tableTd">{{item.indexcodename}}</td>
                  <!-- <td class="data-content">
                    <p v-for="(i,e) of item.securitycodes"  :key="e">{{i}}</p>
                    <span @click="details(item, index)" >{{item.details}}</span>
                  </td>
                  <td class="data-content">
                    <p v-for="(i,e) of item.companynames" :key="e">{{i}}</p>
                    <span @click="detailsxi(item,index)">{{item.detailsxi}}</span>
                  </td>
                  <td>{{item.medianame}}</td>
                  <td></td> -->
                </tr>
              </tbody>
            </table>
        </div>
    </div>


 </div>
</template>

<script>
export default {
    data(){
        return{
            detailContent:true,
            messageLink:false,
            url:'http://10.25.24.51:10201/api/risk/finchina/primary_news_detail',
            queryCondition:{
                 newscode:'',
            },
            titleData:['公司名称','风险类型','详细类型'],
            sendData: {},
            dataList:{},
            // categoryIndex:0,
        }
    },
    created(){
        //  this.id = window.location.search
        // console.log(this.id);
            //  getUrlParms(name){
            // var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            // var r = window.location.search.substr(1).match(reg);
            // if(r!=null)
            // return unescape(r[2]);
            // return null;
            // }
            // var id = getUrlParms("id");
            console.log(this.$route.query.id)
        this.queryCondition.newscode = this.$route.query.id
        this.sendData = JSON.parse(JSON.stringify(this.queryCondition));
        // this.sendData.id = 'AN201706060627564480'
        console.log(this.sendData)
        console.log(this.url)
        //发送请求
      this.$_axios.get(this.url, {
        params: this.sendData
      }).then(response => {
          console.log(response)
        // console.log('股票 > 股价异动预警', response.data.result);
        this.dataList = JSON.parse(JSON.stringify(response.data));
        // this.resultData = response.data.result;
        
        
      })
        .catch(err => {
          // console.log(err);
        });
    },
    // methods:{
    //     detailShow(){
    //         console.log(this.$route.path)
    //         this.detailContent = true
    //         this.messageLink = false
    //         this.categoryIndex = 0

    //     },
    //     messageShow(){
    //         this.detailContent = false
    //         this.messageLink = true
    //         this.categoryIndex =1
    //     }
    // }
}
</script>


<style scoped lang='less'>

.queryResult{
    margin-top:26px;
    table{
            width: 582px;
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
    
    }
}
    .detail_top{
        position: absolute;
        top: 78px;
        left: 425px;
    }
    .detail_top span{
        width: 140px;
        height: 46px;
        line-height: 46px;
        display: inline-block;
    }
    span{
        display: inline-block;
        cursor: pointer;
        background-color: #b50229;
        color:white;
        height: 27px;
        width: 84px;
        text-align: center;
        line-height: 27px;
        position: absolute;
        top: 64px;
        left: 0px;
    }
    span.active{
        background-color: #b50229;
    }

    .detail_content{
        position: absolute;
        border: 1px solid #000;
        top: 128px;
        left: 784px;
        width: 700px;
    }
    .messageLink_one > ul{
        /* border-right: 1px solid #000; */
        /* border-bottom: 1px solid #000; */
        /* overflow: hidden; */
        width: 581px;
        background-color: #F0F5F9;
        height: 65px;
        /* list-style: none; */
    }
    .messageLink_one > ul > li{
        float: left;
        /* width:25%; */
        height:64px;
        line-height: 64px;
        text-align: center;
        /* border-left:1px solid #000;
        border-top:1px solid #000; */
    }

        .messageLink_one > ul > li:nth-child(1){
          padding-left:60px
    }
        .messageLink_one > ul > li:nth-child(3){
        padding-left:60px
    }

        .messageLink_one > ul > li:nth-child(5){
        padding-left:60px;
    }

    .messagelink{
        position: absolute;
        top: 130px;
        left: 658px;
    }
    /* .detail_top .close{
    font-size: 40px;
    cursor: pointer;
    font-weight: 500;
  } */
  .return_back{
      font-size:70px;
      position: absolute;
      top: 0px;
      right: 100px;
      cursor: pointer;
      color: #b50229;
  }

</style>

