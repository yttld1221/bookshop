<template>
  <div class="all">
    <div class="head"><span class="back" @click="back"><img src="../../../static/image/back.png" alt=""></span><div class="title"><span>我的订单</span></div></div>
    <div class="bar">
      <ul>
        <li>
          <routerLink :to="{name:'Allorder'}" tag="li" exact>全部</routerLink>
        </li>
        <li>
          <routerLink :to="{name:'Paying'}" tag="li">待付款</routerLink>
        </li>
        <li>
          <routerLink :to="{name:'Good'}" tag="li">待发货</routerLink>
        </li>
        <li>
          <routerLink :to="{name:'Ingood'}" tag="li">待收货</routerLink>
        </li>
        <li>
          <routerLink :to="{name:'Flow'}" tag="li">退款/售后</routerLink>
        </li>
      </ul>
    </div>
    <router-view />
    
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods:{
    back(){
      this.$router.push('/Me');
    },
  }
}
</script>

<style lang="scss" scoped>
    @import "../../style/base.scss";
    .all{
      display: flex;
      flex-direction: column;
    }
    .head{
        @include wh(100%,4rem);
        text-align: center;
        line-height: 3rem;
        border-bottom: 0.1rem solid #eee;
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
            color: $bgcolor;
            line-height: 4rem;
        }
    }
    .bar{
      margin-top: 1rem;
      ul{
        display: flex;
        padding: 0;
        list-style: none;
        @include wh(100%,4rem);
        li{
          flex: 1;
          text-align: center;
          height: 3rem;
        }
      }
    }
    .router-link-exact-active{
      color:$bgcolor !important;
      border-bottom: 0.3rem solid $bgcolor;
    }
    </style>