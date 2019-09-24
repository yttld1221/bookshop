<template>
    <div class="all">
        <div class="head"><headBackto></headBackto><div class="title"><span>账户与安全</span></div></div>
        <ul>
            <li><span>用户名</span><span>{{userMsg.user_name}}</span></li>
            <li @click='userTel'><span>联系方式</span><span>{{userMsg.user_tel}}<span>></span></span></li>
            <li @click='userPwd'><span>密码</span><span><span>></span></span></li>
        </ul>
        <div class="msgCheck">
            <el-button type="text" @click="msgCheck()">确认更改</el-button>
        </div>
        <Loading></Loading>
    </div>
</template>

<script>
import headBackto from '../../../../components/common/BackTo'
import Loading from '../../../../components/common/Loading'
import axios from 'axios'
export default {
    //返回按钮组件调用
    components:{headBackto,Loading},
    data() {
        return {
            userMsg:[]
        }
    },
    created() {
        let user = sessionStorage.getItem('user');
        let sql = 'select * from book_user where user_name ='+user;
        axios.get('http://132.232.114.138/php/datainfo.php?sql='+sql).then((res)=>{
            this.userMsg = res.data[0];
        })
    },
    methods: {
        //联系方式修改
        userTel(){
            this.$alert('抱歉,联系方式暂不可修改', '提示', {
            confirmButtonText: '确定',
            customClass:'confirm',
            callback: action => {
            this.$message({
              type: 'info',
              message: `取消操作`,
            });
          }
        });
        },
        //密码修改
        userPwd(){
            this.$prompt('请输入修改后的密码', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            customClass:'confirm',
            }).then(({ value }) => {
                this.$message({
                    type: 'success',
                    message: '修改待成功'
                });
                this.userMsg.user_pwd = value;
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '你已取消操作'
            });       
            });
        },
        //确认更改
        msgCheck(){
            this.$confirm('即将修改信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                customClass:'confirm',
                }).then(() => {
                this.$message({
                    type: 'success',
                    message: '修改成功!'
                });
                let sql = 'update book_user set user_pwd = "'+this.userMsg.user_pwd+ '" where user_name='+this.userMsg.user_name+''
                axios.get('http://132.232.114.138/php/dataupdate.php?sql='+sql).then((res)=>{
                    
                })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '你已取消操作！'
                });          
                });
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../../../../style/base.scss'; 

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
        padding: 0 3.5rem 0 2.5rem;
        display: flex;
        justify-content: space-between;
      }
      span{
          display: inline-block;
          display: flex;
          span:last-child{
              position: absolute;
              right: 1rem;
          }
          img{
              display: inline-block;
              @include wh(100%,100%);
              border-radius: 5rem;
              align-items: center;
              margin-top: 0.5rem;
              margin: 0.5rem 0.1rem;
          }
      }
      span.img{
          display: flex;
          @include wh(4rem,4rem);
          line-height: 5rem;
      }
}
.msgCheck{
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