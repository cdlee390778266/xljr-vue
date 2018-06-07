<template>
  <div class="database-box" id="data-box" style="display:block;">
    <input type="hidden" id="dataId" />
    <div class="detail">
        <div class="detail-bar">
            <span>数据总记录数：<strong>2548</strong></span>
            <span>数据局开始时间：<strong>2548</strong></span>
            <span>数据结束时间：<strong>2548</strong></span>
        </div>
        <div class="table-screen">
            <div class="table-screen-bar">
                <div class="table-screen-btns">
                    <button id="reset" @click="resetFieldsForm"><i class="fa fa-refresh"></i>重置</button>
                    <button id="preview" @click="preview"><i class="fa fa-eye"></i>预览数据</button>
                    <button id="download" @downData><i class="fa fa-download"></i>下载数据</button>
                </div>
                <div class="screen-select-btns">
                    <template v-for="tab in tabs">
                      <button @click="changeTab(tab)" :class="tab.isActive ? 'active': ''" v-if="tab.type == 'fields'">字段选择<i></i></button>
                      <button @click="changeTab(tab)" :class="tab.isActive ? 'active': ''" v-if="tab.type == 'code'">代码选择<i></i></button>
                      <button @click="changeTab(tab)" :class="tab.isActive ? 'active': ''" v-if="tab.type == 'screen'">条件筛选<i></i></button>
                    </template>
                </div>
            </div>
            <div class="screen-select-slide">
              <!-- 字段选择下拉 -->
              <div class="slide-box" v-show="tabs[0].isActive">
                  <div class="slide-body slide-fields-body">
                      <span v-for="field in tabs[0].fields" @click="toggleSelected(field)"><i :class="{'fa fa-check-square-o' : field.isSelected, 'fa fa-square-o' : !field.isSelected}"></i>{{field.F002}}</span>
                  </div>
                  <div class="slide-foot slide-fields-foot">
                      <span><i :class="{'fa fa-check-square-o' : tabs[0].isSelectedAll, 'fa fa-square-o' : !tabs[0].isSelectedAll}" @click="toggleSelectAll"></i>全选</span>
                      <a href="javascript:void(0);" @click="toggleFieldsDialog">字段说明</a>
                  </div>
              </div>
              <!-- 代码选择下拉 -->
              <div class="slide-box" v-show="tabs[1].isActive">
                  <div class="slide-body">
                      <div class="slide-code-item">
                          <div class="slide-code-title">
                              <el-input placeholder="搜索行业分类" v-model="filterText"></el-input>
                          </div>
                          <el-tree :data="tabs[1].trees" :props="tabs[1].defaultProps" show-checkbox @check="handleCheck" :filter-node-method="filterNode" ref="tree"></el-tree>
                          <!-- 加载中 -->
                          <div class="loading" id="slide-item-loading" style="display: none;"><div><span class="fa fa-refresh fa-spin fa-3x fa-fw margin-bottom"></span></div></div>
                      </div>
                      <div class="slide-code-item" handletype="add" id="add">
                          <div class="code-result">可选代码/查找结果[<span>{{tabs[1].codesL.length}}</span>]个</div>
                          <div class="code-list">
                              <ul>
                                <li v-for="code in tabs[1].codesL"><span><i :class="{'fa fa-check-square active' : code.isSelected, 'fa fa-square-o' : !code.isSelected}" @click="toggleSelectedCodeL(code)"></i>{{code.F002}}</span></li>
                              </ul>
                              <div class="code-all"><i :class="{'fa fa-check-square active' : this.tabs[1].isSelectAllL, 'fa fa-square-o' : !this.tabs[1].isSelectAllL}" @click="toggleSelectedAllL"></i>共<strong>{{tabs[1].selectCodesL.length}}</strong>项</div>
                          </div>
                      </div>
                      <div class="slide-code-handle">
                          <button class="remove-btn" :class="tabs[1].sigleToLeft ? 'active': ''" @click="sigleToLeft"><i class="fa fa-angle-left"></i></button>
                          <button class="remove-btn" :class="tabs[1].allToLeft ? 'active': ''" @click="allToLeft"><i class="fa fa-angle-double-left "></i></button>
                          <button class="add-btn" :class="tabs[1].sigleToRight ? 'active': ''" @click="sigleToRight"><i class="fa fa-angle-right"></i></button>
                          <button class="add-btn" :class="tabs[1].allToRight ? 'active': ''" @click="allToRight"><i class="fa fa-angle-double-right"></i></button>
                          <button class="export" @click="toggleExportDialog">导出</button>
                          <ul v-show="tabs[1].isShowDialog">
                              <li><a href="../../data/data.rar">TXT</a></li>
                              <li><a href="../../data/data.rar">EXCEL</a></li>
                          </ul>
                      </div>

                      <div class="slide-code-item">
                          <div class="code-result">可选代码/查找结果[<span>{{tabs[1].codesR.length}}</span>]个</div>
                          <div class="code-list">
                              <ul>
                                  <li v-for="code in tabs[1].codesR"><span><i :class="{'fa fa-check-square active' : code.isSelected, 'fa fa-square-o' : !code.isSelected}" @click="toggleSelectedCodeR(code)"></i>{{code.F002}}</span></li>
                              </ul>
                              <div class="code-all"><i :class="{'fa fa-check-square active' : this.tabs[1].isSelectAllR, 'fa fa-square-o' : !this.tabs[1].isSelectAllR}" @click="toggleSelectedAllR"></i>共<strong>{{tabs[1].selectCodesR.length}}</strong>项</div>
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

              <!-- 条件筛选下拉 -->
              <div class="slide-box slide-box-cdt" v-show="tabs[2].isActive">
                  <div class="slide-body slide-body-cdt" >
                      <div class="cdt-box">
                          <div class="cdt-item">
                              <label for="">字段</label>
                              <select v-model="tabs[2].selectField">
                                  <option value=""></option>
                                  <option :value="field.F001" v-for="field in tabs[2].fields">{{field.F002}}</option>
                              </select>
                          </div>
                          <div class="cdt-item">
                              <label for="">运算符</label>
                              <select name="" v-model="tabs[2].operator">
                                  <option value=""></option>
                                  <option value=">">&gt;</option>
                                  <option value=">=">&gt;=</option>
                                  <option value="<">&lt;</option>
                                  <option value="<=">&lt;=</option>
                                  <option value="=">=</option>
                                  <option value="<>">!=</option>
                                  <option value="IS NULL">为空</option>
                                  <option value="IS NOT NULL">不为空</option>
                              </select>
                          </div>
                          <div class="cdt-item">
                              <label for="">条件值</label>
                              <input type="text" v-model="tabs[2].val" :disabled="!tabs[2].selectField || !tabs[2].operator" />
                          </div>
                          <div class="cdt-item">
                              <a href="javascript:void(0);" @click="addCondition">添加</a>
                          </div>
                      </div>
                      <div class="cdt-list empty">
                          <table cellpadding="0" cellspacing="0" >
                              <thead>
                                  <tr>
                                      <th>序号</th>
                                      <th>字段</th>
                                      <th>运算符</th>
                                      <th>条件值</th>
                                      <th>单位</th>
                                      <th>条件关系</th>
                                      <th>操作</th>
                                  </tr>
                              </thead>
                              <tbody>
                                <template v-if="tabs[2].addList.length">
                                  <tr v-for="(item, index) in tabs[2].addList">
                                      <td>{{index}}</td>
                                      <td>{{item.field}}</td>
                                      <td>{{item.operator}}</td>
                                      <td>{{item.val}}</td>
                                      <td></td>
                                      <td>
                                        <template v-if="item.isAnd">
                                          <i class="fa fa-check-square-o" @click="toggleCheck(item)"></i><span>AND</span>
                                        </template>
                                        <template v-else>
                                          <i class="fa fa-square-o" @click="toggleCheck(item)"></i><span>OR</span>
                                        </template>
                                      </td>
                                      <td><a href="javascript:void(0);" @click="deleteCondition(item)">删除</a></td>
                                  </tr>
                                </template>
                                <template v-else>
                                  <tr>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                  </tr>
                                  <tr>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                  </tr>
                                  <tr>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                  </tr>
                                  <tr>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                  </tr>
                                </template>
                              </tbody>
                          </table>
                      </div>
                  </div>
                  <div class="slide-foot"></div>
              </div>
              
              <!-- 加载中 -->
              <div class="loading" id="slide-loading" style="display: none;"><div><span class="fa fa-refresh fa-spin fa-3x fa-fw margin-bottom"></span></div></div>
            </div>
        </div>
        <div class="detail-table">
            <table id="table">
                <thead>
                  <tr>
                    <template v-if="tabs[0].preview.ColNames">
                      <th v-for="th in tabs[0].preview.ColNames">{{th}}</th>
                    </template>
                    <template v-else>
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
                  <template v-if="tabs[0].preview.Data">
                    <tr v-for="td in tabs[0].preview.Data">
                      <td>{{td.Stkcd}}</td>
                      <td>{{td.Trddt}}</td>
                      <td>{{td.Clsprc}}</td>
                    </tr>
                  </template>
                  <template v-else>
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

    <div class="filed-dialog" v-show="tabs[0].isShowDialog">
        <div class="filed-dialog-top">
            <span>字段说明（公司文件）</span>
            <i @click="hideFieldsDialog"></i>
        </div>
        <div class="filed-dialog-body">
            <table cellpadding="0" cellspacing="0">
                <thead>
                    <tr>
                        <th>
                            序号
                        </th>
                        <th>
                            字段
                        </th>
                        <th>
                            数据类型
                        </th>
                        <th>
                            字段说明
                        </th>
                        <th>
                            单位
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="tr in tabs[0].fieldsDes">
                        <td>{{tr.Sqn}}</td>
                        <td>{{tr.Name}}</td>
                        <td>{{tr.Ftype}}</td>
                        <td>{{tr.Description}}</td>
                        <td>{{tr.Unit}}</td>
                    </tr>
                </tbody>
            </table>
            <!-- 加载中 -->
            <div class="loading" id="filed-dialog-loading" style="display: none;"><div><span class="fa fa-refresh fa-spin fa-3x fa-fw margin-bottom"></span></div></div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataData',
  data() {
    return {
      filterText: '',
      tabs: [
        {
          type: 'fields', //字段选择
          isActive: true,
          fields: [],
          selectFields: [],
          fieldsDes: [],
          preview: {},
          isSelectedAll: false,
          isShowDialog: false
        },
        {
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
        },
        {
          type: 'screen', //条件筛选
          isActive: false,
          fields: [],
          selectField: '',
          operator: '',
          val: '',
          addList: []
        }
      ]
    }
  },
  props: {
    baseId: {
      default: ''
    }
  },
  methods: {
    changeTab: function(tab) {
      for(var i = 0; i < this.tabs.length; i++) {
        this.tabs[i].isActive = false;
      }
      tab.isActive = true;
      //如果是代码选择
      if(tab.type == 'code') {
        if(!tab.trees.length) {
          var _this = this;
          _this.utils.getJson('/static/data/codeTree.json', function(res){
            _this.tabs[1].trees = res.data.ResData;
          }, function(){}, {baseId: _this.baseId})
        }
      }
    },
    toggleSelected: function(field) {
      field.isSelected = !field.isSelected;
    },
    toggleSelectAll: function() {
      var select = this.tabs[0].isSelectedAll = !this.tabs[0].isSelectedAll;
      this.tabs[0].fields.forEach( function(field, index) {
        field.isSelected = select;
      });
    },
    toggleFieldsDialog: function() {
      this.tabs[0].isShowDialog = !this.tabs[0].isShowDialog;

      if(!this.tabs[0].fieldsDes.length) {
        var _this = this;
        _this.utils.getJson('/static/data/filedsDes.json', function(res){
          _this.tabs[0].fieldsDes = res.data.ResData;
        }, function(){}, {baseId: _this.baseId})
      }

    },
    hideFieldsDialog: function() {
      this.tabs[0].isShowDialog = false;
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
      if(checkedCodeArr.length) {
        _this.utils.getJson('/static/data/code.json', function(res){
          res.data.ResData.forEach(function(value,i){
            value.isSelected = false;
          })

          _this.tabs[1].codesL = res.data.ResData;
          _this.tabs[1].selectCodesL = [];
          _this.tabs[1].isSelectAllL = false;
          _this.tabs[1].sigleToRight = false;
          _this.tabs[1].allToRight = true;

          _this.tabs[1].codesR = [];
          _this.tabs[1].selectCodesR = [];
          _this.tabs[1].isSelectAllR = false;
          _this.tabs[1].sigleToLeft = false;
          _this.tabs[1].allToLeft = false;

        }, function(){}, {baseId: _this.baseId, checkedCodeArr: checkedCodeArr})
      }else {
        
        _this.tabs[1].codesL = [];
        _this.tabs[1].selectCodesL = [];
        _this.tabs[1].isSelectAllL = false;
        _this.tabs[1].sigleToRight = false;
        _this.tabs[1].allToRight = false;

        _this.tabs[1].codesR = [];
        _this.tabs[1].selectCodesR = [];
        _this.tabs[1].isSelectAllR = false;
        _this.tabs[1].sigleToLeft = false;
        _this.tabs[1].allToLeft = false;
      }
    },
    toggleSelectedCodeL: function(code) {
      code.isSelected = !code.isSelected;

      var hasSelected = false;
      this.tabs[1].selectCodesL = [];

      for(var i = 0; i < this.tabs[1].codesL.length; i++) {
        if(this.tabs[1].codesL[i].isSelected) {
          this.tabs[1].selectCodesL.push(this.tabs[1].codesL[i]);
          hasSelected = true;
        }
      }

      if(this.tabs[1].codesL.length == this.tabs[1].selectCodesL.length) {
        this.tabs[1].isSelectAllL = true;
      }else {
        this.tabs[1].isSelectAllL = false;
      }

      this.tabs[1].sigleToRight = hasSelected;
    },
    toggleSelectedAllL: function() {
      if(!this.tabs[1].codesL.length) return;

      this.tabs[1].isSelectAllL = !this.tabs[1].isSelectAllL;

      this.tabs[1].selectCodesL = [];
      for(var i = 0; i < this.tabs[1].codesL.length; i++) {
        this.tabs[1].codesL[i].isSelected = this.tabs[1].isSelectAllL;
        if(this.tabs[1].codesL[i].isSelected) {
          this.tabs[1].selectCodesL.push(this.tabs[1].codesL[i]);
        }
      }

      if(this.tabs[1].selectCodesL.length) {
        this.tabs[1].sigleToRight = true;
      }
    },
    sigleToRight: function() {
      if(!this.tabs[1].sigleToRight) return;

      for(var i = 0; i < this.tabs[1].selectCodesL.length; i++) {
        this.tabs[1].codesL.splice(this.tabs[1].codesL.indexOf(this.tabs[1].selectCodesL[i]), 1);
        this.tabs[1].selectCodesL[i].isSelected = false;
      }
      this.tabs[1].codesR = this.tabs[1].codesR.concat(this.tabs[1].selectCodesL);

      if(!this.tabs[1].codesL.length) {
        this.tabs[1].allToRight = false;
      }
      this.tabs[1].sigleToRight = false;
      this.tabs[1].allToLeft = true;

      this.tabs[1].isSelectAllL = false;
      this.tabs[1].selectCodesL = [];
    },
    allToRight: function() {
      if(!this.tabs[1].allToRight) return;

      for(var i = 0; i < this.tabs[1].codesL.length; i++) {
        this.tabs[1].codesL[i].isSelected = false;
      }
      this.tabs[1].codesR = this.tabs[1].codesR.concat(this.tabs[1].codesL);
      this.tabs[1].allToLeft = true;

      this.tabs[1].codesL = [];
      this.tabs[1].selectCodesL = [];
      this.tabs[1].sigleToRight = false;
      this.tabs[1].allToRight = false;
      this.tabs[1].isSelectAllL = false;
    },
    toggleSelectedCodeR: function(code) {
      code.isSelected = !code.isSelected;

      var hasSelected = false;
      this.tabs[1].selectCodesR = [];

      for(var i = 0; i < this.tabs[1].codesR.length; i++) {
        if(this.tabs[1].codesR[i].isSelected) {
          this.tabs[1].selectCodesR.push(this.tabs[1].codesR[i]);
          hasSelected = true;
        }
      }

      if(this.tabs[1].codesR.length == this.tabs[1].selectCodesR.length) {
        this.tabs[1].isSelectAllR = true;
      }else {
        this.tabs[1].isSelectAllR = false;
      }

      this.tabs[1].sigleToLeft = hasSelected;
    },
    toggleSelectedAllR: function() {
      if(!this.tabs[1].codesR.length) return;

      this.tabs[1].isSelectAllR = !this.tabs[1].isSelectAllR;

      this.tabs[1].selectCodesR = [];
      for(var i = 0; i < this.tabs[1].codesR.length; i++) {
        this.tabs[1].codesR[i].isSelected = this.tabs[1].isSelectAllR;
        if(this.tabs[1].codesR[i].isSelected) {
          this.tabs[1].selectCodesR.push(this.tabs[1].codesR[i]);
        }
      }

      if(this.tabs[1].selectCodesR.length) {
        this.tabs[1].sigleToLeft = true;
      }
    },
    sigleToLeft: function() {
      if(!this.tabs[1].sigleToLeft) return;

      for(var i = 0; i < this.tabs[1].selectCodesR.length; i++) {
        this.tabs[1].codesR.splice(this.tabs[1].codesR.indexOf(this.tabs[1].selectCodesR[i]), 1);
        this.tabs[1].selectCodesR[i].isSelected = false;
      }
      this.tabs[1].codesL = this.tabs[1].codesL.concat(this.tabs[1].selectCodesR);

      if(!this.tabs[1].codesR.length) {
        this.tabs[1].allToLeft = false;
      }
      this.tabs[1].sigleToLeft = false;
      this.tabs[1].allToRight = true;

      this.tabs[1].isSelectAllR = false;
      this.tabs[1].selectCodesR = [];
    },
    allToLeft: function() {
      if(!this.tabs[1].allToLeft) return;

      for(var i = 0; i < this.tabs[1].codesR.length; i++) {
        this.tabs[1].codesR[i].isSelected = false;
      }
      this.tabs[1].codesL = this.tabs[1].codesL.concat(this.tabs[1].codesR);
      this.tabs[1].allToRight = true;

      this.tabs[1].codesR = [];
      this.tabs[1].selectCodesR = [];
      this.tabs[1].sigleToLeft = false;
      this.tabs[1].allToLeft = false;
      this.tabs[1].isSelectAllR = false;
    },
    toggleExportDialog: function() {  //点击导出按钮触发
      this.tabs[1].isShowDialog = !this.tabs[1].isShowDialog;
    },
    addCondition: function() {        //点击添加按钮触发
      if(!this.tabs[2].selectField) {
        this.utils.showTip('warning', 'error', '-1020');
        return;
      }
      if(!this.tabs[2].operator) {
        this.utils.showTip('warning', 'error', '-1021');
        return;
      }
      if(!this.tabs[2].val) {
        this.utils.showTip('warning', 'error', '-1022');
        return;
      }
      if(isNaN(this.tabs[2].val)){
        this.utils.showTip('warning', 'error', '-1023');
        return;
      }
      this.tabs[2].addList.push({
        field: this.tabs[2].selectField,
        operator: this.tabs[2].operator,
        val: this.tabs[2].val,
        isAnd: true
      })

      this.tabs[2].selectField = '';
      this.tabs[2].operator = '';
      this.tabs[2].val = '';
    },
    toggleCheck: function(item) {
      item.isAnd = !item.isAnd;
    },
    deleteCondition: function(item) {       //删除条件
      this.tabs[2].addList.splice(this.tabs[2].addList.indexOf(item), 1);
    },
    resetFieldsForm: function() {

      this.tabs[0].fields.forEach( function(field, index) {
        field.isSelected = false;
      });
      this.tabs[0].isSelectedAll = false;
      this.tabs[0].preview = {}


    },
    preview: function() {
      var checkedFields = [];
      for(var i = 0; i < this.tabs[0].fields.length; i++) {
        if(this.tabs[0].fields[i].isSelected) {
          checkedFields.push(this.tabs[0].fields[i]);
        }
      }

      if(checkedFields.length) {
        var _this = this;
        _this.utils.getJson('/static/data/preview.json', function(res){
          _this.tabs[0].preview = res.data.ResData[0];
        }, function(){}, {checkedFields: checkedFields})
      }else {
        this.utils.showTip('warning', 'error', '-1010')
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  created() {
    var _this = this;
    _this.utils.getJson('/static/data/fileds.json', function(res){
      res.data.ResData.forEach(function(value,i){
        value.isSelected = false;
      })
      _this.tabs[0].fields = res.data.ResData;
      _this.tabs[2].fields = res.data.ResData;
    }, function(){}, {baseId: _this.baseId})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .el-tree-node__expand-icon {
    color: #4ba5ff;
  }
</style>
