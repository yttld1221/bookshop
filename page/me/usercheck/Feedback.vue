<template>
    <div class="all">
        <div class="head"><headBackto></headBackto><div class="title"><span>意见反馈</span></div></div>
        <p>{{this.feedMsg.tips}}</p>
        <span class="tops">{{this.feedMsg.tops}}</span>
        <div class="tarea"><textarea name="" class="text-area" cols="30" rows="10" placeholder="请在此处输入您宝贵的意见"></textarea></div>
        <div class="tarea"><textarea name="" class="text-area" cols="30" rows="1" placeholder="请在此处留下你的手机号码或者QQ号码"></textarea></div>
        <div class="commit">
            <el-button type="text" @click="msgCommit()">提交</el-button>
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
            feedMsg:{
                tips:'亲爱的朋友，我们珍视您的每一个反馈，您的建议和批评是对我们最大的支持，也是我们对产品优化改进的方向，我们将不断成长，竭诚为您服务！',
                tops:'阅生活书城运营中心'
            }
        }
    },
    methods: {
        msgCommit(){
            this.$confirm('确认提交?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            customClass:'confirm'
            }).then(() => {
            this.$message({
                type: 'success',
                message: '提交成功！'
            });
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '用户已取消提交'
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
p{
    text-indent: 2rem;
    padding: 1rem;
    font-size: 1.4rem;
}
span.tops{
    display: flex;
    flex-direction: row-reverse;
    padding: 1rem;
    font-size: 1.6rem;
}
.tarea{
    text-align: center;
}
.text-area{
    width: 95%;
    border: none;
    border-bottom: 0.1rem solid #eee;
}
.text-area::-webkit-input-placeholder{
        color: $bgcolor;
}
.text-area::-moz-placeholder{ 
        color: $bgcolor;        
}
.text-area:-ms-input-placeholder{  
        color: $bgcolor;        
}

.commit{
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

