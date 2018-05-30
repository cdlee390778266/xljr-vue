<template>
  <div class="login">
    <form>
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
                <router-link to="/home">匿名登录</router-link>
            </div>
            <div class="login-row tc login-reg">
                还没有账号？<router-link to="/register">马上注册</router-link>
            </div>
        </div>
        <div class="login-error">
            <div id="login-error-box" class="animated"><i></i><span>您输入的用户名有误</span></div>
        </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  }
}
</script>

<style scoped>

</style>
