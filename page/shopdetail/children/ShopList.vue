<template>
	<div class="shop-list">
        <div class="good" v-show="show1">
            <!-- Swiper -->
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,index) in img" :key="index"> 
                        <img :src="'./static/image/'+item"> 
                    </div> 
                </div>
            </div>
            <!-- 书简介 -->
            <div class="book-info">
                <h3>{{ selectedGood.book_name}}</h3>
                <p> {{ selectedGood.book_intro }} </p>
                <p class="price"> ￥{{ selectedGood.book_price | KeepTwoNum}} </p>
                <p> 原价：<span>￥{{ selectedGood.book_price*1.2 | KeepTwoNum}}</span> </p>
            </div>
            <!-- 添加数量 -->
            <div class="numbox">
                <span>数量</span>
                <div>
                    <button id="down" @click="decrement()">-</button>
                    <input type="text" v-model="count" @keyup.enter="submit">
                    <button id="up" @click="increment()">+</button>
                </div>
            </div>
            <!-- 作者信息 -->
            <div class="author">
                <p> <span>作&nbsp;&nbsp;&nbsp;&nbsp;者</span> {{ selectedGood.book_author }} </p>
                <p> <span>出版社</span> {{ selectedGood.book_publish }} </p>
            </div>
            <!-- 暂无评价 -->
            <div class="combox">暂无评价</div>
            <!-- 为你推荐 -->
            <div class="produceBox">
                <Produce :produce="produceList"></Produce>
            </div>
        </div>
		 <div class="detail" v-show="show2">
           <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="内容详情" name="first">
                    <!-- 前言 -->
                    <div>
                        <h3>前言</h3>
                        <p>
                            {{ selectedGood.book_directory }}
                        </p>
                    </div>
                    <!-- 内容简介 -->
                    <div>
                        <h3>内容简介</h3>
                        <p>
                            {{ selectedGood.book_intro }}
                        </p>
                    </div>
                     <!-- 作者简介 -->
                    <div>
                        <h3>作者简介</h3>
                        <p>
                            {{ selectedGood.book_author_intro }}
                        </p>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="出版信息" name="second">
                    <!-- 出版信息 -->
                    <div class="publish">
                        <p> <span>著者</span> {{ selectedGood.book_author }} </p>
                        <p> <span>出版社</span> {{ selectedGood.book_publish }} </p>
                        <p> <span>ISBN</span> {{ selectedGood.book_isbn }} </p>
                        <p> <span>版次</span> {{ selectedGood.book_edition }} </p>
                        <p> <span>包装</span> {{ selectedGood.book_package }} </p>
                        <p> <span>出版时间</span> {{ selectedGood.book_pub_date }} </p>
                        <p> <span>正文语种</span> {{ selectedGood.book_language }} </p>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
         <div class="comment" v-show="show3">
            <ul v-show="commentShow1">
                <li v-for="(item,index) in comList" :key="index">
                    <div>
                        <img :src="'./static/image/'+item.user_img" alt="">
                    </div>
                    <div>
                        <h5> {{ item.user_name }} </h5>
                        <p class="time"> {{ item.comment_time }} </p>
                        <p> {{ item.comment_message }} </p>
                    </div>
                </li>
            </ul>
            <div v-show="commentShow2" class="nothing">
                {{ comList }}
            </div>
        </div>
	</div>
</template>
<script>
import 'swipercss'
import Swiper from 'swiper-js'
import axios from 'axios'
import Produce from '../../produce/Produce'
export default {
    props:["selectedGood","className","img","booknum"],
     components:{ 
       Produce
    },
    data(){
      return {
        show1:true,
        show2:false,
        show3:false,
        produceList:[],
        count:1,
        activeName: 'first',
        comList:[],
        commentShow1:true,
        commentShow2:false,
      }
    },
    created() {
        let sql=`SELECT * FROM book_info LIMIT 0,9`;
        axios.get('http://132.232.114.138/php/datainfo.php?sql='+sql).then(res=>{
            this.produceList=res.data;
			// console.log(this.produceList);
        });
        this.Getcomment()
    },
    mounted:function(){
        this.change();
        var mySwiper = new Swiper('.swiper-container', {
            autoplay : true, 
            autoplayDisableOnInteraction: false, 
            observer:true,//修改swiper自己或子元素时，自动初始化swiper 
            observeParents:false,//修改swiper的父元素时，自动初始化swiper 
            onSlideChangeEnd: function(swiper){ 
            　　　swiper.update();  
            　　　mySwiper.startAutoplay();
            　　  mySwiper.reLoop();  
            }
        });
    },
	filters: {
		KeepTwoNum: function(value) {
			value = Number(value);
			return value.toFixed(2);
		}
	},
    methods:{
        //切换显示内容
       change() {
           if(this.className=="商品"){
               this.show1=true;
               this.show2=false;
               this.show3=false;
           }else if(this.className=="详情"){
               this.show1=false;
               this.show2=true;
               this.show3=false;
           }else{
               this.show1=false;
               this.show2=false;
               this.show3=true;
           }
        },
        //点击数量减少
        decrement(){
			this.$emit('decrement',this.count) 
            if(this.count>1){
                this.count--;
				
            } 
        },
        //点击数量增加
        increment(){
			this.$emit('increment',this.count) 
            if(this.count<=this.booknum){
                this.count++;
            }else{
                alert("库存不足！")
            }
        },
        //输入数量回车判断是否库存不足
        submit(){
            if(this.count>this.booknum){
                alert("库存不足！")
            }
        },
        //详情tab切换
        handleClick(tab, event) {},
        //请求评价数据
        Getcomment(){
            let sql=`SELECT * FROM book_comment WHERE book_name='${this.selectedGood.book_name}' ORDER BY comment_id DESC`;
            axios.get('http://132.232.114.138/php/datainfo.php?sql='+sql).then(res=>{
                if(res.data.length>0){
                    this.comList=res.data;
                    this.commentShow1=true;
                    this.commentShow2=false;
                }else{
                    this.comList="暂无评价";
                    this.commentShow1=false;
                    this.commentShow2=true;
                }
            });
        }
    }
}
</script>
<style lang="scss" scoped>
ul{
    list-style: none;
}
//商品页
.good{
    height: 100%;
    //swiper样式
     .swiper-container {
        width: 100%;
        height: 250px;
        margin-bottom: 10px;
        background-color: #fff;
        .swiper-slide {
            width: 100% !important;  
            height: 100% !important; 
            text-align: center;
            font-size: 18px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            -webkit-justify-content: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            -webkit-align-items: center;
            align-items: center;
            padding: 20px 0 10px 0;
            img{
                width: 70%;
                height: 100%;
            }
        }
    }
    //书简介
    .book-info{
        background-color: #fff;
        padding: 10px;
        border-bottom: 0.5px solid #ccc;
        p{
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 5;
            overflow: hidden;
            color: grey;
            font-size: 16px;
            &.price{
                color: brown;
                font:bold 24px arial;
            }
            span{
                text-decoration:line-through;
            }
        }
    }
    //数量按钮
    .numbox{
        height: 50px;
        padding: 10px 0;
        background-color: #fff;
        border-bottom: 0.5px solid #ccc;        
        display: flex;
        line-height: 20px;
        color: grey;
        span{
            display: block;
            line-height: 30px;
            letter-spacing: 1em;
            padding-left: 10px;
        }
        &>div{
            border: 0.5px solid black;
            input{
                width: 30px;
                height: 100%;
                text-align: center;
                border: 0.5px solid black;
                border-bottom: none;
                outline: none;
            }
            button{
                background-color:rgba(255,255,255,0);
                outline: none;
                border: none;
            }
        }
        
    }
    //作者信息
    .author,.detail .el-tabs .publish{
        background-color: #FCFCFC;
        padding: 10px;
        color: black;
        p{
            span{
                display: inline-block;
                width: 50px;
                text-align: justify;
                color: grey;
            }
        }
    }
    //暂无评价
    .combox{
        background-color: #fff;
        line-height:50px ;
        margin: 10px 0;
        padding-left: 10px;
    }
    //为你推荐
    .produceBox{
        background-color: #fff;
        width: 100%;
        height: 650px;
    }
}
//详情页
.detail{
    margin-bottom: 40px;
    .el-tabs{
        .el-tabs__nav{
            background-color: #fff;
            width: 100%;
            justify-content: space-around;
            .el-tabs__item{
                width: 50%;
                padding: 0;
                text-align: center;
                &:hover{
                    color: red;
                }
            }
            .el-tabs__active-bar{
                width: 50% !important;
                height: 1px;
                background-color: red;
            }
        }
        .el-tabs__item.is-active{
            color: red;
        }
        &>div{
            h3{
                padding: 0 10px;
                line-height: 50px;
                font-size: 22px;
                margin: 0;
            }
            p{
                padding: 0 10px;
                line-height: 24px;
                color: gray;
            }
            .publish>p{
                color: black;
                span{
                    display: inline-block;
                    width: 80px;
                    color: gray;
                }
            }
        }  
    }
} 
//评价页
.comment{
    ul{
        width: 100%;
        padding: 0 !important;
        li{
            display: flex;
            &>div{
                padding: 10px;
                // border: 1px solid red;
                h5{
                    color: brown;
                }
                img{
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                }
                .time{
                    color: gray;
                    font-size: 12px;
                }
            }
        }
    }
    .nothing{
        line-height: 200px;
        text-align: center;
        font-size: 18px;
        color: grey;
    }
} 
</style>