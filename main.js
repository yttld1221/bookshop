// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
Vue.use(ElementUI)
import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import $ from 'jquery';

import "bootcss"
import "boot-js"
import "swipercss"
import "swiper-js"
import ElementUI from 'element-ui'
import router from './router'
Vue.config.productionTip = false

router.beforeEach((to,from,next)=>{
  if (to.path === '/Login'){
    next()
  }else{
    if(to.meta.requiresAuth && !sessionStorage.getItem('user')){
      alert('您未登录，请登录后操作')
      next({path:'/Login'})
    }else{
      next()
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
	$
})
