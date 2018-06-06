<template>
  <div class="login">
    <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px">
        <h1><img src="static/images/login_title.png"></h1>
        <div class="login-main">
            <el-form-item label="用户名" prop="name">
                <el-input v-model.number="loginForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd" class="login-pwd">
                <el-input type="pwdword" v-model="loginForm.pwd" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item prop="isRemember">
                <el-checkbox label="true" v-model="loginForm.isRemember">记住用户名</el-checkbox>
            </el-form-item>
            <el-form-item label-width="0" class="login-btns-box tc">
            <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
            <router-link to="/home" class="el-button login-default el-button--info">匿名登录</router-link>
            </el-form-item>
            <div class="login-row tc login-reg">
                还没有账号？<router-link to="/register">马上注册</router-link>
            </div>
            <div class="login-error" v-show="isShowError">
                <div><i @click="hideError"></i><span>登录失败，用户名或密码错误！</span></div>
            </div>
        </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowError: false,
      loginForm: {
          name: '',
          pwd: '',
          isRemember: false
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
          ],
          pwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
        hideError() {
            this.isShowError = false;
        },
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
                if (valid) {
                    var _this = this;
                    _this.utils.getJson('/static/data/login.json', function(res){
                     _this.isShowError = false;
                     _this.utils.setUser({
                        name: _this.loginForm.name, 
                        password: _this.loginForm.pwd, 
                        isRemember: _this.loginForm.isRemember
                    })
                     _this.$router.push('/home');
                    }, function(){
                        _this.isShowError = true;
                    }, {name: _this.loginForm.name, password: _this.loginForm.pwd, isRemember: _this.loginForm.isRemember})
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    }
}
</script>

<style scoped>
    .login-main {
        width: 330px;
        margin-left: auto;
        margin-right: auto;
    }
    .login-pwd {
        margin-bottom: 10px;
    }
    .login-default a{ 
        color: #fff;
    }
    .login-btns-box button, .login-btns-box .el-button {
        width: 110px;
    }
    .login form {
        position: relative;
        left: 0;
        top: 100px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 0;
    }
</style>
