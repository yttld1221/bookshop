<template>
    <div class="all">
        <div class="head"><headBackto></headBackto><div class="title"><span>关于阅生活</span></div></div>
        <div class="main">
            <img src="../../../../static/image/logo.png" alt="">
            <p class="color p-text">好书半日达</p>
            <p class="color p-text">当前版本：1.0.0</p>
            <div class="commit">
                <el-button type="text" @click="msgCommit()">检查新版本</el-button>
            </div>
            <p class="color p-text">客服电话：028-9090-950</p>
            <p class="p">xx市阅生活书城</p>
            <p class="p">Copyright ㊣ 2019</p>
            <p class="p">All Rights Reserved</p>
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
        msgCommit(){
            this.$alert('抱歉,版本暂不提供更新', '提示', {
            confirmButtonText: '确定',
            customClass:'confirm',
            callback: action => {
            this.$message({
              type: 'info',
              message: `取消操作`,
            });
          }
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
.main{
    margin-top: 2rem;
    text-align: center;
    img{
        @include wh(30%,30%)
    }
}
.p-text{
    margin-top: 1rem;
    font-size: 1.6rem;
}
.color{
    color:$bgcolor;
}
.commit{
    text-align: center;
    button{
        margin-top: 1rem;
        @include wh(40%,4rem);
        border: 0.1rem solid $bgcolor;
        @include sc(2rem,$bgcolor);
        border-radius: 0.5rem;
    }
}
.p{
    font-size: 1.2rem;
}
</style>

<style lang="scss">
    .el-message-box.confirm{
        width:70%;
    }
</style>