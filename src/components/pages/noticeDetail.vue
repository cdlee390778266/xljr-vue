<template>
  <div class="new-bg">
    <div class="new">
      <div class="wrapper">
          <div class="new-title">
              <h2>{{noticeDetail.F002}}</h2>
              <div><span>{{noticeDetail.F003}}</span></div>
          </div>
          <div class="new-detail">
              {{noticeDetail.F004}}
          </div>
      </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'noticeDetail',
  data() {
    return {
      noticeDetail: ''
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    }
  },
  created() {
    var _this = this;
    _this.utils.getJson('/static/data/notice.json', function(res){
      _this.noticeDetail = res.data.ResData[0];
    }, function(){}, {noticeId: _this.$route.params.id})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .new .wrapper {
    min-height: 800px;
  }
</style>
