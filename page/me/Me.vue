<template>
  <div class="me">
    <div class="head">
      <ul class="user-infor">
        <router-link :to="{name:'User'}" tag="li"><img src="../../../static/image/head.jpg" alt=""></router-link>
        <li><span>{{nick_name}}</span></li>
      </ul>
    </div>
    <div class="main">
      <ul class="all">
        <li class="first"><router-link :to="{name:'Allorder'}" tag="li"><span>我的订单</span><span>查看全部订单 ></span></router-link></li>
        <li class="second">
          <ul class="order">
            <li><router-link :to="{name:'Paying'}" tag="li"><span><img src="../../../static/image/me/paying.png" alt=""></span><span>待付款</span></router-link></li>
            <li><router-link :to="{name:'Good'}" tag="li"><span><img src="../../../static/image/me/good.png" alt=""></span><span>待发货</span></router-link></li>
            <li><router-link :to="{name:'Ingood'}" tag="li"><span><img src="../../../static/image/me/ingood.png" alt=""></span><span>待收货</span></router-link></li>
            <li><span><img src="../../../static/image/me/flow.png" alt=""></span><span>待评价</span></li>
						<li><router-link :to="{name:'Flow'}" tag="li"><span><img src="../../../static/image/me/sall.png" alt=""></span><span>退款/售后</span></router-link></li>
            
          </ul>
        </li>
      </ul>  
      <ul class="bottom">
        <router-link :to="{name:'Collect'}" tag="li"><span>我的收藏</span><span>></span></router-link>
        <router-link :to="{name:'Usercheck'}" tag="li"><span>个人设置</span><span>></span></router-link>
        <router-link :to="{name:'Feedback'}" tag="li"><span>意见反馈</span><span>></span></router-link>
        <router-link :to="{name:'About'}" tag="li"><span>关于应用</span><span>></span></router-link>
      </ul>
    </div>
    <footGuide></footGuide>
  </div>
</template>

<script>
import footGuide from '../../components/footGuide/FootGuide'
import axios from 'axios'
export default {
	components:{footGuide},
  data() {
    return {
      username:'',
			nick_name:''
    }
  },
	created() {
		let user = sessionStorage.getItem('user');
		let sql = 'select * from book_user where user_name ='+user;
		axios.get('http://132.232.114.138/php/datainfo.php?sql='+sql).then((res)=>{
			
		    this.nick_name = res.data[0].nick_name;
		})
	},
  mounted() {
        this.getUser();
      },
      methods: {
        getUser:function(){
          this.username = sessionStorage.getItem('user');
        }
      },
}
</script>

<style lang='scss' scoped>
@import '../../style/base.scss';

.me{
  display: flex;
  flex-direction: column;
}
.head{
  display: block;
  @include wh(100%,20rem);
  @include bis('../../../static/image/me_bg.jpg');
  .user-infor{
    list-style: none;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 0;
    @include wh(100%,100%);
    li{
			border: none;
			margin:1.5rem 0 0 0;
      @include wh(8rem,8rem);
      img{
        @include wh(100%,100%);
            border-radius: 6rem;
      }
      span{
        @include sc(2rem,white);
				font-size: 3rem;
      }
    }
		li:nth-child(2){
			display: flex;
			justify-content: center;
			width: 100%;
		}
  }
}
.main{
  ul.all{
    list-style: none;
    padding: 0;
    li{
      @include wh(100%,4rem);
      line-height: 4rem;
      padding: 0 1rem;
      display: flex;
      justify-content: space-between;
      ul.order{
        padding: 0;
          display: flex;
          li{
            flex: 1;
            display: flex;
            text-align: center;
            flex-direction: column;
            padding: 0;
            border-bottom: none;
            line-height: 3rem !important;
            span{
              font-size: 1.3rem;
                img{
                @include wh(35%,70%);
              }
            }
          }
      }
    }
    .first{
      height: 5rem !important;
      li{
				border: none;
        line-height: 5rem !important;
      }
      span:first-child{
        color: $bgcolor;
      }
    }
    .second{
      height: 6rem !important;
      border: 0.1rem solid #eee;
      border-bottom: 0.5rem solid #eee;
      padding-bottom: 5.5rem;
      }
  }
  ul.bottom{
    list-style: none;
    padding: 0;
      li{
        @include wh(100%,4rem);
        border-bottom: .1rem solid #eee;
        line-height: 4rem;
        padding: 0 3rem;
        display: flex;
        justify-content: space-between;
      }
  }
}

</style>
