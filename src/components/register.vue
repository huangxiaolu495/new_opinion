<template>
        <div class="login_all">
        <span class="login_title">注册</span>
        <form action="">
            <input type="text" placeholder="请输入邮箱" class="login_phone"><br>
            <input type="text" placeholder="请输入密码" class="login_secret"><br>
            <input type="text" placeholder="请再次输入密码" class="login_secret"><br>
            <input type="button" value="注册" class="login_up">
        </form>    
        <a href="#/login">已有账号？直接登录→</a>
    </div>    
</template>

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

