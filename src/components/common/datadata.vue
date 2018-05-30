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
              <template v-for="tab in tabs">
                <!-- 字段选择下拉 -->
                <div class="slide-box" v-show="tab.isActive" v-if="tab.type == 'fields'">
                    <div class="slide-body slide-fields-body">
                        <span v-for="field in tab.fields" @click="toggleSelected(field)"><i :class="{'fa fa-check-square-o' : field.isSelected, 'fa fa-square-o' : !field.isSelected}"></i>{{field.F002}}</span>
                    </div>
                    <div class="slide-foot slide-fields-foot">
                        <span><i :class="{'fa fa-check-square-o' : tab.isSelectedAll, 'fa fa-square-o' : !tab.isSelectedAll}" @click="toggleSelectAll"></i>全选</span>
                        <a href="javascript:void(0);" @click="toggleFieldsDialog">字段说明</a>
                    </div>
                </div>
                <!-- 代码选择下拉 -->
                <div class="slide-box" v-show="tab.isActive" v-if="tab.type == 'code'">
                    <div class="slide-body">
                        <div class="slide-code-item">
                            <div class="slide-code-title">
                                <input type="text" id="key" value="" class="empty" placeholder="搜索行业分类" />
                            </div>
                            <ul id="tree" class="ztree"></ul>
                            <!-- 加载中 -->
                            <div class="loading" id="slide-item-loading" style="display: none;"><div><span class="fa fa-refresh fa-spin fa-3x fa-fw margin-bottom"></span></div></div>
                        </div>
                        <div class="slide-code-item" handletype="add" id="add">
                            <div class="code-result">可选代码/查找结果[<span>0</span>]个</div>
                            <div class="code-list">
                                <ul>
                                </ul>
                                <div class="code-all"><i class="fa fa-square-o"></i>共<strong>0</strong>项</div>
                            </div>
                        </div>
                        <div class="slide-code-handle">
                            <button class="remove-btn" id="remove-angle"><i class="fa fa-angle-left"></i></button>
                            <button class="remove-btn" id="remove-all"><i class="fa fa-angle-double-left "></i></button>
                            <button class="add-btn" id="add-angle"><i class="fa fa-angle-right"></i></button>
                            <button class="add-btn" id="add-all"><i class="fa fa-angle-double-right"></i></button>
                            <button class="export" id="export">导出</button>
                            <ul>
                                <li><a href="../../data/data.rar">TXT</a></li>
                                <li><a href="../../data/data.rar">EXCEL</a></li>
                            </ul>
                        </div>

                        <div class="slide-code-item"  handletype="remove" id="remove">
                            <div class="code-result">可选代码/查找结果[<span>0</span>]个</div>
                            <div class="code-list">
                                <ul>
                                    
                                </ul>
                                <div class="code-all"><i class="fa fa-square-o"></i>共<strong>0</strong>项</div>
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
                <div class="slide-box slide-box-cdt" v-show="tab.isActive" v-if="tab.type == 'screen'">
                    <div class="slide-body slide-body-cdt" >
                        <div class="cdt-box">
                            <div class="cdt-item">
                                <label for="">字段</label>
                                <select name="" id="screen-fields">
                                    <option value=""></option>
                                </select>
                            </div>
                            <div class="cdt-item">
                                <label for="">运算符</label>
                                <select name="" id="screen-opt">
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
                                <input type="text"  value="" id="screen-input" />
                            </div>
                            <div class="cdt-item">
                                <a href="javascript:void(0);" id="screen-add">添加</a>
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
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="slide-foot"></div>
                </div>
              </template>
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
          codes: [],
          selectCodes: []
        },
        {
          type: 'screen', //条件筛选
          isActive: false,
          trees: [],
          selectScreen: []
        }
      ]
    }
  },
  methods: {
    changeTab: function(tab) {
      for(var i = 0; i < this.tabs.length; i++) {
        this.tabs[i].isActive = false;
      }
      tab.isActive = true;
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
  props: {
    baseId: {
      default: ''
    }
  },
  created() {
    var _this = this;
    _this.utils.getJson('/static/data/fileds.json', function(res){
      res.data.ResData.forEach(function(value,i){
        value.isSelected = false;
      })
      _this.tabs[0].fields = res.data.ResData;
    }, function(){}, {baseId: _this.baseId})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
