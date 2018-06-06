<template>
  <div>
    <div class="header">
        <div class="wrapper">
            <div class="header-left">
                <img src="static/images/login_title.png"  alt="" />
            </div>
            <div class="header-right">
                <div class="header-right-l">
                    <div id="top-menu" class="top-menu">
                        <router-link to="/home" active-class="active">首页</router-link>
                        <router-link to="/data" active-class="active">数据中心</router-link>
                        <router-link to="/notice" active-class="active" :class="!user.name ? 'disabled' : ''">公告资讯</router-link>
                        <router-link to="/news" active-class="active">新闻中心</router-link>
                        <router-link to="/quotation" active-class="active">行情导出</router-link>
                    </div>
                </div>
                <div class="header-right-r">
                    <span>欢迎你！ <template v-if="!user.name">游客</template><template v-else>{{user.name}}</template></span>
                    <i class="fa fa-angle-down"></i>
                    <ul>
                        <li class="line" v-if="user.name"><a href="javascript: void(0);" @click="loginOut">退出</a>
                        </li>
                        <li v-if="!user.name"><a href="javascript:void(0);" class="blueBg" id="login" @click="showLoginDialog">登录</a></li>
                        <li v-if="!user.name"><router-link to="/register" class="warningBg">注册</router-link></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="login-dialog" v-show="isShowLogin">
       <div class="login-dialog-mask" @click="hideLoginDialog"></div>
       <form class="login-dialog-box">
           <h1><img src="static/images/login_title.png"></h1>
           <div class="login-main">
               <div class="login-row">
                   <label for="">用户名</label>
                   <input type="text" placeholder="用户名" class="login-text" id="userName">
               </div>
               <div class="login-row">
                   <label for="">密码</label>
                   <input type="password" placeholder="密码" class="login-text" id="pwd">
               </div>
               <div class="login-row">
                   <div class="login-checkbox">
                       <input type="checkbox" name="F003" value="1" id="remember">
                       <i></i>
                       <span>Check me out</span>
                   </div>
               </div>
               <div class="login-row login-btns">
                   <a href="javascript:void(0);" id="login-submit">登录</a>
                   <a href="javascript: void(0);" id="anonymous">匿名登录</a>
               </div>
               <div class="login-row tc login-reg">
                    还没有账号？<a href="../reg/reg.html">马上注册</a>
               </div>
           </div>
           <div class="login-error">
               <div id="login-error-box" class="animated"><i></i><span>您输入的用户名有误</span></div>
           </div>
       </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ql-head',
  data() {
    return {
      isShowLogin: false,
      isLogin: false,
      user: {}
    }
  },
  methods: {
    showLoginDialog: function() {
      this.isShowLogin = true;
    },
    hideLoginDialog: function() {
      this.isShowLogin = false;
    },
    loginOut() {
      this.utils.setUser({});
      this.$router.push('/login');
    }
  },
  created() {
    this.user = this.utils.getUser();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
