import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/home/Home'
import Cart from '@/page/cart/Cart'
import Cartorder from '@/page/cart/children/Cartorder'
import Type from '@/page/type/Type'
import Me from '@/page/me/Me'
import Search from '@/page/search/Search'
import Good from '@page/order/children/Good'
import Allorder from '@page/order/children/Allorder'
import Ingood from '@page/order/children/Ingood'
import Paying from '@page/order/children/Paying'
import Flow from '@page/order/children/Flow'
import Login from '@page/loginreg/Login'
import Register from '@page/loginreg/Register'
import Shopdetail from '@page/shopdetail/Shopdetail'
import Collect from '@page/collect/Collect'
import Usercheck from '@page/me/usercheck/Usercheck'
import About from '@page/me/usercheck/About'
import Feedback from '@page/me/usercheck/Feedback'
import User from '@page/me/usercheck/children/User'
import Userpwd from '@page/me/usercheck/children/Userpwd'
import Address from '@page/cart/children/Address'

Vue.use(Router)

export default new Router({
  mode:'hash',
  routes: [
    {path:'/',redirect:'Home'},
    //首页
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    //搜索页
    {
      path:'/Search',
      name:'Search',
      component:Search
    },
    //购物车页
    {
      path: '/Cart',
      name: 'Cart',
      component: Cart
    },
    //类别页
    {
      path: '/Type',
      name: 'Type',
      component: Type
    },
    //个人信息页
    {
      path: '/Me',
      name: 'Me',
      component: Me,
      meta: {  
        requiresAuth: true    
      }  
    },
    //订单页
        {
          //全部
          path: '/Allorder',
          name:'Allorder',
          component:Allorder,
        },
        {
          //未付款
          path: '/Paying',
          name:'Paying',
          component:Paying,
        },
        {
          //未发货
          path: '/Good',
          name:'Good',
          component:Good,
        },
        {
          //未收货
          path: '/Ingood',
          name:'Ingood',
          component:Ingood,
        },
        {
          //未评价
          path: '/Flow',
          name:'Flow',
          component:Flow,
        },

    //登陆
    {
      path:'/Login',
      name:'Login',
      component:Login
    },
    //注册
    {
      path:'/Register',
      name:'Register',
      component:Register
    },
    //收藏
    {
      path:'/Collect',
      name:'Collect',
      component:Collect
    },
    {
      path: '/Cartorder',
      name: 'Cartorder',
      component: Cartorder
    },
    //个人设置
    {
      path:'/Usercheck',
      name:'Usercheck',
      component:Usercheck,
    },
    //个人信息
    {
      path:'/User',
      name:'User',
      component:User
    },
    //账户与安全
    {
      path:'/Userpwd',
      name:'Userpwd',
      component:Userpwd
    },
    //反馈
    {
      path:'/Feedback',
      name:'Feedback',
      component:Feedback
    },
    //关于
    {
      path:'/About',
      name:'About',
      component:About
    },
    //详情页 
		{
      path: '/Shopdetail',
      name: 'Shopdetail',
      component: Shopdetail 
    },
    //地址获取
    {
      path: '/Address',
      name: 'Address',
      component: Address 
    }
  ]
})
