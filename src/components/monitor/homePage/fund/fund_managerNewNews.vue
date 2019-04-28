<template>
  <div>
    <div>
      <div @click='inputNone'>
        <div class="queryCondition-top">
          <div class="queryCondition-title">基金管理人新闻(新)</div>
          <div class="middle clearFloat">
            <!-- 查询条件框 -->
            <div class="width1100">
              <div class="floatLeft">
                <date-picker :prop="startDatePicker" @startDateEvent="startDateEvent"></date-picker>
              </div>
              <div class="floatLeft marginLeft10">
                <date-picker :prop="endDatePicker" @endDateEvent="endDateEvent"></date-picker>
              </div>
            <div class="floatLeft">
              <pull-down-list-five :prop="modulesNameList" @modulesNameEvent='modulesNameEvent'></pull-down-list-five>
            </div>  
              <div class="floatLeft">
                <div class="nowConditionStarBox floatLeft marginLeft10">
                  <div class="floatLeft">
                    重要性：
                  </div>
                  <!-- <div class="starBg condition floatLeft">
                    <span @click="conditionStar(item)" v-for="item of starNumber" :key="item" class="iconfont icon-star"></span>
                  </div>
                  <div class="nowConditionStar">
                    <span v-for="item of conditionStarNumber" :key="item" class="iconfont icon-xingxing"></span>
                  </div> -->
                      <el-tree
                        :data="data2"
                        show-checkbox
                        node-key="id"
                        ref="tree"
                        auto-expand-parent 
                        :default-expanded-keys="[2, 3]"
                        :default-checked-keys="[]"
                        :props="defaultProps"
                                             >
                      </el-tree>
                    <el-button @click="getCheckedKeys" style="display:none">通过 key 获取</el-button>
                </div>
              </div>         
            </div>
            <div class="pianyi">
              <div class="floatLeft">
                <div @click="checkRiskType" class="checkBox floatLeft">
                  <!-- <span class="iconBox">
                    <i v-show="isShowTypeList" class="dot"></i>
                  </span> -->
                  
                  <span class="marginLeft5">风险类别</span>
                </div>
              </div>
              <!-- <div class="floatLeft">
                <div class="checkBox floatLeft marginLeft20"> -->
                  <!-- @click="checkFinished" -->
                  <!-- <span class="iconBox">
                    <i v-show="isFinished" class="dot"></i>
                  </span> -->
                  <!-- <span class="marginLeft20">是否处理：</span>
                  <span @click="checkFinished(true)">
                    是
                    <span class="iconBox">
                      <i v-show="isFinished" class="dot"></i>
                    </span>
                  </span>
                  <span @click="checkFinished(false)">
                    否
                    <span class="iconBox">
                      <i v-show="!isFinished" class="dot"></i>
                    </span>
                  </span>
                </div>
              </div> -->
              <!-- <div class="floatLeft">
                <div @click="negNew" class="checkBox floatLeft marginLeft10">
                  <span class="iconBox">
                    <i v-show="isShowNgenew" class="dot"></i>
                  </span>
                  <span class="marginLeft5">负面新闻</span>
                </div>
              </div> -->

              <!-- <div class="floatLeft marginLeft20">
                <div class="uploadFiles">
                  <label for="fileExport">上传文件(csv、txt)等
                    <span class="fileExportBtn">{{selectFileName}}</span>
                  </label>
                  <span v-if="selectFileName !== '选择文件'" @click="clearFile" class="clearFile">清除文件</span>
                  <input type="file" id="fileExport" @change="handleFileChange($event)" ref="inputer">
                </div>
              </div> -->
              <div class="floatLeft marginTwo">
                <pull-down-list-three :prop="legislationListThree" @legislationEventThree='legislationEventThree'></pull-down-list-three>
              </div> 
              <div class="floatLeft marginTwo">
                <pull-down-list-two :prop="legislationListTwo" @legislationEventTwo='legislationEventTwo'></pull-down-list-two>
              </div>  
              <!-- 关键字部分 -->
              <div v-if='comnameMatch !="公司名称"' class="floatLeft">
                <keyword @keywordEvent="keywordEvent"></keyword>
              </div> 
              <div v-else class="floatLeft">
                <div class="pullDown" @click.stop>
                  <input type="text" v-model="nowQuite" @input="inputmethod" class="inputNow">
                  <span v-show="isShowDropDownList" ref="inputContent" class="drop-down-box">
                    <span v-for="(item, index) of dropDownList" :key="index" @click="dropDownEvent(item)">{{item.compname}}</span>
                  </span>
                </div>
              </div>
            </div>
            <div ref='mask' class="cover">
              <div class="cover_show">
                  <div @click='mask_close' class="mask_close"><i class="iconfont icon-shanchu"></i></div>
                  <div class="modulesNameListy">
                    <pull-down-list-six :prop="modulesNameListy" @modulesNameEventy='modulesNameEventy'></pull-down-list-six>
                  </div>  
                  <button @click="export_mask" class="mask_button">导出</button>
              </div>
              
            </div>
            <!-- 查询按钮 -->
            <div class="queryBtn">
              <span @click="query">查询</span>
            </div>
            <div class="Collection">
              <span @click='collect'>收藏</span>
            </div>
            <div class="Collection">
              <span @click='export_bond'>导出</span>
            </div>
          </div>
        </div>
        <!-- 风险类型选择 -->
        <div v-if="isShowTypeList && isShowTypeBox" class="typeBox clearFloat">
          <div class="firstTypeBox">
            <ul class="clearFloat">
              <li v-for="(item,index) of firstTypeList" :key="index" @click="checkFirstType(item,index)">
                <div>
                  <span>
                    <i v-show="!item.checked" class="iconfont  icon-right-circle"></i>
                    <i v-show="item.checked" class="iconfont icon-down-circle"></i>
                  </span>
                  <span class="firstType">{{item.riskname}}</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="typeBtnBox">
            <span @click="confirmType()">确定</span>
            <span @click="resetType()">重置</span>
          </div>
          <div class="secondTypeBox">
            <ul class="clearFloat">
              <li v-for="(item,index) of secondTypeList" :key="index" class="clearFloat">
                <div v-show="item.checked" class="firstItem">
                  <div class="firstTitle">
                    {{item.riskname}}：
                  </div>
                  <span @click='allfan(item)' class="iconBox1">
                     <i v-show='item.check' class="iconfont icon-queren"></i>
                  </span>
                  <!-- <span class="iconfont"></span> -->
                  <div class="listBox">
                    <ul class="clearFloat">
                      <li v-for="(secondItem,secondIndex) of item.list" :key="secondIndex" @click="checkSecondType(secondItem,secondIndex)" class="secondItemLi">
                        <span class="iconBox">
                          <i v-show="secondItem.check" class="iconfont icon-queren"></i>
                        </span>
                        <span class="secondType">{{secondItem.riskname}}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 查询结果 -->
        <div v-if="isShowQueryResult" class="queryResult">
          <div v-if="hasResultData">
            <table class="wholeNetwork">
              <tbody>
                <tr>
                  <th>
                      <div class="quanxuan" @click="moduleCheckAll">
                        全选
                        <span class="checkIconBoxAll">
                        <i v-if="allCheckb" class="iconfont icon-queren"></i>
                        </span>
                      </div>
                  </th>
                  <th v-for="(item, index) of titleData" :key="index" class="tableTh" width:100px>{{item}}</th>
                </tr>
                <tr v-for="(item, index) of dataList" :key="index">
                  <td>
                    <div class="quanxuan" @click="moduleCheckAlldown(item,index)">
                        <span class="checkIconBoxAlldown">
                        <i v-show="item.check" class="iconfont icon-queren"></i>
                        </span>
                    </div>
                  </td>
                  <td><a :href="item.newsurl" target="_blank">{{item.newstitle}}</a></td>
                  <td class="starBox"> 
                    <div class="nowStarNumber">
                      <div class="clearFloat" v-if="item.impscore == -1">
                        <span class="iconfont icon-xingxing"></span>
                      </div>
                      <div class="clearFloat" v-else-if="item.impscore == -2">
                        <span class="iconfont icon-xingxing"></span>
                        <span class="iconfont icon-xingxing"></span>
                      </div>
                      <div class="clearFloat" v-else-if="item.impscore == -3">
                        <span class="iconfont icon-xingxing"></span>
                        <span class="iconfont icon-xingxing"></span>
                        <span class="iconfont icon-xingxing"></span>
                      </div>
                      <div v-else></div>
                    </div>
                  </td>
                  <td class="data-content">
                    {{item.publishtime}}
                  </td>
                  <td class="data-content">
                    <p v-for="(i,e) of item.compnames"  :key="e">{{i}}</p>
                    <span @click="detailsxi(item, index)" >{{item.detailsxi}}</span>
                  </td>
                  <td class="data-content">
                    <p v-for="(i,e) of item.secnames" :key="e">{{i}}</p>
                    <span @click="details(item,index)">{{item.details}}</span>
                  </td>
                  <td><button><router-link target="_blank" :to="'/monitor/homePage/detailsThree?id='+item.newscode">详情</router-link></button></td>
                </tr>
              </tbody>
            </table>
            <pagination :prop="paginationData" @paginationSelect="paginationSelect"></pagination>
          </div>
          <div v-show="isshownow">
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
</template>

<script>
import pullDownListTwo from '@/components/common/pullDownListTwo'
import pullDownListFive from '@/components/common/pullDownListFive'
import pagination from '@/components/common/pagination'
import paginationtwo from '@/components/common/paginationtwo'
import commonMethods from '@/common/common.js'
import datePicker from '@/components/common/datePicker'
import keyword from '@/components/common/keywordt'
import pullDownListThree from '@/components/common/pullDownListThree'
import pullDownListSix from '@/components/common/pullDownListSix'
export default {
  data() {
    const oneDayAfter = new Date().getTime() - 86400000;
    return {
      url: 'http://10.25.24.51:10201/api/risk/finchina/primary_news_fund?',
      updateUrl: 'http://10.25.24.51:10201/api/risk/finchina/get_risk_code?',
      isShowTypeList: false,
      isShowTypeBox: false,
      isShowNgenew:true,
      isShowQueryResult: false,
      hasResultData: false,
      isFinished: false,
      isAttentionPool: false,
      categroyIndex: 0,
      categoryIndex:true,
      categoryIndex1:true,
      isShowDropDownList:false,
      isshownow:false,
      nowCategroy: '',
      nowQuite:'',
      resultDataNotice:'',
      dataListNotice:'',
      allCheckb:false,
      dropDownList:[],
      selectFileName: '选择文件',
      starNumber: [-1, -2, -3],
      conditionStarNumber: [],
      sendData: {},
              data2: [{
          id: '',
          label: '默认选项',
          children: [{
            id: 0,
            label: '☆☆☆',
          },
          {
            id: -1,
            label: '★',
          },
          {
            id: -2,
            label: '★★',
          },
          {
            id: -3,
            label: '★★★',
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
      exportData:{
        export_type:1,
        start_date:'',
        end_date:'',
        keytype:0,
        keyword:'',
        scope:'',
        userid:'risk',
        sector:'',
        imp:'',
        riskcode:'',
        sectype:'F'
      },
      queryCondition: {
        start_date: '',
        end_date: '',
        keytype:0,
        keyword:'',
        scope:0,
        userid:'risk',
        sector:'',
        imp:'',
        riskcode:'',
        page: 0,
        pagesize: 10,
      },
      modulesNameList: {
        title: '组合范围：',
        parentEvent: 'modulesNameEvent',
        default: '请选择',
        listWidth: 143,
        nowSelectWidth: 145,
        nowSelectHeight: 25,
        nowSelectFontSize: 13,
        list: []
      },
      modulesNameListy: {
        title: '新闻范围：',
        parentEvent: 'modulesNameEventy',
        default: '当前页面选中新闻',
        listWidth: 143,
        nowSelectWidth: 145,
        nowSelectHeight: 25,
        nowSelectFontSize: 13,
        list: [
          '所有符合条件新闻',
          '当前页面选中新闻'
        ]
      },
      legislationListTwo: {
        title: '类型：',
        parentEvent: 'legislationEventTwo',
        default: '标题',
        listWidth: 98,
        nowSelectWidth: 100,
        nowSelectHeight: 25,
        nowSelectFontSize: 13,
        list: [
          '标题',
          '证券代码',
          '公司名称'
        ]
      },
      legislationListThree: {
        title: '',
        parentEvent: 'legislationEventThree',
        default: '默认范围',
        listWidth: 106,
        nowSelectWidth: 108,
        nowSelectHeight: 25,
        nowSelectFontSize: 13,
        list: [
          '默认范围',
          '自定义范围'
        ]
      },
      listCode:[
        {
          code:0,
          content:'标题'
        },
        {
          code:1,
          content:'证券代码'
        },
        {
          code:2,
          content:'公司名称'
        }
      ],
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

      titleData: ['标题', '重要性', '发布时间', '公司全称', '证券', '详情'],
      dataList: [],
      firstTypeList: [
        { type: '全部', check: false },
        { type: '信用风险', check: false },
        { type: '市场风险', check: false },
        { type: '财务风险', check: false },
        { type: '经营风险', check: false },
        { type: '管理风险', check: false },
        { type: '项目风险', check: false },
        { type: '担保风险', check: false },
        { type: '不可抗力风险', check: false },
        { type: '监管预警', check: false },
        { type: '产品预警', check: false },
        { type: '其他风险', check: false }
      ],
      secondTypeList: [
        {          firstTitle: '信用风险', check: false, list: [
            { code: '510101', check: false, title: '债务违约、合同失信、债务展期' },
            { code: '510102', check: false, title: '评级下调、列入观察或负面类展望、推迟评级' },
            { code: '510103', check: false, title: '欺诈造假' },
            { code: '510104', check: false, title: '承诺失信' },
            { code: '510105', check: false, title: '公司挪用资金、未按约定使用资金' },
          ]        },
        {          firstTitle: '市场风险', check: false, list: [
            { code: '511100', check: false, title: '暂停交易、退市' },
            { code: '511101', check: false, title: '股权质押、冻结或爆仓' },
            { code: '511102', check: false, title: '股份解禁或减持' },
            { code: '511103', check: false, title: '证券价格异常波动' },
          ]        },
        {          firstTitle: '财务风险', check: false, list: [
            { code: '512100', check: false, title: '发生亏损' },
            { code: '512101', check: false, title: '盈利能力下降' },
            { code: '512102', check: false, title: '公司资金流动性不足或资金来源异常' },
            { code: '512103', check: false, title: '资不抵债、资产负债率过高' },
            { code: '512104', check: false, title: '资产重大减值、资产异常' },
            { code: '512105', check: false, title: '财务造假、不透明，财务数据存在真实性问题' },
            { code: '512106', check: false, title: '放弃债权和财产' },
            { code: '512107', check: false, title: '对外借款或对外担保过多,存在代偿风险' },
          ]        },
        {          firstTitle: '经营风险', check: false, list: [
            { code: '513100', check: false, title: '重组失败、重组取消或重组存在问题' },
            { code: '513101', check: false, title: '经营方针、主营业务、经营范围发生重大变化' },
            { code: '513102', check: false, title: '对外投资失误、参与其他公司股权之争、抛售公司资产' },
            { code: '513103', check: false, title: '虚假注资、抽逃资金、转移资产' },
            { code: '513104', check: false, title: '国家或地方政府政策变动而造成影响' },
            { code: '513105', check: false, title: '公司资产被查封、扣押、冻结、司法划转' },
            { code: '513106', check: false, title: '公司经营出现问题、公司（项目）停产或半停产、业务减少' },
            { code: '513107', check: false, title: '公司发生减资、合并、分立、解散、破产' },
            { code: '513108', check: false, title: '关联企业或人（实际控制人、控股股东、供应商、客户、被担保企业、其他关联企业）出现问题' },
            { code: '513109', check: false, title: '投诉和诉讼事件、经济纠纷和环保问题等公共纠纷' },
            { code: '513110', check: false, title: '公司产品存在缺陷或存在问题' },
            { code: '513111', check: false, title: '审批不通过事项或撤销公司某项经营资格' },
            { code: '513112', check: false, title: '犯罪事件' },
            { code: '513113', check: false, title: '公司违规或被问询' },
          ]        },
        {          firstTitle: '管理风险', check: false, list: [
            { code: '514100', check: false, title: '公司控制权斗争、实际控制人发生变动、公司性质变动、公司股东持有的股份被司法划转' },
            { code: '514101', check: false, title: '处罚事件或问询事件' },
            { code: '514102', check: false, title: '高管变动（异动）' },
            { code: '514103', check: false, title: '员工（含高管）违规' },
            { code: '514104', check: false, title: '拖欠员工工资、大量辞工或员工大面积离职' },
          ]        },
        {          firstTitle: '项目风险', check: false, list: [
            { code: '515100', check: false, title: '公司项目发生延期、手续不全、陷入问题' },
            { code: '515101', check: false, title: '项目产能未达到预期或情况备受质疑的' },
          ]        },
        {          firstTitle: '担保风险', check: false, list: [
            { code: '516100', check: false, title: '担保人或抵押物出现纠纷或问题' },
          ]        },
        {          firstTitle: '不可抗力风险', check: false, list: [
            { code: '517100', check: false, title: '地震、水灾、火灾、恐怖袭击；通讯、电力中断；战争' },
          ]        },
        {          firstTitle: '其他风险', check: false, list: [
            { code: '590100', check: false, title: '其他风险类事件' },
          ]        },
      ],
      // riskcodeList: [
      //   { code: " ", title: "无" },
      //   { code: "518", title: "产品预警" },
      //   { code: "519", title: "监管预警" },
      //   { code: "510101", title: "债务违约、合同失信、债务展期" },
      //   { code: "510102", title: "评级下调、列入观察或负面类展望、推迟评级" },
      //   { code: "510103", title: "欺诈造假" },
      //   { code: "510104", title: "承诺失信" },
      //   { code: "510105", title: "公司挪用资金、未按约定使用资金" },
      //   { code: "511100", title: "暂停交易、退市" },
      //   { code: "511101", title: "股权质押、冻结或爆仓" },
      //   { code: "511102", title: "股份解禁或减持" },
      //   { code: "511103", title: "证券价格异常波动" },
      //   { code: "512100", title: "发生亏损" },
      //   { code: "512101", title: "盈利能力下降" },
      //   { code: "512102", title: "公司资金流动性不足或资金来源异常" },
      //   { code: "512103", title: "资不抵债、资产负债率过高" },
      //   { code: "512104", title: "资产重大减值、资产异常" },
      //   { code: "512105", title: "财务造假、不透明，财务数据存在真实性问题" },
      //   { code: "512106", title: "放弃债权和财产" },
      //   { code: "512107", title: "对外借款或对外担保过多,存在代偿风险" },
      //   { code: "513100", title: "重组失败、重组取消或重组存在问题" },
      //   { code: "513101", title: "经营方针、主营业务、经营范围发生重大变化" },
      //   {
      //     code: "513102",
      //     title: "对外投资失误、参与其他公司股权之争、抛售公司资产"
      //   },
      //   { code: "513103", title: "虚假注资、抽逃资金、转移资产" },
      //   { code: "513104", title: "国家或地方政府政策变动而造成影响" },
      //   { code: "513105", title: "公司资产被查封、扣押、冻结、司法划转" },
      //   {
      //     code: "513106",
      //     title: "公司经营出现问题、公司（项目）停产或半停产、业务减少"
      //   },
      //   { code: "513107", title: "公司发生减资、合并、分立、解散、破产" },
      //   {
      //     code: "513108",
      //     title:
      //       "关联企业或人（实际控制人、控股股东、供应商、客户、被担保企业、其他关联企业）出现问题"
      //   },
      //   {
      //     code: "513109",
      //     title: "投诉和诉讼事件、经济纠纷和环保问题等公共纠纷"
      //   },
      //   { code: "513110", title: "公司产品存在缺陷或存在问题" },
      //   { code: "513111", title: "审批不通过事项或撤销公司某项经营资格" },
      //   { code: "513112", title: "犯罪事件" },
      //   { code: "513113", title: "公司违规或被问询" },
      //   {
      //     code: "514100",
      //     title:
      //       "公司控制权斗争、实际控制人发生变动、公司性质变动、公司股东持有的股份被司法划转"
      //   },
      //   { code: "514101", title: "处罚事件或问询事件" },
      //   { code: "514102", title: "高管变动（异动）" },
      //   { code: "514103", title: "员工（含高管）违规" },
      //   { code: "514104", title: "拖欠员工工资、大量辞工或员工大面积离职" },
      //   { code: "515100", title: "公司项目发生延期、手续不全、陷入问题" },
      //   { code: "515101", title: "项目产能未达到预期或情况备受质疑的" },
      //   { code: "516100", title: "担保人或抵押物出现纠纷或问题" },
      //   {
      //     code: "517100",
      //     title: "地震、水灾、火灾、恐怖袭击；通讯、电力中断；战争"
      //   },
      //   { code: "590100", title: "其他风险类事件" }
      // ],
      file: '',
      sendFile: '',
      mathCompanyf:[],
      comnameMatch:''
    }
  },
  components: {
    pagination,
    paginationtwo,
    datePicker,
    pullDownListThree,
    pullDownListTwo,
    pullDownListFive,
    keyword,
    pullDownListSix
  },
      //获取板块名称 进入页面发送请求
  created(){
    console.log(this.queryCondition.notice_type)
      const url = 'http://10.25.24.51:10201/api/risk/finchina/sector_query'
      const sendData = {
        userid: 'risk'
      };
      console.log(sendData)
      this.$_axios.get(url, {
        params: sendData
      }).then((response) => {
        if (!response.data) {
          this.modulesNameList.list = ['默认范围'];
          this.modulesNameList.default = '没有可选择板块';
          this.sector = '';
        } else {
          if (response.data.code == '0') {
            console.log(response.data.sectorlist)
            const temp = []
            // response.data.sectorlist.unshift('默认范围')
            response.data.sectorlist.forEach(item=>{
              temp.push(item.sectorname)
            })
            console.log(temp)
            temp.unshift('默认范围','自定义范围')
            this.modulesNameList.list = JSON.parse(JSON.stringify(temp));
            this.modulesNameList.default = temp[0];
            this.sector =temp[0];
          } else {
            this.modulesNameList.list = [];
            this.modulesNameList.default = '没有可选择板块';
            this.sector = '';
          }
        }
      }).catch((err) => {

      });
      this.companyMatch()
  },
  methods: {
    dropDownEvent(item){
      this.nowQuite = item.compname
      this.queryCondition.keyword = item.compcode
      // console.log(item.compcode)
      this.isShowDropDownList = false
    },
    inputmethod(){
      // this.dropDownList = []
      if(this.nowQuite){
        this.$refs.inputContent.style.display = 'block'
      }else{
        this.$refs.inputContent.style.display = 'none'
      }
      // console.log(111)
      let keyword = commonMethods.checkName(this.nowQuite);
      this.nowQuite = keyword
      let nowNumber = parseInt(this.nowQuite);
      if(nowNumber > 99999){

      }else if(this.nowQuite.toString().length > 0){
        const tempArrShu = [];
        this.isShowDropDownList = true;
        console.log(this.nowQuite.toString())
        console.log(this.mathCompanyf)
        this.mathCompanyf.forEach(item => {
          // console.log(item.length)
          if(item.compname){
            if (item.compname.indexOf(this.nowQuite.toString()) !== -1) {
              tempArrShu.push(item);
            }    
          }
        });
        console.log(tempArrShu)
        this.dropDownList = tempArrShu
        // // console.log(tempArr)
        // tempArrShu.forEach(item=>{
        //   this.dropDownList.push(item.compname)
        // })
        // // this.dropDownList = tempArrShu.slice(0, 5);
        // console.log(this.dropDownList)
      }
    },
    //获取公司名称匹配项
    companyMatch(){
      const matchUrl = 'http://10.25.26.194:10201/api/risk/finchina/get_comp_code'
      let matchData = {
        sectype:'F'
      }
      this.$_axios.get(matchUrl,{
        params: matchData
      }).then(res=>{
        console.log(res)
        this.mathCompanyf = res.data.result
      })
    },
    inputNone(){
      try {
          // console.log(this.$refs.inputContent)
        if(this.$refs.inputContent.style.display == 'block'){
        // console.log(this.$refs.inputContent)
        this.$refs.inputContent.style.display = 'none'
        }
      } catch (error) {
        
      }
    },
       mask_close(){
      // window.location.href = 'https://www.baidu.com'
      this.$refs.mask.style.display = 'none'
    },
    export_mask(){
      let exportTem = []
      this.dataList.forEach(item=>{
        if(item.check){
          exportTem.push(item.newscode)
        }
      })
      this.exportData.newscodes = exportTem.join(',')
      console.log(this.dataList)
        let mask = this.dataList.some(item=>{
            return item.check
        })
        if(!mask && this.exportData.export_type == 1){
          alert('至少选中一条记录!')
          return;
        }
            const export_url = 'http://10.25.24.51:10201/api/risk/finchina/primary_news_export'
            let timestart = this.exportData.start_date
            let timeend = this.exportData.end_date
            let exportType = this.exportData.export_type
            let keyType = this.exportData.keytype
            let keyWord = this.exportData.keyword
            let scope = this.exportData.scope
            let userId = this.exportData.userid
            let sector = this.exportData.sector
            let imp = this.exportData.imp
            let riskcode = this.exportData.riskcode
            let newsCodes = this.exportData.newscodes
            let sectype = this.exportData.sectype
            window.location.href = 'http://10.25.24.51:10201/api/risk/finchina/primary_news_export?sectype='+sectype+'&start_date='+timestart+'&end_date='+timeend+'&keytype='+keyType+'&keyword='+keyWord+'&scope='+scope+'&userid='+userId+'&sector='+sector+'&imp='+imp+'&riskcode='+riskcode+'&newscodes='+newsCodes+'&export_type='+exportType

  
      // this.$_axios.get(export_url,{
      //     params:this.exportData
      //   }).then(res=>{
      //   console.log(res)
      //   if(res.data.code == 1){
      //     alert('导出失败')

      //   }
      // })
      this.$refs.mask.style.display = 'none'
    },
    export_bond(){
      this.$refs.mask.style.height = document.getElementById('app').clientHeight + 'px'
      this.$refs.mask.style.width = document.getElementById('app').clientWidth + 'px'
      this.$refs.mask.style.display = 'block'
    },
    collect(){
      const url = 'http://10.25.26.194:10201/api/risk/finchina/news_favorite_add'
      let temArrf = []
      // alert('收藏成功!')
      // return;



      
      this.dataList.forEach(item=>{
        if(item.check){
          temArrf.push(item.newscode)
        }
      })
      console.log(temArrf)
      const sendData = {
        userid:'risk',
        newscodes:temArrf.join(','),
        sectype:'F'
      }
      let formData = new FormData()
      for(let key in sendData){
        if(sendData.hasOwnProperty(key)){
          formData.append(key,sendData[key])
        }
      }
      this.$_axios.post(url,formData).then(response=>{
        console.log(response)
        if(response.data.code == 0){
          alert('收藏成功')
        }
      })

    },
    moduleCheckAll(){
      this.allCheckb = !this.allCheckb
      if(this.allCheckb){
        this.dataList.forEach(item=>{
          item.check = true
        })
      }else{
        this.dataList.forEach(item=>{
          item.check = false
        })
      }
    },
    moduleCheckAlldown(item,index){
      item.check = !item.check
      console.log(item.check)
      const allxuan = this.dataList.every(item=>{
        return item.check
      })
      if(allxuan){
        this.allCheckb = allxuan
      }else{
        this.allCheckb = false
      }

    },
    allfan(all){
      all.check = !all.check
      all.list.forEach(i=>{
        i.check = all.check 
      })
    },
    getCheckedKeys(){
        let arr = this.$refs.tree.getCheckedKeys()
        console.log(arr.length)
        if(arr.length == 5){
          this.queryCondition.imp = ''
          this.exportData.imp = ''
        }else{
          this.queryCondition.imp = arr.join(',')
          this.exportData.imp = arr.join(',')
        }
        
    },
      zhaiquan(){
        this.categoryIndex = !this.categoryIndex
        if(this.categoryIndex){
          this.hasResultData = true
        }else{
          this.hasResultData = false
        }
      },
      zhuti(){
        this.categoryIndex1 = !this.categoryIndex1
        if(this.categoryIndex1){
          this.hasNotic = true
        }else{
          this.hasNotic = false
        }

      },
    // negNew(){
    //     this["isShowNgenew"] = !this[
    //     "isShowNgenew"
    //   ];
    //   if(this["isShowNgenew"]){
    //     this.queryCondition.isnegative = 1
    //   }else{
    //     this.queryCondition.isnegative = 0
    //   }
    // },
    // 组合范围板块
    modulesNameEvent(...data) {
      if(data[0] == '默认范围' || data[0] == '自定义范围'){
        this.queryCondition.scope = 0;
        this.queryCondition.userid = '';
        this.queryCondition.sector = ''
        this.exportData.scope = 0;
        this.exportData.userid = '';
        this.exportData.sector = ''
      }else{
        this.queryCondition.scope = 1;
        this.queryCondition.userid = 'risk',
        this.queryCondition.sector = data[0]
        this.exportData.scope = 1;
        this.exportData.userid = 'risk',
        this.exportData.sector = data[0]
      }
    },
    modulesNameEventy(...data){
      console.log(data)
      if(data[0] == '所有符合条件新闻'){
        this.exportData.export_type = 0
        this.exportData.newscodes = ''
      }
      if(data[0] == '当前页面选中新闻'){
        this.exportData.export_type = 1
        let exportTem = []
      this.dataList.forEach(item=>{
        if(item.check){
          exportTem.push(item.newscode)
        }
      })
      this.exportData.newscodes = exportTem.join(',')
      }
    },
    // 添加关键字查询
    keywordEvent(...data) {
      this.queryCondition.keyword = data[0];
      this.exportData.keyword = data[0];
      console.log(this.exportData.keyword)
    },
    legislationEventTwo(data) {
      console.log(data)
      let code = this.listCode.find(v=>{
        return v.content === data
      })
      console.log(code.code)
      this.queryCondition.keytype = code.code
      console.log(this.queryCondition.keytype)
      this.exportData.keytype = code.code
      console.log(this.exportData.keytype)
      if(data == '公司名称'){
        this.comnameMatch = '公司名称'
        this.nowQuite = ''
        this.queryCondition.keyword= ''
        this.exportData.keyWord=''
      }else{
        this.comnameMatch = ''
      }
    },
    legislationEventThree(data) {
      // this.queryCondition.keytype = ''
      console.log(data)
      if(data == '自定义范围'){
        this.isShowTypeList = true
        this.checkRiskType()
        console.log(this.isShowTypeList)
      }else{
        this.isShowTypeList =false
        this.queryCondition.riskcode = ''
        this.exportData.riskcode = ''
        console.log(this.isShowTypeList)
      }
    },
    saveItem(s) {
      let m = Object.assign({}, s);
      m.news_id = m.INFOCODE;
      m.imp_score = m.starNumber;
      delete m.CONTENT;
      delete m.details;
      delete m.SHOWTIME;
      delete m.SOURCE;
      delete m.TITLE;
      delete m.URL;
      delete m.INFOCODE;

      this.$_axios
        .get(this.updateUrl, {
          params: m
        })
        .then(response => {
          // 结果
          const resultData = response.data.result;
          console.log("dispose处理数据", resultData);
          if (resultData.update_result === 1) {
            alert("风险类型设置成功");
          }
        })
        .catch(err => {
          debugger;
          console.log(err);
        });
    },
    // handleFileChange(event) {
    //   this.file = event.target.files[0];
    //   if (this.file) {
    //     const type = this.file.name.slice(-4).toLowerCase();
    //     if (type != '.txt' && type != '.csv') {
    //       this.file = '';
    //       event.target.value = '';
    //       this.selectFileName = '选择文件';
    //       alert('请输入txt或csv类型文件')
    //       return;
    //     }
    //     event.target.value = '';
    //     this.selectFileName = this.file.name;
    //   }
    //   console.log('file', this.file)
    // },
    // clearFile() {
    //   // inputer
    //   this.$refs.inputer = null;
    //   this.selectFileName = '选择文件';
    //   this.file = '';
    // },
    query() {
      this.getCheckedKeys()
      if(this.nowQuite == '' && this.queryCondition.keytype == 2){
        this.queryCondition.keyword = ''
      }
      console.log(this.queryCondition)
      this.isShowQueryResult = true;
      this.hasResultData = false;
      this.isshownow = true;
      this.sendData = JSON.parse(JSON.stringify(this.queryCondition));
      // for (let key in this.sendData) {
      //   if (this.sendData[key] === '') {
      //     delete this.sendData[key];
      //   }
      // }
      let formData = new FormData();
      for (let key in this.sendData) {
        if (this.sendData.hasOwnProperty(key)) {
          formData.append(key, this.sendData[key]);
        }
      }
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      console.log(formData)
      this.$_axios.post(this.url, formData, config).then(response => {
        console.log(response)
        if(response.data.code !=0){
          alert('请求失败')
          this.hasResultData = false;
          return;
        }
        // 显示查询结果
        this.hasResultData = true;
        this.isshownow = false;
        // console.log(response.result)
        console.log('主页数据', response.data.result);
        this.resultData = response.data.result
              this.resultData.forEach(item=>{
          item.check = false
        })

        // this.resultDataNotice = response.data.result

        // this.resultData.forEach(item => {
        //   item.CONTENT = item.CONTENT.toString().replace(/\\r\\n\\r\\n/g, "<br>");
        //   item.CONTENT = item.CONTENT.toString().replace(/\\r\\n/g, "<br>");
        // });
        console.log(this.resultData)
        
        this.dataList = JSON.parse(JSON.stringify(this.resultData));
        // this.dataListNotice = JSON.parse(JSON.stringify(this.resultDataNotice))
        this.paginationData.page_Count = Math.ceil(response.data.totalcount/10);
        this.paginationData.total_Count = response.data.totalcount;
        console.log(this.dataList)

        this.dataList.forEach(item => {
          // if (item.imp_score) {
          //   item.starNumber = parseInt(item.imp_score);
          // } else {
          //   item.starNumber = 0;
          // }
          // item.check = false
        
          if (item.compnames && item.compnames.length > 2) {
            
            item.compnames = item.compnames.slice(0, 2) ;
            item.detailsxi = '...展开';
          }
    
          if(item.secnames && item.secnames.length > 2){
                                                                                                                            
            item.secnames = item.secnames.slice(0,2) 
            item.details = '...展开'
          }
        });
      }).catch(err => {
        console.log(err);
      });

    },
    paginationSelect(pageNumber) {
      const sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.page = pageNumber - 1;
      let formData = new FormData();
      for (let key in sendData) {
        if (sendData.hasOwnProperty(key)) {
          formData.append(key, sendData[key]);
        }
      }
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.sendFile && formData.append('file', this.sendFile);
      this.$_axios.post(this.url, formData, config).then(response => {
        // 显示查询结果
        this.hasResultData = true;
        this.isshownow = false;
        // console.log(response.result)
        console.log('主页数据', response.data.result);
        this.resultData = response.data.result

        // this.resultDataNotice = response.data.result

        // this.resultData.forEach(item => {
        //   item.CONTENT = item.CONTENT.toString().replace(/\\r\\n\\r\\n/g, "<br>");
        //   item.CONTENT = item.CONTENT.toString().replace(/\\r\\n/g, "<br>");
        // });
        this.allCheckb = false
        this.resultData.forEach(item=>{
          item.check = false
        })
        
        this.dataList = JSON.parse(JSON.stringify(this.resultData));
        // this.dataListNotice = JSON.parse(JSON.stringify(this.resultDataNotice))
        this.paginationData.page_Count = Math.ceil(response.data.totalcount/10);
        this.paginationData.total_Count = response.data.totalcount;

        this.dataList.forEach(item => {
          // if (item.imp_score) {
          //   item.starNumber = parseInt(item.imp_score);
          // } else {
          //   item.starNumber = 0;
          // }
        
          if (item.compnames && item.compnames.length > 2) {
            
            item.compnames = item.compnames.slice(0, 2) ;
            item.detailsxi = '...展开';
          }
    
          if(item.secnames && item.secnames.length > 2){
                                                                                                                            
            item.secnames = item.secnames.slice(0,2) 
            item.details = '...展开'
          }
        });
      }).catch(err => {
        console.log(err);
      });
    }, 
    detailsxi(item,index){
      if(item.detailsxi == '收起'){
        item.detailsxi = '...展开';
        item.compnames = item.compnames.slice(0,2) 
      }else{
        item.detailsxi = '收起';
        item.compnames = this.resultData[index].compnames
      }
    },


    details(item, index) {
      if (item.details == '收起') {
        console.log('展开1')
        item.details = '...展开';
        item.secnames = item.secnames.slice(0, 2) ;
      } else {
        console.log('展开2')
        item.details = '收起';
        // item.secnames.join(',')
        item.secnames = this.resultData[index].secnames;
      }
    }, 
    checkFinished(flag) {
      this.isFinished = flag;
      this.queryCondition.finished = flag ? 1 : '';
    },
    // 是否显示风险类别
    checkRiskType() {
      // this.isShowTypeList = !this.isShowTypeList;
      // isShowTypeBox
      if (this.isShowTypeList) {
        this.isShowTypeBox = true;
        this.$_axios.get(this.updateUrl,{
          params:''
        }).then(res=>{
          let allData = res.data 
          // for(let i = 0; i <allData.length;i++){
          //   allData[i].checked = false
          //   allData[i].list = []
          //   let allDataAccept = allData.filter((v,i)=>{
          //     return v.level ===1
          //   })
          // }
          let allDataSecond = []
          let allDataFirst = []
          let allDataAccept
          // 完成所需结构的步骤
          // 对接收的数组进行遍历，给每项都添加check和list属性
          // 将level的数组筛选出来
          // 将level=1的对象组成的数组添加到firstTypeList
          // 以riskcode开头为001001的添加到level=1的list属性里面
          allData.forEach(function(v,i){
            allDataSecond.push({checked:false,check:false,riskcode:v.indexcode,riskname:v.indexcodename})
            allDataFirst.push({checked:false,check:false,riskcode:v.indextype,riskname:v.indextypename,list:[]})
          }
          )
          let firstData = []
          let templejson = {}
          let alldatafirstlength = allDataFirst.length
          for(let i = 0;i < alldatafirstlength;i++){
            templejson[JSON.stringify(allDataFirst[i])] = true
          }
          console.log('templejson',templejson)
          let keyItem = Object.keys(templejson)
          console.log(keyItem)
          for(let j = 0; j <keyItem.length;j++){
            firstData.push(JSON.parse(keyItem[j]))
          }
          //firstData就是最后我们需要的结果

        this.firstTypeList = firstData
        console.log(allDataFirst)
          console.log(firstData)
          console.log(allDataSecond)

        this.secondTypeList = firstData

        // 将所有的一级数组也同样的放到二级数组里面
        // 满足二级数组的数据他分别添加到对应的数组里面
        console.log(this.secondTypeList)
        let onebiao = allDataSecond.filter(function(v,i){
          return v.riskcode.indexOf('510') == 0 && v.riskcode.length > 3
        })
        console.log(onebiao)
        let twobiao = allDataSecond.filter(function(v,i){
          return v.riskcode.indexOf('511') == 0 && v.riskcode.length > 3
        })
        console.log(twobiao)
        let threebiao = allDataSecond.filter(function(v,i){
          return v.riskcode.indexOf('512') == 0 && v.riskcode.length > 3
        })
        let fourbiao = allDataSecond.filter(function(v,i){
          return v.riskcode.indexOf('513') == 0 && v.riskcode.length > 3
        })
        let fivebiao = allDataSecond.filter(function(v,i){
          return v.riskcode.indexOf('514') == 0 && v.riskcode.length > 3
        })
        let sixbiao = allDataSecond.filter(function(v,i){
          return v.riskcode.indexOf('515') == 0 && v.riskcode.length > 3
        })
        let sevenbiao = allDataSecond.filter(function(v,i){
          return v.riskcode.indexOf('516') == 0 && v.riskcode.length > 3
        })
        let eightbiao = allDataSecond.filter(function(v,i){
          return v.riskcode.indexOf('517') == 0 && v.riskcode.length > 3
        })  
        let ninbiao = allDataSecond.filter(function(v,i){
          return v.riskcode.indexOf('518') == 0 && v.riskcode.length > 3
        })  
        let tenbiao = allDataSecond.filter(function(v,i){
          return v.riskcode.indexOf('519') == 0 && v.riskcode.length > 3
        })
        let evebiao = allDataSecond.filter(function(v,i){
          return v.riskcode.indexOf('520') == 0 && v.riskcode.length > 3
        })
        let twlbiao = allDataSecond.filter(function(v,i){
          return v.riskcode.indexOf('590') == 0 && v.riskcode.length > 3
        })

        this.secondTypeList.forEach((v,i)=>{
          if(v.riskcode == '510'){
            v.list = onebiao
          }
          if(v.riskcode == '511'){
            v.list = twobiao
          }
          if(v.riskcode == '512'){
            v.list = threebiao
          }
          if(v.riskcode == '513'){
            v.list = fourbiao
          }
          if(v.riskcode == '514'){
            v.list = fivebiao
          }
          if(v.riskcode == '515'){
            v.list = sixbiao
          }
          if(v.riskcode == '516'){
            v.list = sevenbiao
          }
          if(v.riskcode == '517'){
            v.list = eightbiao
          }
          if(v.riskcode == '518'){
            v.list = ninbiao
          }
          if(v.riskcode == '519'){
            v.list = tenbiao
          }
          if(v.riskcode == '520'){
            v.list = evebiao
          }
          if(v.riskcode == '590'){
            v.list = twlbiao
          }
        })
        console.log(this.secondTypeList)

        })
      } else {
        this.isShowTypeBox = false;
        this.queryCondition.riskcode = '';
        this.exportData.riskcode = '';
      }
    },
    // 条件 选择重要级 星级
    // conditionStar(number) {
    //   if (this.conditionStarNumber.length === 1 && -number === 1) {
    //     console.log('空的星星')
    //     this.conditionStarNumber = [];
    //     this.queryCondition.imp = 0;
    //   } else {
    //     console.log('有星星')
    //     this.conditionStarNumber = [...Array(-number).keys()];
    //     this.queryCondition.imp = number;
    //   }
    // },
    // 选择重要级 星级
    choiceStar(number, item, index) {
      const sendData = {
        news_id: item.INFOCODE,
        risk_type: item.risk_type,
        riskcode: item.riskcode,
        is_favorite: item.is_favorite,
        finished: item.finished,
        news_type_fk_id: '',
        user: 'zhangxx',
      };
      for (let key in sendData) {
        if (sendData[key] === '') {
          delete sendData[key];
        }
      }
      sendData.imp_score = number;
      if (this.dataList[index].starNumber === 1 && number === 1) {
        sendData.imp_score = '';
      } else {
        sendData.imp_score = number;
      }
      this.$_axios.get(this.updateUrl, {
        params: sendData
      }).then(response => {
        // 结果
        const resultData = response.data.result;
        console.log('dispose处理数据', resultData);
        if (resultData.update_result === 1) {
          let content = this.dataList[index].CONTENT + ' ';
          if (this.dataList[index].starNumber === 1 && number === 1) {
            this.dataList[index].starNumber = 0;
          } else {
            this.dataList[index].starNumber = number;
          }
          this.dataList[index].CONTENT = content;
        }
      }).catch(err => {
        console.log(err);
      });


    },
    // 收藏
    favorite(item, index, flag) {
      // news_id=NW20180704900220429&risk_type=&risk_code=&imp_score=3&is_favorite=&news_type_fk_id=&finished=&user=
      const sendData = {
        news_id: item.INFOCODE,
        risk_type: item.risk_type,
        riskcode: item.riskcode,
        imp_score: item.imp_score,
        finished: item.finished,
        news_type_fk_id: '',
        user: 'zhangxx',
      };
      for (let key in sendData) {
        if (sendData[key] === '') {
          delete sendData[key];
        }
      }
      if (flag) {
        sendData.is_favorite = '1';
      } else {
        sendData.is_favorite = '';
      }
      sendData.imp_score = this.$store.startnumber;
      console.log('item', item)
      console.log('sendData', sendData)
      this.$_axios.get(this.updateUrl, {
        params: sendData
      }).then(response => {
        // 结果
        const resultData = response.data.result;
        console.log('dispose处理数据', resultData);
        if (resultData.update_result === 1) {
          this.dataList[index].is_favorite = flag ? '1' : '';
        }
      }).catch(err => {
        console.log(err);
      });
    },
    // 处理
    dispose(item, index, flag) {
      // news_id=NW20180704900220429&risk_type=&risk_code=&imp_score=3&is_favorite=&news_type_fk_id=&finished=&user=
      const sendData = {
        news_id: item.INFOCODE,
        risk_type: item.risk_type,
        riskcode: item.riskcode,
        imp_score: item.imp_score,
        is_favorite: item.is_favorite,
        news_type_fk_id: '',
        user: 'zhangxx',
      };
      for (let key in sendData) {
        if (sendData[key] === '') {
          delete sendData[key];
        }
      }
      sendData.imp_score = this.$store.startnumber;
      if (flag) {
        sendData.finished = '1';
      } else {
        sendData.finished = '';
      }
      console.log('item', item)
      console.log('sendData', sendData)
      this.$_axios.get(this.updateUrl, {
        params: sendData
      }).then(response => {
        // 结果
        const resultData = response.data.result;
        console.log('dispose处理数据', resultData);
        if (resultData.update_result === 1) {
          this.dataList[index].finished = flag ? '1' : '';
        }
      }).catch(err => {
        console.log(err);
      });
    },
    startDateEvent(...data) {
      this.queryCondition.start_date = data[0];
      this.exportData.start_date = data[0];
      // this.startDatePicker.defaultDate = new Date(data[0]);
    },
    endDateEvent(...data) {
      this.queryCondition.end_date = data[0];
      this.exportData.end_date = data[0];
      // this.endDatePicker.defaultDate = new Date(data[0]);
    },


    // 点击一级风险类型 1- 点击全选按钮的步骤
    // 点击全部按钮，让firstTypeList里面的属性check都为true
    // 让secondTypeList数组里面所有的属性check都为true
    // 再让secondTypeList中的list属性里面的check都为true

    // 2-其次
    // 除了点全部之外，然后点其他的内容
    // firstTypeList和secondTypeList点击为同一个的时候，设置secondTypeList对应项的check属性为true
    // 将对应项的list属性里面的所有的项都标记为选中

    checkFirstType(item, index) {
      item.checked = !item.checked;
      if (item.riskname === '全部') {

        this.firstTypeList.forEach(val => {
          val.check = item.check;
        });
        this.secondTypeList.forEach(firstVal => {
          firstVal.check = item.check;
          firstVal.list.forEach(secondVal => {
            secondVal.check = item.check;
          });
        });
      } else {
        this.secondTypeList.forEach(firstVal => {
          if (item.riskname === firstVal.riskname) {
            firstVal.check = item.check;
            firstVal.list.forEach(secondVal => {
              secondVal.check = item.check;
            });
          }
        });
        if (!item.check) {
          // this.firstTypeList[0].check = false;
        } else {
          this.checkAll();
        }
      }
    },
    // 点击二级风险类型

  
    checkSecondType(item, index) {
      item.check = !item.check;
      // 点击二级风险按钮
      if (!item.check) {
        console.log('此处已经点击过了')
        // this.firstTypeList[0].check = false;
        this.secondTypeList.forEach(firstVal => {
          // 第二项的每一项如果都是未选中的话
          // 那么下面也都未选中
          // secondTypeList和firstTypeList中都有项未选中的话那么判断将其设置为未选中
          let checkNull = firstVal.list.every(secondVal => {
            return secondVal.check === false;
          });
          if (checkNull) {
            firstVal.check = false;
            this.firstTypeList.forEach(val => {
              if (val.riskname === firstVal.riskname) {
                val.check = false;
              }
            });
          }
        });
      } else {
        this.checkAll();
      }
    },
    // 点击一级或者二级判断是否全部选中了
    checkAll() {
      let tempFirstArr = JSON.parse(JSON.stringify(this.firstTypeList));
      // tempFirstArr.shift();
      let isFirstAll = tempFirstArr.every(item => {
        return item.check === true;
      });
      let isSecondAll = this.secondTypeList.every(item => {
        let isCheck = item.list.every(secondItem => {
          return secondItem.check === true;
        });
        return isCheck === true;
      });
      console.log(1, isFirstAll, 2, isSecondAll)
      if (isFirstAll && isSecondAll) {
        // this.firstTypeList[0].check = true;
      }
    },
    // 选择完riskname之后确认按钮
    confirmType() {
      const tempArr = [];
      this.secondTypeList.forEach(firstVal => {
        firstVal.list.forEach(secondVal => {
          if (secondVal.check) {
            tempArr.push(secondVal.riskcode);
          }
        });
      });
      this.resetType();
      this.queryCondition.riskcode = tempArr.join(',');
      this.exportData.riskcode = tempArr.join(',');
      this.isShowTypeBox = false;
      console.log(tempArr)
    },
    // 不想选择riskname之后，选择取消
    resetType() {
      this.firstTypeList.forEach(val => {
        val.check = false;
      });
      this.secondTypeList.forEach(firstVal => {
        firstVal.check = false;
        firstVal.list.forEach(secondVal => {
          secondVal.check = false;
        });
      });
      this.queryCondition.riskcode = '';
      this.exportData.riskcode = '';
    }
  },
  mounted() {
    this.queryCondition.start_date = commonMethods.formatDateTime2(this.startDatePicker.defaultDate);
    this.queryCondition.end_date = commonMethods.formatDateTime2(this.endDatePicker.defaultDate);
    this.exportData.start_date = commonMethods.formatDateTime2(this.startDatePicker.defaultDate);
    this.exportData.end_date = commonMethods.formatDateTime2(this.endDatePicker.defaultDate);
  }
}
</script>

<style lang="less" scoped>
.biaozhuxin{
      display: inline-block;
        cursor: pointer;
        background-color: #D7D7D7;
        color:white;
        height: 27px;
        width: 84px;
        text-align: center;
        line-height: 27px;
        margin-top:10px;
        background-color: #b50229;
}
.bond_z{
    display: inline-block;
        cursor: pointer;
        background-color: #D7D7D7;
        color:white;
        height: 27px;
        width: 84px;
        text-align: center;
        line-height: 27px;
        margin-top:10px;
}
.bond_z.active{
    background-color: #b50229;
}
.zhuti.active{
    background-color: #b50229;
}
.zhuti{
    display: inline-block;
        cursor: pointer;
        background-color: #D7D7D7;
        color:white;
        height: 27px;
        width: 84px;
        text-align: center;
        line-height: 27px;
        margin-left:10px;
}
.attentionPoolSet {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 3;
}
.categroy {
  span {
    float: left;
    width: 50px;
    height: 30px;
    cursor: pointer;
    text-align: center;
    line-height: 30px;
    color: #fff;
    background-color: #00ccff;
  }
  span.active {
    background-color: rgba(0, 114, 255, 0.5);
  }
}
.queryCondition-top {
  // position: relative;
  // width: 100%;
  // height: 100px;
  // margin-top: 30px;
  line-height: 25px;
  // border-bottom: 1px solid #797979;
  input {
    width: 130px;
    height: 25px;
    border: 1px solid #797979;
  }
  .nowConditionStarBox {
    position: relative;
    .starBg {
      cursor: pointer;
    }
    .nowConditionStar {
      position: absolute;
      top: -1px;
      left: 56px;
      pointer-events: none;
    }
  }
  .checkBox {
    position: relative;
    cursor: pointer;
    .iconBox {
      position: relative;
      display: inline-block;
      top: 1px;
      width: 12px;
      height: 12px;
      border-radius: 6px;
      border: 1px solid #797979;
      .dot {
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
  .uploadFiles {
    float: left;
    input {
      position: absolute;
      width: 0;
      height: 0;
      opacity: 0;
      z-index: -2;
    }
    label {
      float: left;
      // width: 200px;
      cursor: pointer;
    }
    .clearFile,
    .fileExportBtn {
      background-color: #eaeaea;
      padding: 5px;
      border: 1px solid #797979;
      border-radius: 5px;
      cursor: pointer;
    }
    .fileExportBtn {
      pointer-events: none;
    }
  }
  .enshrineBox {
    float: left;
    span {
      cursor: pointer;
    }
  }
  .queryBtn {
    margin-top: -15px;
    
  }

}
  .cover{
        position: fixed;;
        left:0px;
        top:0px;
        background:rgba(0, 0, 0, 0.4);
        filter:alpha(opacity=60);  /*设置透明度为60%*/
        display:none; 
        z-Index:999;  
  }
.cover_show{
    position: absolute;
    top: 40%;
    left: 40%;
    width: 300px;
    height: 100px;
    border-radius: 8px;
    background-color: #fff;
    z-Index: 1000;
}
.mask_close{
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin-bottom: 13px;
    margin-top: -4px;
    margin-left: 279px;
}
.modulesNameListy{
  margin-left: 6px;
}
.mask_button{
    width: 69px;
    height: 30px;
    margin-left: 232px;
    background-color: #b50229;
    margin-top: 17px;
    color: #fff;
    cursor: pointer;
}
  // #chaxun{
  //   margin-left:378px
  // }
.detailc{
  z-index: 2;
}
  .drop-down-box {
    position: absolute;
    top: 24px;
    left: 0px;
    width: 230px;
    height: 290px;
    overflow-y: auto;
    /* border: 1px solid #797979; */
    z-index: 2;
    background-color: #e0e0e0;
    span {
      float: left;
      width: 230px;
      cursor: pointer;
    }
    span:hover {
      background-color:#bebebe;
    }
  }
.pullDown{
  position: relative;
}
.inputNow{
  width: 168px !important;
}
.typeBox {
  .firstTypeBox {
    float: left;
    width: 480px;
    margin-left: 30px;
    margin-top: 30px;
    li {
      float: left;
      width: 115px;
      cursor: pointer;
      > div {
        position: relative;
      }
      .iconBox {
        position: absolute;
        display: inline-block;
        top: 3px;
        width: 12px;
        height: 12px;
        border-radius: 3px;
        border: 1px solid #797979;
        .iconfont {
          position: absolute;
          top: -2px;
          left: -7px;
        }
      }
      .firstType {
        margin-left: 1px;
      }
    }
  }
  .typeBtnBox {
    float: left;
    width: 430px;
    span {
      display: inline-block;
      width: 110px;
      height: 30px;
      margin-top: 40px;
      margin-left: 20px;
      cursor: pointer;
      text-align: center;
      line-height: 30px;
      background-color: #e7e7e7;
      border: 1px solid #797979;
    }
  }
      .iconBox1 {
        position: absolute;
        display: inline-block;
        cursor: pointer;
        top: 4px;
        width: 12px;
        height: 12px;
        border-radius: 3px;
        border: 1px solid #797979;
        .iconfont {
          position: absolute;
          top: -2px;
          left: -7px;
        }
      }
  .secondTypeBox {
    float: left;
    width: 1180px;
    margin-top: 10px;
    .firstItem {
      position: relative;
      float: left;
      margin-left: 10px;
      margin-top: 10px;
      width: 1180px;
      border: 1px solid #797979;
      .firstTitle {
        float: left;
        // height: 78px;
      }
      .listBox {
        float: right;
        width: 1070px;
      }
    }
    .secondItemLi {
      // width: 130px;
      position: relative;
      float: left;
      text-align: center;
      margin-right: 15px;
      cursor: pointer;
      // min-height: 38px;
      // border-bottom: 1px solid #797979;
      .iconBox {
        position: absolute;
        display: inline-block;
        top: 4px;
        left: 6px;
        width: 12px;
        height: 12px;
        border-radius: 3px;
        border: 1px solid #797979;
        .iconfont {
          position: absolute;
          top: -2px;
          left: -7px;
        }
      }
      .secondType {
        margin-left: 20px;
      }
    }
    // .secondItemLi:nth-last-child(1){
    //   border-bottom: none;
    // }
  }
}
.marginTwo{
  margin:0 22px;
}
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
    .starBox {
      position: relative;
      .starBg {
        span {
          cursor: pointer;
        }
      }
      .starBg.condition {
        float: left;
      }
      .nowStarNumber {
        position: absolute;
        top: 50%;
        left: 26px;
        transform: translate(0px, -10px);
        pointer-events: none;
        span {
          float: left;
        }
      }
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
    .updateBtn {
      padding: 5px;
      cursor: pointer;
      border: 1px solid #797979;
      border-radius: 5px;
      background-color: #f3f3f3;
    }
    // .tableTh:nth-child(1) {
    //   width: 75px;
    // }
    // .tableTh:nth-child(2) {
    //   width: 145px;
    // }
    // .tableTh:nth-child(4) {
    //   width: 90px;
    // }
    // .tableTh:nth-child(5){
    //   width: 100px;
    // }
    // .tableTh:nth-child(6) {
    //   width: 150px;
    // }

    .tableTh:nth-child(2) {
      width: 564px;
    }
    .tableTh:nth-child(3) {
      width: 198px;
    }
    .tableTh:nth-child(4) {
      width: 211px;
    }
    .tableTh:nth-child(5) {
      width: 486px;
    }
    .tableTh:nth-child(6) {
      width: 414px;
    }
    .tableTh:nth-child(7) {
      width: 157px;
    }
    .tableTh:nth-child(8) {
      width: 100px;
    }
    .tableTh:nth-child(9) {
      width: 140px;
    }
  }
}
    .checkIconBoxAlldown {
          position: relative;
          display: inline-block;
          width: 10px;
          height: 10px;
          margin-top: 4px;
          border: 1px solid #797979;
          overflow: hidden;
          .icon-queren {
            position: absolute;
            top: -3px;
            left: -7px;
          }
    }
.nowConditionStarBox {
    position: relative;
    .starBg {
      cursor: pointer;
    }
    .nowConditionStar {
      position: absolute;
      top: -1px;
      left: 56px;
      pointer-events: none;
    }
  }
.wholeNetwork td{
  height: 48px !important
}

.floatLeft2 {
  margin-left: 20px;
}
.pianyi{
  width:882px;
}
.el-tree {
    position: absolute;
    top: 0px;
    left: 61px;
    cursor: default;
    background: #fff;
    color: black;
    width: 137px;
}
    .checkIconBoxAll {
          position: relative;
          display: inline-block;
          width: 10px;
          height: 10px;
          margin-top: 4px;
          border: 1px solid #797979;
          overflow: hidden;
          .icon-queren {
            position: absolute;
            top: -15px;
            left: -8px;
          }
    }
  .quanxuan{
    cursor: pointer;
    width: 74px;
}
    .Collection{
      position: relative;
      margin-left: 80px;
      span{
        display: inline-block;
        width: 60px;
        height: 30px;
        text-align: center;
        position: absolute;
        top: -35px;
        left: -63px;
        color: #fff;
        font: 400 16px/30px Arial;
        cursor: pointer;
        border-radius: 5px;
        background-color: #C82C37;
      }
    }


</style>

<style>
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background-color: #C82C37 !important;
    border-color: #C82C37 !important;
}
</style>
