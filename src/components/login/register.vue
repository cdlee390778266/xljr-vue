<template>
  <div class="login">
    <el-form :model="registerForm" :rules="rules"  label-width="100px" class="reg" v-show="!isShowTip" ref="registerForm">
        <div class="reg-title">
            <div class="reg-title-left">注册</div>
            <div class="reg-title-right">
                <span>已有账号？</span>
                <router-link to="/login">返回登录</router-link>
            </div>
        </div>
        <div class="reg-main reg-form">
            <el-form-item label="用户名" prop="name">
                <el-input v-model="registerForm.name"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-radio-group v-model="registerForm.sex">
                    <el-radio label="0">男</el-radio>
                    <el-radio label="1">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
                <el-input v-model="registerForm.pwd" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="cpwd">
                <el-input v-model="registerForm.cpwd" type="password"></el-input>
            </el-form-item>
            <el-form-item label="固定电话" prop="tel">
                <el-input v-model="registerForm.tel"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="phone">
                <el-input v-model="registerForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱" prop="email">
                <el-input v-model="registerForm.email"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" prop="relName">
                <el-input v-model="registerForm.relName"></el-input>
            </el-form-item>
            <el-form-item label="身份证" prop="ID">
                <el-input v-model="registerForm.ID"></el-input>
            </el-form-item>
            <el-form-item label="开户营业部" prop="kh">
                <el-input v-model="registerForm.kh"></el-input>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
            <el-button @click="resetForm('registerForm')">重置</el-button>
            </el-form-item>
        </div>
    </el-form>
    <div class="reg-success reg-main reg" v-show="isShowTip"> 
        <div class="reg-success-body" :class="isRegSuccess ? '' : 'reg-error'">
            <div class="reg-success-img">
                <i></i>
                <span id="res-text">
                    <template v-if="isRegSuccess">恭喜您，注册成功</template>
                    <template v-else>对不起，注册失败！</template>
                </span>
                <span class="reg-line"></span>
            </div>
            <div class="reg-success-mes">
                <template v-if="isRegSuccess">
                    您的用户名：{{registerForm.name}}<br>
                    密码：{{registerForm.pwd}}
                </template>
            </div>
            <div class="reg-success-btns" v-if="isRegSuccess">
                <router-link to="/login">直接登录</router-link>
            </div>
            <div class="reg-success-btns" v-else>
                <a href="javascript: void(0);" @click="hideTip">重新注册</a>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'register',
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.registerForm.cpwd !== '') {
                    this.$refs.registerForm.validateField('cpwd');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.registerForm.pwd) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {    
            isShowTip: false,
            isRegSuccess: false,
            registerForm: {
              relName: '',
              sex: '0',
              ID: '',
              kh: '',
              tel: '',
              phone: '',
              name: '',
              pwd: '',
              cpwd: '',
              email: '',
              region: ''
            },
            rules: {
              relName: [
                { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
              ],
              sex: [
                { required: true,  trigger: 'blur' }
              ],
              ID: [
                { min: 15, max: 18, message: '长度在15 到 18 个字符', trigger: 'blur' }
              ],
              name: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
                { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
              ],
              pwd: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
                { validator: validatePass, trigger: 'blur' }
              ],
              cpwd: [
                { required: true, message: '请输入确认密码', trigger: 'blur' },
                { validator: validatePass2, trigger: 'blur' }
              ],
            }
        }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var _this = this;
            _this.utils.getJson('/static/data/reg.json', function(res){
              _this.isRegSuccess = true;
              _this.isShowTip = true;
            }, function(){
                _this.isRegSuccess = false;
                _this.isShowTip = true;
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      hideTip() {
        this.isShowTip = false;
        this.isRegSuccess = false;
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
