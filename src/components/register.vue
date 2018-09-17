<template>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="10px" class="demo-ruleForm">
        <span class="login_title">注册</span>
        <el-form-item  prop="pass">
            <el-input type="email" placeholder='请输入邮箱' v-model="ruleForm2.pass"></el-input>
        </el-form-item>
        <el-form-item  prop="checkPass">
            <el-input type="password" placeholder='请输入密码' v-model="ruleForm2.checkPass" ></el-input>
        </el-form-item>
        <el-form-item  prop="checkpass2">
            <el-input type="password" placeholder='请输入再次输入密码' v-model.number="ruleForm2.checkpass2"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button  size="large" type="primary" @click="submitForm('ruleForm2')">注册</el-button>
        </el-form-item>
            <span><router-link :to="{path:'/login'}">已有账号？直接登录→</router-link></span>
    </el-form> 
</template>

<script>
  export default {
    data() {
      var validatePass3 = (rule, value, callback) => {
        if (!value) {
           callback(new Error('请再次输入密码'));
        }else if(value != this.ruleForm2.checkPass){
            callback(new Error("两次输入密码不一致"))
        }else{
            callback()
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱'));
        } else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          pass: '',
          checkPass: '',
          checkpass2: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          checkpass2: [
            { validator: validatePass3, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>


<style lang="less" scoped>
    .login_all{
        position: absolute;
        bottom: 78px;
        right: 132px;
        width:400px;
        height:402px;
        text-align: center;
        color:#606266;
        background-color:white;
    }
    .login_title{
        font-size: 24px;
        margin-top: 27px;
        color: #606266;
        display: inline-block;
        margin-bottom: 22px;
    }
    .login_phone{
        height: 44px;
        width: 300px;
        border-radius: 5px;
        margin-top: 10px;
        margin-bottom: 10px;
        padding-left:16px;
    }
    .login_secret{
        height: 44px;
        width: 300px;
        border-radius: 5px;
        margin-top: 10px;
        margin-bottom: 10px;
        padding-left:16px;
    }
    .login_rember{
        margin-right:150px;
    }
    .login_up{
        height: 44px;
        width: 300px;
        border-radius: 5px;
        margin-top: 10px;
        margin-bottom: 10px;
        background-color: #E2E2E2;
    }
    .rememberim{
        color:firebrick
    }
    a{
        color:black;
    }
    .el-form {
        position: absolute;
        bottom: 78px;
        right: 132px;
        width:400px;
        height:402px;
        text-align: center;
        background-color:white;
        padding-left:40px;
        padding-right:40px;
    }
</style>

