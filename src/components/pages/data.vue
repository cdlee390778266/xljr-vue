<template>
  <div>
  	<ql-head></ql-head>
    <!--  广告图  -->
    <div class="wrapper">
        <img src="static/assets/images/banner.png"  alt="" class="banner-img" />
    </div>

    <!--  页面主体  -->
    <div class="wrapper data">

        <!--  左侧菜单  -->
        <div class="left">
            <ul id="leftMenu">
              <li v-for="a in leftMenu" v-if="leftMenu" @mouseover="showChildren" @mouseout="hideChidren">
                <span>{{a.name}}<i class="fa fa-angle-right"></i></span>
                <div v-if="a.children" class="leftMenuChildren">
                  <dl v-for="b in a.children">
                    <dt>
                      <span @click="showDataBase(b)">{{b.name}}</span>
                      <i class="fa fa-angle-right"></i>
                    </dt>
                    <dd>
                      <template v-for="(c, index) in b.children">
                        <a href="javascript: void(0);" @click="showDataData(c)">{{c.name}}</a>
                      <i v-if="index < b.children.length - 1">|</i>
                      </template>
                    </dd>
                  </dl>
                </div>
              </li>
            </ul>
        </div>

        <!--  右侧详细内容  -->
        <div class="right">
            <div class="right-history">
                <ul>
                    <li v-for="tag in tags" :class="tag.isActive ? 'active' : ''" @click="changeTab(tag)"><a href="javascript: void(0);"><i>{{tag.name}}</i><img src="static/images/history-close.png" alt="" v-if="tag.type != 'datahome'" @click.stop="closeTab(tag)"></a></li>
                </ul>
            </div>
            <div class="right-body">
                <template v-for="tag in tags">
                  <ql-data-home v-if="tag.type == 'datahome'" v-show="tag.isActive" :base-id="tag.data.id"></ql-data-home>
                  <ql-data-base v-if="tag.type == 'database'" v-show="tag.isActive" :base-id="tag.data.id"></ql-data-base>
                  <ql-data-data v-if="tag.type == 'datadata'" v-show="tag.isActive" :base-id="tag.data.id"></ql-data-data>
                </template>
            </div>
            
        </div>

    </div>
  </div>
</template>

<script>
import qlHead from '../common/head'
import qlDataHome from '../common/datahome'
import qlDataBase from '../common/database'
import qlDataData from '../common/datadata'
export default {
  data() {
    return {
      leftMenu: [],
      tags: [
        {
          type: 'datahome',
          name: '主页',
          data: {
            id: 0
          },
          isActive: true
        }
      ]
    }
  },
  methods: {
    showChildren: function() {  
      if (event) {
        event.currentTarget.getElementsByClassName('leftMenuChildren')[0].style.display = 'block';
      }
    },
    hideChidren: function() {
      if (event) {
        event.currentTarget.getElementsByClassName('leftMenuChildren')[0].style.display = 'none';
      }
    },
    showDataBase: function(item) {  //数据库简介
      if(event) {
        event.currentTarget.parentNode.parentNode.parentNode.style.display = 'none';
      }

      var hasItem = false;
      for(var i = 0; i < this.tags.length; i++) {
        if(this.tags[i].data.id == item.id) {
          hasItem = true;
          this.tags[i].isActive = true;
        }else {
          this.tags[i].isActive = false;
        }
      }

      if(!hasItem) {
        this.tags.push({
          type: 'database',
          name: item.name,
          data: item,
          isActive: true
        })
      }
    },
    showDataData: function(item) {  //数据库数据
      if(event) {
        event.currentTarget.parentNode.parentNode.parentNode.style.display = 'none';
      }

      var hasItem = false;
      for(var i = 0; i < this.tags.length; i++) {
        if(this.tags[i].data.id == item.id) {
          hasItem = true;
          this.tags[i].isActive = true;
        }else {
          this.tags[i].isActive = false;
        }
      }

      if(!hasItem) {
        this.tags.push({
          type: 'datadata',
          name: item.name,
          data: item,
          isActive: true
        })
      }
    },
    changeTab: function(item) {
      for(var i = 0; i < this.tags.length; i++) {
        if(this.tags[i].data.id == item.data.id) {
          this.tags[i].isActive = true;
        }else {
          this.tags[i].isActive = false;
        }
      }
    },
    closeTab: function(item) {
      var hasActive = false;
      var index = -1;
      for(var i = 0; i < this.tags.length; i++) {
        if(this.tags[i].isActive && this.tags[i].data.id != item.data.id) {
          hasActive = true;
        }else {
          this.tags[i].isActive = false;
        }
        if(this.tags[i].data.id == item.data.id) {
          index = i;
        }
      }
      this.tags.splice(index, 1);
      if(!hasActive) {
        this.tags[0].isActive = true;
      }
    }
  },
  components: {
  	qlHead,
    qlDataBase,
    qlDataHome,
    qlDataData
  },
  created() {
    var _this = this;
    this.utils.getJson('/static/data/left.json', function(res){
      _this.leftMenu = res.data.ResData;
    }, function(){})
  }
}
</script>

<style scoped>

</style>
