<template>
    <el-form :model="loginForm" :rules="loginFormRules" ref="loginForm">
      <span class="login_title">登录</span>
      <el-form-item  prop="username">
        <el-input  placeholder="请输入手机/邮箱" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="请输入密码" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-checkbox label="记住密码"></el-checkbox><span class="rememberim">忘记密码？</span>
      <el-form-item>
        <el-button @click="submitHandle" type="primary">登录</el-button>
        <el-button class="button_register"><router-link :to="{path:'/register'}" class="register_a">注册</router-link></el-button>
      </el-form-item>
    </el-form>    
</template>
<script>
//这个页面需要一个请求
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
         //trigger模糊匹配
        username: [{ required: true, trigger: 'blur', message: '请输入手机/邮箱' }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
      }
    }
  },
  methods: {
    //登录
    submitHandle() {
      console.log(this.$refs)
      //清空操作

      // this.$refs.loginForm.resetFields()
      //表单验证，输入值符合匹配规则valid返回true
      this.$refs.loginForm.validate(valid => {
        console.log(valid)
        if (valid) {//验证通过发送请求
        sessionStorage.setItem('token','11111')
          this.loginHandle()
        }
      })
    },
    //表单重置功能
    // resetLoginForm(formName) {
    //   this.$refs[formName].resetFields()
    loginHandle() {
      // alert("用户名或者密码不正确");
      this.$router.push({path:'/'})
      //重置表单功能
      // this.$refs.loginForm.resetFields()
      //发送请求的方法
      // login(this.loginForm).then(res => {
      //   if (res.data.code === 200) {
      //     this.$message({
      //       message: '登录成功',
      //       type: 'success',
      //       duration: 2 * 1000
      //     })
      //     sessionStorage.setItem('token', res.data.data.token) 
      //     setTimeout(() => {
      //       this.$router.push('/home')
      //     }, 1000);
      //   }
      // })

    // }
  }
    },

}
</script>
<style lang="less" scoped>
    .login_title{
        font-size: 24px;
        margin-top: 48px;
        color:#606266;
        display: inline-block;
    }

    .rememberim{
        color:firebrick;
        cursor: pointer;
    }
    .el-form{
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
    .el-checkbox{
      margin-right:106px;
    }
    .el-button--primary{
      margin-right:50px;
    }
    .el-form-item{
      margin-bottom: 22px;
      margin-top: 30px;
    }
    .el-input--small.el-input__inner {
        height: 40px;
        line-height: 40px;
    }
    .button_register{
      padding:0px;
    }
    .register_a{
      width:70px;
      height:40px;
      display:inline-block;
      line-height: 40px;
    }
</style>
