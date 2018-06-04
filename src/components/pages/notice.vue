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
                            <input type="text" placeholder="请输入证券" name="F003" id="F003"/>
                            <select id="type">
                                <option value="0" checked>标题检索</option>
                                <option value="1">正文检索</option>
                            </select>
                            <input type="text" placeholder="请输入关键字" name="F004" id="keywords" />
                        </div>
                        <div class="new-form-item" id="date">
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
                            <input type="submit" value="搜索" class="new-btn search" />
                            <input type="reset" value="重置" class="new-btn reset" />
                            <input type="button" value="导出" class="new-btn export"  data-link="../../data/data.rar"/>
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
                          <a class="button_page_disabled first"><span>首页</span></a>
                          <span>
                            <a class="button_page_disabled"><span>&lt;</span></a>
                            <a href="javascript:renderPage(1);" class="button_page_click"><span>1</span></a>
                            <a href="javascript:renderPage(2);" class="button_page">2</a>
                            <a href="javascript:renderPage(3);" class="button_page">3</a>
                            <a href="javascript:renderPage(4);" class="button_page">4</a>
                            <a href="javascript:renderPage(5);" class="button_page">5</a>
                            <a href="javascript:renderPage(6);" class="button_page">6</a>
                            <a href="javascript:renderPage(7);" class="button_page">7</a>
                            <a href="javascript:renderPage(8);" class="button_page">8</a>
                            <a href="javascript:renderPage(9);" class="button_page">9</a>
                            <a href="javascript:renderPage(10);" class="button_page">10</a>
                            <a href="javascript:renderPage(2);" class="button_page">&gt;</a>
                          </span>
                          <a href="javascript:renderPage(13);" class="button_page last">尾页</a>
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
      noticeList: [],
      daterRange: '',
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
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    }
  },
  created() {
    var _this = this;
    _this.utils.getJson('/static/data/noticeLeftMenu.json', function(res){
      _this.leftMenu = res.data.ResData;
    }, function(){})
    _this.utils.getJson('/static/data/noticeslist.json', function(res){
      _this.noticeList = res.data.ResData;
    }, function(){})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner {
    width: 216px;
  }
</style>
