<template>
 <div>
    <div class="detail_top">
        <span  @click="detailShow(index)"  :class="{active:0 ==categoryIndex}">基本内容</span>
        <span  @click="messageShow"  :class="{active:1 ==categoryIndex}">关联信息</span>
    </div>
    <div class="detail_content" v-show='detailContent'>{{dataList.content}}</div>
    <div class="messagelink" v-show='messageLink'>
        <div class="messageLink_one">
            <ul>
                <li>关联基金代码</li>
                <li>关联基金类型</li>
                <li>交易市场</li>
                <li>公司名称</li>
                <li>{{dataList.relatecodes[0].SECURITYCODE}}</li>
                <li>{{dataList.relatecodes[0].SECURITYTYPE}}</li>
                <li>{{dataList.relatecodes[0].TRADEMARKET}}</li>
                <li>{{dataList.relatecodes[0].COMPAYCODE}}</li>
                <!-- <li></li>
                <li></li>
                <li></li>
                <li></li> -->
            </ul>
        </div>
        <table cellspacing='10'>
            <tr>
                <td>来源类型：</td>
                <td>{{dataList.sourcename}}</td>
            </tr>
            <tr>
                <td>重要性：</td>
                <td>{{dataList.importlevel}}</td>
            </tr>
            <tr>
                <td>发布主体：</td>
                <td>{{dataList.publishtype}}</td>
            </tr>
        </table>
    </div>
 </div>
</template>

<script>
export default {
    data(){
        return{
            detailContent:true,
            messageLink:false,
            url:'http://10.25.24.51:10193/api/risk/fund_announce_detail',
            queryCondition:{
                 id:'',
            },
            sendData: {},
            dataList:{},
            categoryIndex:0
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
            // console.log(this.$route.query.id)
        this.queryCondition.id = this.$route.query.id
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
        this.dataList = JSON.parse(JSON.stringify(response.data.result.news_detail));
        // this.resultData = response.data.result;
        console.log(this.dataList)
        
      })
        .catch(err => {
          // console.log(err);
        });
    },
    methods:{
        detailShow(){
            this.detailContent = true
            this.messageLink = false
            this.categoryIndex = 0

        },
        messageShow(){
            this.detailContent = false
            this.messageLink = true
            this.categoryIndex = 1
        }
    }
}
</script>


<style scoped>
    .detail_top{
        position: absolute;
        top: 171px;
        left: 425px;
    }
    span{
        display: inline-block;
        cursor: pointer;
        background-color: #D7D7D7;
        color:white;
        height: 27px;
        width: 84px;
        text-align: center;
        line-height: 27px;
    }
    span.active{
        background-color: #b50229;
    }

    .detail_content{
        position: absolute;
        border: 1px solid #000;
        top: 226px;
        left: 424px;
        width: 700px;
    }
    .messageLink_one > ul{
        border-right: 1px solid #000;
        border-bottom: 1px solid #000;
        overflow: hidden;
        width:590px;
        list-style: none;
    }
    .messageLink_one > ul > li{
        float: left;
        width:25%;
        height:64px;
        line-height: 64px;
        text-align: center;
        border-left:1px solid #000;
        border-top:1px solid #000;
    }

        .messageLink_one > ul > li:nth-child(9){
        height: 90px;
    }
        .messageLink_one > ul > li:nth-child(10){
        height: 90px;
    }
        .messageLink_one > ul > li:nth-child(11){
        height: 90px;
    }
        .messageLink_one > ul > li:nth-child(12){
        height: 90px;
    }
    .messagelink{
        position: absolute;
        top: 226px;
        left: 424px;
    }

</style>

