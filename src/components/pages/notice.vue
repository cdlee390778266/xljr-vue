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
        <div class="right">
            <div class="news">
                <div class="news-top">
                    <form action="" class="new-form" id="search-form">
                        <input type="hidden" name="F001" id="F001" value="wq123" />
                        <input type="hidden" name="F002" id="F002" value="" />
                        <div class="new-form-item">
                            <label for="">证券</label>
                            <input type="text" placeholder="请输入证券" v-model="code"/>
                            <select v-model="searchType">
                                <option value="0" checked>标题检索</option>
                                <option value="1">正文检索</option>
                            </select>
                            <input type="text" placeholder="请输入关键字" v-model="keyWords"/>
                        </div>
                        <div class="new-form-item">
                            <label for="">公告日期</label>
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
                            <input type="button" value="搜索" class="new-btn search" @click="search"/>
                            <input type="reset" value="重置" class="new-btn reset" />
                            <input type="button" value="导出" class="new-btn export" @click="exportContent"/>
                        </div>
                    </form>
                </div>
                <div class="new-wrapper">
                    <div class="new-body">
                      <div class="new-item" v-for="notice in noticeList">
                        <h3 class="active">{{notice.F002}}</h3>
                        <router-link :to="'/notice/detail/'+notice.F001">{{notice.F004}}...</router-link>
                      </div>
                    </div>
                    <div class="new-page">
                        <div class="page" id="page">
                          <el-pagination
                            background
                            layout="prev, pager, next"
                            @current-change="goPage"
                            :current-page.sync="currentPage"
                            :page-size="pageSize"
                            :total="total">
                          </el-pagination>
                        </div>
                    </div>
                </div> 
            </div>

            <!-- <div class="loading" id="loading"><div><span class="fa fa-refresh fa-spin fa-3x fa-fw margin-bottom"></span></div></div> -->
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
      currentPage: 1,
      total: 0,
      pageSize: 6
    };
  },
  methods: {
    handleNodeClick(data) {
      var _this = this;
      _this.catId = data.id;
      _this.currentPage = 1;
      _this.utils.getJson('/static/data/noticeslist.json', function(res){
        _this.noticeList = res.data.ResData.dataList;
        _this.total = res.data.ResData.total
      }, function(){}, {catId: _this.catId, currentPage: _this.currentPage, pageSize: _this.pageSize})
    },
    goPage(val) {
      var _this = this;
      _this.utils.getJson('/static/data/noticeslist.json', function(res){
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
      _this.utils.getJson('/static/data/noticeslist.json', function(res){
        _this.noticeList = res.data.ResData.dataList;
        _this.total = res.data.ResData.total
      }, function(){}, {catId: _this.catId, currentPage: _this.currentPage, pageSize: _this.pageSize, code: _this.code, searchType: _this.searchType, keyWords: _this.keyWords, daterRange: _this.daterRange})
    },
    exportContent() {
      
    }
  },
  created() {
    var _this = this;
    _this.utils.getJson('/static/data/noticeLeftMenu.json', function(res){
      _this.leftMenu = res.data.ResData;
    }, function(){})
    _this.utils.getJson('/static/data/noticeslist.json', function(res){
      _this.noticeList = res.data.ResData.dataList;
      _this.total = res.data.ResData.total
    }, function(){}, {catId: _this.catId, currentPage: _this.currentPage, pageSize: _this.pageSize})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner {
    width: 216px;
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
  .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li {
    margin: 0;
    border: 1px solid #dcdcdc;
    border-right: none;
    border-radius: 0;
    background: #fff;
    font-weight: normal;
    color: #999;
  }
  .el-pagination .btn-next {
    border-right: 1px solid #dcdcdc !important;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background: #45d48f !important;
    color: #fff !important;
  }
  .el-pagination.is-background .el-pager li:not(.disabled):hover {
    background: #eee;
    color: #999;
  }
</style>
