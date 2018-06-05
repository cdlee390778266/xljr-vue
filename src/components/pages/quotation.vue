<template>
  <div>
    <ql-head></ql-head>
    <!--  页面主体  -->
    <div class="wrapper data">

        <!--  左侧菜单  -->
        <div class="news-menu">
            <el-tree :data="leftMenu" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </div>

        <!--  右侧详细内容  -->
        <div class="right news">
          <div class="news-top export-top">
                  <form action="" class="new-form" id="search-form">
                      <input type="hidden" name="F001" id="F001" value="wq123" />
                      <input type="hidden" name="F002" id="F002" value="" />
                      <div class="new-form-item">
                          <select>
                              <option value="0" checked>前复权</option>
                              <option value="1">前复权</option>
                          </select>
                      </div>
                      <div class="new-form-item">
                          <select>
                              <option value="0" checked>日线</option>
                              <option value="1">日线</option>
                          </select>
                      </div>
                      <div class="new-form-item" id="date">
                          <label for="">日期</label>
                          <el-date-picker
                            v-model="daterRange"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions">
                          </el-date-picker>
                      </div>
                      <div class="new-form-item">
                          <input type="button" value="预览" class="new-btn search"  id="preview" />
                          <input type="button" value="导出" class="new-btn export"  id="download" />
                      </div>
                  </form>
              </div>
          <div class="right-body export-right-body" id="right-body">
              <!-- 数据 -->
              <div class="database-box" id="data-box" style="display:block;">
                  <input type="hidden" id="dataId" />
                  <div class="detail">
                      
                      <div class="table-screen">
                          <div class="screen-select-slide" style="display: block;">
                              <!-- 代码选择下拉 -->
                              <div class="slide-box" style="display: block;">
                                  <div class="slide-body">
                                    <div class="slide-code-item">
                                        <div class="slide-code-title">
                                            <el-input placeholder="搜索行业分类" v-model="filterText"></el-input>
                                        </div>
                                        <el-tree :data="codeData.trees" :props="codeData.defaultProps" show-checkbox @check="handleCheck" :filter-node-method="filterNode" ref="tree"></el-tree>
                                        <!-- 加载中 -->
                                        <div class="loading" id="slide-item-loading" style="display: none;"><div><span class="fa fa-refresh fa-spin fa-3x fa-fw margin-bottom"></span></div></div>
                                    </div>
                                    <div class="slide-code-item" handletype="add" id="add">
                                        <div class="code-result">可选代码/查找结果[<span>{{codeData.codesL.length}}</span>]个</div>
                                        <div class="code-list">
                                            <ul>
                                              <li v-for="code in codeData.codesL"><span><i :class="{'fa fa-check-square active' : code.isSelected, 'fa fa-square-o' : !code.isSelected}" @click="toggleSelectedCodeL(code)"></i>{{code.F002}}</span></li>
                                            </ul>
                                            <div class="code-all"><i :class="{'fa fa-check-square active' : this.codeData.isSelectAllL, 'fa fa-square-o' : !this.codeData.isSelectAllL}" @click="toggleSelectedAllL"></i>共<strong>{{codeData.selectCodesL.length}}</strong>项</div>
                                        </div>
                                    </div>
                                    <div class="slide-code-handle">
                                        <button class="remove-btn" :class="codeData.sigleToLeft ? 'active': ''" @click="sigleToLeft"><i class="fa fa-angle-left"></i></button>
                                        <button class="remove-btn" :class="codeData.allToLeft ? 'active': ''" @click="allToLeft"><i class="fa fa-angle-double-left "></i></button>
                                        <button class="add-btn" :class="codeData.sigleToRight ? 'active': ''" @click="sigleToRight"><i class="fa fa-angle-right"></i></button>
                                        <button class="add-btn" :class="codeData.allToRight ? 'active': ''" @click="allToRight"><i class="fa fa-angle-double-right"></i></button>
                                        <button class="export" @click="toggleExportDialog">导出</button>
                                        <ul v-show="codeData.isShowDialog">
                                            <li><a href="../../data/data.rar">TXT</a></li>
                                            <li><a href="../../data/data.rar">EXCEL</a></li>
                                        </ul>
                                    </div>

                                    <div class="slide-code-item">
                                        <div class="code-result">可选代码/查找结果[<span>{{codeData.codesR.length}}</span>]个</div>
                                        <div class="code-list">
                                            <ul>
                                                <li v-for="code in codeData.codesR"><span><i :class="{'fa fa-check-square active' : code.isSelected, 'fa fa-square-o' : !code.isSelected}" @click="toggleSelectedCodeR(code)"></i>{{code.F002}}</span></li>
                                            </ul>
                                            <div class="code-all"><i :class="{'fa fa-check-square active' : this.codeData.isSelectAllR, 'fa fa-square-o' : !this.codeData.isSelectAllR}" @click="toggleSelectedAllR"></i>共<strong>{{codeData.selectCodesR.length}}</strong>项</div>
                                        </div>
                                    </div>
                                  </div>
                                  <div class="slide-foot slide-foot-code">
                                      <label for="">
                                          代码导入：<input type="file" />
                                          <span><i></i><strong>浏览</strong></span>
                                      </label>
                                      <a href="">导入</a>
                                  </div>
                              </div>
                              <!-- 加载中 -->
                              <div class="loading" id="slide-loading" style="display: none;"><div><span class="fa fa-refresh fa-spin fa-3x fa-fw margin-bottom"></span></div></div>
                          </div>
                      </div>
                      <div class="detail-table">
                          <table id="table">
                            <thead>
                              <tr>
                                <template >
                                  <th ></th>
                                </template>
                                <template >
                                  <th></th>
                                  <th></th>
                                  <th></th>
                                  <th></th>
                                  <th></th>
                                  <th></th>
                                  <th></th>
                                  <th></th>
                                  <th></th>
                                  <th></th>
                                  <th></th>
                                  <th></th>
                                </template>
                              </tr>
                            </thead>
                            <tbody>
                              <template >
                                <tr>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                </tr>
                              </template>
                              <template >
                                <tr >
                                  <td colspan="12" class="empty">
                                    <img src="static/images/empty.png" alt=""> <br> 没有相应数据！
                                  </td>
                                </tr>
                              </template>
                            </tbody>
                        </table>
                      </div> 
                  </div>

              </div>
              <!-- 加载中 -->
              <div class="loading page-loading" id="page-loading" style="display: none;"><div><span class="fa fa-refresh fa-spin fa-3x fa-fw margin-bottom"></span></div></div>
          </div>
      </div>
    </div>
    <ql-foot></ql-foot>
  </div>
</template>

<script>
import qlHead from '../common/head'
import qlFoot from '../common/foot'
export default {
  name: 'notice',
  components: {
    qlHead,
    qlFoot
  },
  data() {
    return {
      leftMenu: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      code: '',
      searchType: '',
      keyWords: '', 
      daterRange: '',
      noticeList: [],
      catId: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      filterText: '',
      codeData: {
        type: 'code',   //代码选择
        isActive: false,
        trees: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        codesL: [],
        selectCodesL: [],
        isSelectAllL: false,
        sigleToRight: false,
        allToRight: false,
        codesR: [],
        selectCodesR: [],
        isSelectAllR: false,
        sigleToLeft: false,
        allToLeft: false,
        isShowDialog: false
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      var _this = this;
      _this.catId = data.id;
      _this.currentPage = 1;
      _this.utils.getJson('/static/data/newslist.json', function(res){
        _this.noticeList = res.data.ResData.dataList;
        _this.total = res.data.ResData.total
      }, function(){}, {catId: _this.catId, currentPage: _this.currentPage, pageSize: _this.pageSize})
    },
    search() {
      if(!this.code) {
        this.utils.showTip('warning', 'error', '-1030');
        return;
      }
      if(!this.keyWords) {
        this.utils.showTip('warning', 'error', '-1031');
        return;
      }
      var _this = this;
      _this.currentPage = 1;
      _this.utils.getJson('/static/data/newslist.json', function(res){
        _this.noticeList = res.data.ResData.dataList;
        _this.total = res.data.ResData.total
      }, function(){}, {catId: _this.catId, currentPage: _this.currentPage, pageSize: _this.pageSize, code: _this.code, searchType: _this.searchType, keyWords: _this.keyWords, daterRange: _this.daterRange})
    },
    exportContent() {
      
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    handleCheck: function() {
      var checkedArr = this.$refs.tree.getCheckedNodes(true);
      var checkedCodeArr = [];
      for(var i = 0; i < checkedArr.length; i++) {
        checkedCodeArr.push(checkedArr[i].id);
      }
      
      var _this = this;
      _this.utils.getJson('/static/data/code.json', function(res){
        res.data.ResData.forEach(function(value,i){
          value.isSelected = false;
        })

        _this.codeData.codesL = res.data.ResData;
        _this.codeData.selectCodesL = [];
        _this.codeData.isSelectAllL = false;
        _this.codeData.sigleToRight = false;
        _this.codeData.allToRight = true;

        _this.codeData.codesR = [];
        _this.codeData.selectCodesR = [];
        _this.codeData.isSelectAllR = false;
        _this.codeData.sigleToLeft = false;
        _this.codeData.allToLeft = false;

      }, function(){}, {baseId: _this.baseId, checkedCodeArr: checkedCodeArr})
    },
    toggleSelectedCodeL: function(code) {
      code.isSelected = !code.isSelected;

      var hasSelected = false;
      this.codeData.selectCodesL = [];

      for(var i = 0; i < this.codeData.codesL.length; i++) {
        if(this.codeData.codesL[i].isSelected) {
          this.codeData.selectCodesL.push(this.codeData.codesL[i]);
          hasSelected = true;
        }
      }

      if(this.codeData.codesL.length == this.codeData.selectCodesL.length) {
        this.codeData.isSelectAllL = true;
      }else {
        this.codeData.isSelectAllL = false;
      }

      this.codeData.sigleToRight = hasSelected;
    },
    toggleSelectedAllL: function() {
      if(!this.codeData.codesL.length) return;

      this.codeData.isSelectAllL = !this.codeData.isSelectAllL;

      this.codeData.selectCodesL = [];
      for(var i = 0; i < this.codeData.codesL.length; i++) {
        this.codeData.codesL[i].isSelected = this.codeData.isSelectAllL;
        if(this.codeData.codesL[i].isSelected) {
          this.codeData.selectCodesL.push(this.codeData.codesL[i]);
        }
      }

      if(this.codeData.selectCodesL.length) {
        this.codeData.sigleToRight = true;
      }
    },
    sigleToRight: function() {
      if(!this.codeData.sigleToRight) return;

      for(var i = 0; i < this.codeData.selectCodesL.length; i++) {
        this.codeData.codesL.splice(this.codeData.codesL.indexOf(this.codeData.selectCodesL[i]), 1);
        this.codeData.selectCodesL[i].isSelected = false;
      }
      this.codeData.codesR = this.codeData.codesR.concat(this.codeData.selectCodesL);

      if(!this.codeData.codesL.length) {
        this.codeData.allToRight = false;
      }
      this.codeData.sigleToRight = false;
      this.codeData.allToLeft = true;

      this.codeData.isSelectAllL = false;
      this.codeData.selectCodesL = [];
    },
    allToRight: function() {
      if(!this.codeData.allToRight) return;

      for(var i = 0; i < this.codeData.codesL.length; i++) {
        this.codeData.codesL[i].isSelected = false;
      }
      this.codeData.codesR = this.codeData.codesR.concat(this.codeData.codesL);
      this.codeData.allToLeft = true;

      this.codeData.codesL = [];
      this.codeData.selectCodesL = [];
      this.codeData.sigleToRight = false;
      this.codeData.allToRight = false;
      this.codeData.isSelectAllL = false;
    },
    toggleSelectedCodeR: function(code) {
      code.isSelected = !code.isSelected;

      var hasSelected = false;
      this.codeData.selectCodesR = [];

      for(var i = 0; i < this.codeData.codesR.length; i++) {
        if(this.codeData.codesR[i].isSelected) {
          this.codeData.selectCodesR.push(this.codeData.codesR[i]);
          hasSelected = true;
        }
      }

      if(this.codeData.codesR.length == this.codeData.selectCodesR.length) {
        this.codeData.isSelectAllR = true;
      }else {
        this.codeData.isSelectAllR = false;
      }

      this.codeData.sigleToLeft = hasSelected;
    },
    toggleSelectedAllR: function() {
      if(!this.codeData.codesR.length) return;

      this.codeData.isSelectAllR = !this.codeData.isSelectAllR;

      this.codeData.selectCodesR = [];
      for(var i = 0; i < this.codeData.codesR.length; i++) {
        this.codeData.codesR[i].isSelected = this.codeData.isSelectAllR;
        if(this.codeData.codesR[i].isSelected) {
          this.codeData.selectCodesR.push(this.codeData.codesR[i]);
        }
      }

      if(this.codeData.selectCodesR.length) {
        this.codeData.sigleToLeft = true;
      }
    },
    sigleToLeft: function() {
      if(!this.codeData.sigleToLeft) return;

      for(var i = 0; i < this.codeData.selectCodesR.length; i++) {
        this.codeData.codesR.splice(this.codeData.codesR.indexOf(this.codeData.selectCodesR[i]), 1);
        this.codeData.selectCodesR[i].isSelected = false;
      }
      this.codeData.codesL = this.codeData.codesL.concat(this.codeData.selectCodesR);

      if(!this.codeData.codesR.length) {
        this.codeData.allToLeft = false;
      }
      this.codeData.sigleToLeft = false;
      this.codeData.allToRight = true;

      this.codeData.isSelectAllR = false;
      this.codeData.selectCodesR = [];
    },
    allToLeft: function() {
      if(!this.codeData.allToLeft) return;

      for(var i = 0; i < this.codeData.codesR.length; i++) {
        this.codeData.codesR[i].isSelected = false;
      }
      this.codeData.codesL = this.codeData.codesL.concat(this.codeData.codesR);
      this.codeData.allToRight = true;

      this.codeData.codesR = [];
      this.codeData.selectCodesR = [];
      this.codeData.sigleToLeft = false;
      this.codeData.allToLeft = false;
      this.codeData.isSelectAllR = false;
    },
    toggleExportDialog: function() {  //点击导出按钮触发
      this.codeData.isShowDialog = !this.codeData.isShowDialog;
    }
  },
  created() {
    var _this = this;
    _this.utils.getJson('/static/data/quotationLeftMenu.json', function(res){
      _this.leftMenu = res.data.ResData;
    }, function(){})
    _this.utils.getJson('/static/data/codeTree.json', function(res){
      _this.codeData.trees = res.data.ResData;
    }, function(){}, {baseId: _this.baseId})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner {
    width: 330px;
    height: 34px;
    line-height: 34px;
    border-radius: 0;
  }
  .el-date-editor .el-range-separator {
    line-height: 26px;
  }
  .el-date-editor .el-range__icon {
    display: none;
  }
</style>
