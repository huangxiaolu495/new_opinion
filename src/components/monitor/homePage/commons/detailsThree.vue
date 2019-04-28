<template>
 <div class="body">
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
        <div class="relateRiskfa">
            <span class="relate_risk"><i class="iconfont icon-fengxian information_icon"></i>相关风险：</span>
        </div>
        <div class="queryResult">
            <table class="wholeNetwork">
              <tbody>
                <tr>
                  <th v-for="(item, index) of titleData" :key="index" class="tableTh" width:100px>{{item}}</th>
                </tr>
                <tr v-for="(item, index) of dataList.relate_comp_risks" :key="index">
                  <td id="tableTdOne"><a :href="dataList.newsurl" target="_blank">{{item.compname}}</a></td>
                  <td class="tableTd">{{item.indextypename}}</td>
                  <td class="tableTd">{{item.indexcodename}}</td>
                </tr>
              </tbody>
            </table>
            
        </div>
        <!-- <span>评论</span> -->
        <div class="commentAll">
            <div class="comtent"><i class="iconfont icon-pinglun"></i><a href="#ddd" class="comtentA">评论</a></div>
            <ul>
                <li  class="comment_li" v-for="(item,index) of commentData" :key="index" @mouseenter="mouseenter(index)" @mouseleave="mouseleave" :class="{active:index==isActive}">
                    <span @click="delCone(index)" class="delComent">删除</span>
                    <span class="comment_n">{{item.content}}</span><span class="comtent_user">{{item.username}}</span><span class="comtent_time">{{item.publishtime}}</span>
                </li>
            </ul>
            <div class="fenyepbox">
                <pagination  :prop="paginationData" @paginationSelect="paginationSelect"></pagination>
            </div>
        </div>
        <div  class="commtentAll">
            <div id="ddd" class="consultation"><i class="iconfont icon-pinglun1"></i>评论该新闻</div> <button @click="submit" class="submitComtent">发布</button>
            <textarea name="" id="textContent" cols="81" rows="8" v-model="textContents" style="resize:none"></textarea>
        </div>
        <div class="information">
            <div class="information_content"><i class="iconfont icon-jiandaoshou information_icon"></i>资讯处理状态</div>
        </div>
        <div class="processState">
        <span>您的处理状态为:</span> <span class="processMessage">{{preMessage}}</span> <span class="processHandle" @click="processHand">{{messageState}}</span>
            <div class="messageZi">
                <span v-for="(item,index) of messageStates" :key="index">{{item.userid}}、</span> <span v-if='messageStates.length > 0'>等已处理该条资讯</span> <span v-else>尚未有人员处理该条资讯</span>
            </div>
        </div>


    </div>


 </div>
</template>

<script>
import pagination from '@/components/common/pagination'
export default {
    data(){
        return{
            detailContent:true,
            messageLink:false,
            url:'http://10.25.26.194:10201/api/risk/finchina/primary_news_detail',
            queryCondition:{
                 newscode:'',
            },
            titleData:['公司名称','风险类型','详细类型'],
            sendData: {},
            dataList:{},
            commentData:[],
            textContents:'',
            isActive:null,
            paginationData: {
            parentEvent: 'paginationSelect',
            page_Count: 0,
            total_Count: 0,
            current: 1,
             },
            preMessage:'未处理',
            messageState:'标记为已处理',
            // stateMessage:true,
            messageStates:''
        }
    },
    components:{
        pagination
    },
    created(){
            console.log(this.$route.query.id)
        this.queryCondition.newscode = this.$route.query.id
        this.sendData = JSON.parse(JSON.stringify(this.queryCondition));
        console.log(this.sendData)
        console.log(this.url)
      this.$_axios.get(this.url, {
        params: this.sendData
      }).then(response => {
          console.log(response)
        this.dataList = JSON.parse(JSON.stringify(response.data));
        
        
      })
        .catch(err => {
          // console.log(err);
        });
    this.goon()
    this.msgState()


    },
    methods:{
        goon(){
            const  newUrl = "http://10.25.26.194:10201/api/risk/finchina/news_comment_query"  
            const sendDataNew = {
                newscode: this.$route.query.id,
                page:0,
                pagesize:3
            }
            let formData = new FormData()
            for(let key in sendDataNew){
                if(sendDataNew.hasOwnProperty(key)){
                    formData.append(key,sendDataNew[key])
                }
            }
            this.$_axios.post(newUrl,formData).then(res=>{
                console.log(res.data)
                if(res.data.code == 1){
                    alert('查看评论失败');
                    return;
                }
                if(res.data.code == 0){
                    console.log(res)
                    this.commentData = res.data.comments
                     this.paginationData.page_Count = Math.ceil(res.data.totalcount/3);
                    this.paginationData.total_Count = res.data.totalcount;
                }
            })
        },
        submit(){
            const url = 'http://10.25.26.194:10201/api/risk/finchina/news_comment_add'
            const sendData = {
                newscode:this.$route.query.id,
                userid:'risk',
                content:this.textContents
            }
            let formData = new FormData()
            for(let key in sendData){
                if(sendData.hasOwnProperty(key)){
                    formData.append(key,sendData[key])
                }
            }
            this.$_axios.post(url,formData).then(response=>{
                console.log(response)
                if(response.data.code == 1){
                    alert('添加评论失败')
                    return;
                }
                if(response.data.code == 0){
                    this.textContents =''
                    this.goon()
                }
            })
        },
        delCone(index){
            const url = "http://10.25.26.194:10201/api/risk/finchina/news_comment_del"

            let comid = this.commentData[index].commentid
            const sendData = {
                commentid:comid,
                userid:'risk'
            }
            let formData = new FormData()
            for(let key in sendData){
                if(sendData.hasOwnProperty(key)){
                    formData.append(key,sendData[key])
                }
            }
            this.$_axios.post(url,formData).then(res=>{
                console.log(res)
                if(res.data.code == 0){
                    alert('删除成功')
                    this.goon()
                }
            })

        },
        paginationSelect(pageNumber){
            const  newUrl = "http://10.25.26.194:10201/api/risk/finchina/news_comment_query"  
            const sendDataNew = {
                newscode: this.$route.query.id,
                page:pageNumber-1,
                pagesize:3
            }
            let formData = new FormData()
            for(let key in sendDataNew){
                if(sendDataNew.hasOwnProperty(key)){
                    formData.append(key,sendDataNew[key])
                }
            }
            this.$_axios.post(newUrl,formData).then(res=>{
                console.log(res.data)
                if(res.data.code == 1){
                    alert('查看评论失败');
                    return;
                }
                if(res.data.code == 0){
                    this.commentData = res.data.comments
                     this.paginationData.page_Count = Math.ceil(res.data.totalcount/3);
                    this.paginationData.total_Count = res.data.totalcount;
                }
            })
        },
        msgState(){
            const url = "http://10.25.26.194:10201/api/risk/finchina/news_checked_query"
            const sendMessageS = {
                newscode:this.$route.query.id
            }
            let formData = new FormData()
            for(let key in sendMessageS){
                if(sendMessageS.hasOwnProperty(key)){
                    formData.append(key,sendMessageS[key])
                }
            }
            this.$_axios.post(url,formData).then(response=>{
                console.log(response)
                if(response.data.code == 0){
                    this.messageStates = response.data.personname
                    console.log(this.messageStates)
                    if(response.data.checked == 1){
                        this.messageState = '取消标记'
                        this.preMessage ='处理'
                    }
                }
            })
        },
             //   鼠标移入
        mouseenter(index){
            // console.log(index)
                this.isActive = index;
                // console.log(this.isActive)
        },
            //   鼠标移除
        mouseleave(){
                this.isActive=null;
        },
        processHand(){
            // this.stateMessage = !this.stateMessage
            if(this.messageState == '取消标记'){
                this.messageState = '标记为已处理'
                this.preMessage = '未处理'
                const urlState = "http://10.25.26.194:10201/api/risk/finchina/news_checked_cancel"
                const sendMessages = {
                    newscode:this.$route.query.id,
                    userid:'risk'
                }
                let formData = new FormData()
                for(let key in sendMessages){
                    if(sendMessages.hasOwnProperty(key)){
                        formData.append(key,sendMessages[key])
                    }
                }
                this.$_axios.post(urlState,formData).then(res=>{
                    console.log(res)
                    if(res.data.code == 0){
                        alert('操作成功')
                        this.msgState()
                    }
                    
                })

            }else{
                this.messageState = '取消标记'
                this.preMessage = '处理'
                const urlHadle = "http://10.25.26.194:10201/api/risk/finchina/news_checked_add"
                const sendMessHandle = {
                  newscode:this.$route.query.id,
                  userid:'risk'
                }
                let formData = new FormData()
                    for(let key in sendMessHandle){
                        if(sendMessHandle.hasOwnProperty(key)){
                            formData.append(key,sendMessHandle[key])
                        }
                    }
                this.$_axios.post(urlHadle,formData).then(res=>{
                    console.log(res)
                    if(res.data.code == 0){
                        alert('已标记为处理')
                        this.msgState()
                    }
                    
                })
            }
        }

    }

   

}
</script>


<style scoped lang='less'>
.body{
    height: 1500px;
}
.fenyepbox{
    margin-top: 16px;
}
.messageZi{
    margin-top: 16px;
}
.processHandle{
    background-color: #b50229;
    display: inline-block;
    width: 92px;
    height: 23px;
    border: 1px solid #b50229;
    border-radius: 7px;
    text-align: center;
    margin-left: 34px;
    color: #fff;
    cursor: pointer;
}
.processMessage{
    height: 25px;
    /* background-color: #666; */
    display: inline-block;
    text-align: center;
    line-height: 24px;
    border-radius: 17px;
    border: 1px solid #666;
    width: 70px;
    margin-left: 18px;
    
}
.commentAll{
    margin-bottom: 38px;
}
.delComent{
position: absolute;
    top: 17px;
    right: -65px;
    cursor: pointer;
    text-align: center;
    line-height: 32px;
    width: 66px;
    height: 31px;
    border-radius: 9px;
    background-color: #b50229;
    font-size: 10px;
    display: none;
}
.comment_li{
    position: relative;
    height: 64px;
    cursor: pointer;
    margin-top: 12px;
    line-height: 61px;
    border-bottom: 1px solid #edf0f5;
}
.comtentA{
    color: #000
}
.comment_li.active{
    background-color: #e0e0e0;
    //   background: #f0f0f0 ;
      color: #fff;
}
.comment_li.active .delComent{
    display: block;
}
.comment_n{
    font-size: 18px;
    color: #666;
    width: 286px;
    display: inline-block;
}
.comtent_user{
    margin-left: 23px;
    font-size: 18px;
    color: #666;
}
.comtent_time{
    margin-left: 78px;
    color: #666;
    font-size: 18px;
}
.submitComtent{
    position: absolute;
    top: 132px;
    right: 5px;
    background-color: #b50229;
    width: 64px;
    width: #b50229;
    height: 24px;
    color: #fff;
    border-radius: 3px;
}
.commtentAll{
    position: relative;
    margin-bottom: 36px;
}
.iconfont{
    font-size: 18px;
    color: #b50229
}
.comtent{
    position: relative;
    font-size: 18px;
    font-weight: bolder;
    margin-bottom: 5px;
    border-bottom: 1px solid #d0d0d0
}
.comtent::after{
    position: absolute;
    bottom: -1px;
    left: 0;
    content: "";
    width: 80px;
    height: 2px;
    background-color: #f00;
}
.information_icon{
    font-size: 20px;
}
.consultation{
    position: relative;
    font-size: 18px;
    margin-bottom: 14px;
    font-weight: bolder;
    border-bottom: 1px solid #d0d0d0
}
.consultation::after{
     position: absolute;
    bottom: -1px;
    left: 0;
    content: "";
    width: 120px;
    height: 2px;
    background-color: #f00;   
}
.information_content{
    font-size: 18px;
    font-weight: bolder;
    margin-bottom: 14px;
    border-bottom: 1px solid #d0d0d0
}
.information{
    position: relative;
}
.information::after{
      position: absolute;
    bottom: 0px;
    left: 0;
    content: "";
    width: 132px;
    height: 2px;
    background-color: #f00;  
}

.queryResult{
    margin-top:10px;
    margin-bottom: 38px;
    table{
            width: 582px;
            margin-top: 14px;
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
        th:nth-child(1) {
        width: 193px;
        height: 40px;
        line-height: 40px;
        border: 1px solid #797979;
        background-color: #f0f5f9;
        }
        th:nth-child(2) {
        width: 100px;
        height: 40px;
        line-height: 40px;
        border: 1px solid #797979;
        background-color: #f0f5f9;
        }
        th:nth-child(3) {
        width: 264px;
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
        height: 54px;
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
    .relate_risk{
        display: inline-block;
        cursor: pointer;
        /* background-color: #b50229; */
        color: black;
        height: 27px;
        width: 111px;
        font-weight: bolder;
        font-size: 18px;
        text-align: center;
        line-height: 27px;
        position: absolute;
        /* margin-top: 1px; */
        top: 34px;
        left: 0px;

    }
    .relateRiskfa{
        position: relative;
        border-bottom: 1px solid #d0d0d0;
        width: 100%;
        height: 63px;
    }
    .relateRiskfa::after{
        position: absolute;
        content: '';
        bottom: -1px;
        left: 0px;
        width: 118px;
        height: 2px;
        background-color: #f00
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

