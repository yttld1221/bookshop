<template>
    <div class="all">
        <div class="head"><headBackto></headBackto><div class="title"><span>个人设置</span></div></div>
        <ul>
            <router-link :to="{name:'User'}" tag='li'><span>个人信息</span><span>></span></router-link>
            <router-link :to="{name:'Userpwd'}" tag='li'><span>账户与安全</span><span>></span></router-link>
        </ul>
        <div class="logOut">
            <el-button type="text" @click="loginout()">退出登录</el-button>
        </div>
    </div>
</template>

<script>
import headBackto from '../../../components/common/BackTo'
export default {
    //返回按钮组件调用
    components:{headBackto},
    data() {
        return {
            
        }
    },
    methods: {
        loginout() {
            this.$confirm('确认退出?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            customClass:'confirm'
            }).then(() => {
            this.$message({
                type: 'success',
                message: '退出成功！'
            });
                sessionStorage.removeItem('user');
                this.$router.replace('/Home');
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '用户已取消退出'
            });          
            });
        }
    },
}
</script>


<style lang="scss" scoped>
@import '../../../style/base.scss'; 

.all{
    display: flex;
    flex-direction: column;
}
.head{
    @include wh(100%,4rem);
    text-align: center;
    border-bottom: 0.4rem solid #eee;
    .back{
        position: absolute;
        top: 0.5rem;
        left: 0.5rem;
        @include wh(2rem,2rem);
        img{
            @include wh(100%,100%);
        }
    }
    .title{
        line-height: 4rem;
        @include sc(1.7rem,$bgcolor)
    }
}
ul{
    list-style: none;
    padding: 0;
    li{
        @include wh(100%,5rem);
        border-bottom: .1rem solid #eee;
        line-height: 5rem;
        padding: 0 2.5rem;
        display: flex;
        justify-content: space-between;
      }
}

.logOut{
    text-align: center;
    button{
        margin-top: 2rem;
        @include wh(70%,4rem);
        border: none;
        @include sc(2rem,white);
        background: $bgcolor;
        border-radius: 0.5rem;
    }
}

</style>

<style lang="scss">
    .el-message-box.confirm{
        width:70%;
    }
</style>

