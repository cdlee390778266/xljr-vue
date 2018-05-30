<template>
  <div class="login">
    <form action="" class="reg" id="reg">
        <div class="reg-title">
            <div class="reg-title-left">
                注册
            </div>
            <div class="reg-title-right">
                <span>已有账号？</span>
                <router-link to="/login">返回登录</router-link>
            </div>
        </div>
        <div class="reg-main reg-form">
            <div class="reg-row">
                <span class="reg-text">姓名</span>
                <input type="text" class="login-text" name="F001" id="name"/>
            </div>
            <div class="reg-row">
                <span class="reg-text">性别</span>
                <label>
                    <input type="radio" name="F002" value="0" checked="" />
                    <i></i>
                    <span>男</span>
                </label>
                <label>
                    <input type="radio" name="F002" value="1" />
                    <i></i>
                    <span>女</span>
                </label>
            </div>
            <div class="reg-row">
                <span class="reg-text">身份证</span>
                <input type="text" class="login-text" name="F003" id="ID"/>
            </div>
            <div class="reg-row">
                <span class="reg-text">开户营业部</span>
                <input type="text" class="login-text" name="F004" />
            </div>
            <div class="reg-row">
                <span class="reg-text">固定电话</span>
                <input type="text" class="login-text" name="F005" id="phone"/>
            </div>
            <div class="reg-row">
                <span class="reg-text"><i>*</i>手机</span>
                <input type="text" class="login-text" name="F006" id="mobile"/>
            </div>
            <div class="reg-row">
                <span class="reg-text"><i>*</i>用户名</span>
                <input type="text" class="login-text" name="F007" />
            </div>
            <div class="reg-row">
                <span class="reg-text"><i>*</i>密码</span>
                <input type="password" class="login-text" name="F008"  id="pwd" />
            </div>
            <div class="reg-row">
                <span class="reg-text"><i>*</i>确认密码</span>
                <input type="password" class="login-text" name="F009" id="cPwd" />
            </div>
            <div class="reg-row">
                <span class="reg-text"><i>*</i>电子邮箱</span>
                <input type="text" class="login-text" name="F010" />
            </div>
            <div class="reg-row reg-code">
                <span class="reg-text"><i>*</i>验证码</span>
                <input type="text" class="login-text" name="F011" />
                <img src="static/assets/images/login_bg.png" height="1467" width="2495" alt="" />
            </div>
            <!-- <div class="reg-row">
                <span class="reg-text"></span>
                <div class="reg-checkbox">
                    <input type="checkbox" />
                    <i></i>
                    <span>我已阅读并同意<a href="">《许可协议》</a></span>
                </div>
            </div> -->
            <div class="reg-row">
                <span class="reg-text"></span>
                <input type="submit" value="注册"  id="reg-submit" />
            </div>
        </div>
        <div class="reg-success reg-main"> 
            <div class="reg-success-body reg-error">
                <div class="reg-success-img">
                    <i></i>
                    <span id="res-text">对不起，注册失败！</span>
                    <span class="reg-line"></span>
                </div>
                <div class="reg-success-mes">
                    
                </div>
                <div class="reg-success-btns">
                    <a href="javascript: void(0);">直接登录</a>
                </div>
            </div>
        </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
