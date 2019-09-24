import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

const store = new Vuex.Store({
    // 设置vuex的运行模式，true为调试模式，false为生产模式
    strict: true,
    // 相当于vue里面的data
    state: {
        bookInfo: []
    },
    getters: {
        // getters允许有两个参数：第一个可以访问state内的值。第二个值是一个对象，这个对象内的属性就是所有getters的值
        bookListCount(state,otherGetters) {
            // 可在控制台中展开查看输出的那个对象
            console.log(otherGetters);
            //console.log(otherGetters);
            return state.bookInfo.length;
        },
        test1() {
            return "abc";
        },
        test2() {
            return "测试值"
        }
    },
    // vuex独有的“修改器”，用于修改状态（也就是state内的属性）,事件执行需要传入state作为首个参数
    mutations: {
        /**
         * 重新加载由actions执行后传入的AJAX数据
         */
        runBookInfoLoad(state,data) {
           // console.log(state)
           // console.log(data)
            state.bookInfo = data;
        }
    },
    // 相当于是vue里的方法/事件（methods），它能够执行异步事件（如AJAX请求事件）
    actions: {
        /**
         * 执行AJAX操作请求数据并发送给mutations去执行具体操作
         * @param {Object} context 当前上下文产生的事件对象（区别于JS的事件对象）
         * context包含了2个方法：commit和dispatch
         * context包含了4个子对象：state、getter、rootState、rootGetter
         */
        loadBookInfo(context) {
            console.log('as');
            axios.get('../php/datainfo.php').then((res) => {
                console.log(res);
                context.commit('runBookInfoLoad', res.data);
                
            }).catch(() => {
                console.error('数据加载错误');
            });
            // 点击首页“加载数据”按钮后在控制台查看对象组成
           console.log(context);
        }
    }
})
export default store;