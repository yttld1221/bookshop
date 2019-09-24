<template>
    <div class="all">
        <div class="head"><headBackto></headBackto><div class="title"><span>个人信息编辑</span></div></div>
        <ul>
            <li @click='headUpd'><span>头像</span><span class="img"><img src="../../../../../static/image/head.jpg" alt=""><span>></span></span></li>
            <li @click='nickname'><span>昵称</span><span>{{userMsg.nick_name}}<span>></span></span></li>
            <li @click='userSex'><span>性别</span><span>{{userMsg.user_sex}}<span>></span></span></li>
            <li @click='userBirth'><span>生日</span><span>{{userMsg.user_birth}}<span>></span></span></li>
			<li @click='address'><span>我的收货地址</span><span>{{address_item[0].user_address}}<span>></span></span></li>
        </ul>
        
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
            userMsg:[],
			address_item:[],
			user:sessionStorage.getItem('user')
        }
    },
    created() {
        let user = sessionStorage.getItem('user');
        let sql = 'select * from book_user where user_name ='+user;
        axios.get('http://132.232.114.138/php/datainfo.php?sql='+sql).then((res)=>{
            this.userMsg = res.data[0];
            if(this.userMsg.user_sex=='null'){
                this.userMsg.user_sex=''
            }if(this.userMsg.user_birth=='null'){
                this.userMsg.user_birth=''
            }
        })
		//地址
		let sql1 = 'SELECT * FROM book_address WHERE user_name="' + user + '"';
		axios.get('http://132.232.114.138/php/datainfo.php?sql='+sql1).then((res)=>{
			this.address_item = res.data;
			console.log(this.address_item[0].name)
		});
    },
    methods: {
        //头像修改
        headUpd(){
            this.$alert('抱歉,暂不支持修改头像', '提示', {
            confirmButtonText: '确定',
            customClass:'confirm',
            callback: action => {
                this.$message({
                type: 'info',
                message: `用户取消操作`
                });
            }
            });
        },
        //性别修改
        userSex(){
            this.$prompt('请输入性别(男or女)', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            customClass:'confirm',
            }).then(({ value }) => {
            this.$message({
                type: 'success',
                message: '你的性别为: ' + value
            });
            this.userMsg.user_sex = value;
			
			let sql2 = 'update book_user set user_sex="'+this.userMsg.user_sex+'" WHERE user_name="' + this.user + '"';
			axios.get('http://132.232.114.138/php/datainfoa.php?sql='+sql2).then((res)=>{
			});
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '你已取消操作'
            });       
            });
        },
		//昵称更改
		nickname(){
		    this.$prompt('请输入你的', '提示', {
		    confirmButtonText: '确定',
		    cancelButtonText: '取消',
		    customClass:'confirm'
		    }).then(({ value }) => {
		    this.$message({
		        type: 'success',
		        message: '你的昵称为: ' + value
		    });
		    this.userMsg.nick_name = value;
			
			let sql3 = 'update book_user set nick_name="'+this.userMsg.nick_name+'" WHERE user_name="' + this.user + '"';
			axios.get('http://132.232.114.138/php/datainfoa.php?sql='+sql3).then((res)=>{
			});
		    }).catch(() => {
		    this.$message({
		        type: 'info',
		        message: '你已取消操作'
		    });       
		    });
		},
        //生日更改
        userBirth(){
            this.$prompt('请选择你的生日', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            customClass:'confirm',
            inputType:'date'
            }).then(({ value }) => {
            this.$message({
                type: 'success',
                message: '你的生日为: ' + value
            });
            this.userMsg.user_birth = value;
			let sql4 = 'update book_user set user_birth="'+this.userMsg.user_birth+'" WHERE user_name="' + this.user + '"';
			axios.get('http://132.232.114.138/php/datainfoa.php?sql='+sql4).then((res)=>{	
			});
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '你已取消操作'
            });       
            });
        },
		//地址修改
		address(){
		    this.$router.push({
		    	name: 'Address',
		    	query: {
		    		address_item:this.address_item,
		    		cart_order:this.cart_order,
		    		address_state:0
		    	}
		    })
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