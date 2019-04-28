<template>
  <div>
    <div>
      <div class="categroy clearFloat">
        <span v-for="(item, index) of sidebarTabData" @click="switchModule(item.module)" :class="{active: isShowModule == item.module}" :key="index">{{item.title}}</span>
      </div>
      <span onclick="window.history.go(-1)" class="closeBtn">×</span>
      <div class="poolBtnBox">
        <div v-if="isShowModule === 'user-defined'" class="clearFloat">
          <div class="topBtn floatLeft">
            <span @click="showAddBox(!isShowAddBox)" class="span">添加</span>
            <span @click="deleteModules" class="span">删除</span>
            <span @click="allCheck" class="span">全选</span>
            <span @click="reverseCheck" class="span">反选</span>
            <span @click="emptyAll" class="span">清空</span>
          </div>
          <div v-if="isShowAddBox" class="addBox floatLeft">
            <div class="floatLeft">
              <div>
                板块名称： <input @input="inputEvent" v-model="nowAddModuleName" type="text">
              </div>
              <div>
                <span @click="addModuleSubmit" class="span">提交</span>
                <span @click="showAddBox(false)" class="span">取消</span>
              </div>
            </div>
          </div>
          <div class="content floatLeft clearFloat">
            <div class="left floatLeft">
              <EasyScrollbar>
                <div style="height:518px">
                  <div>
                    <div>
                      <ul class="clearFloat">
                        <!-- searchResultList -->
                        <li v-for="(item, index) of modulesDataList" :key="index" class="floatLeft marginLeft10 marginTop5">
                          <span @click="moduleCheck(item)" class="checkIconBox span">
                            <i v-if="item.check" class="iconfont icon-queren"></i>
                          </span>
                          <!-- item.title -->
                          <span @click="moduleCheck(item)" class="moduleName span" :title="item.title">{{item.title}}</span>
                          <span @click="seeModule(item.code,item.title)" class="seeModule span">查看</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </EasyScrollbar>
            </div>
            <div v-if="isShowSeeModule" class="right floatLeft">
              <div class="top">
                <span>板块名称：</span>
                <input v-model="nowUpdateModuleName" @input="inputEvent" type="text" :placeholder="nowSeeModule">
                <span @click="updateModuleName" class="updateModuleName span">更新板块名</span>
                <span @click="isShowSeeModule = false" class="close span">×</span>
              </div>
              <div class="bottom">
                <span @click="emptyModulesInfo" class="span">清空</span>
                <span @click="deleteModulesInfo" class="span">删除</span>
              </div>
              <div>
                <EasyScrollbar>
                  <div style="height:430px;width:430px">
                    <div>
                      <div>
                        <table>
                          <tr>
                            <th v-for="(item, index) of seeModuleData.th" :key="index">{{item}}</th>
                          </tr>
                          <tr v-for="(item, index) of seeModuleData.tr" :key="index">
                            <td>
                              <div @click="moduleCheck(item)">
                                <span class="checkIconBox">
                                  <i v-if="item.check" class="iconfont icon-queren"></i>
                                </span>
                                {{item.securitycode}}
                              </div>
                            </td>
                            <td>{{item.securitysname}}</td>
                            <td>{{item.exchange}}</td>
                            <td>{{item.companyname}}</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                </EasyScrollbar>

              </div>
            </div>
          </div>
        </div>
        <div v-else-if="isShowModule === 'securitiesImport'" class="securitiesImportBox">
          <div class="clearFloat">
            <div class="floatLeft">
              <pull-down-list :prop="selectImpotModule" @impotModuleEvent='impotModuleEvent'></pull-down-list>
            </div>
            <div class="floatLeft marginLeft20">
              <pull-down-list :prop="importWay" @importWayEvent='importWayEvent'></pull-down-list>
            </div>
          </div>
          <div class="securitiesImport">
            <div v-if="nowImportWay == '手工输入'" class="clearFloat">
              <div class="securitiesImportCondition floatLeft">
                <div class="marginLeft20 marginTop15">
                  <pull-down-list :prop="importWayType" @importWayTypeEvent='importWayTypeEvent'></pull-down-list>
                </div>
                <div class="floatLeft marginLeft20 marginTop15">
                  请在以下框内输入证券列表：
                </div>
                <div class="floatLeft marginLeft20 marginTop15">
                  <textarea :placeholder="placeholderList" v-model="textareaVlaue"></textarea>
                </div>
                <div class="floatLeft marginLeft20 marginTop15">
                  <span @click="ManualQueries" class="queryBtn">查询</span>
                </div>
              </div>
              <div class="securitiesImportResult floatLeft">
                <div class="marginLeft20 marginTop15 marginBottom15">
                  <span @click="addMatch" class="addCode">添加匹配代码</span>
                </div>
                <div class="marginTop15" style="height:530px">
                  <EasyScrollbar>
                    <div style="height:530px">
                      <div>
                        <div>
                          <table>
                            <tr>
                              <th v-for="(item, index) of securitiesImportResult.th" :key="index">{{item}}</th>
                              <th>
                                <div class="quanxuan" @click="moduleCheckAll">
                                    全选
                                    <span class="checkIconBoxAll">
                                     <i v-if="allCheckb" class="iconfont icon-queren"></i>
                                    </span>
                                </div>
                              </th>
                            </tr>
                            <tr v-for="(item, index) of securitiesImportResult.tr" :key="index">
                              <td v-if='index == 0' :rowspan='securitiesImportResult.matchcountNumber'>
                                <span v-if="index === 0">匹配列表</span>
                                <span v-else></span>
                              </td>
                              <td>{{item.code}}</td>
                              <td>{{item.name}}</td>
                              <td>{{item.company}}</td>
                              <td>
                                <div class="quanxuan" @click="moduleCheckAlldown(item,index)">
                                    <span class="checkIconBoxAlldown">
                                     <i v-if="item.check" class="iconfont icon-queren"></i>
                                    </span>
                                </div>
                              </td>
                            </tr>
                            <tr v-for="(item, index) of securitiesImportResult.tr2" :key="index">
                              <td v-if='index == 0' :rowspan='securitiesImportResult.unmatchlistNumber'>
                                <span v-if="index === 0">未匹配列表</span>
                                <span v-else></span>
                              </td>
                              <td>{{item.code}}</td>
                              <td>{{item.name}}</td>
                              <td>{{item.company}}</td>
                              <td></td>
                            </tr>
                          </table>
                          <div class="matchcountBottom">
                            匹配代码列表
                            <span>{{securitiesImportResult.matchcountNumber}}</span> 条， 未匹配代码列表
                            <span>{{securitiesImportResult.unmatchlistNumber}}</span> 条
                          </div>
                        </div>
                      </div>
                    </div>
                  </EasyScrollbar>
                </div>
              </div>
            </div>
            <div v-else class="multiSelection">
              <div class="clearFloat">
                <div class="floatLeft marginLeft20 marginTop15">
                  <pull-down-list :prop="importWayType" @importWayTypeEvent='importWayTypeEvent'></pull-down-list>
                </div>
              </div>
              <div class="floatLeft marginLeft20 margintopwenjian">
                <div class="uploadFiles">
                  <label for="fileExport">上传文件(csv、txt)等
                    <span class="fileExportBtn">{{selectFileName}}</span>
                  </label>
                  <span v-if="selectFileName !== '选择文件'" @click="clearFile" class="clearFile">清除文件</span>
                  <input type="file" id="fileExport" @change="handleFileChange($event)" ref="inputer">
                </div>
              </div>
              <div class="searchBtn floatLeft marginLeft20">
                <span @click="filequery">查询</span>
              </div>
              <div class="securitiesImportResult floatLeft">
                <div class="marginLeft20 marginTop15 marginBottom15 margintopp">
                  <span @click="addMatcht" class="addCode">添加匹配代码</span>
                </div>
                <div class="marginTop15" style="height:530px">
                  <EasyScrollbar>
                    <div style="height:530px">
                      <div>
                        <div>
                          <table>
                            <tr>
                              <th v-for="(item, index) of securitiesImportResult1.th" :key="index">{{item}}</th>
                              <th>
                                <div class="quanxuan" @click="moduleCheckAllt">
                                    全选
                                    <span class="checkIconBoxAll">
                                     <i v-if="allCheckbt" class="iconfont icon-queren"></i>
                                    </span>
                                </div>
                              </th>
                            </tr>
                            <tr v-for="(item, index) of securitiesImportResult1.tr" :key="index">
                              <td v-if='index == 0' :rowspan='securitiesImportResult1.matchcountNumber'>
                                <span v-if="index === 0">匹配列表</span>
                                <span v-else></span>
                              </td>
                              <td>{{item.code}}</td>
                              <td>{{item.name}}</td>
                              <td>{{item.company}}</td>
                              <td>
                                <div class="quanxuan" @click="moduleCheckAlldownt(item,index)">
                                    <span class="checkIconBoxAlldown">
                                     <i v-if="item.check" class="iconfont icon-queren icon-querent"></i>
                                    </span>
                                </div>
                              </td>
                            </tr>
                            <tr v-for="(item, index) of securitiesImportResult1.tr2" :key="index">
                              <td v-if='index == 0' :rowspan='securitiesImportResult1.unmatchlistNumber'>
                                <span v-if="index === 0">未匹配列表</span>
                                <span v-else></span>
                              </td>
                              <td>{{item.code}}</td>
                              <td>{{item.name}}</td>
                              <td>{{item.company}}</td>
                              <td></td>
                            </tr>
                          </table>
                          <div class="matchcountBottom">
                            匹配代码列表
                            <span>{{securitiesImportResult1.matchcountNumber}}</span> 条， 未匹配代码列表
                            <span>{{securitiesImportResult1.unmatchlistNumber}}</span> 条
                          </div>
                        </div>
                      </div>
                    </div>
                  </EasyScrollbar>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commonMethods from '@/common/common.js'
import pullDownList from '@/components/common/pullDownList'
import pagination from '@/components/common/pagination'
export default {
  data() {
    return {
      myBarOption: {
        barColor: "red"
      },
      allCheckb: false,
      allCheckbt: false,
      isShowModule: 'user-defined',
      isShowAddBox: false,
      oneLine: false,
      isShowSeeModule: false,
      nowTabIndex: 0,
      nowAddModuleName: '',
      placeholderList: '例如：\n000000\n000001\n000002',
      textareaVlaue: '',
      emptyId:0,
      selectFileName:'选择文件',
      sidebarTabData: [
        { module: 'user-defined', title: '自定义板块管理' },
        { module: 'securitiesImport', title: '证券导入' },
      ],
      paginationData: {
        parentEvent: 'paginationSelect',
        page_Count: 0,
        total_Count: 0,
        current: 1
      },
      modulesDataList: [],
      seeModuleData: {
        th: ['证券代码', '证券名称', '交易市场','发行主体'],
        tr: [
          // {证券代码: '835364', 证券名称: '德善药业', 交易市场: '交易市场a'}
        ]
      },
      impotModuleName: '',
      selectImpotModule: {
        title: '请选择要导入的板块：',
        parentEvent: 'impotModuleEvent',
        default: '请选择',
        listWidth: 143,
        nowSelectWidth: 145,
        nowSelectHeight: 25,
        nowSelectFontSize: 13,
        list: [
          '板块一',
          '板块二'
        ]
      },
      file: '',
      sendFile: '',
      sectorban:'',
      matchCode:'',
      nowSeeModule: '',
      nowUpdateModuleName: '',
      nowImportWay: '手工输入',
      importWay: {
        title: '导入方式：',
        parentEvent: 'importWayEvent',
        default: '手工输入',
        listWidth: 143,
        nowSelectWidth: 145,
        nowSelectHeight: 25,
        nowSelectFontSize: 13,
        list: [
          '手工输入',
          '文件上传'
        ]
      },
      importWayType: {
        title: '类型：',
        parentEvent: 'importWayTypeEvent',
        default: '全部',
        listWidth: 143,
        nowSelectWidth: 145,
        nowSelectHeight: 25,
        nowSelectFontSize: 13,
        list: [
          '股票',
          '债券',
          '基金',
          '新三板',
        ]
      },
      codetype: '',
      securitiesImportResult: {
        th: ['类型', '证券代码', '证券名称','发行主体'],
        tr: [
          // {title: '匹配列表', code: '835364', name: '德善药业'},
        ],
        tr2: [],
        matchcountNumber: 0,
        unmatchcountNumber: 0
      },
      securitiesImportResult1: {
        th: ['类型', '证券代码', '证券名称','发行主体'],
        tr: [
          // {title: '匹配列表', code: '835364', name: '德善药业'},
        ],
        tr2: [],
        matchcountNumber: 0,
        unmatchcountNumber: 0
      },
      keyword: '',
      isShowsearchResultList: false,
      hasSearchResultList: false,
      searchResultList: [
        // {name: '大成基金大成基金', check: false},
        // {name: '大成基金大成基金', check: false},
        // {name: '大成基金大成基金', check: false},
      ]
    }
  },
  components: {
    pullDownList,
    pagination,
  },
  methods: {
    // 关闭
    closePage() {
      this.$store.state.isShowUserSystem = false;
    },
    // 切换tab
    switchModule(nowModule) {
      this.isShowModule = nowModule;
      if (nowModule !== 'user-defined') {
        this.nowImportWay = '手工输入';
        this.impotModuleName = '';
        this.moduleInit();
        console.log(this.modulesDataList)
        this.selectImpotModule.list = this.modulesDataList.map(item => {
          return item.title;
        });
      } else {
        this.nowSeeModule = '';
      }
    },
    // 显示添加模块Box
    showAddBox(flag) {
      this.isShowAddBox = flag;
      if (!flag) {
        this.nowAddModuleName = '';
      }
    },
    inputEvent() {
      this.nowAddModuleName = this.checkName(this.nowAddModuleName.trim());
      this.nowUpdateModuleName = this.checkName(this.nowUpdateModuleName.trim());
      this.keyword = this.checkName(this.keyword.trim());
    },
    // 添加模块提交
    addModuleSubmit() {
      console.log('提交的内容',this.nowAddModuleName)
      // this.nowAddModuleName
      if (!this.nowAddModuleName) return;
      const url = 'http://10.25.24.51:10201/api/risk/finchina/sector_add?'
      const sendData = {
        userid: 'risk',
        sectorname: this.nowAddModuleName
      }
      this.$_axios.get(url, {
        params: sendData
      }).then(response => {
        if(response.data.code == '1'){
          alert('添加失败')
          return;
        }
          console.log(response)
        if(response.data.msg == '板块已存在' && response.data.code == '1'){
            this.nowAddModuleName = '';
            // this.moduleInit();
          alert('板块已存在');
          this.isShowAddBox = false;
        }
        if (response.data.msg === '添加成功!' && response.data.code == '0') {
          this.nowAddModuleName = '';
          // 重新渲染已有板块
          this.moduleInit();
          alert('添加成功');
          this.isShowAddBox = false;
        }
      }).catch((err) => {

      });
    },
    // 删除模块
    deleteModules() {
      const url = 'http://10.25.24.51:10201/api/risk/finchina/sector_del'
      const tempArr = [];
      this.modulesDataList.map(item => {
        if (item.check) {
          tempArr.push(item.code);
        }
      });
      console.log(tempArr)
      const sendData = {
        userid: 'risk',
        sectorcode: tempArr.join(',')
      }
      if (!tempArr.length) {
        alert('没有选择要删除的模块');
        return;
      }
      console.log(tempArr.join(','))
      this.$_axios.get(url, {
        params: sendData
      }).then((response) => {
        if(response.data.code == '1'){
          alert('删除失败')
          return;
        }
          console.log(response)
        if (response.data.code == '0' && response.data.msg == '删除成功!') {
          alert('删除成功')
          // 重新渲染已有板块
          this.moduleInit();
        }
      }).catch((err) => {

      });
    },
    // 选择模块
    moduleCheck(item) {
      item.check = !item.check;
    },
    // 全选模块
    allCheck() {
      this.modulesDataList.forEach(item => {
        item.check = true;
      });
    },
    // 反选模块
    reverseCheck() {
      this.modulesDataList.forEach(item => {
        item.check = !item.check;
      });
    },

    //清空模块
    emptyAll(){
        const url = 'http://10.25.24.51:10201/api/risk/finchina/sector_drop?'
        const sendData = {
            userid:'risk'
        }
        this.$_axios.get(url,{
            params:sendData
        }).then(response =>{
          if(response.data.code =='1'){
            alert('清空失败')
            return;
          }
            console.log(response)
            if(response.data.code == '0' && response.data.msg == '清空板块成功'){
                alert('清空板块成功')
                this.moduleInit()
            }
        }).catch(err=>{

        })
    },
    // 查看板块
    seeModule(moduleid,modulename) {
      const url = 'http://10.25.24.51:10201/api/risk/finchina/sector_detail_query'
      this.sectorban = moduleid
      const sendData = {
        sectorcode: moduleid,
      }
      console.log(sendData)
      this.isShowSeeModule = true;
      // this.nowSeeModule = '';
      this.$_axios.get(url, {
        params: sendData
      }).then((response) => {
        console.log(response)
        if(response.data.code == '1'){
          alert('查询失败！')
          return;
        }
        this.nowSeeModule = modulename;
        if (response.data.code == '0' && response.data.message == 'success!') {
          this.seeModuleData.tr = response.data.result.map(item => {
            console.log(item)
            const tempItem = JSON.parse(JSON.stringify(item));
            tempItem.check = false;
            return tempItem;
          });
        }
        console.log(this.seeModuleData.tr)
      }).catch((err) => {

      });
    },
      handleFileChange(event) {
      this.file = event.target.files[0];
      if (this.file) {
        const type = this.file.name.slice(-4).toLowerCase();
        if (type != '.txt' && type != '.csv') {
          this.file = '';
          event.target.value = '';
          this.selectFileName = '选择文件';
          alert('请输入txt或csv类型文件')
          return;
        }
        event.target.value = '';
        this.selectFileName = this.file.name;
      }
      console.log('file', this.file)
    },
    clearFile() {
      // inputer
      this.$refs.inputer = null;
      this.selectFileName = '选择文件';
      this.file = '';
    },
    // 更新板块名
    updateModuleName() {
      // this.nowUpdateModuleName
      // if (!this.nowSeeModule || !this.nowUpdateModuleName) return;
      if (this.nowUpdateModuleName == "") {
        alert("请输入板块名");
      }
      else {
        const url = 'http://10.25.24.51:10201/api/risk/finchina/sector_rename'
        this.modulesDataList.forEach(item=>{
            if(this.nowSeeModule == item.title){
                this.emptyId = item.code
            }
            console.log(this.emptyId)
        })
        const sendData = {
          sectorcode: this.emptyId,
          newsector: this.nowUpdateModuleName
        }
        console.log('sendData', sendData)
        this.$_axios.get(url, {
          params: sendData
        }).then((response) => {
          console.log(response.data)
          if (response.data.code == '0') {
            this.nowSeeModule = this.nowUpdateModuleName;
            this.nowUpdateModuleName = '';
            this.moduleInit();
          }
          else if (response.data.code == '1') {
            alert('更新板块名失败')
          }
        }).catch((err) => {

        });
      }
    },
    // 清空板块信息
    emptyModulesInfo() {
      if (!this.nowSeeModule) return;
      const url = 'http://10.25.24.51:10201/api/risk/finchina/sector_detail_drop'
      console.log(this.modulesDataList)
        this.modulesDataList.forEach(item=>{
          console.log(this.nowSeeModule)
            if(this.nowSeeModule == item.title){
                this.emptyId = item.code
                console.log(this.emptyId)
            }
        })
      const sendData = {
        sectorcode: this.emptyId,
      }
      console.log('sendData', sendData)
      this.$_axios.get(url, {
        params: sendData
      }).then((response) => {
        console.log(response.data)
        if (response.data.code == '0') {
          alert('清空成功')
          // this.moduleInit();
          this.seeModule(this.sectorban,this.nowSeeModule);
          // this.isShowSeeModule = false;
        }
        else if (response.data.code == '1') {
          alert('清空失败')
        }
      }).catch((err) => {

      });
    },
    // 删除板块信息
    deleteModulesInfo() {
      if (!this.nowSeeModule) return;
      const url = 'http://10.25.24.51:10201/api/risk/finchina/sector_detail_delete'
      const tempArr = [];
      this.seeModuleData.tr.forEach(item => {
        if (item.check) {
          tempArr.push(item.sector_detail_id);
        }
      });
      console.log(tempArr.join(','))
      if (!tempArr.join(',')) return;
      const sendData = {
        sector_detail_id: tempArr.join(',')
      }
      console.log('sendData', sendData)
      this.$_axios.get(url, {
        params: sendData
      }).then((response) => {
        console.log(response.data)
        if (response.data.code == '0') {
          alert('删除成功')
          this.seeModule(this.sectorban,this.nowSeeModule);
        }
        else if (response.data.code == '1') {
          alert('删除失败')
        }
      }).catch((err) => {

      });
    },
    moduleCheckAlldown(item,index){
        item.check = !item.check
        console.log(item.check,'和',index)
        let moduleAllDown = this.securitiesImportResult.tr.every(item=>{
            return item.check
        })
        if(moduleAllDown){
            this.allCheckb = moduleAllDown
        }else{
            this.allCheckb = false
        }

    },
    moduleCheckAlldownt(item,index){
        item.check = !item.check
        console.log(item.check,'和',index)
        let moduleAllDown = this.securitiesImportResult1.tr.every(item=>{
            return item.check
        })
        if(moduleAllDown){
            this.allCheckbt = moduleAllDown
        }else{
            this.allCheckbt = false
        }

    },
    moduleCheckAll(){
        this.allCheckb = !this.allCheckb
        console.log(this.securitiesImportResult.tr)
        if(this.allCheckb){
            this.securitiesImportResult.tr.forEach(item=>{
                item.check = true
            }) 
        }else{
            this.securitiesImportResult.tr.forEach(item=>{
                item.check = false
            }) 
        }
    },
    moduleCheckAllt(){
        this.allCheckbt = !this.allCheckbt
        console.log(this.securitiesImportResult1.tr)
        if(this.allCheckbt){
            this.securitiesImportResult1.tr.forEach(item=>{
                item.check = true
            }) 
        }else{
            this.securitiesImportResult1.tr.forEach(item=>{
                item.check = false
            }) 
        }
    },
    //按文件输入查询
    filequery(){
      this.sendFile = this.file;
      const url = 'http://10.25.24.51:10201/api/risk/finchina/sector_detail_match';
      const sendData = {
        readtype:1,
        sectype: this.codetype || '',
        securitycodes: ''
      }
      let formData = new FormData();
      for(let key in sendData){
        if(sendData.hasOwnProperty(key)){
          formData.append(key, sendData[key])
        }
      }
      this.sendFile && formData.append('file', this.sendFile);
      this.$_axios.post(url,formData).then(response=>{
        console.log(response)
        if(response.data.code == '1'){
          alert('匹配失败')
          return;
        }
        if (response.data.code == '0') {
          this.securitiesImportResult1.tr = response.data.matchlist.map(item => {
            return {
              code: item.securitycode,
              name: item.securitysname,
              company: item.companyname,
              check: false,
              stcodeid: item.stcodeid
            }
          });
          this.securitiesImportResult1.tr2 = response.data.unmatchlist.map(item => {
            return {
              code: item
            }
          });
          this.securitiesImportResult1.matchcountNumber = response.data.matchcount.matchcount;
          this.securitiesImportResult1.unmatchlistNumber = response.data.matchcount.unmatchcount;
        }
      }).catch((err) => {

      });
    

    },
    // 手动选择查询
    ManualQueries() {
      const codelist = this.textareaVlaue.split('\n');
      console.log(codelist)
      const tempArr = [];
      codelist.forEach(item => {
        if (item) {
          tempArr.push(item);
        }
      });
      if (!tempArr.length) {
        alert('请输入证券列表');
        return;
      }
      const url = 'http://10.25.24.51:10201/api/risk/finchina/sector_detail_match'
      const sendData = {
        sectype: this.codetype || '',
        securitycodes: tempArr.join(','),
        readtype:0,
        file:''
      };
      let formData = new FormData();
      for (let key in sendData) {
        if (sendData.hasOwnProperty(key)) {
          formData.append(key, sendData[key]);
        }
      }
      
      // return
      console.log(sendData)
      this.$_axios.post(url,formData).then((response) => {
        console.log(response)
        if(response.data.code == '1'){
          alert('匹配失败')
          return;
        }
        if (response.data.code == '0') {
          this.securitiesImportResult.tr = response.data.matchlist.map(item => {
            return {
              code: item.securitycode,
              name: item.securitysname,
              company: item.companyname,
              check: false,
              stcodeid: item.stcodeid,
            }
          });
          console.log(this.securitiesImportResult.tr)
          this.securitiesImportResult.tr2 = response.data.unmatchlist.map(item => {
            return {
              code: item
            }
          });
          this.securitiesImportResult.matchcountNumber = response.data.matchcount.matchcount;
          this.securitiesImportResult.unmatchlistNumber = response.data.matchcount.unmatchcount;
        }
      }).catch((err) => {

      });
    },
    // 多项选择-搜索
    search() {
      const url = 'http://10.25.24.51:10189/api/risk/code_import/choose'
      const sendData = {
        action: 'query',
        codetype: this.codetype,
        keyword: this.keyword,
        page: 0,
        pagesize: 4000,
      };
      this.oneLine = false;
      this.searchSendData = JSON.parse(JSON.stringify(sendData));
      this.isShowsearchResultList = true;
      this.hasSearchResultList = false;
      this.paginationData.current = 1;
      this.$_axios.get(url, {
        params: this.searchSendData
      }).then((response) => {
        if (this.codetype == 'B' || this.codetype == 'F') {
          this.oneLine = true;
        }
        const resultData = response.data;
        if (resultData.code == '0' && resultData.msg == 'query success') {
          this.hasSearchResultList = true;
          if (resultData.result.totalcount) {
            this.paginationData.page_Count = Math.ceil(resultData.result.totalcount / 4000);
          } else {
            this.paginationData.page_Count = 0;
          }
          this.paginationData.total_Count = resultData.result.totalcount;
          this.searchResultList = resultData.result.securitylist.map(item => {
            return {
              check: false,
              name: item.securityname,
              code: item.securitycode
            }
          });
        } else if (resultData.code == '1') {

        }
      }).catch((err) => {

      });
    },
    // 多项选择-搜索-分页
    paginationSelect(pageNumber) {
      const url = 'http://10.25.24.51:10189/api/risk/code_import/choose'
      this.searchSendData.page = pageNumber - 1;
      this.isShowsearchResultList = true;
      this.hasSearchResultList = false;
      this.paginationData.current = pageNumber;
      this.$_axios.get(url, {
        params: this.searchSendData
      }).then((response) => {
        const resultData = response.data;
        if (resultData.code == '0' && resultData.msg == 'query success') {
          this.hasSearchResultList = true;
          this.searchResultList = resultData.result.securitylist.map(item => {
            return {
              check: false,
              name: item.securityname,
              code: item.securitycode
            }
          });
        } else if (resultData.code == '1') {

        }
      }).catch((err) => {

      });
    },
    // 添加至板块-取消
    cancelToModule() {
      this.searchResultList.forEach(item => {
        item.check = false;
      });
    },
    // 添加至板块
    addToModule() {
      if (!this.impotModuleName) {
        alert('请选择要导入的板块');
        return;
      }
      const codelist = [];
      this.searchResultList.forEach(item => {
        if (item.check) {
          codelist.push(item.code);
        }
      });
      if (!codelist.length) {
        alert('未选择代码');
        return;
      }
      const url = 'http://10.25.24.51:10189/api/risk/code_import/choose'
      const sendData = {
        userid: 'risk',
        action: 'insert',
        codetype: this.codetype,
        sector: this.impotModuleName,
        codelist: codelist.join(',')
      };
      this.$_axios.get(url, {
        params: sendData
      }).then((response) => {
        if (response.data.code == '0') {
          alert('添加成功');
        } else if (response.data.code == '1') {
          alert('添加失败');
        }
      }).catch((err) => {
        alert('查询请求服务失败');
      });
    },
    addMatcht(){
      if (!this.matchCode) {
        alert('请选择要导入的板块');
        return;
      }
      const url = 'http://10.25.24.51:10201/api/risk/finchina/sector_detail_insert'
      const codelist = this.securitiesImportResult1.tr.map(item => {
        return item.code;
      });
      const temarr =[]
      console.log(this.securitiesImportResult1.tr)
      this.securitiesImportResult1.tr.forEach(item=>{
          if(item.check){
              temarr.push(item.stcodeid)
          }
      })
      const sendData = {
          sectorcode:this.matchCode,
          stcodeids: temarr.join(',')
      };
      this.$_axios.get(url, {
        params: sendData
      }).then((response) => {
        if (response.data.code == '0') {
          alert('添加成功');
        } else if (response.data.code == '1') {
          alert('添加失败');
        } else if (response.data.code == '2' && response.data.msg == 'already exists the record') {
          alert('重复添加');
        }
      }).catch((err) => {
        alert('添加失败');
      });

    },
    // 添加匹配代码
    addMatch() {
      let option = this.securitiesImportResult.tr.some(item=>{
        return item.check
      })
      console.log(this.securitiesImportResult.tr)
      console.log(option)
      if(!option){
        alert('请选择添加的代码')
        return;
      }
      if (!this.matchCode) {
        alert('请选择要导入的板块');
        return;
      }
      const url = 'http://10.25.24.51:10201/api/risk/finchina/sector_detail_insert'
      const codelist = this.securitiesImportResult.tr.map(item => {
        return item.code;
      });
      if (!codelist.length) {
        alert('没有匹配代码');
        return;
      }
      const temarr =[]
      console.log(this.securitiesImportResult.tr)
      this.securitiesImportResult.tr.forEach(item=>{
          if(item.check){
              temarr.push(item.stcodeid)
          }
      })
      console.log(temarr)
      const sendData = {
          sectorcode:this.matchCode,
          stcodeids: temarr.join(',')
      };
      this.$_axios.get(url, {
        params: sendData
      }).then((response) => {
        if (response.data.code == '0') {
          alert('添加成功');
        } else if (response.data.code == '1') {
          alert('添加失败');
        } else if (response.data.code == '2' && response.data.msg == 'already exists the record') {
          alert('重复添加');
        }
      }).catch((err) => {
        alert('添加失败');
      });
    },
    importWayEvent(...data) {
      console.log(data[0])
      if (this.nowImportWay !== data[0]) {
        this.nowImportWay = data[0];
        console.log(this.codetype)
        // this.codetype = 'S';
        // console.log(this.codetype)
      }
    },
    impotModuleEvent(...data) {
        console.log(data)
        let fuhe = this.modulesDataList.find(item=>{
            console.log(data[0])
            return data[0] == item.title
        })
      this.matchCode = fuhe.code;
    },
    // 类型
    importWayTypeEvent(...data) {
      switch (data[0]) {
        case '股票':
          this.codetype = 'S';
          break;
        case '债券':
          this.codetype = 'B';
          break;
        case '基金':
          this.codetype = 'F';
          break;
        case '新三板':
          this.codetype = 'N';
          break;
      }
    },
    moduleInit() {
      const url = 'http://10.25.24.51:10201/api/risk/finchina/sector_query?'
      const sendData = {
        userid: 'risk'
      };
      console.log('查询')
      this.$_axios.get(url, {
        params: sendData
      }).then((response) => {
        console.log('查询结果', response)
        if (!response.data) {
          this.modulesDataList = [];
        } else {
          if(response.data.code == '1'){
            alert('查询失败！')
            return;
          }
          if (response.data.code == '0') {
            console.log(response.data.sectorlist)
            this.modulesDataList = response.data.sectorlist.map(item => {
              return {
                code: item.sectorcode,
                title: item.sectorname,
                check: false
              }
            });
            console.log(this.modulesDataList)
          } else {
            this.modulesDataList = [];
          }
        }
      }).catch((err) => {

      });
    },
    checkName(val) {
      // let reg = new RegExp("[`~!%@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
      let reg = new RegExp("[`~!%@#$^&=|''\\[\\]<>/?~@#……&*——|']");
      let rs = "";
      for (let i = 0, l = val.length; i < val.length; i++) {
        rs = rs + val.substr(i, 1).replace(reg, '');
      }
      return rs;
    }
  },
  mounted() {
    this.moduleInit();
  },
  created(){
    this.moduleInit();
  }
}
</script>

<style lang="less" scoped>
.closeBtn {
  font-size: 40px;
  cursor: pointer;
  font-weight: 500;
  position: absolute;
  left: 1200px;
  top: 20px;
}
.addBox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 1px solid #797979;
  line-height: 25px;
  z-index: 4;
  > div {
    position: fixed;
    top: 35%;
    left: 25%;
    width: 400px;
    height: 100px;
    z-index: 5;
    > div {
      width: 215px;
      height: 50%;
      margin: 7px auto;
    }
  }
  input {
    width: 140px;
    height: 25px;
    border: 1px solid #797979;
  }
  span {
    padding: 5px 20px;
    margin-left: 28px;
    cursor: pointer;
    border: 1px solid #797979;
    border-radius: 5px;
  }
}

.securitiesImport {
  width: 1338px;
  height: 636px;
  margin-top: 20px;
  border: 1px solid #797979;
  .securitiesImportCondition {
    width: 300px;
    textarea {
      width: 248px;
      height: 460px;
      resize: none;
      outline: none;
      border: 1px solid #797979;
    }
    .queryBtn {
      margin-left: 90px;
      padding: 5px 20px;
      cursor: pointer;
      border: 1px solid #797979;
      border-radius: 5px;
      background-color: #eaeaea;
    }
  }
  .securitiesImportResult {
    .addCode {
      margin-left: 90px;
      margin-bottom: 15px;
      padding: 5px 20px;
      cursor: pointer;
      border: 1px solid #797979;
      border-radius: 5px;
      background-color: #eaeaea;
    }
    .matchcountBottom {
      text-align: center;
      border: 1px solid #797979;
      border-top: none;
    }
    table {
      margin-left: 1px;
      margin-top: 10px;
      border: 1px solid #797979;
      border-collapse: collapse;
      word-wrap: break-word;
      word-break: break-all;
      th {
        height: 40px;
        width: 200px;
        line-height: 40px;
        border: 1px solid #797979;
        background-color: #f0f5f9;
      }
      th:nth-child(4) {
        height: 40px;
        width: 212px;
        line-height: 40px;
        border: 1px solid #797979;
        background-color: #f0f5f9;
      }
      th:nth-child(5) {
        height: 40px;
        width: 100px;
        line-height: 40px;
        border: 1px solid #797979;
        background-color: #f0f5f9;
      }
      tr {
        overflow: hidden;
        border: 1px solid #797979;
      }
      td {
        text-align: center;
        vertical-align: middle;
        border: 1px solid #797979;
      }
    }
  }
  .multiSelection {
      position: relative;

    input {
      width: 150px;
      height: 25px;
      line-height: 25px;
      border: 1px solid #797979;
    }
    .searchBtn {
      margin-top: 17px;
      span {
        position: absolute;
        top: 100px;
        left: 138px;
        padding: 3px 25px;
        cursor: pointer;
        background-color: #eaeaea;
        border: 1px solid #797979;
      }
    }
    .searchResulBox {
      margin-top: 15px;
      height: 560px;
      width: 978px;
      overflow: hidden;
      .searchResultList.oneLine {
        width: 960px;
        > span:nth-child(3) {
          width: 800px;
        }
      }
      .searchResultList {
        width: 242px;
        height: 36px;
        cursor: pointer;
        span {
          float: left;
        }
        > span:nth-child(3) {
          width: 140px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .checkIconBox {
          position: relative;
          display: inline-block;
          width: 10px;
          height: 10px;
          margin-top: 8px;
          border: 1px solid #797979;
          overflow: hidden;
          .icon-queren {
            position: absolute;
            top: -2px;
            left: -8px;
          }
        }
      }
    }
  }
}

.categroy {
  margin-left: 260px;
  span {
    float: left;
    width: 140px;
    height: 40px;
    cursor: pointer;
    text-align: center;
    line-height: 40px;
    color: #fff;
    background-color: #d7d7d7;
  }
  span.active {
    // background-color: rgba(0, 114, 255, 0.5);
    background-color: #b50229;
    font-size: 17px;
  }
}
.span {
  cursor: pointer;
  padding: 6px;
  margin-left: 20px;
  border: 1px solid #797979;
  border-radius: 5px;
}
.poolBtnBox {
  width: 990px;
  margin-top: 40px;
  margin-left: 260px;
}

.content {
  width: 1100px;
  height: 520px;
  margin-top: 20px;
  border: 1px solid #797979;
  .left {
    width: 666px;
    height: 100%;
    border-right: 1px solid #797979;
    li {
      span {
        float: left;
        cursor: pointer;
      }
      .checkIconBox {
        position: relative;
        width: 10px;
        height: 10px;
        margin-top: 8px;
        border: 1px solid #797979;
        overflow: hidden;
        .icon-queren {
          position: absolute;
          top: -1px;
          left: -6px;
        }
      }
      .moduleName {
        width: 155px;
        padding: 5px 0;
        margin-left: 5px;
        text-align: center;
        border: 1px solid #797979;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .seeModule {
        margin-left: 2px;
        padding: 3px;
        border: 1px solid #797979;
        border-radius: 5px;
      }
    }
  }
  .right {
    .top {
      padding-top: 5px;
      input {
        width: 120px;
        height: 25px;
        border: 1px solid #797979;
      }
      span {
        margin-left: 5px;
      }
      .close,
      .updateModuleName {
        padding: 5px;
        cursor: pointer;
        background-color: #eaeaea;
        border: 1px solid #797979;
      }
    }
    table {
      margin-left: 1px;
      margin-top: 10px;
      width: 318px;
      table-layout: fixed;
      border: 1px solid #797979;
      border-collapse: collapse;
      word-wrap: break-word;
      word-break: break-all;
      th {
        height: 40px;
        width: 106px;
        line-height: 40px;
        border: 1px solid #797979;
        background-color: #f0f5f9;
      }
      tr {
        overflow: hidden;
        border: 1px solid #797979;
      }
      td {
        width: 106px;
        text-align: center;
        vertical-align: middle;
        border: 1px solid #797979;
        div {
          cursor: pointer;
        }
        .checkIconBox {
          position: relative;
          display: inline-block;
          width: 10px;
          height: 10px;
          margin-top: 8px;
          border: 1px solid #797979;
          overflow: hidden;
          .icon-queren {
            position: absolute;
            top: -2px;
            left: -8px;
          }
        }
      }
    }
    
    .bottom {
      margin-left: 60px;
      margin-top: 20px;
      span {
        margin-left: 20px;
        padding: 5px 20px;
        border: 1px solid #797979;
        border-radius: 5px;
        cursor: pointer;
        background-color: #eaeaea;
      }
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
      .checkIconBoxAlldown {
          position: relative;
          display: inline-block;
          width: 10px;
          height: 10px;
          margin-top: 4px;
          border: 1px solid #797979;
          overflow: hidden;
          .icon-querent {
            position: absolute;
            top: -3px;
            left: -8px;
          }
    }
.quanxuan{
    cursor: pointer;
}
.margintopwenjian{
  margin-top: 22px;
}
.margintopp{
  margin-left: -12px;
  margin-top: -26px;
}
</style>



