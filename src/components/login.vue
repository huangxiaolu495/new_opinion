<template>

    <div class="login_all">
        <span class="login_title">登录</span>
        <form action="">
            <input type="text" placeholder="手机/邮箱" class="login_phone"><br>
            <input type="text" placeholder="请输入密码" class="login_secret"><br>
            <label for="remember" class="login_rember"><input type="checkbox" id="remember" >记住密码</label><span class="rememberim">忘记密码？</span><br>
            <input type="button" value="登录" class="login_up">
        </form>    
        <a href="#/register">没有账号？立即注册→</a>
    </div>      

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
        username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
      }
    }
  },
  methods: {
    submitHandle() {
      //表单验证
      this.$refs.loginForm.validate(valid => {
        //
        if (valid) {
          this.loginHandle()
        }
      })
    },
    resetLoginForm(formName) {
      this.$refs[formName].resetFields()
    },
    loginHandle() {
      //
      login(this.loginForm).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '登录成功',
            type: 'success',
            duration: 2 * 1000
          })
          sessionStorage.setItem('token', res.data.data.token)
          setTimeout(() => {
            this.$router.push('/home')
          }, 1000);
        }
      })
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
        background-color:white;
    }
    .login_title{
        font-size: 24px;
        margin-top: 48px;
        display: inline-block;
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
</style>
